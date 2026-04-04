import { Leaf, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
	title: "About — FlameWood",
};

export default function AboutPage() {
	return (
		<div className="bg-background min-h-screen min-w-0 overflow-x-hidden">
			<PageHeader
				title="About FlameWood"
				description="Fuel and fibre from Kerala, built around straightforward quality and delivery."
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
			/>

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
					<div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-surface-alt">
						<Image
							src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80"
							alt="Forest"
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
					<div className="space-y-4 text-[15px] text-text-secondary leading-relaxed">
						<p>
							We started FlameWood to supply dependable firewood, biomass, and
							coconut-based products to homes and businesses that care about
							burn quality and consistency — not flashy packaging.
						</p>
						<p>
							Material is sourced and prepared in Kerala, with moisture and
							grading kept in check so what you order matches what you receive.
						</p>
						<div className="grid sm:grid-cols-2 gap-4 pt-2">
							<div className="flex gap-3">
								<div className="w-9 h-9 rounded-lg border border-border bg-surface flex items-center justify-center shrink-0">
									<Leaf className="w-4 h-4 text-primary" />
								</div>
								<div>
									<p className="text-sm font-medium text-foreground">
										Natural feedstock
									</p>
									<p className="text-xs text-text-secondary mt-0.5 leading-snug">
										No chemical additives in standard lines.
									</p>
								</div>
							</div>
							<div className="flex gap-3">
								<div className="w-9 h-9 rounded-lg border border-border bg-surface flex items-center justify-center shrink-0">
									<ShieldCheck className="w-4 h-4 text-primary" />
								</div>
								<div>
									<p className="text-sm font-medium text-foreground">
										Checked batches
									</p>
									<p className="text-xs text-text-secondary mt-0.5 leading-snug">
										Basic QC before each dispatch.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
