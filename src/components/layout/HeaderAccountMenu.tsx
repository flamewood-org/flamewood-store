"use client";

import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuthModal } from "@/store/AuthModalContext";

type Me = {
	email: string | null;
	firstName: string | null;
	lastName: string | null;
} | null;

export function HeaderAccountMenu() {
	const router = useRouter();
	const { openLogin } = useAuthModal();
	const [me, setMe] = useState<Me | undefined>(undefined);
	const [menuOpen, setMenuOpen] = useState(false);
	const [logoutOpen, setLogoutOpen] = useState(false);
	const [signingOut, setSigningOut] = useState(false);
	const wrapRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		if (!menuOpen) return;
		const onDoc = (e: MouseEvent) => {
			if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, [menuOpen]);

	useEffect(() => {
		if (!menuOpen && !logoutOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				if (logoutOpen) setLogoutOpen(false);
				else setMenuOpen(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menuOpen, logoutOpen]);

	useEffect(() => {
		if (!logoutOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [logoutOpen]);

	const handleLogout = async () => {
		setSigningOut(true);
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			window.dispatchEvent(new Event("auth-changed"));
			setLogoutOpen(false);
			setMenuOpen(false);
			router.push("/");
			router.refresh();
		} finally {
			setSigningOut(false);
		}
	};

	if (me === undefined) {
		return (
			<span
				className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-alt/80 animate-pulse"
				aria-hidden
			/>
		);
	}

	return (
		<>
			<div className="relative shrink-0" ref={wrapRef}>
				<button
					type="button"
					onClick={() => setMenuOpen((o) => !o)}
					className={`relative flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-alt hover:text-primary ${
						menuOpen ? "bg-surface-alt text-primary" : ""
					}`}
					aria-label="Account menu"
					aria-expanded={menuOpen}
					aria-haspopup="true"
				>
					<User className="h-[22px] w-[22px]" strokeWidth={1.75} />
				</button>

				{menuOpen && (
					<div
						className="absolute right-0 top-full z-[60] mt-1.5 min-w-[11rem] rounded-xl border border-border/80 bg-surface py-1 shadow-[var(--shadow-card),0_8px_24px_rgba(0,0,0,0.08)]"
						role="menu"
					>
						{me ? (
							<>
								<Link
									href="/account"
									role="menuitem"
									className="block px-3.5 py-2.5 text-sm font-medium text-foreground hover:bg-surface-alt transition-colors"
									onClick={() => setMenuOpen(false)}
								>
									Account
								</Link>
								<div className="my-1 h-px bg-border/80" aria-hidden />
								<button
									type="button"
									role="menuitem"
									className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm font-medium text-foreground hover:bg-surface-alt transition-colors"
									onClick={() => {
										setMenuOpen(false);
										setLogoutOpen(true);
									}}
								>
									<LogOut
										className="h-4 w-4 shrink-0 text-text-secondary"
										aria-hidden
									/>
									Log out
								</button>
							</>
						) : (
							<button
								type="button"
								role="menuitem"
								className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm font-medium text-foreground hover:bg-surface-alt transition-colors"
								onClick={() => {
									setMenuOpen(false);
									openLogin();
								}}
							>
								<LogIn
									className="h-4 w-4 shrink-0 text-text-secondary"
									aria-hidden
								/>
								Login
							</button>
						)}
					</div>
				)}
			</div>

			{logoutOpen && (
				<div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
					<button
						type="button"
						className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px] animate-fade-in"
						aria-label="Cancel"
						onClick={() => setLogoutOpen(false)}
					/>
					<div
						role="dialog"
						aria-modal="true"
						aria-labelledby="logout-confirm-title"
						className="relative z-[1] w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card),0_24px_64px_rgba(0,0,0,0.12)] animate-scale-in"
					>
						<h2
							id="logout-confirm-title"
							className="text-lg font-semibold text-foreground"
						>
							Sign out?
						</h2>
						<p className="mt-2 text-sm text-text-secondary leading-relaxed">
							You will need to sign in again to access your orders and account
							details.
						</p>
						<div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
							<Button
								variant="outline"
								onClick={() => setLogoutOpen(false)}
								disabled={signingOut}
							>
								Cancel
							</Button>
							<Button
								variant="danger"
								onClick={() => void handleLogout()}
								disabled={signingOut}
							>
								{signingOut ? "Signing out…" : "Log out"}
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
