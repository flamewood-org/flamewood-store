"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MarketplaceProductCard } from "@/components/product/MarketplaceProductCard";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { useProducts } from "@/hooks/useShopify";
import type { Product } from "@/types/product";

export default function ProductGrid({ category }: { category: string }) {
	const searchParams = useSearchParams();
	const search = searchParams.get("search")?.trim() ?? "";

	const shopifyQuery = search.length > 0 ? search : undefined;
	const { data: products, isLoading } = useProducts(50, shopifyQuery);

	const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
		null,
	);
	const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

	const handleQuickView = (product: Product) => {
		setQuickViewProduct(product);
		setIsQuickViewOpen(true);
	};

	const filteredProducts = useMemo(() => {
		if (!products || products.length === 0) return [];

		return products.filter((product: Product) => {
			const productType = product.productType?.toLowerCase() || "";
			const tags = product.tags.map((t: string) => t.toLowerCase());

			if (category === "all") return true;

			if (category === "firewood") {
				return (
					productType.includes("firewood") ||
					tags.some((tag: string) => tag.includes("firewood"))
				);
			}
			if (category === "coconut") {
				return (
					productType.includes("coconut") ||
					productType.includes("coir") ||
					tags.some((tag: string) => tag.includes("coconut"))
				);
			}
			if (category === "biomass") {
				return (
					productType.includes("biomass") ||
					productType.includes("wood powder") ||
					tags.some((tag: string) => tag.includes("biomass"))
				);
			}

			return true;
		});
	}, [products, category]);

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
				{Array.from({ length: 8 }, (_, i) => (
					<ProductCardSkeleton key={`skeleton-${i}`} />
				))}
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className="text-center py-10 bg-surface-alt/80 rounded-xl border border-border/60">
				<p className="text-sm font-medium text-foreground mb-1">
					{search ? "No matches" : "No products"}
				</p>
				<p className="text-text-secondary text-sm">
					{search
						? "Try different keywords or clear search to see the full catalog."
						: "Nothing listed in this category yet."}
				</p>
			</div>
		);
	}

	if (filteredProducts.length === 0) {
		return (
			<div className="text-center py-10 bg-surface-alt/80 rounded-xl border border-border/60">
				<p className="text-sm font-medium text-foreground mb-1">No matches</p>
				<p className="text-text-secondary text-sm">
					{search
						? "Nothing in this category for that search. Try all products or another keyword."
						: "Try another category or view all products."}
				</p>
			</div>
		);
	}

	return (
		<>
			{search && (
				<p className="text-sm text-text-secondary mb-4">
					Showing results for{" "}
					<span className="font-medium text-foreground">
						&ldquo;{search}&rdquo;
					</span>
					{" · "}
					<Link
						href={`/products/${category}`}
						className="text-primary font-medium hover:underline"
					>
						Clear search
					</Link>
				</p>
			)}
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
				{filteredProducts.map((product: Product) => (
					<MarketplaceProductCard
						key={product.id}
						product={product}
						onQuickView={() => handleQuickView(product)}
					/>
				))}
			</div>

			<QuickViewModal
				product={quickViewProduct}
				isOpen={isQuickViewOpen}
				onClose={() => setIsQuickViewOpen(false)}
			/>
		</>
	);
}
