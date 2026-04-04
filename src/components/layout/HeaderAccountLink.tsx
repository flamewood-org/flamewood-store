"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthModal } from "@/store/AuthModalContext";

type Me = {
	email: string | null;
	firstName: string | null;
	lastName: string | null;
} | null;

function displayName(me: NonNullable<Me>) {
	const full = [me.firstName, me.lastName].filter(Boolean).join(" ").trim();
	if (full) return full;
	if (me.email) return me.email.split("@")[0];
	return "Account";
}

type HeaderAccountLinkProps = {
	/** `inverse` = white text on brown utility strip. `default` = main header bar. */
	variant?: "default" | "inverse";
};

export function HeaderAccountLink({ variant = "default" }: HeaderAccountLinkProps) {
	const [me, setMe] = useState<Me | undefined>(undefined);
	const { openLogin } = useAuthModal();
	const inverse = variant === "inverse";

	const loadMe = (withSkeleton: boolean) => {
		if (withSkeleton) setMe(undefined);
		fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
			.then((r) => r.json())
			.then((data: { customer: Me }) => {
				setMe(data.customer);
			})
			.catch(() => {
				setMe(null);
			});
	};

	useEffect(() => {
		loadMe(true);
		const onAuthChange = () => loadMe(false);
		window.addEventListener("auth-changed", onAuthChange);
		return () => window.removeEventListener("auth-changed", onAuthChange);
	}, []);

	const textInverse = "text-white/95 hover:text-white";
	const textDefault =
		"text-foreground hover:text-primary max-w-[min(28vw,7.5rem)] sm:max-w-[10rem]";

	if (me === undefined) {
		return (
			<span
				className={`inline-block h-4 w-16 rounded animate-pulse shrink-0 ${
					inverse ? "bg-white/15" : "bg-border"
				}`}
				aria-hidden
			/>
		);
	}

	if (me) {
		const name = displayName(me);
		return (
			<Link
				href="/account"
				title={me.email ?? name}
				className={`inline-flex min-w-0 items-center gap-1.5 font-medium truncate shrink-0 ${
					inverse
						? `${textInverse} max-w-[min(38vw,9rem)] sm:max-w-[11rem]`
						: textDefault
				}`}
			>
				<User
					className={`h-3.5 w-3.5 shrink-0 opacity-80 ${inverse ? "" : "text-text-secondary"}`}
					aria-hidden
				/>
				<span className="truncate text-[12px] md:text-[13px]">{name}</span>
			</Link>
		);
	}

	return (
		<button
			type="button"
			onClick={() => openLogin()}
			className={`font-medium text-left truncate shrink-0 text-[12px] md:text-[13px] ${
				inverse ? textInverse : `${textDefault} text-text-secondary hover:text-foreground`
			}`}
		>
			Sign in
		</button>
	);
}
