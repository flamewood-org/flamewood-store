import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types/product";

function stripHtml(html: string | undefined): string {
	if (!html) return "";
	return html
		.replace(/<[^>]+>/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

function collectionBlurb(description: string | undefined): string {
	const plain = stripHtml(description);
	if (!plain) return "Curated picks from this line.";
	if (plain.length <= 96) return plain;
	return `${plain.slice(0, 96).trim()}…`;
}

export function ShopByCategorySection({
	collections,
}: {
	collections: Collection[];
}) {
	return (
		<section
			id="shop-categories"
			className="w-full min-w-0 scroll-mt-24 border-b border-border/50 py-12 sm:py-14 md:py-16 lg:py-20"
		>
			<div className="w-full min-w-0">
				<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
					<div className="min-w-0 space-y-2 sm:space-y-3">
						<p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
							Catalog
						</p>
						<h2 className="text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem] md:text-4xl md:tracking-tighter">
							Shop by category
						</h2>
						<p className="max-w-xl text-sm leading-relaxed text-text-secondary sm:text-[15px]">
							Browse collections by product type — same inventory as the store,
							optimized for quick scanning on any screen.
						</p>
					</div>
					<Link
						href="/products/all"
						className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/25 hover:bg-surface-alt hover:text-primary sm:self-auto"
					>
						View all products
						<ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
					</Link>
				</div>

				{collections.length > 0 ? (
					<ul className="mt-10 grid list-none grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3 lg:gap-6">
						{collections.map((collection) => {
							const blurb = collectionBlurb(collection.description);
							return (
								<li key={collection.id} className="min-w-0">
									<Link
										href={`/products/${collection.handle}`}
										className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-(--shadow-card-hover)"
									>
										<div className="relative aspect-5/4 w-full overflow-hidden bg-surface-alt sm:aspect-4/3">
											{collection.image ? (
												<Image
													src={collection.image.url}
													alt={
														collection.image.altText?.trim() || collection.title
													}
													fill
													className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
													sizes="(max-width: 1023px) 50vw, 33vw"
												/>
											) : (
												<div
													className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/6 via-surface-alt to-secondary/5 text-4xl opacity-90"
													aria-hidden
												>
													🌿
												</div>
											)}
										</div>
										<div className="flex min-h-0 flex-1 flex-col gap-2 p-3 sm:gap-4 sm:p-5">
											<div className="min-w-0 flex-1 ">
												<h3 className="text-pretty line-clamp-2 uppercase text-xs font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-base sm:leading-snug md:text-lg">
													{collection.title}
												</h3>
												<p className="text-pretty text-xs leading-relaxed text-text-secondary line-clamp-2 sm:text-sm">
													{blurb}
												</p>
											</div>
											<span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary sm:text-sm">
												Open collection
												<ArrowUpRight
													className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
													aria-hidden
												/>
											</span>
										</div>
									</Link>
								</li>
							);
						})}
					</ul>
				) : (
					<div className="mt-10 rounded-2xl border border-dashed border-border bg-surface/80 px-6 py-14 text-center sm:mt-12 sm:py-16">
						<p className="text-sm font-medium text-foreground">
							No collections yet
						</p>
						<p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
							Add collections in the dashboard — they will show up here automatically.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
