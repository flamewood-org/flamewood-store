import {
	Building2,
	CalendarClock,
	Package,
	Sparkles,
	Truck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function BusinessOrdersSection() {
	return (
		<section
			id="bulk-deals"
			className="py-12 pb-5 md:py-16 scroll-mt-24 overflow-hidden"
		>
			<div className="w-full min-w-0">
				<div
					className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 bg-black p-5 ring-1 ring-white/5 sm:p-6 md:p-10 lg:p-12"
					style={{ perspective: "1200px" }}
				>
					<div
						className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/[0.06] via-transparent to-transparent"
						aria-hidden
					/>

					<div className="relative grid lg:grid-cols-2 gap-10 lg:gap-12 items-center text-white">
						<div className="space-y-5 max-w-xl">
							<p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
								<span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
									<Sparkles className="w-3.5 h-3.5 text-white" aria-hidden />
								</span>
								Business orders
							</p>
							<h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-semibold tracking-tight text-balance leading-tight">
								Volume supply built around your run rate
							</h2>
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
										icon: Truck,
										label: "Volume discounts",
									},
									{
										icon: Building2,
										label: "GST-ready invoicing",
									},
								].map((item) => (
									<li
										key={item.label}
										className="flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.06] px-3 py-2.5 text-[13px] font-medium text-white/95 backdrop-blur-sm"
									>
										<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
											<item.icon
												className="w-4 h-4 text-white/90"
												aria-hidden
											/>
										</span>
										{item.label}
									</li>
								))}
							</ul>
							<div className="flex flex-wrap w-full gap-2 pt-2">
								<Link href="/contact">
									<Button
										size="md"
										className="cursor-pointer border-0 bg-white font-semibold text-black shadow-lg shadow-black/30 hover:bg-white/90"
									>
										Request a quote
									</Button>
								</Link>
								<Link href="/contact">
									<Button
										size="md"
										className="cursor-pointer border border-white/25 bg-transparent font-semibold text-white hover:border-white/40 hover:bg-white/10"
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
									className="absolute inset-0 rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
									style={{ transform: "translateZ(0px)" }}
								/>
								<div
									className="absolute inset-x-4 top-4 bottom-0 rounded-2xl border border-white/10 bg-zinc-800 shadow-xl ring-1 ring-white/5"
									style={{ transform: "translateZ(28px) translateY(-12px)" }}
								/>
								<div
									className="relative rounded-2xl border border-white/10 bg-white p-5 text-foreground shadow-[0_16px_48px_rgba(0,0,0,0.35)] md:p-6"
									style={{ transform: "translateZ(56px)" }}
								>
									<p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-primary">
										Sample bundle
									</p>
									<p className="mb-1 text-lg font-semibold text-foreground">
										Mixed biomass + coir
									</p>
									<p className="mb-4 text-xs leading-relaxed text-text-secondary">
										Tailored to kitchens, farms, or processing lines — moisture
										and grade matched to spec.
									</p>
									<div className="flex gap-2">
										<span className="inline-flex h-2 flex-1 rounded-full bg-border" />
										<span className="inline-flex h-2 w-1/3 rounded-full bg-foreground/20" />
										<span className="inline-flex h-2 w-8 rounded-full bg-foreground/40" />
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
