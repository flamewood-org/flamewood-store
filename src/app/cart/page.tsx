"use client";

import { ArrowRight, CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { CartPageSkeleton } from "@/components/layout/PageSkeletons";
import { calculateShipping } from "@/lib/shipping";
import { useCartContext } from "@/store/CartContext";
import { useDeliveryLocation } from "@/store/DeliveryLocationContext";
import type { ShippingEstimate } from "@/types/cart";

export default function CartPage() {
	const { cart, isLoading, updateQuantity, removeFromCart } = useCartContext();
	const { location, openModal } = useDeliveryLocation();
	const [pincode, setPincode] = useState(location?.pincode || "");
	const [shippingEstimate, setShippingEstimate] =
		useState<ShippingEstimate | null>(null);
	const [showShippingError, setShowShippingError] = useState(false);

	// Sync with global location context
	useEffect(() => {
		if (location?.pincode) {
			setPincode(location.pincode);
			if (cart) {
				const estimate = calculateShipping(cart.totalWeight, location.pincode);
				setShippingEstimate(estimate);
			}
		}
	}, [location, cart]);

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
		return <CartPageSkeleton />;
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

	const shippingCost =
		shippingEstimate && !shippingEstimate.requiresManualQuote
			? shippingEstimate.cost
			: 0;
	const finalTotal = cart.subtotal + shippingCost;

	return (
		<div className="min-h-screen min-w-0 overflow-x-hidden bg-background pb-24 lg:pb-0">
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
								className="p-3 sm:p-5 group hover:shadow-md transition-all duration-200 border border-border hover:border-primary/15"
							>
								<div className="flex gap-4 sm:gap-6">
									{/* Product Image */}
									<div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 bg-surface-alt rounded-xl overflow-hidden border border-border/60">
										{item.image ? (
											<Image
												src={item.image.url}
												alt={item.image.altText || item.productTitle}
												fill
												className="object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										) : (
											<div className="flex items-center justify-center h-full text-text-secondary">
												<span className="text-2xl sm:text-3xl opacity-30">📦</span>
											</div>
										)}
									</div>

									{/* Product Info */}
									<div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
										<div>
											<Link
												href={`/products/${item.productHandle}/${item.productHandle}`}
												className="font-bold text-foreground hover:text-primary transition-colors line-clamp-1 sm:line-clamp-2 text-base sm:text-lg lg:text-xl"
											>
												{item.productTitle}
											</Link>
											{item.variant.title !== "Default Title" && (
												<p className="text-[11px] sm:text-xs text-text-secondary mt-1 uppercase tracking-wider font-semibold opacity-70">
													{item.variant.title}
												</p>
											)}
											<p className="text-base sm:text-lg font-bold text-primary mt-2">
												₹{item.variant.price.toFixed(2)}
												<span className="text-[10px] sm:text-xs text-text-secondary font-normal ml-1">
													/ kg
												</span>
											</p>
										</div>

										<div className="flex items-center gap-2 mt-3 sm:hidden">
											<div className="flex items-center gap-1 bg-surface-alt rounded-lg p-0.5 border border-border/50">
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
													className="h-7 w-7 p-0 hover:bg-surface"
												>
													<Minus className="w-3 h-3" />
												</Button>
												<span className="w-8 text-center font-bold text-xs">
													{item.quantity}
												</span>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														updateQuantity(item.id, item.quantity + 1)
													}
													className="h-7 w-7 p-0 hover:bg-surface"
												>
													<Plus className="w-3 h-3" />
												</Button>
											</div>
										</div>
									</div>

									{/* Quantity Controls (Desktop) & Trash */}
									<div className="flex flex-col items-end justify-between py-0.5">
										<button
											type="button"
											onClick={() => removeFromCart(item.id)}
											className="p-2 text-error/60 hover:text-error hover:bg-error/5 rounded-full transition-all duration-200"
											aria-label="Remove item"
										>
											<Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
										</button>

										<div className="hidden sm:flex items-center gap-2 bg-surface-alt rounded-xl p-1 border border-border/50">
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
											<span className="w-10 text-center font-bold text-base">
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
								<div className="flex justify-between items-end border-b border-border/50 pb-4">
									<div className="flex flex-col">
										<span className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">
											Total Amount
										</span>
										<span className="text-[10px] text-success font-bold uppercase">
											Free Delivery Included
										</span>
									</div>
									<div className="text-right">
										<p className="text-3xl font-black text-primary tracking-tighter tabular-nums">
											₹{finalTotal.toFixed(0)}
										</p>
										<p className="text-[10px] text-text-tertiary">Includes GST</p>
									</div>
								</div>

								<div className="flex justify-between text-[11px] text-text-tertiary">
									<span>Package Weight ({cart.items.length} items)</span>
									<span className="font-semibold uppercase">
										{cart.totalWeight.toFixed(1)} KG
									</span>
								</div>
							</div>

							{/* Shipping Estimator */}
							<div className="mb-6 p-4 bg-surface-alt rounded-lg border border-border/50">
								<div className="flex items-center justify-between mb-3 px-0.5">
									<label className="text-sm font-semibold text-foreground">
										Shipping To
									</label>
									{location && (
										<button
											type="button"
											onClick={openModal}
											className="text-[10px] text-primary font-bold uppercase hover:underline"
										>
											Change
										</button>
									)}
								</div>

								{location ? (
									<div className="p-3 bg-surface rounded-lg border border-border mb-3">
										<div className="flex items-start gap-3">
											<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
												<span className="text-xs">📍</span>
											</div>
											<div>
												<p className="font-bold text-foreground text-sm leading-none">
													{location.pincode}
												</p>
												<p className="text-[11px] text-text-secondary mt-1 line-clamp-1">
													{location.area}, {location.district}
												</p>
											</div>
										</div>
									</div>
								) : (
									<div className="flex gap-2 mb-3">
										<Input
											placeholder="Enter pincode"
											value={pincode}
											onChange={(e) => setPincode(e.target.value)}
											error={showShippingError ? "Invalid pincode" : undefined}
											className="rounded-lg h-10 text-sm"
										/>
										<Button
											onClick={handleCheckShipping}
											className="rounded-lg h-10 px-4"
										>
											Check
										</Button>
									</div>
								)}

								{shippingEstimate && (
									<div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
										<div className="flex items-start gap-3">
											<CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
											<div className="flex-1">
												<div className="flex items-center justify-between">
													<p className="font-bold text-foreground text-xs uppercase tracking-wider">
														{shippingEstimate.region}
													</p>
													<p className="font-black text-success text-sm uppercase">
														{!shippingEstimate.requiresManualQuote
															? "FREE"
															: "Quote Needed"}
													</p>
												</div>
												<p className="text-[10px] text-text-secondary mt-0.5">
													Estimated delivery: {shippingEstimate.estimatedDays}{" "}
													days
												</p>
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
								Secure Checkout SSL Encrypted
							</div>
						</Card>
					</div>
				</div>
			</div>

			{/* Mobile Checkout Bar */}
			<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
				<div className="flex items-center justify-between gap-4">
					<div className="flex flex-col">
						<p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest leading-none mb-1">
							Total Payable
						</p>
						<p className="text-xl font-black text-primary tracking-tighter leading-none">
							₹{finalTotal.toFixed(2)}
						</p>
					</div>
					<Button
						onClick={handleCheckout}
						className="flex-1 h-12 gap-2 font-bold shadow-lg shadow-primary/20"
					>
						Checkout <ArrowRight className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
