"use client";

import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { generateCheckoutUrl } from "@/lib/shopify";
import { useCartContext } from "@/store/CartContext";

export function CartSidebar() {
	const {
		cart,
		isLoading,
		isOpen,
		closeCart,
		updateQuantity,
		removeFromCart,
	} = useCartContext();
	const [isClosing, setIsClosing] = useState(false);

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
			closeCart();
		}, 250);
	};

	const handleCheckout = () => {
		if (!cart?.id) return;
		const checkoutUrl = generateCheckoutUrl(cart.id);
		window.location.href = checkoutUrl;
	};

	if (!isOpen) return null;

	const isEmpty = !cart || cart.items.length === 0;

	return (
		<>
			{/* Overlay */}
			<div
				className={`sidebar-overlay ${isClosing ? "closing" : ""}`}
				onClick={handleClose}
				onKeyDown={(e) => e.key === "Escape" && handleClose()}
				aria-label="Close cart"
			/>

			{/* Panel */}
			<div
				className={`sidebar-panel ${isClosing ? "closing" : ""}`}
				role="dialog"
				aria-modal="true"
				aria-label="Shopping cart"
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-5 border-b border-border">
					<div className="flex items-center gap-3">
						<ShoppingBag className="w-5 h-5 text-primary" />
						<h2 className="text-lg font-bold text-foreground">
							Shopping Cart
						</h2>
						{cart && cart.itemCount > 0 && (
							<span className="inline-flex items-center justify-center h-6 min-w-[24px] px-1.5 rounded-full bg-primary text-white text-xs font-bold">
								{cart.itemCount}
							</span>
						)}
					</div>
					<button
						type="button"
						onClick={handleClose}
						className="p-2 text-text-secondary hover:text-foreground hover:bg-surface-alt rounded-full transition-all duration-200"
						aria-label="Close cart"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto">
					{isLoading ? (
						<div className="p-6 space-y-4">
							{Array.from({ length: 3 }, (_, i) => (
								<div
									key={`cart-skel-${i}`}
									className="flex gap-4"
								>
									<div className="w-20 h-20 rounded-lg animate-shimmer flex-shrink-0" />
									<div className="flex-1 space-y-2">
										<div className="h-4 w-3/4 rounded animate-shimmer" />
										<div className="h-3 w-1/2 rounded animate-shimmer" />
										<div className="h-8 w-24 rounded animate-shimmer" />
									</div>
								</div>
							))}
						</div>
					) : isEmpty ? (
						<div className="flex flex-col items-center justify-center h-full px-6 py-16">
							<div className="w-20 h-20 rounded-full bg-surface-alt flex items-center justify-center mb-6">
								<ShoppingBag className="w-10 h-10 text-text-tertiary" />
							</div>
							<h3 className="text-lg font-semibold text-foreground mb-2">
								Your cart is empty
							</h3>
							<p className="text-text-secondary text-sm text-center mb-8">
								Discover our premium products and add them to
								your cart.
							</p>
							<Link href="/products/all" onClick={handleClose}>
								<Button className="px-8">
									Start Shopping →
								</Button>
							</Link>
						</div>
					) : (
						<div className="p-4 space-y-3">
							{cart.items.map((item) => (
								<div
									key={item.id}
									className="flex gap-4 p-3 rounded-xl bg-surface-alt/50 hover:bg-surface-alt transition-colors duration-200 group"
								>
									{/* Image */}
									<div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-alt">
										{item.image ? (
											<Image
												src={item.image.url}
												alt={
													item.image.altText ||
													item.productTitle
												}
												fill
												className="object-cover"
												sizes="80px"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<ShoppingBag className="w-6 h-6 text-text-tertiary" />
											</div>
										)}
									</div>

									{/* Info */}
									<div className="flex-1 min-w-0">
										<Link
											href={`/products/all/${item.productHandle}`}
											className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
											onClick={handleClose}
										>
											{item.productTitle}
										</Link>
										<p className="text-xs text-text-secondary mt-0.5">
											{item.variant.title}
										</p>
										<p className="text-sm font-bold text-primary mt-1">
											₹
											{(
												item.variant.price *
												item.quantity
											).toFixed(2)}
										</p>

										{/* Quantity Controls */}
										<div className="flex items-center gap-1.5 mt-2">
											<button
												type="button"
												onClick={() =>
													updateQuantity(
														item.id,
														Math.max(
															1,
															item.quantity - 1,
														),
													)
												}
												disabled={item.quantity <= 1}
												className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
											>
												<Minus className="w-3 h-3" />
											</button>
											<span className="w-8 text-center text-sm font-semibold">
												{item.quantity}
											</span>
											<button
												type="button"
												onClick={() =>
													updateQuantity(
														item.id,
														item.quantity + 1,
													)
												}
												className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
											>
												<Plus className="w-3 h-3" />
											</button>
										</div>
									</div>

									{/* Remove */}
									<button
										type="button"
										onClick={() => removeFromCart(item.id)}
										className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-all opacity-0 group-hover:opacity-100 self-start"
										aria-label="Remove item"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				{!isEmpty && cart && (
					<div className="border-t border-border px-6 py-5 space-y-4 bg-surface">
						{/* Summary */}
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-text-secondary">
									Subtotal ({cart.itemCount} items)
								</span>
								<span className="font-semibold text-foreground">
									₹{cart.subtotal.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-text-secondary">
									Shipping
								</span>
								<span className="text-text-secondary text-xs">
									Calculated at checkout
								</span>
							</div>
							<div className="flex justify-between pt-2 border-t border-border">
								<span className="font-bold text-foreground">
									Total
								</span>
								<span className="font-bold text-xl text-primary">
									₹{cart.subtotal.toFixed(2)}
								</span>
							</div>
						</div>

						{/* Actions */}
						<div className="space-y-2">
							<Button
								size="lg"
								fullWidth
								onClick={handleCheckout}
								className="flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-shadow"
							>
								Checkout
								<ArrowRight className="w-4 h-4" />
							</Button>
							<Link
								href="/cart"
								onClick={handleClose}
								className="block"
							>
								<Button
									variant="ghost"
									size="md"
									fullWidth
									className="text-sm"
								>
									View Full Cart
								</Button>
							</Link>
						</div>

						{/* Trust Badge */}
						<div className="flex items-center justify-center gap-2 text-xs text-text-tertiary pt-1">
							<svg
								className="w-3.5 h-3.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
							Secure checkout powered by Shopify
						</div>
					</div>
				)}
			</div>
		</>
	);
}
