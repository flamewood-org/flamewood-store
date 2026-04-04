"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Me = {
	email: string | null;
	firstName: string | null;
	lastName: string | null;
} | null;

export function HeaderAccountLink() {
	const [me, setMe] = useState<Me | undefined>(undefined);

	useEffect(() => {
		let cancelled = false;
		fetch("/api/auth/me")
			.then((r) => r.json())
			.then((data: { customer: Me }) => {
				if (!cancelled) setMe(data.customer);
			})
			.catch(() => {
				if (!cancelled) setMe(null);
			});
		return () => {
			cancelled = true;
		};
	}, []);

	if (me === undefined) {
		return (
			<span
				className="inline-block w-24 h-4 rounded bg-white/10 animate-pulse"
				aria-hidden
			/>
		);
	}

	if (me) {
		const short =
			[me.firstName, me.lastName].filter(Boolean).join(" ") ||
			me.email?.split("@")[0] ||
			"Account";
		return (
			<Link
				href="/account"
				className="hover:text-white transition-colors font-medium truncate max-w-[140px]"
			>
				{short}
			</Link>
		);
	}

	return (
		<Link
			href="/login"
			className="hover:text-white transition-colors font-medium"
		>
			Login / Register
		</Link>
	);
}
