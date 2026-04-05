"use client";

import { Headphones, Truck, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
	return "Member";
}

export function HomeHeroPromoBar() {
	const { openRegister } = useAuthModal();
	const [me, setMe] = useState<Me | undefined>(undefined);

	const loadMe = useCallback((withSkeleton: boolean) => {
		if (withSkeleton) setMe(undefined);
		fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
			.then((r) => r.json())
			.then((data: { customer: Me }) => {
				setMe(data.customer);
			})
			.catch(() => {
				setMe(null);
			});
	}, []);

	useEffect(() => {
		loadMe(true);
		const onAuthChange = () => loadMe(false);
		window.addEventListener("auth-changed", onAuthChange);
		return () => window.removeEventListener("auth-changed", onAuthChange);
	}, [loadMe]);

	const accountColumn =
		me === undefined ? (
			<div className="flex flex-1 min-w-0 gap-3 px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-4 lg:px-8 first:pt-4 md:first:pt-4">
				<div className="shrink-0 pt-0.5 text-secondary">
					<UserPlus
						className="h-6 w-6 sm:h-7 sm:w-7"
						strokeWidth={1.5}
						aria-hidden
					/>
				</div>
				<div className="min-w-0 flex-1 space-y-2 pt-0.5">
					<div className="h-3.5 w-[90%] max-w-sm rounded bg-border animate-pulse" />
					<div className="h-3.5 w-[70%] max-w-xs rounded bg-border animate-pulse" />
				</div>
			</div>
		) : me ? (
			<div className="flex flex-1 min-w-0 gap-3 px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-4 lg:px-8 first:pt-4 md:first:pt-4">
				<div className="shrink-0 pt-0.5 text-secondary">
					<User
						className="h-6 w-6 sm:h-7 sm:w-7"
						strokeWidth={1.5}
						aria-hidden
					/>
				</div>
				<p className="min-w-0 text-[13px] sm:text-sm leading-relaxed text-text-secondary">
					Signed in as{" "}
					<strong className="font-semibold text-foreground">
						{displayName(me)}
					</strong>
					. View orders, addresses, and profile in{" "}
					<Link
						href="/account"
						className="font-semibold text-primary hover:text-primary-dark underline-offset-2 hover:underline"
					>
						My account
					</Link>
					.
				</p>
			</div>
		) : (
			<div className="flex flex-1 min-w-0 gap-3 px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-4 lg:px-8 first:pt-4 md:first:pt-4">
				<div className="shrink-0 pt-0.5 text-secondary">
					<UserPlus
						className="h-6 w-6 sm:h-7 sm:w-7"
						strokeWidth={1.5}
						aria-hidden
					/>
				</div>
				<p className="min-w-0 text-[13px] sm:text-sm leading-relaxed text-text-secondary">
					Open a{" "}
					<strong className="font-semibold text-foreground">
						free account
					</strong>{" "}
					for faster checkout, saved addresses, and heads-up on restocks and
					deals.{" "}
					<button
						type="button"
						onClick={() => openRegister({ callbackUrl: "/account" })}
						className="font-semibold text-primary hover:text-primary-dark underline-offset-2 hover:underline"
					>
						Register
					</button>
				</p>
			</div>
		);

	return (
		<section
			className="w-full min-w-0 border-b border-border bg-surface"
			aria-label="Delivery and account information"
		>
			<div className="w-full min-w-0 px-0 py-1 sm:py-2">
				<div className="flex flex-col divide-y divide-border md:flex-row md:divide-x md:divide-y-0">
					{accountColumn}

					<div className="flex flex-1 min-w-0 gap-3 px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-4 lg:px-8">
						<div className="shrink-0 pt-0.5 text-secondary">
							<Truck
								className="h-6 w-6 sm:h-7 sm:w-7"
								strokeWidth={1.5}
								aria-hidden
							/>
						</div>
						<p className="min-w-0 text-[13px] sm:text-sm leading-relaxed text-text-secondary">
							<strong className="font-semibold text-foreground">
								Nationwide delivery
							</strong>{" "}
							with tracked carriers. Set your{" "}
							<strong className="font-semibold text-foreground">pincode</strong>{" "}
							in the header to confirm service to your area before you buy.
						</p>
					</div>

					<div className="flex flex-1 min-w-0 gap-3 px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-4 lg:px-8 last:pb-4 md:last:pb-4">
						<div className="shrink-0 pt-0.5 text-secondary">
							<Headphones
								className="h-6 w-6 sm:h-7 sm:w-7"
								strokeWidth={1.5}
								aria-hidden
							/>
						</div>
						<p className="min-w-0 text-[13px] sm:text-sm leading-relaxed text-text-secondary">
							<strong className="font-semibold text-foreground">Track</strong>{" "}
							your order or{" "}
							<strong className="font-semibold text-foreground">contact</strong>{" "}
							us for bulk quotes and product questions — we&apos;re here to
							help.{" "}
							<Link
								href="/track-order"
								className="font-semibold text-primary hover:text-primary-dark underline-offset-2 hover:underline"
							>
								Track order
							</Link>
							{" · "}
							<Link
								href="/contact"
								className="font-semibold text-primary hover:text-primary-dark underline-offset-2 hover:underline"
							>
								Contact
							</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
