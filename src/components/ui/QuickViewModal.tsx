"use client";

import { Heart, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartContext } from "@/store/CartContext";
import { useWishlistContext } from "@/store/WishlistContext";
import type { Product } from "@/types/product";

interface QuickViewModalProps {
	product: Product | null;
	isOpen: boolean;
	onClose: () => void;
}

export function QuickViewModal({
	product,
	isOpen,
	onClose,
}: QuickViewModalProps) {
	const { addToCart, isLoading: isAddingToCart } = useCartContext();
	const { addToWishlist, removeFromWishlist, isInWishlist } =
		useWishlistContext();

	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);

	// Reset state when product changes
	useEffect(() => {
		if (isOpen) {
			setQuantity(1);
			setActiveImageIndex(0);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen, product]);

	if (!isOpen || !product) return null;

	const selectedVariant = product.variants[0];
	const inWishlist = isInWishlist(product.id);

	const handleAddToCart = async () => {
		if (!selectedVariant) return;
		try {
			await addToCart(selectedVariant.id, quantity);
			onClose();
		} catch (error) {
			console.error("Failed to add to cart:", error);
		}
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-contain">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div className="relative my-auto w-full max-w-4xl max-h-[min(92dvh,900px)] overflow-hidden rounded-2xl bg-white shadow-xl animate-scale-in flex flex-col md:flex-row">
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
				>
					<X className="w-5 h-5 text-gray-700" />
				</button>

				{/* Left: Image Gallery */}
				<div className="w-full md:w-1/2 min-h-[220px] h-[38vh] sm:h-[42vh] md:h-auto md:min-h-[min(500px,55vh)] bg-surface-alt relative p-4 sm:p-6 flex flex-col gap-4">
					<div className="relative flex-1 bg-white rounded-2xl overflow-hidden">
						{product.images[activeImageIndex] ? (
							<Image
								src={product.images[activeImageIndex].url}
								alt={product.images[activeImageIndex].altText || product.title}
								fill
								className="object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center">
								<ShoppingBag className="w-12 h-12 text-text-tertiary" />
							</div>
						)}
					</div>

					{/* Thumbnails */}
					{product.images.length > 1 && (
						<div className="flex gap-3 overflow-x-auto no-scrollbar shrink-0 pb-1">
							{product.images.slice(0, 4).map((image, idx) => (
								<button
									key={image.url}
									type="button"
									onClick={() => setActiveImageIndex(idx)}
									className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
										idx === activeImageIndex
											? "border-primary"
											: "border-transparent opacity-60 hover:opacity-100"
									}`}
								>
									<Image
										src={image.url}
										alt={product.title}
										fill
										className="object-cover"
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Right: Product Info */}
				<div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[min(52vh,420px)] md:max-h-[min(92dvh,900px)] flex flex-col min-h-0">
					<div className="flex flex-wrap gap-2 mb-3">
						{product.tags.slice(0, 2).map((tag) => (
							<span
								key={tag}
								className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wide"
							>
								{tag}
							</span>
						))}
					</div>

					<h2 className="text-xl sm:text-2xl font-semibold text-foreground leading-snug mb-2">
						{product.title}
					</h2>

					<div className="flex items-end gap-3 pb-5 border-b border-border">
						<div className="text-2xl font-semibold text-primary tabular-nums">
							₹{selectedVariant.price.toFixed(2)}
						</div>
						{selectedVariant.compareAtPrice && (
							<div className="text-sm text-text-secondary line-through font-medium mb-1">
								₹{selectedVariant.compareAtPrice.toFixed(2)}
							</div>
						)}
					</div>

					<div className="py-6 flex-1 text-text-secondary text-sm leading-relaxed line-clamp-4">
						{product.description ||
							"Premium quality product sourced directly from natural environments. Prepared perfectly for the best outcome."}
					</div>

					<div className="space-y-4 pt-4 border-t border-border mt-auto">
						<div className="flex items-center gap-4">
							<div className="flex items-center border border-border rounded-xl bg-surface-alt flex-shrink-0 h-12">
								<button
									type="button"
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="w-10 h-12 flex items-center justify-center hover:text-primary transition-colors disabled:opacity-50"
									disabled={quantity <= 1}
								>
									-
								</button>
								<span className="w-8 text-center font-medium text-sm">
									{quantity}
								</span>
								<button
									type="button"
									onClick={() => setQuantity(quantity + 1)}
									className="w-10 h-12 flex items-center justify-center hover:text-primary transition-colors"
								>
									+
								</button>
							</div>

							<Button
								onClick={handleAddToCart}
								disabled={!selectedVariant || isAddingToCart}
								className="flex-1 h-12 rounded-lg font-medium"
							>
								{isAddingToCart ? "Adding..." : "Add to Cart"}
							</Button>

							<button
								type="button"
								onClick={() =>
									inWishlist
										? removeFromWishlist(product.id)
										: addToWishlist(product)
								}
								className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl border transition-all ${
									inWishlist
										? "bg-red-50 border-red-200 text-red-500"
										: "border-border text-text-secondary hover:border-primary hover:text-primary"
								}`}
							>
								<Heart
									className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
								/>
							</button>
						</div>

						<Link
							href={`/products/all/${product.handle}`}
							className="block text-center text-sm font-semibold text-primary hover:text-primary-dark underline underline-offset-4 pt-2"
						>
							View Full Details
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
