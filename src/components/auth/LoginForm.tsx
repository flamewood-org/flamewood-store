"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
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
		} catch {
			setError("Something went wrong. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold text-foreground tracking-tight">
					Sign in
				</h1>
				<p className="text-text-secondary text-sm mt-2">
					Use the email and password for your FlameWood store account.
				</p>
			</div>

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
						className="h-12"
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
						className="h-12"
					/>
				</div>
				{error && (
					<p className="text-sm text-error font-medium" role="alert">
						{error}
					</p>
				)}
				<Button
					type="submit"
					className="w-full h-12 font-bold"
					disabled={loading}
				>
					{loading ? "Signing in…" : "Sign in"}
				</Button>
			</form>

			<p className="text-center text-sm text-text-secondary mt-8">
				No account?{" "}
				<Link
					href="/register"
					className="font-semibold text-primary hover:underline"
				>
					Create one
				</Link>
			</p>
		</div>
	);
}
