import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
	CUSTOMER_TOKEN_COOKIE,
	maxAgeSecondsFromExpiresAt,
} from "@/lib/auth-cookie";
import { loginCustomer } from "@/lib/shopify-customer";

export async function POST(request: Request) {
	let body: { email?: string; password?: string };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const email = body.email?.trim();
	const password = body.password;
	if (!email || !password) {
		return NextResponse.json(
			{ error: "Email and password are required." },
			{ status: 400 },
		);
	}

	const result = await loginCustomer(email, password);
	if (!result.ok) {
		return NextResponse.json({ error: result.message }, { status: 401 });
	}

	const jar = await cookies();
	const maxAge = maxAgeSecondsFromExpiresAt(result.expiresAt);
	jar.set(CUSTOMER_TOKEN_COOKIE, result.accessToken, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		secure: process.env.NODE_ENV === "production",
		maxAge,
	});

	return NextResponse.json({ ok: true });
}
