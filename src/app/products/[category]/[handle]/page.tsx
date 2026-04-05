"use client";

import {
	CheckCircle2,
	Heart,
	MapPin,
	ShieldCheck,
	ShoppingBag,
	Truck,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MarketplaceProductCard } from "@/components/product/MarketplaceProductCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { WeightSelector } from "@/components/ui/WeightSelector";
import { useProduct, useProducts } from "@/hooks/useShopify";
import { getCategoryFromProduct } from "@/lib/product-category";
import { calculateShipping } from "@/lib/shipping";
import { useCartContext } from "@/store/CartContext";
import { useDeliveryLocation } from "@/store/DeliveryLocationContext";
import { useWishlistContext } from "@/store/WishlistContext";
import type { ShippingEstimate } from "@/types/cart";
import type { Product } from "@/types/product";

export default function ProductDetailPage() {
	const params = useParams();
	const router = useRouter();
	const handle = params.handle as string;

	const { data: product, isLoading } = useProduct(handle);
	const { data: catalogProducts, isLoading: isRelatedLoading } =
		useProducts(50);
	const { addToCart, isLoading: isAddingToCart } = useCartContext();
	const { isInWishlist, addToWishlist, removeFromWishlist } =
		useWishlistContext();

	const [selectedVariantId, setSelectedVariantId] = useState<string>("");
	const [selectedWeight, setSelectedWeight] = useState<string>("");
	const [quantity, setQuantity] = useState(1);
	const { location, openModal } = useDeliveryLocation();
	const [pincode, setPincode] = useState(location?.pincode || "");
	const [shippingEstimate, setShippingEstimate] =
		useState<ShippingEstimate | null>(null);
	const [showShippingError, setShowShippingError] = useState(false);
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [showStickyBar, setShowStickyBar] = useState(false);
	const stickyBarObserverRef = useRef<IntersectionObserver | null>(null);

	const addToCartContainerRef = useCallback((node: HTMLDivElement | null) => {
		stickyBarObserverRef.current?.disconnect();
		stickyBarObserverRef.current = null;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				setShowStickyBar(!entry.isIntersecting);
			},
			{ threshold: 0, rootMargin: "0px 0px -1px 0px" },
		);
		observer.observe(node);
		stickyBarObserverRef.current = observer;
	}, []);

	const selectedVariant = useMemo(
		() => product?.variants.find((v) => v.id === selectedVariantId),
		[product, selectedVariantId],
	);

	const inWishlist = isInWishlist(product?.id || "");

	// Initialize selected variant when product loads
	useEffect(() => {
		if (product && product.variants.length > 0 && !selectedVariantId) {
			setSelectedVariantId(product.variants[0].id);
			setSelectedWeight(product.variants[0].title);
		}
	}, [product, selectedVariantId]);

	// Sync with global location context
	useEffect(() => {
		if (location?.pincode) {
			setPincode(location.pincode);
			if (selectedVariant) {
				const totalWeight = (selectedVariant.weight || 0) * quantity;
				const currentSubtotal = (unitPrice * quantity);
				const estimate = calculateShipping(totalWeight, location.pincode, currentSubtotal);
				setShippingEstimate(estimate);
			}
		}
	}, [location, selectedVariant, quantity]);

	useEffect(
		() => () => {
			stickyBarObserverRef.current?.disconnect();
		},
		[],
	);

	const weightOptions = useMemo(() => {
		return (
			product?.variants.map((variant) => ({
				value: variant.title,
				label: variant.title,
				variantId: variant.id,
				price: variant.price,
			})) || []
		);
	}, [product]);

	const {
		unitPrice,
		compareAtUnit,
		basePriceTotal,
		totalPrice,
		compareAtLineTotal,
		displayTags,
	} = useMemo(() => {
		const up =
			selectedVariant && Number.isFinite(selectedVariant.price)
				? selectedVariant.price
				: 0;
		const cau =
			selectedVariant?.compareAtPrice != null &&
			Number.isFinite(selectedVariant.compareAtPrice)
				? selectedVariant.compareAtPrice
				: undefined;
		const dt = Array.isArray(product?.tags)
			? product.tags.filter(
					(t): t is string => typeof t === "string" && t.trim().length > 0,
				)
			: [];

		const baseTotal = up * quantity;
		const finalTotal = baseTotal >= 300 ? baseTotal : baseTotal + 99;
		return {
			unitPrice: up,
			compareAtUnit: cau,
			basePriceTotal: baseTotal,
			totalPrice: finalTotal,
			compareAtLineTotal: cau != null ? cau * quantity : undefined,
			displayTags: dt,
		};
	}, [selectedVariant, quantity, product]);

	const relatedProducts = useMemo(() => {
		if (!catalogProducts?.length || !product?.id) return [];
		const currentCat = getCategoryFromProduct(product);
		const sameCategory = catalogProducts.filter((p: Product) => {
			if (p.id === product.id) return false;
			return getCategoryFromProduct(p) === currentCat;
		});
		if (sameCategory.length > 0) return sameCategory.slice(0, 4);
		return catalogProducts.filter((p) => p.id !== product.id).slice(0, 4);
	}, [catalogProducts, product]);

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
		const currentSubtotal = (unitPrice * quantity);
		const estimate = calculateShipping(totalWeight, pincode, currentSubtotal);
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
			<div className="w-full min-w-0 py-8 md:py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					{/* Product Gallery */}
					<div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
						{Array.isArray(product?.images) && product.images.length > 1 && (
							<div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-24 md:max-h-[500px] no-scrollbar shrink-0 pb-2 md:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
								{product.images.map(
									(image: { url: string; altText?: string }, idx: number) => (
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
									),
								)}
							</div>
						)}

						<Card className="flex-1 overflow-hidden relative group max-h-[min(500px,85vh)] min-h-[280px] sm:min-h-[320px]">
							{product.images?.[activeImageIndex] ? (
								<div className="relative h-full w-full bg-surface-alt">
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
								<div className="aspect-4/5 md:aspect-3/4 w-full flex items-center justify-center bg-surface-alt text-text-secondary border border-border/60">
									No Image Available
								</div>
							)}
						</Card>
					</div>

					{/* Product Info */}
					<div className="lg:col-span-5 lg:sticky lg:top-20 xl:top-24 self-start space-y-6 min-w-0">
						<h1 className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug tracking-tight pr-1">
							{product.title}
						</h1>
						<div className="prose prose-sm text-text-secondary w-full -mt-3 max-w-none leading-relaxed">
							<p>
								{product.description ||
									"Premium quality product sourced directly from natural environments in Kerala. Prepared perfectly for the best outcome."}
							</p>
						</div>

						{selectedVariant && unitPrice > 0 && (
							<div className="pb-4 border-b border-border/80">
								<div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
									<span className="text-3xl font-bold text-primary tabular-nums">
										₹{unitPrice.toFixed(2)}
									</span>
									{selectedWeight && selectedWeight !== "Default Title" && (
										<span className="text-sm text-text-secondary">
											/ {selectedWeight}
										</span>
									)}
									{compareAtUnit != null && compareAtUnit > unitPrice && (
										<span className="text-sm text-text-tertiary line-through tabular-nums ml-2">
											₹{compareAtUnit.toFixed(2)}
										</span>
									)}
								</div>
							</div>
						)}

						<div className="space-y-8">
							{weightOptions.length > 1 && (
								<div>
									<label className="text-xs font-semibold text-text-secondary mb-3 block uppercase tracking-wider">
										Choose Size
									</label>
									<WeightSelector
										options={weightOptions}
										selectedValue={selectedWeight}
										onChange={handleWeightChange}
									/>
								</div>
							)}

							{/* Express Shipping Checker */}
							<div className="bg-surface-alt/40 p-4 rounded-xl border border-border/60">
								<div className="flex items-center justify-between mb-3 px-1">
									<div className="flex items-center gap-2">
										<MapPin className="w-3.5 h-3.5 text-primary" />
										<h4 className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
											Delivery Estimate
										</h4>
									</div>
								</div>

								<div className="flex gap-3">
									{location ? (
										<div className="flex-1 p-3 bg-surface rounded-xl border border-border flex items-center justify-between">
											<div className="min-w-0">
												<p className="font-bold text-sm text-foreground leading-none">
													{location.pincode}
												</p>
												<p className="text-[11px] text-text-secondary mt-1 truncate">
													{location.area}, {location.district}
												</p>
											</div>
											<button
												type="button"
												onClick={openModal}
												className="text-[10px] font-bold text-primary uppercase hover:underline shrink-0"
											>
												Change
											</button>
										</div>
									) : (
										<>
											<div className="flex-1">
												<Input
													placeholder="e.g. 682001"
													value={pincode}
													onChange={(e) => setPincode(e.target.value)}
													error={
														showShippingError
															? "Enter 6 digit pincode"
															: undefined
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
										</>
									)}
								</div>

								{shippingEstimate && (
									<div className="mt-4 p-4 bg-surface rounded-2xl border border-success/20 shadow-sm animate-fade-in flex items-start gap-3">
										<CheckCircle2 className="w-6 h-6 text-success shrink-0" />
										<div>
											<p className="font-bold text-success text-sm uppercase tracking-wide">
												{shippingEstimate.requiresManualQuote
													? shippingEstimate.region === "Outside Service Area"
														? "Currently limited to India"
														: "Heavy shipment detected"
													: shippingEstimate.cost === 0
														? `FREE Delivery to ${shippingEstimate.region}`
														: `₹${shippingEstimate.cost} Delivery to ${shippingEstimate.region}`}
											</p>
											{!shippingEstimate.requiresManualQuote ? (
												<p className="text-sm text-text-secondary mt-1">
													About{" "}
													<span className="font-medium text-foreground">
														{shippingEstimate.estimatedDays} days
													</span>
													{shippingEstimate.cost > 0 && " • Free with ₹300+"}
												</p>
											) : (
												<p className="text-[11px] text-text-secondary mt-1 max-w-[240px]">
													{shippingEstimate.region === "Outside Service Area"
														? "Please enter a valid 6-digit Indian pincode to check availability."
														: "Weight over 50kg. Delivery is still included, but special handling/freight will be used."}
												</p>
											)}
										</div>
									</div>
								)}
							</div>

							<div className="bg-surface p-4 sm:p-5 rounded-xl border border-border shadow-sm space-y-4 sm:space-y-5">
								<div className="space-y-3 pb-1 border-b border-border/70">
									<div className="flex items-center justify-between gap-3 text-sm">
										<span className="text-text-secondary shrink-0">
											Unit price
										</span>
										<span className="font-medium tabular-nums text-foreground text-right">
											{unitPrice > 0 ? `₹${unitPrice.toFixed(2)}` : "—"}
										</span>
									</div>
									<div className="flex items-center justify-between gap-3">
										<span className="text-sm font-medium text-foreground shrink-0">
											Quantity
										</span>
										<div className="flex items-center bg-surface-alt rounded-full border border-border/50 p-1 shrink-0">
											<button
												type="button"
												className="w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:bg-surface hover:shadow-sm transition-all disabled:opacity-50 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
												onClick={() => setQuantity(Math.max(1, quantity - 1))}
												disabled={quantity <= 1}
												aria-label="Decrease quantity"
											>
												<span className="text-xl font-medium leading-none mb-1">
													-
												</span>
											</button>
											<span className="w-11 sm:w-12 text-center font-medium text-base tabular-nums">
												{quantity}
											</span>
											<button
												type="button"
												className="w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:bg-surface hover:shadow-sm transition-all min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
												onClick={() => setQuantity(quantity + 1)}
												aria-label="Increase quantity"
											>
												<span className="text-xl font-medium leading-none mb-1">
													+
												</span>
											</button>
										</div>
									</div>
									<div className="flex items-center justify-between gap-3 pt-1">
										<div className="min-w-0">
											<p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">
												Total
											</p>
											<p className="text-2xl font-black text-primary tabular-nums tracking-tighter">
												₹
												{Number.isFinite(totalPrice)
													? totalPrice.toFixed(0)
													: "0"}
											</p>
										</div>
										<div className="text-right min-w-0">
											{compareAtLineTotal != null &&
												compareAtLineTotal > basePriceTotal && (
													<p className="text-xs text-text-tertiary line-through tabular-nums mt-0.5">
														₹{compareAtLineTotal.toFixed(2)}
													</p>
												)}
											<p className="text-[11px] text-text-secondary mt-0.5">
												{quantity} × ₹{unitPrice > 0 ? unitPrice.toFixed(2) : "0.00"}
												{basePriceTotal < 300 && " + ₹99 shipping"}
											</p>
										</div>
									</div>
								</div>

								<div
									ref={addToCartContainerRef}
									className="flex flex-col sm:flex-row gap-3 sm:gap-4"
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
										onClick={async () => {
											await handleAddToCart();
											router.push("/cart");
										}}
										disabled={!selectedVariantId || isAddingToCart}
										className="sm:w-1/3 whitespace-nowrap"
									>
										Buy now
									</Button>
								</div>
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

							{displayTags.length > 0 && (
								<div className="pt-8 border-t border-border">
									<h3 className="text-base font-semibold text-foreground mb-3">
										Tags
									</h3>
									<div className="flex flex-wrap gap-2">
										{displayTags.map((tag: string, idx: number) => (
											<span
												key={`${tag}-${idx}`}
												className="inline-flex items-center px-3 py-1.5 rounded-full bg-surface-alt border border-border/60 text-xs font-medium text-text-secondary uppercase tracking-wide"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{(isRelatedLoading || relatedProducts.length > 0) && (
					<section
						className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-border"
						aria-labelledby="related-products-heading"
					>
						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 sm:mb-8">
							<h2
								id="related-products-heading"
								className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight"
							>
								You may also like
							</h2>
							<p className="text-sm text-text-secondary max-w-md">
								More from this category, hand-picked for you.
							</p>
						</div>
						{isRelatedLoading ? (
							<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
								{Array.from({ length: 4 }, (_, i) => (
									<div
										key={`related-skel-${i}`}
										className="aspect-3/4 rounded-lg bg-surface-alt animate-pulse border border-border/40"
									/>
								))}
							</div>
						) : (
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
								{relatedProducts.map((p) => (
									<MarketplaceProductCard key={p.id} product={p} />
								))}
							</div>
						)}
					</section>
				)}
			</div>

			{/* Sticky Bottom Bar for Mobile & Desktop when scrolling */}
			{showStickyBar && (
				<div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-fade-in-up pb-[env(safe-area-inset-bottom,0px)]">
					<div className="container mx-auto px-3 sm:px-4 w-full min-w-0 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
						<div className="hidden sm:flex items-center gap-4 flex-1 min-w-0">
							{product?.images?.[0] && (
								<div className="relative w-12 h-12 rounded bg-surface-alt overflow-hidden shrink-0 border border-border">
									<Image
										src={product.images[0].url}
										alt={product.title || ""}
										fill
										className="object-cover"
									/>
								</div>
							)}
							<div className="min-w-0">
								<p className="font-semibold text-sm line-clamp-1">
									{product?.title}
								</p>
								<p className="text-primary font-semibold text-sm tabular-nums">
									₹{Number.isFinite(totalPrice) ? totalPrice.toFixed(2) : "0.00"}
								</p>
								<p className="text-[11px] text-text-secondary tabular-nums">
									{quantity} × ₹{unitPrice > 0 ? unitPrice.toFixed(2) : "0.00"}
									{basePriceTotal < 300 && " + ₹99 ship"}
								</p>
							</div>
						</div>

						<div className="flex sm:hidden flex-1 min-w-0 pr-1">
							<div className="min-w-0">
								<p className="font-medium text-foreground text-sm line-clamp-1">
									{product?.title}
								</p>
								<p className="text-primary font-semibold text-sm tabular-nums">
									₹
									{Number.isFinite(totalPrice) ? totalPrice.toFixed(2) : "0.00"}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2 sm:gap-3 w-auto sm:w-auto shrink-0 overflow-x-hidden">
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
