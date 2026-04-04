import { redirect } from "next/navigation";
import { getCustomerFromCookies } from "@/lib/auth-server";

export default async function RegisterPage() {
	const customer = await getCustomerFromCookies();
	if (customer) redirect("/account");
	redirect("/?auth=register");
}
