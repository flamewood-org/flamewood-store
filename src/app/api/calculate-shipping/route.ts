import { type NextRequest, NextResponse } from "next/server";
import { calculateShipping } from "@/lib/shipping";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { totalWeight, pincode } = body;

		if (!totalWeight || !pincode) {
			return NextResponse.json(
				{ error: "Total weight and pincode are required" },
				{ status: 400 },
			);
		}

		const shippingEstimate = calculateShipping(totalWeight, pincode);

		return NextResponse.json(shippingEstimate);
	} catch (error) {
		console.error("Shipping calculation error:", error);
		return NextResponse.json(
			{ error: "Failed to calculate shipping" },
			{ status: 500 },
		);
	}
}
