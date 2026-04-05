"use client";

import { Eye, Heart, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getCategoryFromProduct } from "@/lib/product-category";
import { useCartContext } from "@/store/CartContext";
import { useWishlistContext } from "@/store/WishlistContext";
import type { Product } from "@/types/product";

type MarketplaceProductCardProps = {
	product: Product;
	onQuickView?: () => void;
};

export function MarketplaceProductCard({
	product,
	onQuickView,
}: MarketplaceProductCardProps) {
	const { addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist } =
		useWishlistContext();
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

	const category = getCategoryFromProduct(product);
	const productHref = `/products/${category}/${product.handle}`;

	return (
		<div className="group flex flex-col bg-surface rounded-lg overflow-hidden border border-border/70 hover:border-border/90 transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]">
			<div className="relative">
				<Link
					href={productHref}
					className="relative block aspect-square bg-surface-alt overflow-hidden"
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

					{hasDiscount && firstVariant.compareAtPrice && (
						<div className="absolute top-3 left-3 z-[1]">
							<span className="inline-flex items-center rounded bg-error px-1.5 py-0.5 text-[10px] font-medium text-white">
								-
								{Math.round(
									((firstVariant.compareAtPrice - lowestPrice) /
										firstVariant.compareAtPrice) *
										100,
								)}
								%
							</span>
						</div>
					)}

					<div className="absolute top-3 right-3 flex flex-col gap-1.5 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-[2]">
						{onQuickView && (
							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onQuickView();
								}}
								className="w-8 h-8 bg-surface/95 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-foreground hover:text-primary transition-colors"
								aria-label="Quick view"
							>
								<Eye className="w-3.5 h-3.5" />
							</button>
						)}
						<button
							type="button"
							onClick={toggleWishlistHandler}
							className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
								inWishlist
									? "bg-primary text-white"
									: "bg-surface/95 backdrop-blur-sm text-foreground hover:text-primary"
							}`}
							aria-label={
								inWishlist ? "Remove from wishlist" : "Add to wishlist"
							}
						>
							<Heart
								className={`w-3.5 h-3.5 ${inWishlist ? "fill-current" : ""}`}
							/>
						</button>
					</div>
				</Link>

				<button
					type="button"
					onClick={handleQuickAdd}
					disabled={isAddingToCart || !firstVariant}
					className="absolute bottom-2 right-2 z-[2] flex size-8 items-center justify-center rounded-md bg-primary text-white text-xs transition-colors hover:bg-primary-dark disabled:opacity-50"
					aria-label="Add to cart"
				>
					{isAddingToCart ? (
						<span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
					) : (
						<Plus className="w-5 h-5 stroke-[2.5]" />
					)}
				</button>
			</div>

			<div className="px-3.5 pt-3 pb-4 flex flex-col gap-1 flex-1">
				<p className="text-[11px] text-text-tertiary tracking-wide font-normal truncate">
					{product.vendor || category}
				</p>

				<Link href={productHref}>
					<h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
						{product.title}
					</h3>
				</Link>

				<div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-1.5 pr-11">
					<span
						className={`text-[15px] font-medium tabular-nums ${
							hasDiscount ? "text-primary" : "text-foreground"
						}`}
					>
						₹{lowestPrice.toFixed(2)}
					</span>
					{firstVariant?.compareAtPrice && hasDiscount && (
						<span className="text-sm text-error line-through tabular-nums">
							₹{firstVariant.compareAtPrice.toFixed(2)}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
