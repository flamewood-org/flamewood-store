"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthModal } from "@/store/AuthModalContext";

/** Dedupes React Strict Mode double-invoke for the same URL. */
const processedAuthKeys = new Set<string>();

/** Opens auth modal when URL contains ?auth=login|register (e.g. after middleware redirect). */
export function AuthUrlSync() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const { openLogin, openRegister } = useAuthModal();

	useEffect(() => {
		const auth = searchParams.get("auth");
		if (!auth || (auth !== "login" && auth !== "register")) return;

		const rawCallback = searchParams.get("callbackUrl");
		const callbackUrl =
			rawCallback &&
			rawCallback.startsWith("/") &&
			!rawCallback.startsWith("//")
				? rawCallback
				: "/account";
		const registered = searchParams.get("registered") === "1";

		const key = `${auth}|${callbackUrl}|${registered}`;
		if (processedAuthKeys.has(key)) return;
		processedAuthKeys.add(key);

		if (auth === "login") {
			openLogin({ callbackUrl, registered });
		} else {
			openRegister({ callbackUrl });
		}

		const next = new URLSearchParams(searchParams.toString());
		next.delete("auth");
		next.delete("callbackUrl");
		next.delete("registered");
		const qs = next.toString();
		router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
	}, [searchParams, pathname, router, openLogin, openRegister]);

	return null;
}
