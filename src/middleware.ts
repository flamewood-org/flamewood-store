import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CUSTOMER_TOKEN_COOKIE } from "@/lib/auth-cookie";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	/* Auth UI is modal-only: legacy /login and /register URLs → home + ?auth= */
	if (pathname === "/login") {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		url.search = "";
		url.searchParams.set("auth", "login");
		const cb = request.nextUrl.searchParams.get("callbackUrl");
		if (cb?.startsWith("/") && !cb.startsWith("//")) {
			url.searchParams.set("callbackUrl", cb);
		}
		if (request.nextUrl.searchParams.get("registered")) {
			url.searchParams.set("registered", "1");
		}
		return NextResponse.redirect(url);
	}

	if (pathname === "/register") {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		url.search = "";
		url.searchParams.set("auth", "register");
		const cb = request.nextUrl.searchParams.get("callbackUrl");
		if (cb?.startsWith("/") && !cb.startsWith("//")) {
			url.searchParams.set("callbackUrl", cb);
		}
		return NextResponse.redirect(url);
	}

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
	matcher: ["/account", "/account/:path*", "/login", "/register"],
};
