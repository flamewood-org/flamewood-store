import { ChevronRight, Package, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BusinessOrdersSection } from "@/components/home/BusinessOrdersSection";
import { HomeHero } from "@/components/home/HomeHero";
import { OrderReadyCta } from "@/components/home/OrderReadyCta";
import { buildHeroSlidesFromCollections } from "@/lib/home-hero-slides";
import { getCollections } from "@/lib/shopify";
import type { Collection } from "@/types/product";

export default async function Home() {
	const collections = await getCollections();
	const heroSlides = buildHeroSlidesFromCollections(collections);

	return (
		<div className="min-h-screen w-full min-w-0 flex flex-col bg-background overflow-x-hidden">
			<HomeHero slides={heroSlides} />

			<section
				id="shop-categories"
				className="py-10 md:py-14 scroll-mt-24 border-b border-border/60 bg-background"
			>
				<div className="w-full min-w-0">
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
						<div>
							<h2 className="text-lg font-semibold text-foreground tracking-tight">
								Shop by category
							</h2>
							<p className="text-sm text-text-secondary mt-1 max-w-lg">
								One column on mobile, three across on desktop.
							</p>
						</div>
						<Link
							href="/products/all"
							className="text-sm font-medium text-primary hover:text-primary-dark inline-flex items-center gap-1 shrink-0"
						>
							All products
							<ChevronRight className="w-4 h-4" />
						</Link>
					</div>

					{collections.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
							{collections.map((collection: Collection) => {
								const plain =
									collection.description?.replace(/<[^>]+>/g, "").trim() ?? "";
								const subtitle =
									plain.length === 0
										? "Browse this collection"
										: plain.length > 100
											? `${plain.slice(0, 100)}…`
											: plain;
								return (
									<Link
										key={collection.id}
										href={`/products/${collection.handle}`}
										className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-primary/20"
									>
										<div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
											{collection.image ? (
												<Image
													src={collection.image.url}
													alt={collection.image.altText || collection.title}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
													sizes="(max-width: 768px) 100vw, 33vw"
												/>
											) : (
												<div className="flex h-full w-full items-center justify-center text-5xl bg-linear-to-br from-surface-alt to-surface">
													🌿
												</div>
											)}
											<div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent" />
											<div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
												<p className="text-lg md:text-xl font-semibold text-white tracking-tight leading-snug">
													{collection.title}
												</p>
												<p className="mt-1 text-sm text-white/85 line-clamp-2">
													{subtitle}
												</p>
											</div>
										</div>
										<div className="flex items-center justify-between px-5 py-4 border-t border-border/60 bg-surface">
											<span className="text-sm font-medium text-primary group-hover:text-primary-dark">
												Shop collection
											</span>
											<ChevronRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-0.5" />
										</div>
									</Link>
								);
							})}
						</div>
					) : (
						<div className="text-center py-12 rounded-xl border border-dashed border-border bg-surface-alt/50">
							<p className="text-sm font-medium text-foreground">
								No collections yet
							</p>
							<p className="text-xs text-text-secondary mt-1">
								Add collections in Shopify to show them here.
							</p>
						</div>
					)}
				</div>
			</section>

			<BusinessOrdersSection />

			<section className="py-8 border-t border-border/60 bg-surface-alt/30">
				<div className="w-full min-w-0">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
						{[
							{
								icon: ShieldCheck,
								title: "Spec-checked",
								text: "Batches reviewed before dispatch.",
							},
							{
								icon: Truck,
								title: "Nationwide",
								text: "Tracked carriers across India.",
							},
							{
								icon: Package,
								title: "Origin",
								text: "Sourced in and around Kerala.",
							},
						].map((x) => (
							<div key={x.title} className="flex gap-3">
								<div className="w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center shrink-0">
									<x.icon className="w-4 h-4 text-primary" />
								</div>
								<div>
									<h3 className="text-sm font-medium text-foreground">
										{x.title}
									</h3>
									<p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
										{x.text}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<OrderReadyCta />
		</div>
	);
}
