"use client";

import {
	CheckCircle2,
	ChevronRight,
	Heart,
	MapPin,
	ShieldCheck,
	ShoppingBag,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { WeightSelector } from "@/components/ui/WeightSelector";
import { useProduct } from "@/hooks/useShopify";
import { calculateShipping } from "@/lib/shipping";
import { useCartContext } from "@/store/CartContext";
import { useWishlistContext } from "@/store/WishlistContext";
import type { ShippingEstimate } from "@/types/cart";

export default function ProductDetailPage() {
	const params = useParams();
	const router = useRouter();
	const handle = params.handle as string;

	const { data: product, isLoading } = useProduct(handle);
	const { addToCart, isLoading: isAddingToCart } = useCartContext();
	const { isInWishlist, addToWishlist, removeFromWishlist } =
		useWishlistContext();

	const [selectedVariantId, setSelectedVariantId] = useState<string>("");
	const [selectedWeight, setSelectedWeight] = useState<string>("");
	const [quantity, setQuantity] = useState(1);
	const [pincode, setPincode] = useState("");
	const [shippingEstimate, setShippingEstimate] =
		useState<ShippingEstimate | null>(null);
	const [showShippingError, setShowShippingError] = useState(false);
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [showStickyBar, setShowStickyBar] = useState(false);
	const addToCartRef = useRef<HTMLDivElement>(null);

	// Initialize selected variant when product loads
	useEffect(() => {
		if (product && product.variants.length > 0 && !selectedVariantId) {
			setSelectedVariantId(product.variants[0].id);
			setSelectedWeight(product.variants[0].title);
		}
	}, [product, selectedVariantId]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setShowStickyBar(!entry.isIntersecting);
			},
			{ threshold: 0 },
		);

		if (addToCartRef.current) {
			observer.observe(addToCartRef.current);
		}

		return () => observer.disconnect();
	}, []);

	if (isLoading) {
		return (
			<div className="w-full min-w-0 py-12">
				<div className="animate-pulse">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<div className="space-y-4">
							<div className="aspect-square bg-surface-alt rounded-2xl" />
							<div className="flex gap-4">
								<div className="w-20 h-20 bg-surface-alt rounded-xl" />
								<div className="w-20 h-20 bg-surface-alt rounded-xl" />
								<div className="w-20 h-20 bg-surface-alt rounded-xl" />
							</div>
						</div>
						<div className="py-8">
							<div className="w-24 h-6 bg-surface-alt rounded-full mb-6" />
							<div className="h-10 bg-surface-alt rounded-lg mb-4 w-3/4" />
							<div className="h-6 bg-surface-alt rounded-lg mb-8 w-1/2" />
							<div className="h-24 bg-surface-alt rounded-2xl mb-8" />
							<div className="h-16 bg-surface-alt rounded-2xl mb-8" />
							<div className="h-32 bg-surface-alt rounded-2xl" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
				<div className="w-20 h-20 bg-surface-alt rounded-full flex items-center justify-center mb-6">
					<ShoppingBag className="w-10 h-10 text-text-tertiary" />
				</div>
				<h1 className="text-xl font-semibold text-foreground mb-2">
					Product not found
				</h1>
				<p className="text-text-secondary mb-8 text-center max-w-md">
					We couldn't find the product you're looking for. It may have been
					removed or the URL is incorrect.
				</p>
				<Button size="lg" onClick={() => router.push("/products/all")}>
					Continue Shopping
				</Button>
			</div>
		);
	}

	const weightOptions = product.variants.map((variant) => ({
		value: variant.title,
		label: variant.title,
		variantId: variant.id,
		price: variant.price,
	}));

	const selectedVariant = product.variants.find(
		(v) => v.id === selectedVariantId,
	);
	const totalPrice = selectedVariant ? selectedVariant.price * quantity : 0;
	const inWishlist = isInWishlist(product.id);

	const handleWeightChange = (weight: string, variantId: string) => {
		setSelectedWeight(weight);
		setSelectedVariantId(variantId);
	};

	const handleCheckShipping = async () => {
		if (!pincode || pincode.length !== 6) {
			setShowShippingError(true);
			return;
		}

		if (!selectedVariant) return;

		const totalWeight = selectedVariant.weight * quantity;
		const estimate = calculateShipping(totalWeight, pincode);
		setShippingEstimate(estimate);
		setShowShippingError(false);
	};

	const handleAddToCart = async () => {
		if (!selectedVariantId) return;
		try {
			await addToCart(selectedVariantId, quantity);
		} catch (error) {
			console.error("Failed to add to cart:", error);
		}
	};

	return (
		<div className="min-h-screen min-w-0 overflow-x-hidden bg-background pb-20 sm:pb-24">
			<div className="border-b border-border bg-surface min-w-0">
				<div className="w-full min-w-0 py-3 sm:py-4 min-w-0">
					<nav className="flex items-center text-xs sm:text-sm font-medium text-text-secondary min-w-0 overflow-x-auto no-scrollbar gap-x-1 sm:gap-x-0">
						<Link
							href="/"
							className="hover:text-primary transition-colors shrink-0"
						>
							Home
						</Link>
						<ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-1 sm:mx-2 shrink-0 opacity-70" />
						<Link
							href="/products/all"
							className="hover:text-primary transition-colors shrink-0"
						>
							Products
						</Link>
						<ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-1 sm:mx-2 shrink-0 opacity-70" />
						<span className="text-foreground truncate min-w-0">
							{product.title}
						</span>
					</nav>
				</div>
			</div>

			<div className="w-full min-w-0 py-8 md:py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					{/* Product Gallery */}
					<div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
						{product.images.length > 1 && (
							<div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-24 md:max-h-[600px] no-scrollbar shrink-0 pb-2 md:pb-0">
								{product.images.map((image, idx) => (
									<button
										key={image.url}
										type="button"
										onClick={() => setActiveImageIndex(idx)}
										className={`relative w-20 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
											idx === activeImageIndex
												? "border-primary shadow-md"
												: "border-transparent hover:border-primary/50"
										}`}
									>
										<Image
											src={image.url}
											alt={image.altText || `Thumbnail ${idx + 1}`}
											fill
											className="object-cover"
										/>
									</button>
								))}
							</div>
						)}

						<Card className="flex-1 overflow-hidden relative group">
							{product.images[activeImageIndex] ? (
								<div className="relative aspect-[4/5] md:aspect-[3/4] w-full bg-surface-alt">
									<Image
										src={product.images[activeImageIndex].url}
										alt={
											product.images[activeImageIndex].altText || product.title
										}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										priority
									/>
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault();
											inWishlist
												? removeFromWishlist(product.id)
												: addToWishlist(product);
										}}
										className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 z-10 ${
											inWishlist
												? "bg-primary text-white"
												: "bg-surface text-foreground hover:bg-primary hover:text-white"
										}`}
										aria-label={
											inWishlist ? "Remove from wishlist" : "Add to wishlist"
										}
									>
										<Heart
											className={`w-6 h-6 transition-transform group-hover:scale-110 ${inWishlist ? "fill-current" : ""}`}
										/>
									</button>
								</div>
							) : (
								<div className="aspect-[4/5] md:aspect-[3/4] w-full flex items-center justify-center bg-surface-alt text-text-secondary border border-border/60">
									No Image Available
								</div>
							)}
						</Card>
					</div>

					{/* Product Info */}
					<div className="lg:col-span-5 lg:sticky lg:top-20 xl:top-24 self-start space-y-6 min-w-0">
						<div className="flex flex-wrap gap-2">
							{product.tags.map((tag) => (
								<span
									key={tag}
									className="px-3 py-1 rounded-full bg-surface-alt font-medium text-xs text-text-secondary uppercase tracking-wider"
								>
									{tag}
								</span>
							))}
						</div>

						<h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-snug tracking-tight">
							{product.title}
						</h1>

						{selectedVariant && (
							<div className="mb-6 pb-6 border-b border-border">
								<div className="text-2xl md:text-3xl font-semibold text-primary mb-1 tabular-nums">
									₹{totalPrice.toFixed(2)}
								</div>
								{selectedVariant.compareAtPrice && (
									<div className="text-sm text-text-secondary line-through">
										₹{(selectedVariant.compareAtPrice * quantity).toFixed(2)}
									</div>
								)}
							</div>
						)}

						<div className="space-y-8">
							<div>
								<label className="text-xs font-medium text-text-secondary mb-3 block">
									Size / weight
								</label>
								<WeightSelector
									options={weightOptions}
									selectedValue={selectedWeight}
									onChange={handleWeightChange}
								/>
							</div>

							<div className="bg-surface p-5 rounded-xl border border-border space-y-5">
								<div className="flex items-center justify-between">
									<label className="text-sm font-medium text-foreground">
										Quantity
									</label>
									<div className="flex items-center bg-surface-alt rounded-full border border-border/50 p-1">
										<button
											type="button"
											className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface hover:shadow-sm transition-all disabled:opacity-50"
											onClick={() => setQuantity(Math.max(1, quantity - 1))}
											disabled={quantity <= 1}
										>
											<span className="text-xl font-medium leading-none mb-1">
												-
											</span>
										</button>
										<span className="w-12 text-center font-medium text-base tabular-nums">
											{quantity}
										</span>
										<button
											type="button"
											className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface hover:shadow-sm transition-all"
											onClick={() => setQuantity(quantity + 1)}
										>
											<span className="text-xl font-medium leading-none mb-1">
												+
											</span>
										</button>
									</div>
								</div>

								<div
									ref={addToCartRef}
									className="flex flex-col sm:flex-row gap-4 pt-2"
								>
									<Button
										size="lg"
										className="flex-1 group"
										onClick={handleAddToCart}
										disabled={!selectedVariantId || isAddingToCart}
									>
										<ShoppingBag className="w-4 h-4 mr-2 opacity-90" />
										{isAddingToCart ? "Adding…" : "Add to cart"}
									</Button>
									<Button
										variant="secondary"
										size="lg"
										onClick={() => {
											handleAddToCart();
											router.push("/cart");
										}}
										disabled={!selectedVariantId || isAddingToCart}
										className="sm:w-1/3 whitespace-nowrap"
									>
										Buy now
									</Button>
								</div>
							</div>

							{/* Express Shipping Checker */}
							<div className="bg-surface-alt/60 p-5 rounded-xl border border-border">
								<div className="flex gap-3 mb-3">
									<div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
										<MapPin className="w-4 h-4 text-primary" />
									</div>
									<div>
										<h4 className="text-sm font-medium text-foreground">
											Delivery estimate
										</h4>
										<p className="text-xs text-text-secondary mt-0.5">
											Six-digit pincode
										</p>
									</div>
								</div>

								<div className="flex gap-3">
									<div className="flex-1">
										<Input
											placeholder="e.g. 682001"
											value={pincode}
											onChange={(e) => setPincode(e.target.value)}
											error={
												showShippingError ? "Enter 6 digit pincode" : undefined
											}
											className="h-12 bg-surface rounded-xl"
										/>
									</div>
									<Button
										onClick={handleCheckShipping}
										className="whitespace-nowrap"
									>
										Check
									</Button>
								</div>

								{shippingEstimate && (
									<div className="mt-4 p-4 bg-surface rounded-2xl border border-success/20 shadow-sm animate-fade-in flex items-start gap-3">
										<CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
										<div>
											<p className="font-medium text-foreground text-sm">
												{shippingEstimate.requiresManualQuote
													? "Custom shipping quote required"
													: `₹${shippingEstimate.cost} to ${shippingEstimate.region}`}
											</p>
											{!shippingEstimate.requiresManualQuote && (
												<p className="text-sm text-text-secondary mt-1">
													About{" "}
													<span className="font-medium text-foreground">
														{shippingEstimate.estimatedDays} days
													</span>
												</p>
											)}
										</div>
									</div>
								)}
							</div>

							{/* Trust Indicators */}
							<div className="grid grid-cols-2 gap-3">
								<div className="flex items-center gap-2.5 p-3 rounded-lg bg-surface border border-border">
									<ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
									<div className="text-xs leading-snug">
										<p className="font-medium text-foreground">QC checked</p>
										<p className="text-text-secondary">Before dispatch</p>
									</div>
								</div>
								<div className="flex items-center gap-2.5 p-3 rounded-lg bg-surface border border-border">
									<Truck className="w-5 h-5 text-primary shrink-0" />
									<div className="text-xs leading-snug">
										<p className="font-medium text-foreground">Dispatch</p>
										<p className="text-text-secondary">Typically 24–48h</p>
									</div>
								</div>
							</div>

							{/* Product Description */}
							<div className="pt-6 border-t border-border">
								<h3 className="text-base font-semibold text-foreground mb-3">
									Description
								</h3>
								<div className="prose prose-sm text-text-secondary w-full max-w-none leading-relaxed">
									<p>
										{product.description ||
											"Premium quality product sourced directly from natural environments in Kerala. Prepared perfectly for the best outcome."}
									</p>
								</div>
							</div>

							{/* Technical Specs */}
							{product.metafields &&
								Object.keys(product.metafields).length > 0 && (
									<div className="pt-8 border-t border-border">
										<h3 className="text-base font-semibold text-foreground mb-4">
											Specifications
										</h3>
										<div className="grid sm:grid-cols-2 gap-6">
											{product.metafields.moistureLevel && (
												<div>
													<p className="text-sm text-text-secondary mb-1">
														Moisture Level
													</p>
													<p className="font-medium text-foreground">
														{product.metafields.moistureLevel}
													</p>
												</div>
											)}
											{product.metafields.woodType && (
												<div>
													<p className="text-sm text-text-secondary mb-1">
														Wood Type
													</p>
													<p className="font-medium text-foreground capitalize">
														{product.metafields.woodType}
													</p>
												</div>
											)}
											{product.metafields.origin && (
												<div>
													<p className="text-sm text-text-secondary mb-1">
														Origin
													</p>
													<p className="font-medium text-foreground">
														{product.metafields.origin}
													</p>
												</div>
											)}
											{product.metafields.sizeGrade && (
												<div>
													<p className="text-sm text-text-secondary mb-1">
														Grade
													</p>
													<p className="font-medium text-foreground">
														{product.metafields.sizeGrade}
													</p>
												</div>
											)}
										</div>
									</div>
								)}
						</div>
					</div>
				</div>
			</div>

			{/* Sticky Bottom Bar for Mobile & Desktop when scrolling */}
			{showStickyBar && (
				<div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-fade-in-up pb-[env(safe-area-inset-bottom,0px)]">
					<div className="w-full min-w-0 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
						<div className="hidden sm:flex items-center gap-4 flex-1">
							{product.images[0] && (
								<div className="relative w-12 h-12 rounded bg-surface-alt overflow-hidden shrink-0 border border-border">
									<Image
										src={product.images[0].url}
										alt={product.title}
										fill
										className="object-cover"
									/>
								</div>
							)}
							<div>
								<p className="font-semibold text-sm line-clamp-1">
									{product.title}
								</p>
								<p className="text-primary font-medium text-sm">
									₹{totalPrice.toFixed(2)}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 w-full sm:w-auto overflow-x-hidden">
							<div className="shrink-0 flex items-center border border-border rounded-lg bg-surface">
								<button
									type="button"
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="px-3 py-2 text-text-secondary hover:text-primary transition-colors"
								>
									-
								</button>
								<span className="text-sm font-medium w-8 text-center">
									{quantity}
								</span>
								<button
									type="button"
									onClick={() => setQuantity(quantity + 1)}
									className="px-3 py-2 text-text-secondary hover:text-primary transition-colors"
								>
									+
								</button>
							</div>

							<Button
								onClick={handleAddToCart}
								disabled={!selectedVariantId || isAddingToCart}
								className="flex-1 sm:flex-none shadow-md"
							>
								{isAddingToCart ? "Adding..." : "Add to Cart"}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
