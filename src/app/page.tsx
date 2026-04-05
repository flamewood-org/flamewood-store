import { Package, ShieldCheck, Truck } from "lucide-react";
import { BusinessOrdersSection } from "@/components/home/BusinessOrdersSection";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeHeroPromoBar } from "@/components/home/HomeHeroPromoBar";
import { OrderReadyCta } from "@/components/home/OrderReadyCta";
import { ShopByCategorySection } from "@/components/home/ShopByCategorySection";
import { buildHeroSlidesFromCollections } from "@/lib/home-hero-slides";
import { getCollections } from "@/lib/shopify";

export default async function Home() {
	const collections = await getCollections();
	const heroSlides = buildHeroSlidesFromCollections(collections);

	return (
		<div className="min-h-screen w-full min-w-0 flex flex-col bg-background overflow-x-hidden">
			<HomeHero slides={heroSlides} />
			<HomeHeroPromoBar />

			<ShopByCategorySection collections={collections} />

			<BusinessOrdersSection />

			<section className="pb-8 border-b border-border/60">
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
