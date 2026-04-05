"use client";

import { ArrowRight, CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { CartItemSkeleton } from "@/components/ui/Skeleton";
import { calculateShipping } from "@/lib/shipping";
import { useCartContext } from "@/store/CartContext";
import type { ShippingEstimate } from "@/types/cart";

export default function CartPage() {
	const { cart, isLoading, updateQuantity, removeFromCart } = useCartContext();

	const [pincode, setPincode] = useState("");
	const [shippingEstimate, setShippingEstimate] =
		useState<ShippingEstimate | null>(null);
	const [showShippingError, setShowShippingError] = useState(false);

	const handleCheckShipping = () => {
		if (!pincode || pincode.length !== 6 || !cart) {
			setShowShippingError(true);
			return;
		}

		const estimate = calculateShipping(cart.totalWeight, pincode);
		setShippingEstimate(estimate);
		setShowShippingError(false);
	};

	const handleCheckout = () => {
		if (!cart?.checkoutUrl) return;

		// Redirect to Shopify checkout
		window.location.href = cart.checkoutUrl;
	};

	if (isLoading) {
		return (
			<div className="w-full min-w-0 py-12">
				<h1 className="text-2xl font-semibold text-foreground mb-6">
					Shopping Cart
				</h1>
				<div className="space-y-4">
					{Array.from({ length: 3 }, (_, i) => (
						<CartItemSkeleton key={`cart-skeleton-${i}`} />
					))}
				</div>
			</div>
		);
	}

	if (!cart || cart.items.length === 0) {
		return (
			<div className="min-h-screen min-w-0 overflow-x-hidden bg-background">
				{/* Breadcrumb */}
				<div className="bg-surface border-b border-border">
					<div className="w-full min-w-0 py-3 sm:py-4">
						<nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
							<Link
								href="/"
								className="text-text-secondary hover:text-primary transition-colors"
							>
								Home
							</Link>
							<span className="text-text-secondary">/</span>
							<span className="text-foreground font-medium">Shopping Cart</span>
						</nav>
					</div>
				</div>

				<div className="w-full min-w-0 py-16">
					<div className="text-center py-16 max-w-2xl mx-auto">
						<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary/10 to-secondary/10 mb-6">
							<svg
								className="w-12 h-12 text-primary opacity-50"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<h1 className="text-2xl font-semibold text-foreground mb-3">
							Your cart is empty
						</h1>
						<p className="text-text-secondary mb-8 text-lg">
							Looks like you haven&apos;t added any products yet.
						</p>
						<Link href="/products/all">
							<Button size="lg" className="px-6">
								Start Shopping →
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const finalTotal =
		shippingEstimate && !shippingEstimate.requiresManualQuote
			? cart.subtotal + shippingEstimate.cost
			: cart.subtotal;

	return (
		<div className="min-h-screen min-w-0 overflow-x-hidden bg-background">
			{/* Breadcrumb */}
			<div className="bg-surface border-b border-border">
				<div className="w-full min-w-0 py-3 sm:py-4">
					<nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
						<Link
							href="/"
							className="text-text-secondary hover:text-primary transition-colors"
						>
							Home
						</Link>
						<span className="text-text-secondary">/</span>
						<span className="text-foreground font-medium">Shopping Cart</span>
					</nav>
				</div>
			</div>

			<div className="w-full min-w-0 py-12">
				<h1 className="text-2xl font-semibold text-foreground mb-6">
					Shopping Cart
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-4">
						{cart.items.map((item) => (
							<Card
								key={item.id}
								className="p-5 group hover:shadow-md transition-all duration-200 border border-border hover:border-primary/15"
							>
								<div className="flex gap-6">
									{/* Product Image */}
									<div className="relative w-28 h-28 shrink-0 bg-surface-alt rounded-lg overflow-hidden border border-border/60">
										{item.image ? (
											<Image
												src={item.image.url}
												alt={item.image.altText || item.productTitle}
												fill
												className="object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										) : (
											<div className="flex items-center justify-center h-full text-text-secondary">
												<span className="text-3xl opacity-30">📦</span>
											</div>
										)}
									</div>

									{/* Product Info */}
									<div className="flex-1 min-w-0">
										<Link
											href={`/products/${item.productHandle}/${item.productHandle}`}
											className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 text-lg"
										>
											{item.productTitle}
										</Link>
										<p className="text-sm text-text-secondary mt-1.5">
											{item.variant.title}
										</p>
										<p className="text-xl font-semibold text-primary mt-3">
											₹{item.variant.price.toFixed(2)}
											<span className="text-sm text-text-secondary font-normal ml-1">
												/ kg
											</span>
										</p>
									</div>

									{/* Quantity Controls */}
									<div className="flex flex-col items-end justify-between">
										<button
											type="button"
											onClick={() => removeFromCart(item.id)}
											className="p-2 text-error hover:text-error/80 hover:bg-error/5 rounded-lg transition-all duration-200"
											aria-label="Remove item"
										>
											<Trash2 className="w-5 h-5" />
										</button>

										<div className="flex items-center gap-2 bg-surface-alt rounded-lg p-1 border border-border/50">
											<Button
												variant="ghost"
												size="sm"
												onClick={() =>
													updateQuantity(
														item.id,
														Math.max(1, item.quantity - 1),
													)
												}
												disabled={item.quantity <= 1}
												className="h-8 w-8 p-0 hover:bg-surface"
											>
												<Minus className="w-4 h-4" />
											</Button>
											<span className="w-10 text-center font-semibold text-base">
												{item.quantity}
											</span>
											<Button
												variant="ghost"
												size="sm"
												onClick={() =>
													updateQuantity(item.id, item.quantity + 1)
												}
												className="h-8 w-8 p-0 hover:bg-surface"
											>
												<Plus className="w-4 h-4" />
											</Button>
										</div>
									</div>
								</div>
							</Card>
						))}
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<Card className="p-5 sticky top-24 shadow-sm border border-border">
							<h2 className="text-lg font-semibold text-foreground mb-5">
								Order Summary
							</h2>

							<div className="space-y-4 mb-6">
								<div className="flex justify-between text-foreground pb-3 border-b border-border">
									<span className="text-text-secondary">
										Subtotal ({cart.itemCount} items)
									</span>
									<span className="font-semibold">
										₹{cart.subtotal.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-text-secondary text-sm">
									<span>Total Weight</span>
									<span className="font-medium">
										{cart.totalWeight.toFixed(1)} kg
									</span>
								</div>

								{shippingEstimate && !shippingEstimate.requiresManualQuote && (
									<div className="flex justify-between text-foreground pb-3 border-b border-border">
										<span className="text-text-secondary">Shipping</span>
										<span className="font-semibold">
											₹{shippingEstimate.cost.toFixed(2)}
										</span>
									</div>
								)}

								{shippingEstimate?.requiresManualQuote && (
									<div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
										<p className="text-warning font-semibold text-sm">
											Custom quote required
										</p>
										<p className="text-text-secondary text-xs mt-1">
											We&apos;ll contact you with shipping details
										</p>
									</div>
								)}

								<div className="border-t border-border pt-4">
									<div className="flex justify-between text-lg font-semibold text-foreground">
										<span>Total</span>
										<span className="text-primary">
											₹{finalTotal.toFixed(2)}
										</span>
									</div>
								</div>
							</div>

							{/* Shipping Estimator */}
							<div className="mb-6 p-4 bg-surface-alt rounded-lg border border-border/50">
								<label className="block text-sm font-semibold text-foreground mb-3">
									Estimate Shipping
								</label>
								<div className="flex gap-2">
									<Input
										placeholder="Enter pincode"
										value={pincode}
										onChange={(e) => setPincode(e.target.value)}
										error={showShippingError ? "Invalid pincode" : undefined}
										className="rounded-lg"
									/>
									<Button onClick={handleCheckShipping} className="rounded-lg">
										Check
									</Button>
								</div>

								{shippingEstimate && (
									<div className="mt-3 p-3 bg-surface rounded-lg border border-border">
										<div className="flex items-start gap-3">
											<CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
											<div>
												<p className="font-semibold text-foreground text-sm">
													{shippingEstimate.region}
												</p>
												{!shippingEstimate.requiresManualQuote ? (
													<p className="text-xs text-text-secondary mt-1">
														{shippingEstimate.estimatedDays} days • ₹
														{shippingEstimate.cost}
													</p>
												) : (
													<p className="text-xs text-warning mt-1">
														Freight quote needed
													</p>
												)}
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Checkout Button */}
							<Button
								size="lg"
								fullWidth
								onClick={handleCheckout}
								className="flex items-center justify-center gap-2 py-3 font-medium"
							>
								Proceed to Checkout
								<ArrowRight className="w-5 h-5" />
							</Button>

							<div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-secondary">
								<svg
									className="w-4 h-4"
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
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
