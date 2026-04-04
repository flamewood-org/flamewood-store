"use client";

import { Heart, ShoppingBag, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.from({ length: 8 }, (_, i) => (
					<ProductCardSkeleton key={`skeleton-${i}`} />
				))}
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className="text-center py-16 bg-surface-alt rounded-2xl">
				<div className="text-6xl mb-4">🌿</div>
				<h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
				<p className="text-text-secondary text-base">
					We couldn't find any products in this category.
				</p>
			</div>
		);
	}

	// Filter products by category (simplified - in production use collections)
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

		return true; // Show all if category doesn't match
	});

	if (filteredProducts.length === 0) {
		return (
			<div className="text-center py-16 bg-surface-alt rounded-2xl">
				<div className="text-6xl mb-4">🌿</div>
				<h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
				<p className="text-text-secondary text-base">
					We couldn't find any products matching this category.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
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
			toggleWishlist(); // Show the sidebar when added
		}
	};

	return (
		<Card
			hover
			variant="flat"
			className="group flex flex-col h-full bg-white relative"
		>
			<Link
				href={`/products/${getCategoryFromProduct(product)}/${product.handle}`}
				className="flex-shrink-0 relative block"
			>
				<div className="relative aspect-[4/3] w-full bg-surface-alt overflow-hidden m-2 rounded-2xl w-[calc(100%-16px)]">
					{product.images && product.images.length > 0 ? (
						<Image
							src={product.images[0].url}
							alt={product.images[0].altText || product.title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						/>
					) : (
						<div className="flex items-center justify-center h-full text-text-secondary">
							<ShoppingBag className="w-12 h-12 opacity-20" />
						</div>
					)}
					
					{/* Overlay Gradient on Hover */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

					{/* Badges Container */}
					<div className="absolute top-3 left-3 flex flex-col gap-2">
						{hasDiscount && (
							<Badge className="bg-error hover:bg-error text-white border-0 font-bold px-2.5 py-1">
								-{Math.round(((firstVariant.compareAtPrice! - lowestPrice) / firstVariant.compareAtPrice!) * 100)}%
							</Badge>
						)}
					</div>

					{/* Quick Actions overlay */}
					<div className="absolute bottom-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onQuickView();
							}}
							className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 text-foreground hover:text-primary"
							aria-label="Quick view"
						>
							<Eye className="w-5 h-5" />
						</button>
						<button
							type="button"
							onClick={toggleWishlistHandler}
							className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
								inWishlist ? "bg-primary text-white" : "bg-white text-foreground hover:text-primary"
							}`}
							aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
						>
							<Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
						</button>
					</div>
				</div>
			</Link>

			<div className="p-5 flex flex-col flex-1">
				{/* Top info */}
				<div className="mb-auto">
					<div className="text-xs text-text-tertiary mb-1.5 uppercase font-bold tracking-wider">
						{product.vendor || getCategoryFromProduct(product)}
					</div>
					<Link href={`/products/${getCategoryFromProduct(product)}/${product.handle}`}>
						<h3 className="font-bold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors text-lg">
							{product.title}
						</h3>
					</Link>
				</div>

				{/* Bottom Actions mapping */}
				<div className="mt-4 pt-4 border-t border-border flex items-end justify-between gap-3">
					<div className="flex flex-col">
						{firstVariant && firstVariant.compareAtPrice && (
							<span className="text-xs text-text-tertiary line-through font-medium mb-0.5">
								₹{firstVariant.compareAtPrice.toFixed(2)}
							</span>
						)}
						<div className="flex items-baseline gap-1">
							<span className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
								₹{lowestPrice.toFixed(2)}
							</span>
						</div>
					</div>

					<button
						type="button"
						onClick={handleQuickAdd}
						disabled={isAddingToCart}
						className="bg-surface border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 disabled:opacity-50 disabled:pointer-events-none group/btn shadow-sm hover:shadow-md"
						aria-label="Add to cart"
					>
						{isAddingToCart ? (
							<span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
						) : (
							<ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
						)}
					</button>
				</div>
			</div>
		</Card>
	);
}

// Helper to determine category from product
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

	return "firewood"; // Default
}
