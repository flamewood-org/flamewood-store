import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { getCustomerFromCookies } from "@/lib/auth-server";

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl?: string; registered?: string }>;
}) {
	const sp = await searchParams;
	const customer = await getCustomerFromCookies();
	if (customer) {
		const dest =
			sp.callbackUrl?.startsWith("/") && !sp.callbackUrl.startsWith("//")
				? sp.callbackUrl
				: "/account";
		redirect(dest);
	}

	const callbackUrl =
		sp.callbackUrl?.startsWith("/") && !sp.callbackUrl.startsWith("//")
			? sp.callbackUrl
			: "/account";

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
			<Link href="/" className="mb-10 text-xl font-black tracking-tight">
				<span className="text-primary">Flame</span>
				<span className="text-secondary">Wood</span>
			</Link>
			{sp.registered && (
				<p className="text-sm text-success font-medium mb-6 -mt-4 text-center max-w-md">
					Account created — please sign in with your new password.
				</p>
			)}
			<div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">
				<LoginForm callbackUrl={callbackUrl} />
			</div>
		</div>
	);
}
