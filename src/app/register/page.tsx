import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getCustomerFromCookies } from "@/lib/auth-server";

export default async function RegisterPage() {
	const customer = await getCustomerFromCookies();
	if (customer) redirect("/account");

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
			<Link href="/" className="mb-10 text-xl font-black tracking-tight">
				<span className="text-primary">Flame</span>
				<span className="text-secondary">Wood</span>
			</Link>
			<div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">
				<RegisterForm />
			</div>
		</div>
	);
}
