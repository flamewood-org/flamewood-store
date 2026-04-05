import { ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const TRUST_POINTS = [
	"Secure Encrypted Checkout",
	"Live inventory & weights",
	"Bulk & custom quotes",
] as const;

export function OrderReadyCta() {
	return (
		<section
			className="relative w-full min-w-0 py-14 sm:py-16 md:py-20 lg:py-24"
			aria-labelledby="order-ready-heading"
		>
			{/* Soft spotlight behind the card */}
			<div
				className="pointer-events-none absolute inset-x-0 top-1/2 h-[min(70%,28rem)] -translate-y-1/2 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(204,85,88,0.14),transparent_65%)]"
				aria-hidden
			/>

			<div className="relative w-full min-w-0">
				<div className="relative overflow-hidden rounded-3xl border-2 border-primary/25 bg-surface shadow-[0_4px_24px_rgba(204,85,88,0.12),0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-primary/10">
					{/* Warm wash + corner accents */}
					<div
						className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/11 via-accent/8 to-secondary/8"
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute -right-8 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl sm:h-80 sm:w-80"
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute right-2 top-6 text-primary/[0.07] sm:right-6 sm:top-8 md:right-10 md:top-10"
						aria-hidden
					>
						<ShoppingBag
							className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44"
							strokeWidth={1}
						/>
					</div>

					<div className="relative grid gap-10 p-6 sm:p-8 md:gap-12 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:p-12">
						<div className="min-w-0 space-y-5 md:space-y-6">
							<div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark shadow-sm">
								<span
									className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_0_3px_rgba(204,85,88,0.25)]"
									aria-hidden
								/>
								Order ready
							</div>

							<div className="space-y-3 md:space-y-4">
								<h2
									id="order-ready-heading"
									className="text-pretty text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl md:text-4xl md:leading-[1.1] lg:text-[2.35rem]"
								>
									Ready to{" "}
									<span className="relative whitespace-nowrap text-primary">
										<span className="relative z-10">place an order?</span>
										<span
											className="absolute -inset-x-1 -bottom-1 top-[60%] z-0 rounded-md bg-primary/15 sm:-inset-x-2"
											aria-hidden
										/>
									</span>
								</h2>
								<p className="max-w-xl text-[15px] leading-relaxed text-text-secondary sm:text-base">
									Jump into the catalog, choose pack sizes, and check out in
									minutes. For custom loads or contract supply, our team is one
									message away.
								</p>
							</div>

							<ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
								{TRUST_POINTS.map((label) => (
									<li
										key={label}
										className="flex items-center gap-2 text-sm font-medium text-foreground/90"
									>
										<CheckCircle2
											className="h-4 w-4 shrink-0 text-primary"
											strokeWidth={2}
											aria-hidden
										/>
										{label}
									</li>
								))}
							</ul>
						</div>

						<div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-stretch lg:flex-col lg:items-stretch xl:min-w-68">
							<Link
								href="/products/all"
								className="inline-flex sm:flex-1 lg:flex-none"
							>
								<Button
									size="lg"
									className="w-full min-h-[48px] gap-2 shadow-lg shadow-primary/25 sm:min-w-[200px]"
								>
									Browse products
									<ArrowRight className="h-4 w-4" aria-hidden />
								</Button>
							</Link>
							<Link
								href="/contact"
								className="inline-flex sm:flex-1 lg:flex-none"
							>
								<Button
									variant="outline"
									size="lg"
									className="w-full min-h-[48px] border-primary/25 bg-surface/80 backdrop-blur-sm hover:border-primary/45 hover:bg-surface sm:min-w-[180px]"
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
