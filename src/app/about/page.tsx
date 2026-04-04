import { Package, Truck, ShieldCheck, Leaf } from "lucide-react";

export const metadata = {
	title: "About Us - Flame Wood",
	description:
		"Learn about Flame Wood's mission to deliver premium biomass fuel and coconut products from Kerala, India.",
};

export default function AboutPage() {
	const values = [
		{
			icon: Leaf,
			title: "Eco-Friendly",
			description:
				"Sustainable sourcing of natural biomass and coconut byproducts",
		},
		{
			icon: ShieldCheck,
			title: "Quality Assured",
			description:
				"Every product meets strict quality standards for moisture and purity",
		},
		{
			icon: Truck,
			title: "Reliable Delivery",
			description: "Fast and dependable shipping across India with tracking",
		},
		{
			icon: Package,
			title: "Bulk Ready",
			description: "Specialized packaging for retail and industrial orders",
		},
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Hero Section */}
			<div className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
					About Flame Wood
				</h1>
				<p className="text-lg text-text-secondary max-w-3xl mx-auto">
					Premium biomass fuel and coconut products sourced directly from
					Kerala, India. We&apos;re digitizing the traditional supply chain to
					bring you quality-assured natural fuel products.
				</p>
			</div>

			{/* Mission Section */}
			<div className="grid md:grid-cols-2 gap-12 items-center mb-16">
				<div>
					<h2 className="text-3xl font-bold text-foreground mb-4">
						Our Mission
					</h2>
					<p className="text-text-secondary mb-4">
						Flame Wood was born from a simple idea: the fragmented firewood and
						biomass industry needs modernization. We&apos;re building a
						transparent, reliable digital supply chain that connects traditional
						producers in Kerala with customers worldwide.
					</p>
					<p className="text-text-secondary">
						From households using traditional cooking methods to industrial
						biomass plants, we serve everyone who values quality,
						sustainability, and reliability in their fuel sources.
					</p>
				</div>
				<div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8">
					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
							<p className="text-foreground">
								<span className="font-semibold">Origin:</span> Kerala, India
							</p>
						</div>
						<div className="flex items-start space-x-3">
							<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
							<p className="text-foreground">
								<span className="font-semibold">Products:</span> Firewood,
								Coconut Products, Biomass Fuel
							</p>
						</div>
						<div className="flex items-start space-x-3">
							<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
							<p className="text-foreground">
								<span className="font-semibold">Service Area:</span> Pan-India
								with international expansion planned
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Values Section */}
			<div className="mb-16">
				<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
					Our Values
				</h2>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{values.map((value, index) => (
						<div
							key={index}
							className="bg-surface border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
						>
							<value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
							<h3 className="font-semibold text-foreground mb-2">
								{value.title}
							</h3>
							<p className="text-sm text-text-secondary">{value.description}</p>
						</div>
					))}
				</div>
			</div>

			{/* Story Section */}
			<div className="bg-surface border border-border rounded-lg p-8 md:p-12">
				<h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
				<div className="space-y-4 text-text-secondary">
					<p>
						Kerala has been a hub of coconut cultivation and biomass production
						for generations. However, the supply chain remained fragmented, with
						inconsistent quality and unreliable delivery.
					</p>
					<p>
						Flame Wood bridges this gap by combining traditional knowledge with
						modern technology. We work directly with local producers to ensure
						quality control, proper moisture levels, and sustainable harvesting
						practices.
					</p>
					<p>
						Today, we&apos;re proud to serve thousands of customers across
						India, from rural households to industrial buyers. Our vision
						extends beyond borders—we&apos;re building an export-ready platform
						to share Kerala&apos;s natural resources with the world.
					</p>
				</div>
			</div>
		</div>
	);
}
