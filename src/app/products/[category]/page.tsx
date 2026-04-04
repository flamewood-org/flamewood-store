import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import ProductGrid from "./ProductGrid";

interface ProductListingPageProps {
	params: Promise<{ category: string }>;
}

export default async function ProductListingPage({
	params,
}: ProductListingPageProps) {
	const { category } = await params;

	const categoryData: Record<string, { title: string; subtitle: string }> = {
		firewood: {
			title: "Firewood",
			subtitle: "Seasoned and sorted for reliable burns.",
		},
		coconut: {
			title: "Coconut",
			subtitle: "Shells, charcoal, and coir-based lines.",
		},
		biomass: {
			title: "Biomass",
			subtitle: "Dense briquettes for steady heat.",
		},
		all: {
			title: "All products",
			subtitle: "Everything currently in the catalog.",
		},
	};

	const cat = categoryData[category];
	if (!cat) {
		notFound();
	}

	return (
		<div className="min-h-screen min-w-0 overflow-x-hidden bg-background pb-12 md:pb-16">
			<PageHeader
				title={cat.title}
				description={cat.subtitle}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Products", href: "/products/all" },
					{ label: cat.title },
				]}
			/>

			<div className="w-full min-w-0 pt-6 md:pt-8">
				<p className="text-sm text-text-secondary pb-6 border-b border-border/80">
					Need a different pack or bulk terms?{" "}
					<Link href="/contact" className="text-foreground font-medium hover:text-primary">
						Contact
					</Link>
					.
				</p>

				<div className="pt-6">
					<Suspense
						fallback={
							<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
								{Array.from({ length: 8 }, (_, i) => (
									<ProductCardSkeleton key={`grid-fallback-${i}`} />
								))}
							</div>
						}
					>
						<ProductGrid category={category} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
