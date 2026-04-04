import { Building2, CalendarClock, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function BusinessOrdersSection() {
	return (
		<section
			id="bulk-deals"
			className="py-12 md:py-16 scroll-mt-24 overflow-hidden"
		>
			<div className="w-full min-w-0">
				<div
					className="relative rounded-xl sm:rounded-2xl md:rounded-3xl border border-border/80 bg-linear-to-br from-secondary via-[#5c3710] to-[#3d2408] p-5 sm:p-6 md:p-10 lg:p-12 text-white shadow-[0_24px_60px_-12px_rgba(60,35,8,0.45)]"
					style={{ perspective: "1200px" }}
				>
					{/* Ambient glow */}
					<div
						className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
						aria-hidden
					/>

					<div className="relative grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
						<div className="space-y-5 max-w-xl">
							<p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
								<Sparkles className="w-3.5 h-3.5 text-accent-light" />
								Business orders
							</p>
							<h2 className="text-2xl md:text-[1.65rem] font-semibold tracking-tight text-balance leading-snug">
								Volume supply built around your run rate
							</h2>
							<p className="text-sm text-white/75 leading-relaxed">
								Scheduled drops, palletised loads, and pricing that reflects
								commitment — tell us what you burn through each month and we&apos;ll
								structure delivery around it.
							</p>
							<ul className="grid sm:grid-cols-2 gap-3 pt-1">
								{[
									{
										icon: Package,
										label: "Contract-friendly SKUs",
									},
									{
										icon: CalendarClock,
										label: "Slotted freight windows",
									},
									{
										icon: Building2,
										label: "GST-ready invoicing",
									},
								].map((item) => (
									<li
										key={item.label}
										className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-[13px] text-white/90 backdrop-blur-sm"
									>
										<item.icon className="w-4 h-4 text-accent-light shrink-0" />
										{item.label}
									</li>
								))}
							</ul>
							<div className="flex flex-wrap gap-2 pt-2">
								<Link href="/contact">
									<Button
										size="md"
										className="bg-white text-secondary hover:bg-white/92 border-0 shadow-md shadow-black/10"
									>
										Request a quote
									</Button>
								</Link>
								<Link href="/contact">
									<Button
										variant="outline"
										size="md"
										className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
									>
										Talk to sales
									</Button>
								</Link>
							</div>
						</div>

						{/* 3D stack */}
						<div
							className="relative flex justify-center lg:justify-end min-h-[220px] lg:min-h-[280px]"
							aria-hidden
						>
							<div
								className="relative w-full max-w-[340px] [transform-style:preserve-3d]"
								style={{
									transform: "rotateY(-8deg) rotateX(6deg)",
								}}
							>
								<div
									className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/20 to-white/5 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
									style={{ transform: "translateZ(0px)" }}
								/>
								<div
									className="absolute inset-x-4 top-4 bottom-0 rounded-2xl bg-linear-to-br from-primary/90 to-primary-dark border border-white/25 shadow-xl"
									style={{ transform: "translateZ(28px) translateY(-12px)" }}
								/>
								<div
									className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-5 md:p-6 shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
									style={{ transform: "translateZ(56px)" }}
								>
									<p className="text-[10px] font-medium uppercase tracking-widest text-white/60 mb-2">
										Sample bundle
									</p>
									<p className="text-lg font-semibold text-white mb-1">
										Mixed biomass + coir
									</p>
									<p className="text-xs text-white/70 leading-relaxed mb-4">
										Tailored to kitchens, farms, or processing lines — moisture
										and grade matched to spec.
									</p>
									<div className="flex gap-2">
										<span className="inline-flex h-2 flex-1 rounded-full bg-white/25" />
										<span className="inline-flex h-2 w-1/3 rounded-full bg-accent/80" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
