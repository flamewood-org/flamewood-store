"use client";

import { useState } from "react";
import { MarketplaceProductCard } from "@/components/product/MarketplaceProductCard";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { useProducts } from "@/hooks/useShopify";
import type { Product } from "@/types/product";

export default function ProductGrid({ category }: { category: string }) {
	const { data: products, isLoading } = useProducts(50);
	const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
		null,
	);
	const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

	const handleQuickView = (product: Product) => {
		setQuickViewProduct(product);
		setIsQuickViewOpen(true);
	};

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
				{Array.from({ length: 8 }, (_, i) => (
					<ProductCardSkeleton key={`skeleton-${i}`} />
				))}
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className="text-center py-16 bg-surface-alt rounded-2xl">
				<div className="text-5xl mb-4">🌿</div>
				<h3 className="text-lg font-semibold text-foreground mb-1.5">
					No products found
				</h3>
				<p className="text-text-secondary text-sm">
					We couldn&apos;t find any products in this category.
				</p>
			</div>
		);
	}

	const filteredProducts = products.filter((product: Product) => {
		const productType = product.productType?.toLowerCase() || "";
		const tags = product.tags.map((t: string) => t.toLowerCase());

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

	if (filteredProducts.length === 0) {
		return (
			<div className="text-center py-16 bg-surface-alt rounded-2xl">
				<div className="text-5xl mb-4">🌿</div>
				<h3 className="text-lg font-semibold text-foreground mb-1.5">
					No products found
				</h3>
				<p className="text-text-secondary text-sm">
					We couldn&apos;t find any products matching this category.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
