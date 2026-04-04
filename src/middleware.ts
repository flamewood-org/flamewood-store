import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CUSTOMER_TOKEN_COOKIE } from "@/lib/auth-cookie";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (!pathname.startsWith("/account")) {
		return NextResponse.next();
	}

	const token = request.cookies.get(CUSTOMER_TOKEN_COOKIE)?.value;
	if (!token) {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		url.search = "";
		url.searchParams.set("auth", "login");
		url.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/account", "/account/:path*"],
};
