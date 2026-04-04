"use client";

import { Heart, ShoppingBag, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { useCartContext } from "@/store/CartContext";
import { useProducts } from "@/hooks/useShopify";
import { useWishlistContext } from "@/store/WishlistContext";
import type { Product } from "@/types/product";

export default function ProductGrid({ category }: { category: string }) {
	const { data: products, isLoading } = useProducts(50);
	const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
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
				<h3 className="text-lg font-semibold text-foreground mb-1.5">No products found</h3>
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
		} else if (category === "coconut") {
			return (
				productType.includes("coconut") ||
				productType.includes("coir") ||
				tags.some((tag: string) => tag.includes("coconut"))
			);
		} else if (category === "biomass") {
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
				<h3 className="text-lg font-semibold text-foreground mb-1.5">No products found</h3>
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
					<ProductCard
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

function ProductCard({ product, onQuickView }: { product: Product; onQuickView: () => void }) {
	const { addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist } = useWishlistContext();
	const { addToCart } = useCartContext();

	const lowestPrice = Math.min(...product.variants.map((v) => v.price));
	const firstVariant = product.variants[0];
	const hasDiscount =
		firstVariant?.compareAtPrice && firstVariant.compareAtPrice > lowestPrice;

	const inWishlist = isInWishlist(product.id);
	const [isAddingToCart, setIsAddingToCart] = useState(false);

	const handleQuickAdd = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!firstVariant) return;

		setIsAddingToCart(true);
		try {
			await addToCart(firstVariant.id, 1);
		} catch (error) {
			console.error("Failed to add to cart:", error);
		} finally {
			setIsAddingToCart(false);
		}
	};

	const toggleWishlistHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (inWishlist) {
			removeFromWishlist(product.id);
		} else {
			addToWishlist(product);
			toggleWishlist();
		}
	};

	return (
		<div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border/60 hover:border-border hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300">
			{/* Image Area */}
			<Link
				href={`/products/${getCategoryFromProduct(product)}/${product.handle}`}
				className="relative block aspect-square bg-[#f8f7f5] overflow-hidden"
			>
				{product.images && product.images.length > 0 ? (
					<Image
						src={product.images[0].url}
						alt={product.images[0].altText || product.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
					/>
				) : (
					<div className="flex items-center justify-center h-full text-text-tertiary">
						<ShoppingBag className="w-10 h-10 opacity-20" />
					</div>
				)}

				{/* Discount badge */}
				<div className="absolute top-3 left-3 flex flex-col gap-2">
					{hasDiscount && firstVariant.compareAtPrice && (
						<Badge className="bg-error hover:bg-error text-white border-0 text-[11px] font-medium px-2 py-0.5">
							-{Math.round(((firstVariant.compareAtPrice - lowestPrice) / firstVariant.compareAtPrice) * 100)}%
						</Badge>
					)}
				</div>

				{/* Hover action cluster */}
				<div className="absolute top-3 right-3 flex flex-col gap-1.5 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onQuickView();
						}}
						className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-foreground hover:text-primary transition-colors"
						aria-label="Quick view"
					>
						<Eye className="w-3.5 h-3.5" />
					</button>
					<button
						type="button"
						onClick={toggleWishlistHandler}
						className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
							inWishlist
								? "bg-primary text-white"
								: "bg-white/90 backdrop-blur-sm text-foreground hover:text-primary"
						}`}
						aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
					>
						<Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-current" : ""}`} />
					</button>
				</div>

				{/* Add-to-cart strip — slides up on hover */}
				<div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
					<button
						type="button"
						onClick={handleQuickAdd}
						disabled={isAddingToCart}
						className="w-full flex items-center justify-center gap-2 bg-foreground/90 backdrop-blur-sm text-white text-[13px] font-medium py-3 hover:bg-primary transition-colors disabled:opacity-60"
					>
						{isAddingToCart ? (
							<span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
						) : (
							<ShoppingBag className="w-3.5 h-3.5" />
						)}
						{isAddingToCart ? "Adding…" : "Add to Cart"}
					</button>
				</div>
			</Link>

			{/* Info Area */}
			<div className="px-4 py-3.5 flex flex-col gap-1">
				<p className="text-[11px] text-text-tertiary uppercase tracking-widest font-medium truncate">
					{product.vendor || getCategoryFromProduct(product)}
				</p>

				<Link href={`/products/${getCategoryFromProduct(product)}/${product.handle}`}>
					<h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
						{product.title}
					</h3>
				</Link>

				<div className="flex items-baseline gap-2 mt-1">
					<span className="text-base font-semibold text-foreground">
						₹{lowestPrice.toFixed(2)}
					</span>
					{firstVariant?.compareAtPrice && (
						<span className="text-xs text-text-tertiary line-through">
							₹{firstVariant.compareAtPrice.toFixed(2)}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

function getCategoryFromProduct(product: Product): string {
	const productType = product.productType?.toLowerCase() || "";
	const tags = product.tags.map((t: string) => t.toLowerCase());

	if (
		productType.includes("firewood") ||
		tags.some((tag: string) => tag.includes("firewood"))
	) {
		return "firewood";
	} else if (
		productType.includes("coconut") ||
		productType.includes("coir") ||
		tags.some((tag: string) => tag.includes("coconut"))
	) {
		return "coconut";
	} else if (
		productType.includes("biomass") ||
		productType.includes("wood powder") ||
		tags.some((tag: string) => tag.includes("biomass"))
	) {
		return "biomass";
	}

	return "firewood";
}
