import { CheckCircle2, Flame, Leaf, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const metadata = {
	title: "About Us - FlameWood",
};

export default function AboutPage() {
	return (
		<div className="bg-background min-h-screen">
			{/* Hero */}
			<div className="bg-foreground text-white py-24 md:py-32 rounded-b-[40px] md:rounded-b-[80px] px-4 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
				<div className="max-w-7xl mx-auto text-center relative z-10">
					<h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
						Our Story
					</h1>
					<p className="text-xl text-white/70 max-w-3xl mx-auto">
						Born in the lush landscapes of Kerala, FlameWood was created to
						bring premium, sustainable fire and biomass solutions to the world.
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse group">
					<div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] shadow-2xl">
						<Image
							src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80"
							alt="Forest"
							fill
							className="object-cover transition-transform duration-1000 group-hover:scale-105"
						/>
					</div>
					<div>
						<h2 className="text-4xl font-black mb-6 text-foreground">
							The FlameWood Standard
						</h2>
						<p className="text-lg text-text-secondary leading-relaxed mb-6">
							At FlameWood, we believe that the quality of your fuel determines
							the quality of your experience. Be it a roaring campfire, a
							professional kiln, or a family barbecue.
						</p>
						<p className="text-lg text-text-secondary leading-relaxed mb-10">
							We meticulously source our wood and coconut shells from organic
							farms across South India. Every piece is sun-dried, sorted, and
							packed to ensure a flawless, low-smoke burn.
						</p>

						<div className="grid sm:grid-cols-2 gap-6">
							<div className="flex gap-4">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
									<Leaf className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h4 className="font-bold text-foreground">100% Organic</h4>
									<p className="text-sm text-text-secondary">
										Sourced naturally with zero chemical additives.
									</p>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
									<ShieldCheck className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h4 className="font-bold text-foreground">Quality Tested</h4>
									<p className="text-sm text-text-secondary">
										Moisture optimized for identical burns every time.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Core Values */}
			<div className="bg-surface-alt py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-black mb-16 text-foreground">
						Our Core Values
					</h2>
					<div className="grid md:grid-cols-3 gap-10">
						<div className="bg-white p-10 rounded-3xl shadow-lg border border-border">
							<Flame className="w-12 h-12 text-primary mx-auto mb-6" />
							<h3 className="text-2xl font-bold mb-4">Performance</h3>
							<p className="text-text-secondary">
								High thermal efficiency. We optimize density and moisture to
								give you maximum heat output.
							</p>
						</div>
						<div className="bg-white p-10 rounded-3xl shadow-lg border border-border mt-0 md:-mt-8 mb-0 md:mb-8">
							<Leaf className="w-12 h-12 text-primary mx-auto mb-6" />
							<h3 className="text-2xl font-bold mb-4">Sustainability</h3>
							<p className="text-text-secondary">
								We only use fallen or responsibly forested trees and repurposed
								coconut shells.
							</p>
						</div>
						<div className="bg-white p-10 rounded-3xl shadow-lg border border-border">
							<CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-6" />
							<h3 className="text-2xl font-bold mb-4">Reliability</h3>
							<p className="text-text-secondary">
								Logistics you can trust. Once you order from FlameWood, it
								arrives on time, exactly as promised.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
