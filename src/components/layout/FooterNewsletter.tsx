"use client";

import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";

function isValidEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

type FooterNewsletterProps = {
	className?: string;
};

/**
 * Footer newsletter signup — friendly copy, validation, success state, privacy link.
 * Wire `onSubmit` to your ESP or API when ready; currently simulates success for UX.
 */
export function FooterNewsletter({ className = "" }: FooterNewsletterProps) {
	const id = useId();
	const emailId = `${id}-email`;
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const resetForm = () => {
		setStatus("idle");
		setEmail("");
		setErrorMessage("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage("");

		if (!email.trim()) {
			setStatus("error");
			setErrorMessage("Enter your email so we know where to send updates.");
			return;
		}
		if (!isValidEmail(email)) {
			setStatus("error");
			setErrorMessage(
				"That doesn’t look like a valid email — double-check and try again.",
			);
			return;
		}

		setStatus("loading");
		// Replace with fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) })
		await new Promise((r) => setTimeout(r, 700));
		setStatus("success");
		setEmail("");
	};

	if (status === "success") {
		return (
			<div
				className={`rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-6 sm:p-7 md:p-8 ${className}`}
				role="status"
				aria-live="polite"
			>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
					<div className="flex gap-3 min-w-0">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-200">
							<CheckCircle2 className="h-5 w-5" aria-hidden />
						</div>
						<div className="min-w-0 space-y-1">
							<p className="text-base font-semibold text-white">
								You&apos;re on the list
							</p>
							<p className="text-sm leading-relaxed text-white/75">
								Thanks for subscribing. We&apos;ll only email when we have
								something useful — restocks, seasonal tips, or offers.
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={resetForm}
						className="shrink-0 self-start rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/35 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
					>
						Subscribe another address
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`relative overflow-hidden rounded-2xl border border-white/12 bg-linear-to-br from-white/[0.12] via-white/[0.05] to-transparent p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-7 md:p-8 ${className}`}
		>
			<div
				className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/25 blur-3xl"
				aria-hidden
			/>
			<div className="relative grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end lg:gap-10">
				<div className="min-w-0 space-y-3">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-light">
						<Sparkles className="h-3.5 w-3.5" aria-hidden />
						Newsletter
					</div>
					<h2 className="text-pretty text-xl font-semibold tracking-tight text-white sm:text-2xl">
						Get deals &amp; restock alerts
					</h2>
					<p className="max-w-md text-sm leading-relaxed text-white/65">
						Short emails when it matters — new stock, bulk pricing, and seasonal
						tips. No spam, unsubscribe in one click.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="min-w-0 space-y-3" noValidate>
					<div className="space-y-2">
						<label
							htmlFor={emailId}
							className="block text-xs font-medium text-white/55"
						>
							Email address
						</label>
						<div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
							<input
								id={emailId}
								name="email"
								type="email"
								autoComplete="email"
								inputMode="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									if (status === "error") {
										setStatus("idle");
										setErrorMessage("");
									}
								}}
								disabled={status === "loading"}
								aria-invalid={status === "error"}
								aria-describedby={errorMessage ? `${id}-error` : `${id}-hint`}
								className="min-h-[48px] w-full flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-[15px] text-white placeholder:text-white/35 transition-colors focus:border-primary-light/50 focus:outline-none focus:ring-2 focus:ring-primary-light/25 disabled:opacity-60"
							/>
							<Button
								type="submit"
								variant="secondary"
								disabled={status === "loading"}
								className="min-h-[48px] shrink-0 gap-2 border-0 bg-primary px-6 text-[15px] font-semibold text-white hover:bg-primary-light sm:min-w-[9.5rem]"
							>
								{status === "loading" ? (
									<>
										<Loader2
											className="h-4 w-4 shrink-0 animate-spin"
											aria-hidden
										/>
										<span className="sr-only">Subscribing</span>
										<span aria-hidden>Joining…</span>
									</>
								) : (
									"Subscribe"
								)}
							</Button>
						</div>
						<p
							id={`${id}-hint`}
							className="text-[11px] leading-snug text-white/40"
						>
							We respect your inbox. Read how we use data in our{" "}
							<Link
								href="/privacy"
								className="font-medium text-primary-light/90 underline decoration-white/20 underline-offset-2 hover:text-white hover:decoration-white/40"
							>
								Privacy policy
							</Link>
							.
						</p>
						{status === "error" && errorMessage ? (
							<p
								id={`${id}-error`}
								role="alert"
								className="text-sm font-medium text-accent-light/95"
							>
								{errorMessage}
							</p>
						) : null}
					</div>
				</form>
			</div>
		</div>
	);
}
