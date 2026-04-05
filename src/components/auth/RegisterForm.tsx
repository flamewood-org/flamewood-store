"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type RegisterFormProps = {
	variant?: "page" | "modal";
	callbackUrl?: string;
	onSwitchToLogin?: () => void;
	onRegisteredNeedsLogin?: () => void;
	onSuccess?: () => void;
};

export function RegisterForm({
	variant = "page",
	callbackUrl = "/account",
	onSwitchToLogin,
	onRegisteredNeedsLogin,
	onSuccess,
}: RegisterFormProps) {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const isModal = variant === "modal";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const phoneDigits = phone.replace(/\D/g, "");
		if (!phone.trim() || phoneDigits.length < 8) {
			setError("Enter a valid phone number (at least 8 digits).");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					phone,
					password,
				}),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				setError(
					typeof data.error === "string" ? data.error : "Could not register.",
				);
				return;
			}
			if (data.needsLogin) {
				onRegisteredNeedsLogin?.();
				return;
			}
			const safe =
				callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
					? callbackUrl
					: "/account";
			router.push(safe);
			router.refresh();
			window.dispatchEvent(new Event("auth-changed"));
			onSuccess?.();
		} catch {
			setError("Something went wrong. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={isModal ? "w-full" : "w-full max-w-md mx-auto"}>
			{!isModal && (
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-foreground tracking-tight">
						Create account
					</h1>
					<p className="text-text-secondary text-sm mt-2">
						Register to track orders and check out faster.
					</p>
				</div>
			)}

			{isModal && (
				<p className="text-text-secondary text-sm mb-5">
					Register to track orders and check out faster.
				</p>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-3">
					<div>
						<label className="block text-sm font-semibold text-foreground mb-1.5">
							First name
						</label>
						<Input
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							autoComplete="given-name"
							className={isModal ? "h-11" : "h-12"}
						/>
					</div>
					<div>
						<label className="block text-sm font-semibold text-foreground mb-1.5">
							Last name
						</label>
						<Input
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							autoComplete="family-name"
							className={isModal ? "h-11" : "h-12"}
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-semibold text-foreground mb-1.5">
						Email
					</label>
					<Input
						type="email"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className={isModal ? "h-11" : "h-12"}
					/>
				</div>
				<div>
					<label className="block text-sm font-semibold text-foreground mb-1.5">
						Phone <span className="text-error">*</span>
					</label>
					<Input
						type="tel"
						inputMode="tel"
						autoComplete="tel"
						placeholder="98765 43210"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						className={isModal ? "h-11" : "h-12"}
					/>
					<p className="text-xs text-text-tertiary mt-1">
						Used for delivery and order updates.
					</p>
				</div>
				<div>
					<label className="block text-sm font-semibold text-foreground mb-1.5">
						Password
					</label>
					<Input
						type="password"
						autoComplete="new-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						minLength={5}
						className={isModal ? "h-11" : "h-12"}
					/>
					<p className="text-xs text-text-tertiary mt-1">
						At least 5 characters.
					</p>
				</div>
				{error && (
					<p className="text-sm text-error font-medium" role="alert">
						{error}
					</p>
				)}
				<Button
					type="submit"
					className={`w-full font-semibold ${isModal ? "h-11" : "h-12"}`}
					disabled={loading}
				>
					{loading ? "Creating…" : "Create account"}
				</Button>
			</form>

			<p
				className={`text-center text-sm text-text-secondary ${isModal ? "mt-5" : "mt-8"}`}
			>
				Already have an account?{" "}
				{onSwitchToLogin ? (
					<button
						type="button"
						onClick={onSwitchToLogin}
						className="font-semibold text-primary hover:underline"
					>
						Sign in
					</button>
				) : (
					<button
						type="button"
						onClick={() => {
							const q = new URLSearchParams();
							q.set("auth", "login");
							if (
								callbackUrl?.startsWith("/") &&
								!callbackUrl.startsWith("//")
							) {
								q.set("callbackUrl", callbackUrl);
							}
							router.push(`/?${q.toString()}`);
						}}
						className="font-semibold text-primary hover:underline"
					>
						Sign in
					</button>
				)}
			</p>
		</div>
	);
}
