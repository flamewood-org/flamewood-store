import { cookies } from "next/headers";
import { CUSTOMER_TOKEN_COOKIE } from "@/lib/auth-cookie";
import { getCustomerByToken } from "@/lib/shopify-customer";
import type { CustomerProfile } from "@/types/customer";

export async function getCustomerFromCookies(): Promise<CustomerProfile | null> {
	const jar = await cookies();
	const token = jar.get(CUSTOMER_TOKEN_COOKIE)?.value;
	if (!token) return null;
	const customer = await getCustomerByToken(token);
	if (!customer) {
		jar.delete(CUSTOMER_TOKEN_COOKIE);
	}
	return customer;
}

export async function getAccessTokenFromCookies(): Promise<string | null> {
	const jar = await cookies();
	return jar.get(CUSTOMER_TOKEN_COOKIE)?.value ?? null;
}
