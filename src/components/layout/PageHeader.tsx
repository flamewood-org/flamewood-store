import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Crumb = { label: string; href?: string };

export function PageHeader({
	title,
	description,
	breadcrumbs,
}: {
	title: string;
	description?: string;
	breadcrumbs?: Crumb[];
}) {
	return (
		<div className="border-b border-border bg-surface min-w-0">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-8 min-w-0">
				{breadcrumbs && breadcrumbs.length > 0 && (
					<nav
						className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 text-xs text-text-secondary mb-3 sm:mb-4 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:overflow-visible"
						aria-label="Breadcrumb"
					>
						{breadcrumbs.map((c, i) => (
							<span
								key={`${c.label}-${i}`}
								className="flex items-center gap-1.5"
							>
								{i > 0 && (
									<ChevronRight className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
								)}
								{c.href ? (
									<Link
										href={c.href}
										className="hover:text-foreground transition-colors"
									>
										{c.label}
									</Link>
								) : (
									<span className="text-foreground/80">{c.label}</span>
								)}
							</span>
						))}
					</nav>
				)}
				<h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground tracking-tight text-balance break-words">
					{title}
				</h1>
				{description && (
					<p className="mt-2 text-sm md:text-[15px] text-text-secondary max-w-2xl leading-relaxed">
						{description}
					</p>
				)}
			</div>
		</div>
	);
}
