import { type NextRequest, NextResponse } from "next/server";

/**
 * PostalPinCode.in JSON API (India Post data).
 * Site: https://www.postalpincode.in — the public JSON endpoints are on `api.postalpincode.in`
 * (`/pincode/{6}`, `/postoffice/{name}`). Override with POSTAL_PINCODE_API_BASE if needed.
 */
function upstreamBase(): string {
	const raw = process.env.POSTAL_PINCODE_API_BASE?.trim();
	if (raw) {
		return raw.replace(/\/$/, "");
	}
	return "https://api.postalpincode.in";
}

/** Proxy PostalPinCode.in to avoid browser CORS and centralize errors. */
export async function GET(request: NextRequest) {
	const pincode = request.nextUrl.searchParams.get("pincode");
	const postoffice = request.nextUrl.searchParams.get("postoffice");
	const base = upstreamBase();

	try {
		if (pincode) {
			const normalized = pincode.replace(/\D/g, "");
			if (!/^\d{6}$/.test(normalized)) {
				return NextResponse.json(
					{ error: "pincode must be 6 digits" },
					{ status: 400 },
				);
			}
			const res = await fetch(`${base}/pincode/${normalized}`, {
				headers: { Accept: "application/json" },
				next: { revalidate: 86_400 },
			});
			if (!res.ok) {
				return NextResponse.json(
					{ error: "Pincode lookup failed" },
					{ status: 502 },
				);
			}
			const data = await res.json();
			return NextResponse.json(data);
		}

		if (postoffice) {
			const q = postoffice.trim();
			if (q.length < 3) {
				return NextResponse.json(
					{ error: "postoffice query must be at least 3 characters" },
					{ status: 400 },
				);
			}
			const res = await fetch(`${base}/postoffice/${encodeURIComponent(q)}`, {
				headers: { Accept: "application/json" },
				next: { revalidate: 86_400 },
			});
			if (!res.ok) {
				return NextResponse.json(
					{ error: "Post office search failed" },
					{ status: 502 },
				);
			}
			const data = await res.json();
			return NextResponse.json(data);
		}

		return NextResponse.json(
			{ error: "Provide pincode= or postoffice= query parameter" },
			{ status: 400 },
		);
	} catch (e) {
		console.error("pincode proxy:", e);
		return NextResponse.json(
			{ error: "Pincode service unavailable" },
			{ status: 503 },
		);
	}
}
