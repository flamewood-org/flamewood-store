"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type LoginFormProps = {
	callbackUrl: string;
	variant?: "page" | "modal";
	showRegisteredBanner?: boolean;
	onSwitchToRegister?: () => void;
	onSuccess?: () => void;
};

export function LoginForm({
	callbackUrl,
	variant = "page",
	showRegisteredBanner,
	onSwitchToRegister,
	onSuccess,
}: LoginFormProps) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				setError(
					typeof data.error === "string" ? data.error : "Sign in failed.",
				);
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

	const isModal = variant === "modal";

	return (
		<div className={isModal ? "w-full" : "w-full max-w-md mx-auto"}>
			{!isModal && (
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-foreground tracking-tight">
						Sign in
					</h1>
					<p className="text-text-secondary text-sm mt-2">
						Use the email and password for your FlameWood store account.
					</p>
				</div>
			)}

			{isModal && showRegisteredBanner && (
				<p className="text-sm text-success font-medium mb-4" role="status">
					Account created — sign in with your new password.
				</p>
			)}

			{!isModal && showRegisteredBanner && (
				<p className="text-sm text-success font-medium mb-6 text-center">
					Account created — please sign in with your new password.
				</p>
			)}

			{isModal && !showRegisteredBanner && (
				<p className="text-text-secondary text-sm mb-5">
					Use your FlameWood store email and password.
				</p>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
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
						Password
					</label>
					<Input
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className={isModal ? "h-11" : "h-12"}
					/>
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
					{loading ? "Signing in…" : "Sign in"}
				</Button>
			</form>

			<p
				className={`text-center text-sm text-text-secondary ${isModal ? "mt-5" : "mt-8"}`}
			>
				No account?{" "}
				{onSwitchToRegister ? (
					<button
						type="button"
						onClick={onSwitchToRegister}
						className="font-semibold text-primary hover:underline"
					>
						Create one
					</button>
				) : (
					<button
						type="button"
						onClick={() => {
							const q = new URLSearchParams();
							q.set("auth", "register");
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
						Create one
					</button>
				)}
			</p>
		</div>
	);
}
