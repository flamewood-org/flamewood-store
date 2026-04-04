import { NextRequest, NextResponse } from "next/server";
import { getCategoryFromProduct } from "@/lib/product-category";
import { getProducts } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
	if (q.length < 2) {
		return NextResponse.json({ results: [] });
	}

	try {
		const products = await getProducts(14, q);
		const results = products.map((p) => {
			const img = p.images[0];
			const v = p.variants[0];
			const category = getCategoryFromProduct(p);
			return {
				id: p.id,
				title: p.title,
				handle: p.handle,
				href: `/products/${category}/${p.handle}`,
				imageUrl: img?.url ?? null,
				price: v ? v.price : 0,
				vendor: p.vendor ?? null,
			};
		});
		return NextResponse.json({ results });
	} catch {
		return NextResponse.json(
			{ error: "Search temporarily unavailable" },
			{ status: 503 },
		);
	}
}
