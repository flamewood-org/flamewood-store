import { redirect } from "next/navigation";
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

	const params = new URLSearchParams();
	params.set("auth", "login");
	if (
		sp.callbackUrl?.startsWith("/") &&
		!sp.callbackUrl.startsWith("//")
	) {
		params.set("callbackUrl", sp.callbackUrl);
	}
	if (sp.registered) {
		params.set("registered", "1");
	}
	redirect(`/?${params.toString()}`);
}
