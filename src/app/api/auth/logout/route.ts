import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CUSTOMER_TOKEN_COOKIE } from "@/lib/auth-cookie";
import { revokeCustomerToken } from "@/lib/shopify-customer";

export async function POST() {
	const jar = await cookies();
	const token = jar.get(CUSTOMER_TOKEN_COOKIE)?.value;
	if (token) {
		await revokeCustomerToken(token);
	}
	jar.delete(CUSTOMER_TOKEN_COOKIE);
	return NextResponse.json({ ok: true });
}
