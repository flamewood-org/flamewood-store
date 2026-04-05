import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
	CUSTOMER_TOKEN_COOKIE,
	maxAgeSecondsFromExpiresAt,
} from "@/lib/auth-cookie";
import { loginCustomer, registerCustomer } from "@/lib/shopify-customer";

export async function POST(request: Request) {
	let body: {
		email?: string;
		password?: string;
		firstName?: string;
		lastName?: string;
		phone?: string;
	};
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const email = body.email?.trim();
	const password = body.password;
	const firstName = body.firstName?.trim() ?? "";
	const lastName = body.lastName?.trim() ?? "";
	const phoneRaw = body.phone?.trim() ?? "";
	const phoneDigits = phoneRaw.replace(/\D/g, "");

	if (!email || !password || password.length < 5) {
		return NextResponse.json(
			{ error: "Valid email and password (min 5 characters) are required." },
			{ status: 400 },
		);
	}

	if (!phoneRaw || phoneDigits.length < 8) {
		return NextResponse.json(
			{ error: "A valid phone number is required (at least 8 digits)." },
			{ status: 400 },
		);
	}

	let formattedPhone = phoneRaw;
	if (phoneRaw && !phoneRaw.startsWith("+")) {
		formattedPhone = `+91${phoneDigits}`;
	}

	const created = await registerCustomer({
		email,
		password,
		firstName,
		lastName,
		phone: formattedPhone,
	});
	if (!created.ok) {
		return NextResponse.json({ error: created.message }, { status: 400 });
	}

	const session = await loginCustomer(email, password);
	if (!session.ok) {
		return NextResponse.json(
			{
				ok: true,
				needsLogin: true,
				message:
					"Account created. Please sign in — if login fails, confirm your email in Shopify customer settings.",
			},
			{ status: 201 },
		);
	}

	const jar = await cookies();
	jar.set(CUSTOMER_TOKEN_COOKIE, session.accessToken, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		secure: process.env.NODE_ENV === "production",
		maxAge: maxAgeSecondsFromExpiresAt(session.expiresAt),
	});

	return NextResponse.json({ ok: true });
}
