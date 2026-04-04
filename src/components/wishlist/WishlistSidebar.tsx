"use client";

import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartContext } from "@/store/CartContext";
import { useWishlistContext } from "@/store/WishlistContext";

export function WishlistSidebar() {
	const { items, isOpen, closeWishlist, removeFromWishlist, itemCount } =
		useWishlistContext();
	const { addToCart } = useCartContext();
	const [isClosing, setIsClosing] = useState(false);
	const [addingId, setAddingId] = useState<string | null>(null);

	// Lock body scroll when sidebar is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsClosing(false);
			closeWishlist();
		}, 250);
	};

	const handleAddToCart = async (variantId: string, productId: string) => {
		setAddingId(productId);
		try {
			await addToCart(variantId, 1);
			removeFromWishlist(productId);
		} catch (error) {
			console.error("Failed to add to cart:", error);
		} finally {
			setAddingId(null);
		}
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Overlay */}
			<button
				type="button"
				className={`sidebar-overlay border-0 bg-transparent p-0 cursor-pointer ${isClosing ? "closing" : ""}`}
				onClick={handleClose}
				onKeyDown={(e) => e.key === "Escape" && handleClose()}
				aria-label="Close wishlist"
			/>

			{/* Panel */}
			<div
				className={`sidebar-panel ${isClosing ? "closing" : ""}`}
				role="dialog"
				aria-modal="true"
				aria-label="Wishlist"
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-5 border-b border-border">
					<div className="flex items-center gap-3">
						<Heart className="w-5 h-5 text-primary" />
						<h2 className="text-base font-semibold text-foreground">Wishlist</h2>
						{itemCount > 0 && (
							<span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-primary text-white text-[11px] font-medium">
								{itemCount}
							</span>
						)}
					</div>
					<button
						type="button"
						onClick={handleClose}
						className="p-2 text-text-secondary hover:text-foreground hover:bg-surface-alt rounded-full transition-all duration-200"
						aria-label="Close wishlist"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 py-12 sm:py-16">
							<div className="w-20 h-20 rounded-full bg-surface-alt flex items-center justify-center mb-6">
								<Heart className="w-10 h-10 text-text-tertiary" />
							</div>
							<h3 className="text-lg font-semibold text-foreground mb-2">
								Your wishlist is empty
							</h3>
							<p className="text-text-secondary text-sm text-center mb-8">
								Save your favorite products here for easy access later.
							</p>
							<Link href="/products/all" onClick={handleClose}>
								<Button className="px-8">Explore Products →</Button>
							</Link>
						</div>
					) : (
						<div className="p-4 space-y-3">
							{items.map((product) => {
								const firstVariant = product.variants[0];
								const lowestPrice = Math.min(
									...product.variants.map((v) => v.price),
								);

								return (
									<div
										key={product.id}
										className="flex gap-4 p-3 rounded-xl bg-surface-alt/50 hover:bg-surface-alt transition-colors duration-200 group"
									>
										{/* Image */}
										<div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-alt">
											{product.images[0] ? (
												<Image
													src={product.images[0].url}
													alt={product.images[0].altText || product.title}
													fill
													className="object-cover"
													sizes="80px"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center">
													<Heart className="w-6 h-6 text-text-tertiary" />
												</div>
											)}
										</div>

										{/* Info */}
										<div className="flex-1 min-w-0">
											<Link
												href={`/products/all/${product.handle}`}
												className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
												onClick={handleClose}
											>
												{product.title}
											</Link>
											<p className="text-sm font-semibold text-primary mt-1 tabular-nums">
												₹{lowestPrice.toFixed(2)}
											</p>

											{/* Add to Cart */}
											{firstVariant && (
												<button
													type="button"
													onClick={() =>
														handleAddToCart(firstVariant.id, product.id)
													}
													disabled={addingId === product.id}
													className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-50"
												>
													<ShoppingCart className="w-3.5 h-3.5" />
													{addingId === product.id
														? "Adding..."
														: "Move to Cart"}
												</button>
											)}
										</div>

										{/* Remove */}
										<button
											type="button"
											onClick={() => removeFromWishlist(product.id)}
											className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-all opacity-0 group-hover:opacity-100 self-start"
											aria-label="Remove from wishlist"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								);
							})}
						</div>
					)}
				</div>

				{/* Footer */}
				{items.length > 0 && (
					<div className="border-t border-border px-4 sm:px-6 py-4 sm:py-5 bg-surface shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
						<p className="text-center text-xs text-text-tertiary">
							{itemCount} item{itemCount !== 1 ? "s" : ""} saved
						</p>
					</div>
				)}
			</div>
		</>
	);
}
