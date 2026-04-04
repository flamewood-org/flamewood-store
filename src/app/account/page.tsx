import { redirect } from "next/navigation";
import { AccountDashboard } from "@/components/account/AccountDashboard";
import { getCustomerFromCookies } from "@/lib/auth-server";

export default async function AccountPage() {
	const customer = await getCustomerFromCookies();
	if (!customer) {
		redirect("/login?callbackUrl=/account");
	}

	return <AccountDashboard customer={customer} />;
}
