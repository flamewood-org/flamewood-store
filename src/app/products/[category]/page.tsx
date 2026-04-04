import { notFound } from "next/navigation";
import { SlidersHorizontal, ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import ProductGrid from "./ProductGrid";

interface ProductListingPageProps {
	params: Promise<{ category: string }>;
}

export default async function ProductListingPage({
	params,
}: ProductListingPageProps) {
	const { category } = await params;

	// Map category handle to display name and subtitle
	const categoryData: Record<string, { title: string, subtitle: string }> = {
		firewood: { title: "Premium Firewood", subtitle: "Sourced sustainably for perfect, long-lasting burns." },
		coconut: { title: "Coconut Products", subtitle: "High-quality coconut shells & premium charcoal." },
		biomass: { title: "Biomass Briquettes", subtitle: "Eco-friendly, high-density fuel for ultimate efficiency." },
		all: { title: "The Collection", subtitle: "Explore our full range of masterfully crafted products." },
	};

	const cat = categoryData[category];
	if (!cat) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background pb-20">
			{/* Luxury Header Banner */}
			<div className="bg-foreground text-white relative pt-24 pb-16 md:pt-32 md:pb-24 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden z-10 shadow-2xl">
				{/* Background Glow Decoration */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
					<div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2"></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
					<nav className="flex items-center justify-center space-x-2 text-sm text-white/50 mb-6 font-medium uppercase tracking-widest">
						<Link href="/" className="hover:text-white transition-colors">Home</Link>
						<ChevronRight className="w-4 h-4" />
						<span className="text-white">{cat.title}</span>
					</nav>

					<h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight animate-fade-in-up">
						{cat.title}
					</h1>
					<p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-medium">
						{cat.subtitle}
					</p>
				</div>
			</div>

			{/* Filter & Sort Bar */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-20">
				<div className="bg-white p-4 rounded-3xl shadow-lg border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 -mt-16 md:-mt-20">
					<div className="flex items-center gap-4 text-text-secondary pl-2">
						<LayoutGrid className="w-5 h-5 text-primary" />
						<span className="font-semibold text-foreground uppercase tracking-wider text-sm">Showing Results</span>
					</div>
					<div className="flex items-center gap-3">
						<button
							type="button"
							className="flex-1 md:flex-none inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-border bg-surface-alt font-bold text-foreground hover:border-primary hover:text-primary transition-all duration-300"
						>
							<SlidersHorizontal className="w-4 h-4 mr-2" />
							Filters
						</button>
						<select className="flex-1 md:flex-none px-6 py-3 rounded-2xl border border-border bg-surface-alt font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer">
							<option value="featured">Sort by: Featured</option>
							<option value="price-low">Price: Low to High</option>
							<option value="price-high">Price: High to Low</option>
							<option value="newest">Newest Arrivals</option>
						</select>
					</div>
				</div>
			</div>

			{/* Product Grid - Client Component */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<ProductGrid category={category} />
			</div>
		</div>
	);
}
