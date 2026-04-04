import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function OrderReadyCta() {
	return (
		<section className="py-12 md:py-14 border-t border-border/70">
			<div className="w-full min-w-0">
				<div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
					<div className="absolute inset-0 bg-linear-to-br from-primary/[0.06] via-transparent to-secondary/[0.05] pointer-events-none" />
					<div className="absolute top-0 right-0 w-40 h-40 md:w-56 md:h-56 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

					<div className="relative px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 md:flex md:items-center md:justify-between gap-6 md:gap-8">
						<div className="max-w-lg">
							<div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt/80 px-3 py-1 text-[11px] font-medium text-text-secondary mb-4">
								<ShoppingBag className="w-3.5 h-3.5 text-primary" />
								Catalog checkout
							</div>
							<h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight text-balance">
								Ready to place an order?
							</h2>
							<p className="mt-2 text-sm text-text-secondary leading-relaxed">
								Browse live inventory, pick weights, and check out securely.
								Need something custom? Use contact and we&apos;ll line up a quote.
							</p>
						</div>
						<div className="mt-8 md:mt-0 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
							<Link href="/products/all" className="inline-flex">
								<Button size="lg" className="w-full sm:w-auto min-w-[180px] gap-2">
									Browse products
									<ArrowRight className="w-4 h-4" />
								</Button>
							</Link>
							<Link href="/contact" className="inline-flex">
								<Button
									variant="outline"
									size="lg"
									className="w-full sm:w-auto min-w-[160px] border-border"
								>
									Contact sales
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
