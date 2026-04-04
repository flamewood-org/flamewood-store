/* eslint-disable @typescript-eslint/no-explicit-any */

import { storefrontRequest } from "@/lib/shopify";
import type { CustomerOrderSummary, CustomerProfile } from "@/types/customer";

const GET_CUSTOMER = `
  query getCustomer($token: String!) {
    customer(customerAccessToken: $token) {
      id
      email
      firstName
      lastName
      phone
      orders(first: 15, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            name
            processedAt
            totalPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const GET_CUSTOMER_MINIMAL = `
  query getCustomerMinimal($token: String!) {
    customer(customerAccessToken: $token) {
      id
      email
      firstName
      lastName
      phone
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_DELETE = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

function mapCustomer(
	node: Record<string, any> | null | undefined,
	orderEdgesOverride?: unknown[],
): CustomerProfile | null {
	if (!node) return null;

	const orderEdges = orderEdgesOverride ?? node.orders?.edges ?? [];
	const orders: CustomerOrderSummary[] = orderEdges.map((e: any) => {
		const n = e.node;
		return {
			id: n.id,
			name: n.name,
			processedAt: n.processedAt ?? null,
			total: parseFloat(n.totalPrice?.amount ?? "0"),
			currencyCode: n.totalPrice?.currencyCode ?? "INR",
			financialStatus: null,
			fulfillmentStatus: null,
		};
	});

	return {
		id: node.id,
		email: node.email ?? null,
		firstName: node.firstName ?? null,
		lastName: node.lastName ?? null,
		phone: node.phone ?? null,
		orders,
	};
}

export async function getCustomerByToken(
	accessToken: string,
): Promise<CustomerProfile | null> {
	const full = await storefrontRequest<{
		customer: Record<string, any> | null;
	}>({
		query: GET_CUSTOMER,
		variables: { token: accessToken },
	});

	if (full.data?.customer) {
		return mapCustomer(full.data.customer);
	}

	const minimal = await storefrontRequest<{
		customer: Record<string, any> | null;
	}>({
		query: GET_CUSTOMER_MINIMAL,
		variables: { token: accessToken },
	});

	if (minimal.error || !minimal.data?.customer) {
		return null;
	}

	return mapCustomer(minimal.data.customer, []);
}

export async function loginCustomer(
	email: string,
	password: string,
): Promise<
	| { ok: true; accessToken: string; expiresAt: string | null }
	| { ok: false; message: string }
> {
	const { data, error } = await storefrontRequest<{
		customerAccessTokenCreate: {
			customerAccessToken: { accessToken: string; expiresAt: string } | null;
			customerUserErrors: { message: string }[];
		};
	}>({
		query: CUSTOMER_ACCESS_TOKEN_CREATE,
		variables: {
			input: { email: email.trim().toLowerCase(), password },
		},
	});

	if (error) {
		return { ok: false, message: error };
	}

	const payload = data?.customerAccessTokenCreate;
	const err = payload?.customerUserErrors?.[0];
	if (err) {
		return { ok: false, message: err.message };
	}

	const token = payload?.customerAccessToken?.accessToken;
	if (!token) {
		return { ok: false, message: "Invalid email or password." };
	}

	return {
		ok: true,
		accessToken: token,
		expiresAt: payload?.customerAccessToken?.expiresAt ?? null,
	};
}

export async function registerCustomer(input: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}): Promise<{ ok: true } | { ok: false; message: string }> {
	const { data, error } = await storefrontRequest<{
		customerCreate: {
			customer: { id: string } | null;
			customerUserErrors: { message: string }[];
		};
	}>({
		query: CUSTOMER_CREATE,
		variables: {
			input: {
				email: input.email.trim().toLowerCase(),
				password: input.password,
				firstName: input.firstName.trim(),
				lastName: input.lastName.trim(),
			},
		},
	});

	if (error) {
		return { ok: false, message: error };
	}

	const payload = data?.customerCreate;
	const err = payload?.customerUserErrors?.[0];
	if (err) {
		return { ok: false, message: err.message };
	}

	if (!payload?.customer) {
		return { ok: false, message: "Could not create account." };
	}

	return { ok: true };
}

export async function revokeCustomerToken(accessToken: string): Promise<void> {
	await storefrontRequest({
		query: CUSTOMER_ACCESS_TOKEN_DELETE,
		variables: { customerAccessToken: accessToken },
	});
}
