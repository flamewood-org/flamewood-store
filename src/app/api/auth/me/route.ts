import { NextResponse } from "next/server";
import { getCustomerFromCookies } from "@/lib/auth-server";

export async function GET() {
	const customer = await getCustomerFromCookies();
	if (!customer) {
		return NextResponse.json({ customer: null });
	}
	return NextResponse.json({
		customer: {
			email: customer.email,
			firstName: customer.firstName,
			lastName: customer.lastName,
		},
	});
}
