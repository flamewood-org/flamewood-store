"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterForm() {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ firstName, lastName, email, password }),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				setError(
					typeof data.error === "string" ? data.error : "Could not register.",
				);
				return;
			}
			if (data.needsLogin) {
				router.push("/login?registered=1");
				return;
			}
			router.push("/account");
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
					Create account
				</h1>
				<p className="text-text-secondary text-sm mt-2">
					Register to track orders and check out faster.
				</p>
			</div>

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
							className="h-12"
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
							className="h-12"
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
						className="h-12"
					/>
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
						className="h-12"
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
					className="w-full h-12 font-bold"
					disabled={loading}
				>
					{loading ? "Creating…" : "Create account"}
				</Button>
			</form>

			<p className="text-center text-sm text-text-secondary mt-8">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-semibold text-primary hover:underline"
				>
					Sign in
				</Link>
			</p>
		</div>
	);
}
