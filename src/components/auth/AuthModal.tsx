"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { SITE_LOGO_PNG } from "@/lib/site-config";
import { useAuthModal } from "@/store/AuthModalContext";

export function AuthModal() {
	const {
		open,
		view,
		close,
		callbackUrl,
		registeredBanner,
		openLogin,
		openRegister,
	} = useAuthModal();

	useEffect(() => {
		if (open) {
			const prev = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = prev;
			};
		}
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, close]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
			<button
				type="button"
				className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px] animate-fade-in"
				aria-label="Close"
				onClick={close}
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="auth-modal-title"
				className="relative w-full max-w-md max-h-[min(90vh,720px)] overflow-y-auto rounded-2xl border border-border bg-surface shadow-[var(--shadow-card),0_24px_64px_rgba(0,0,0,0.12)] animate-fade-in"
			>
				<div className="sticky top-0 z-10 border-b border-border/80 bg-surface/95 backdrop-blur-sm px-4 py-4 sm:px-5 sm:py-5">
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0 flex-1 space-y-3">
							<Image
								src={SITE_LOGO_PNG}
								alt=""
								width={320}
								height={80}
								className="h-12 w-auto max-w-[min(100%,280px)] object-contain object-left sm:h-14 sm:max-w-[300px]"
								priority
							/>
							<h2
								id="auth-modal-title"
								className="text-[15px] font-semibold text-foreground"
							>
								{view === "login" ? "Sign in" : "Create account"}
							</h2>
						</div>
						<button
							type="button"
							onClick={close}
							className="shrink-0 p-2 rounded-lg text-text-secondary hover:bg-surface-alt hover:text-foreground transition-colors"
							aria-label="Close"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				<div className="p-5 sm:p-6">
					{view === "login" ? (
						<LoginForm
							callbackUrl={callbackUrl}
							variant="modal"
							showRegisteredBanner={registeredBanner}
							onSwitchToRegister={() => openRegister({ callbackUrl })}
							onSuccess={close}
						/>
					) : (
						<RegisterForm
							variant="modal"
							callbackUrl={callbackUrl}
							onSwitchToLogin={() =>
								openLogin({ callbackUrl, registered: false })
							}
							onRegisteredNeedsLogin={() =>
								openLogin({ callbackUrl, registered: true })
							}
							onSuccess={close}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
