import {
	ChevronRight,
	Package,
	ShieldCheck,
	TrendingUp,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getCollections } from "@/lib/shopify";
import type { Collection } from "@/types/product";

export default async function Home() {
	const collections = await getCollections();

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Banner */}
			<section className="relative pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden">
				<div className="absolute inset-0 bg-white -z-20" />
				<div className="absolute inset-0 bg-linear-to-b from-hero-tint/95 via-white to-background -z-10" />

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-border/60 shadow-[0_20px_50px_rgba(124,45,18,0.08)] bg-white">
						<div className="grid lg:grid-cols-2 gap-0 min-h-[300px] md:min-h-[360px]">
							<div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14 bg-hero-tint/80">
								<div className="absolute top-6 left-6 md:top-8 md:left-8 w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary text-white flex flex-col items-center justify-center text-center text-[10px] md:text-xs font-bold leading-tight shadow-lg z-10 p-2">
									<span className="opacity-90">100%</span>
									<span className="text-sm md:text-base">NATURAL</span>
								</div>

								<p className="text-primary font-bold text-sm uppercase tracking-widest mb-3 mt-14 md:mt-0">
									Kerala · Premium fuel &amp; coir
								</p>
								<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-[1.15] tracking-tight">
									Premium biomass &amp; coconut products,{" "}
									<span className="text-secondary">delivered to you</span>
								</h1>
								<p className="text-base md:text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
									Quality-assured firewood, biomass, and coir — shop your
									collections with a clear, fast storefront.
								</p>

								<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
									<Link href="/products/all">
										<Button
											size="lg"
											className="h-12 md:h-14 px-8 rounded-xl text-base font-bold bg-primary hover:bg-primary-light text-white border-0 shadow-lg shadow-primary/25 w-full sm:w-auto"
										>
											Shop now
										</Button>
									</Link>
									<Link
										href="#shop-categories"
										className="inline-flex items-center text-sm font-semibold text-secondary hover:text-primary transition-colors"
									>
										Browse categories
										<ChevronRight className="w-4 h-4 ml-0.5" />
									</Link>
								</div>

								<div
									className="flex gap-2 mt-8"
									role="tablist"
									aria-label="Banner"
								>
									{[0, 1, 2].map((i) => (
										<span
											key={i}
											className={`h-2 rounded-full transition-all ${
												i === 0 ? "w-8 bg-primary" : "w-2 bg-border"
											}`}
										/>
									))}
								</div>
							</div>

							<div className="relative min-h-[220px] lg:min-h-0 bg-linear-to-br from-primary/5 via-hero-tint to-white flex items-center justify-center p-8">
								<div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(194,65,12,0.2),transparent_55%)]" />
								<div className="relative grid grid-cols-2 gap-4 max-w-md w-full">
									<div className="aspect-square rounded-2xl bg-white border border-border/60 shadow-md flex items-center justify-center text-6xl">
										🌿
									</div>
									<div className="aspect-square rounded-2xl bg-secondary/5 border border-secondary/15 flex items-center justify-center text-6xl mt-8">
										🔥
									</div>
									<div className="col-span-2 rounded-2xl bg-surface-alt/90 border border-border p-4 flex items-center gap-3">
										<div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
											<Package className="w-6 h-6 text-primary" />
										</div>
										<div>
											<p className="text-xs font-bold text-text-tertiary uppercase">
												Your catalog
											</p>
											<p className="font-semibold text-foreground">
												Collections stay in sync with Shopify
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Shop by category */}
			<section
				id="shop-categories"
				className="py-16 md:py-20 bg-background scroll-mt-28"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4 tracking-tight">
						Shop by category
					</h2>
					<p className="text-center text-text-secondary max-w-2xl mx-auto mb-12 text-sm md:text-base">
						Choose a collection — same URLs and products as in your Shopify
						admin.
					</p>

					{collections.length > 0 ? (
						<div className="flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-10">
							{collections.map((collection: Collection) => (
								<Link
									key={collection.id}
									href={`/products/${collection.handle}`}
									className="group flex flex-col items-center w-[104px] sm:w-[120px]"
								>
									<div className="relative w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-primary/20 transition-transform duration-300 group-hover:scale-105 group-hover:ring-primary/35">
										{collection.image ? (
											<Image
												src={collection.image.url}
												alt={collection.image.altText || collection.title}
												width={104}
												height={104}
												className="object-cover w-full h-full"
											/>
										) : (
											<div className="w-full h-full bg-linear-to-br from-hero-tint to-surface-alt flex items-center justify-center text-3xl">
												🌿
											</div>
										)}
									</div>
									<span className="mt-3 text-center text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
										{collection.title}
									</span>
								</Link>
							))}
						</div>
					) : (
						<div className="text-center py-16 bg-surface-alt rounded-2xl border border-border">
							<div className="text-5xl mb-4">🛍️</div>
							<p className="text-lg font-semibold text-foreground mb-1">
								Collections coming soon
							</p>
							<p className="text-sm text-text-secondary">
								Add collections in Shopify — they appear here automatically.
							</p>
						</div>
					)}

					<div className="mt-12 text-center">
						<Link
							href="/products/all"
							className="inline-flex items-center font-semibold text-primary hover:text-primary-dark"
						>
							View all products
							<ChevronRight className="w-5 h-5 ml-1" />
						</Link>
					</div>
				</div>
			</section>

			{/* B2B */}
			<section id="bulk-deals" className="py-14 md:py-16 scroll-mt-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative overflow-hidden rounded-3xl bg-secondary text-white p-8 md:p-14">
						<div className="absolute top-0 right-0 w-[min(100%,480px)] h-[480px] bg-linear-to-bl from-primary/35 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
						<div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
							<div className="max-w-xl">
								<p className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-3">
									B2B
								</p>
								<h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
									Bulk orders &amp; custom pricing
								</h2>
								<p className="text-lg text-white/85 leading-relaxed mb-8">
									Restaurants, bakeries, and industrial buyers — request quotes
									for large volumes.
								</p>
								<div className="flex flex-col sm:flex-row gap-3">
									<Link href="/contact">
										<Button
											size="lg"
											className="bg-white text-secondary hover:bg-hero-tint border-0 font-bold rounded-xl"
										>
											Request quote
										</Button>
									</Link>
									<Link href="/contact">
										<Button
											variant="outline"
											size="lg"
											className="border-white/40 text-white hover:bg-white/10 rounded-xl font-bold"
										>
											Contact sales
										</Button>
									</Link>
								</div>
							</div>
							<div className="w-full lg:w-auto lg:min-w-[200px] flex items-center justify-center">
								<div className="rounded-2xl bg-white/10 border border-white/20 px-8 py-6 text-center backdrop-blur-sm">
									<TrendingUp className="w-10 h-10 mx-auto mb-2 text-accent-light" />
									<p className="font-bold">Volume savings</p>
									<p className="text-sm text-white/75 mt-1">
										On qualifying orders
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Trust strip — compact */}
			<section className="py-12 border-t border-border/70 bg-surface-alt/40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
						{[
							{
								icon: ShieldCheck,
								title: "Quality assured",
								text: "Consistent specs on every shipment.",
							},
							{
								icon: Truck,
								title: "Delivery",
								text: "Tracked logistics across India.",
							},
							{
								icon: Package,
								title: "Kerala origin",
								text: "Sourced through trusted partners.",
							},
						].map((x) => (
							<div
								key={x.title}
								className="flex flex-col sm:flex-row gap-3 items-center sm:items-start"
							>
								<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
									<x.icon className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="font-bold text-foreground text-sm">
										{x.title}
									</h3>
									<p className="text-sm text-text-secondary mt-0.5">{x.text}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Ready to order */}
			<section className="py-16 text-center">
				<h2 className="text-2xl font-bold text-foreground mb-6">
					Ready to order?
				</h2>
				<Link href="/products/all">
					<Button
						size="lg"
						className="px-8 h-12 rounded-xl font-bold bg-primary hover:bg-primary-light text-white border-0"
					>
						Shop the collection
					</Button>
				</Link>
			</section>
		</div>
	);
}
