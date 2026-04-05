import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";

/** Comfortable reading: ~68ch line length, clear hierarchy, relaxed leading. */
const proseLegal =
	"prose prose-neutral max-w-none text-base leading-[1.75] prose-headings:scroll-mt-24 prose-headings:text-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-xl prose-h2:leading-snug sm:prose-h2:text-2xl prose-h2:first:mt-0 prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-3 prose-h3:mt-9 prose-h3:mb-3 prose-h3:text-lg prose-h3:leading-snug prose-p:my-4 prose-p:text-[15px] prose-p:leading-[1.75] prose-p:text-text-secondary sm:prose-p:text-base sm:prose-p:leading-[1.75] prose-li:my-2 prose-li:text-[15px] prose-li:leading-relaxed sm:prose-li:text-base prose-li:text-text-secondary prose-li:marker:text-primary prose-strong:text-foreground prose-strong:font-semibold prose-a:text-primary prose-a:font-medium prose-a:underline-offset-2 prose-a:decoration-primary/35 hover:prose-a:decoration-primary prose-ul:my-5 prose-ol:my-5 prose-ul:pl-1 prose-ol:pl-1";

type TocItem = { id: string; label: string };

type LegalDocShellProps = {
	title: string;
	description: string;
	breadcrumbs: { label: string; href?: string }[];
	lastUpdated: string;
	estimatedRead?: string;
	toc?: TocItem[];
	children: ReactNode;
};

export function LegalDocShell({
	title,
	description,
	breadcrumbs,
	lastUpdated,
	estimatedRead,
	toc,
	children,
}: LegalDocShellProps) {
	return (
		<div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-hidden">
			<PageHeader
				title={title}
				description={description}
				breadcrumbs={breadcrumbs}
			/>

			<div className="w-full min-w-0 py-8 md:py-12 lg:py-14">
				<div className="mx-auto w-full min-w-0 max-w-7xl">
					<div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-tertiary sm:text-sm">
							<span className="tabular-nums">Last updated {lastUpdated}</span>
							{estimatedRead ? (
								<>
									<span className="text-border" aria-hidden>
										·
									</span>
									<span>{estimatedRead} read</span>
								</>
							) : null}
						</div>
						<Link
							href="/contact"
							className="text-sm font-medium text-primary hover:text-primary-dark"
						>
							Questions? Contact us →
						</Link>
					</div>

					<article className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[var(--shadow-card)]">
						{toc && toc.length > 0 ? (
							<div className="border-b border-border/70 bg-surface-alt/50 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
								<p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
									On this page
								</p>
								<nav aria-label="Table of contents">
									<ul className="grid list-none gap-2 sm:grid-cols-2 lg:grid-cols-3">
										{toc.map((item) => (
											<li key={item.id} className="min-w-0">
												<a
													href={`#${item.id}`}
													className="block rounded-lg py-1.5 text-sm leading-snug text-text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
												>
													{item.label}
												</a>
											</li>
										))}
									</ul>
								</nav>
							</div>
						) : null}
						<div
							className={`mx-auto w-full max-w-[68ch] px-5 py-9 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-14 ${proseLegal}`}
						>
							{children}
						</div>
					</article>

					<p className="mx-auto mt-10 max-w-[68ch] text-center text-[13px] leading-relaxed text-text-tertiary sm:text-sm">
						This page is provided for general information. For order-specific
						help, email{" "}
						<a
							href="mailto:support@flamewood.com"
							className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark"
						>
							support@flamewood.com
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
