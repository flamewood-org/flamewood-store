import { Package, ShieldCheck, TrendingUp, Truck, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getCollections } from "@/lib/shopify";
import type { Collection } from "@/types/product";

export default async function Home() {
	// Fetch collections from Shopify
	const collections = await getCollections();

	const features = [
		{
			icon: Package,
			title: "Quality Assured",
			description: "Every product meets strict 100% organic quality standards",
		},
		{
			icon: Truck,
			title: "Fast Delivery",
			description: "Reliable and tracked shipping across all of India",
		},
		{
			icon: ShieldCheck,
			title: "Kerala Origin",
			description: "Sourced directly from native farmers in Kerala, India",
		},
		{
			icon: TrendingUp,
			title: "Bulk Pricing",
			description: "Highly competitive rates for large or B2B orders",
		},
	];

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Hero Section */}
			<section className="relative pt-24 pb-32 md:pt-36 md:pb-48 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
				{/* Background */ }
				<div className="absolute inset-0 bg-surface-alt -z-20"></div>
				<div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-50/50 to-white -z-10"></div>
				
				{/* Abstract Shapes */}
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-float"></div>
				<div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10 animate-float" style={{ animationDelay: '2s' }}></div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-4xl mx-auto flex flex-col items-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-white/40 shadow-sm backdrop-blur-sm text-primary text-sm font-bold mb-8 animate-fade-in-down">
							<span className="mr-2 text-base">🌱</span> 100% Natural Biomass Fuel
						</div>
						
						<h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in-up">
							Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-600 to-secondary">Biomass</span>
							<br /> Delivered
						</h1>
						
						<p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
							Quality assured natural fuel and coconut products sourced directly from Kerala. Competitively priced for all your needs.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
							<Link href="/products/all" className="w-full sm:w-auto">
								<Button
									size="lg"
									fullWidth={false}
									className="px-10 h-16 text-lg rounded-2xl w-full sm:w-auto"
								>
									Explore Products
								</Button>
							</Link>
							<Link href="#bulk-deals" className="w-full sm:w-auto">
								<Button
									variant="outline"
									size="lg"
									fullWidth={false}
									className="px-10 h-16 text-lg rounded-2xl bg-white/50 backdrop-blur-sm w-full sm:w-auto"
								>
									Bulk Buying options
								</Button>
							</Link>
						</div>

						{/* Trust Indicators inside hero */}
						<div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
							<div className="flex items-center gap-2">
								<span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
									<ShieldCheck className="w-4 h-4 text-primary" />
								</span>
								<span className="font-semibold text-sm">Certified Quality</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
									<Truck className="w-4 h-4 text-primary" />
								</span>
								<span className="font-semibold text-sm">Nationwide Delivery</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Grid */}
			<section className="py-24 md:py-32 bg-background relative -mt-10 z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
						<div className="max-w-2xl">
							<h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
								Shop by Category
							</h2>
							<p className="text-lg text-text-secondary leading-relaxed">
								Browse our curated collections of premium biomass and coconut materials prepared for top tier performance.
							</p>
						</div>
						<div className="hidden md:block">
							<Link href="/products/all" className="inline-flex items-center font-bold text-primary hover:text-primary-dark transition-colors group">
								View All Categories
								<ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>
					</div>

					{collections.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{collections.map((collection: Collection, index: number) => (
								<Link
									key={collection.id}
									href={`/products/${collection.handle}`}
									className="group block"
								>
									<Card 
										variant="flat"
										className="relative h-[480px] overflow-hidden rounded-[32px] w-full"
									>
										{/* Big Background Image */}
										{collection.image ? (
											<Image
												src={collection.image.url}
												alt={collection.image.altText || collection.title}
												fill
												className="object-cover transition-transform duration-1000 group-hover:scale-110"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
										) : (
											<div className="absolute inset-0 bg-gradient-to-br from-surface-alt to-border flex items-center justify-center">
												<span className="text-7xl opacity-20">🌿</span>
											</div>
										)}
										
										{/* Gradient Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

										{/* Content */}
										<div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300">
											<h3 className="text-3xl font-bold text-white mb-3">
												{collection.title}
											</h3>
											<p className="text-white/80 line-clamp-2 mb-6 font-medium">
												{collection.description || `Explore our high quality ${collection.title.toLowerCase()} collection`}
											</p>
											<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-xl font-semibold opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
												Shop Now
												<ChevronRight className="w-4 h-4" />
											</div>
										</div>
									</Card>
								</Link>
							))}
						</div>
					) : (
						<div className="text-center py-24 bg-surface-alt rounded-[32px] border border-border">
							<div className="text-6xl mb-4">🛍️</div>
							<p className="text-xl font-bold text-foreground mb-2">
								Collections coming soon
							</p>
							<p className="text-text-secondary">
								Add collections in your Shopify admin to display them here.
							</p>
						</div>
					)}
					
					{/* Mobile view all link */}
					<div className="mt-8 text-center md:hidden">
						<Link href="/products/all" className="inline-flex items-center font-bold text-primary bg-primary/10 px-6 py-3 rounded-xl">
							View All Categories
							<ChevronRight className="w-5 h-5 ml-1" />
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section - Reimagined */}
			<section className="py-24 bg-surface-alt my-12 rounded-[40px] md:rounded-[80px] mx-4 sm:mx-6 lg:mx-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-20 max-w-3xl mx-auto">
						<h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
							The Flame Wood Advantage
						</h2>
						<p className="text-xl text-text-secondary leading-relaxed">
							Trusted by hundreds of customers across India for uncompromising quality and reliability.
						</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, idx) => (
							<div
								key={feature.title}
								className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
							>
								<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
									<feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
								</div>
								<h3 className="text-xl font-bold text-foreground mb-3">
									{feature.title}
								</h3>
								<p className="text-text-secondary leading-relaxed font-medium">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Bulk Deals Banner */}
			<section id="bulk-deals" className="py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative overflow-hidden bg-foreground rounded-[40px] p-8 md:p-16 lg:p-20 text-white">
						{/* Abstract Backgrounds */}
						<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/40 to-secondary/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 opacity-70"></div>
						
						<div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
							<div className="max-w-xl text-center lg:text-left">
								<div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-bold mb-8 border border-white/20 text-white">
									💼 B2B Solutions
								</div>
								<h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
									Bulk Orders &<br /><span className="text-primary-light">Custom Pricing</span>
								</h2>
								<p className="text-xl mb-10 text-white/80 leading-relaxed font-medium">
									Special pricing designed for restaurants, bakeries, and industrial
									buyers. Get custom quotes for orders above 100kg with a dedicated account manager.
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
									<Button
										size="lg"
										className="bg-white text-foreground hover:bg-surface-alt px-8 h-14 rounded-xl text-lg shadow-xl shadow-white/10"
									>
										Request Custom Quote
									</Button>
									<Link href="/contact" className="w-full sm:w-auto">
										<Button
											variant="outline"
											size="lg"
											className="border-white/30 text-white hover:bg-white/10 hover:border-white px-8 h-14 rounded-xl text-lg w-full sm:w-auto"
										>
											Contact Sales
										</Button>
									</Link>
								</div>
							</div>
							
							<div className="hidden lg:block w-72 h-72 relative">
								<div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-3xl rotate-6 opacity-50 blur-xl"></div>
								<div className="absolute inset-0 bg-surface-alt rounded-3xl -rotate-6 shadow-2xl flex flex-col items-center justify-center p-8 text-foreground">
									<TrendingUp className="w-16 h-16 text-primary mb-4" />
									<h4 className="text-2xl font-black text-center mb-2">B2B Portal</h4>
									<p className="text-center font-medium text-text-secondary">Save up to 40% on bulk shipments</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Simple CTA */}
			<section className="py-24 text-center">
				<h2 className="text-4xl font-black text-foreground mb-6">Ready to experience the best?</h2>
				<Link href="/products/all">
					<Button size="lg" className="px-10 h-14 rounded-2xl text-lg group">
						Shop the Collection 
						<ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
					</Button>
				</Link>
			</section>
		</div>
	);
}
