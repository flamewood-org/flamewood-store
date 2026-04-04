import { notFound } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import ProductGrid from "./ProductGrid";

interface ProductListingPageProps {
	params: Promise<{ category: string }>;
}

export default async function ProductListingPage({
	params,
}: ProductListingPageProps) {
	const { category } = await params;

	// Map category handle to display name
	const categoryNames: Record<string, string> = {
		firewood: "Firewood",
		coconut: "Coconut Products",
		biomass: "Biomass",
		all: "All Products",
	};

	const categoryName = categoryNames[category];
	if (!categoryName) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
			{/* Breadcrumb */}
			<div className="bg-white border-b border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<nav className="flex items-center space-x-2 text-sm">
						<Link
							href="/"
							className="text-text-secondary hover:text-primary transition-colors"
						>
							Home
						</Link>
						<span className="text-text-secondary">/</span>
						<span className="text-foreground font-medium">{categoryName}</span>
					</nav>
				</div>
			</div>

			{/* Header Section */}
			<div className="bg-white border-b border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
								{categoryName}
							</h1>
							<p className="text-text-secondary">
								Discover our premium selection of quality{" "}
								{categoryName.toLowerCase()}
							</p>
						</div>
						<div className="flex items-center gap-3">
							<button
								type="button"
								className="inline-flex items-center px-4 py-2.5 rounded-lg border border-border bg-white text-sm font-medium text-foreground hover:bg-gray-50 hover:border-primary/30 transition-all duration-200 shadow-sm"
							>
								<SlidersHorizontal className="w-4 h-4 mr-2" />
								Filters
							</button>
							<select className="px-4 py-2.5 rounded-lg border border-border bg-white text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer shadow-sm">
								<option value="featured">Featured</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
								<option value="newest">Newest Arrivals</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Product Grid - Client Component for dynamic data */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<ProductGrid category={category} />
			</div>
		</div>
	);
}
