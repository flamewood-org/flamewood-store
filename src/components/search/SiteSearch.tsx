"use client";

import { ArrowRight, Loader2, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type SearchHit = {
	id: string;
	title: string;
	handle: string;
	href: string;
	imageUrl: string | null;
	price: number;
	vendor: string | null;
};

type SiteSearchProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function SiteSearch({ open, onOpenChange }: SiteSearchProps) {
	const id = useId();
	const [query, setQuery] = useState("");
	const [debounced, setDebounced] = useState("");
	const [results, setResults] = useState<SearchHit[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const t = setTimeout(() => setDebounced(query.trim()), 280);
		return () => clearTimeout(t);
	}, [query]);

	useEffect(() => {
		if (!open) return;
		if (debounced.length < 2) {
			setResults([]);
			setLoading(false);
			setError(null);
			return;
		}

		let cancelled = false;
		setLoading(true);
		setError(null);

		fetch(`/api/search?q=${encodeURIComponent(debounced)}`)
			.then((res) => {
				if (!res.ok) throw new Error("Search failed");
				return res.json();
			})
			.then((data: { results?: SearchHit[] }) => {
				if (!cancelled) setResults(data.results ?? []);
			})
			.catch(() => {
				if (!cancelled) {
					setError("Could not load results.");
					setResults([]);
				}
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [debounced, open]);

	const close = useCallback(() => {
		onOpenChange(false);
		setQuery("");
		setDebounced("");
		setResults([]);
		setError(null);
	}, [onOpenChange]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				onOpenChange(!open);
			}
			if (e.key === "Escape" && open) onOpenChange(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onOpenChange]);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
			requestAnimationFrame(() => inputRef.current?.focus());
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onPointer = (e: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(e.target as Node) &&
				!(e.target as HTMLElement).closest("[data-site-search-trigger]")
			) {
				close();
			}
		};
		document.addEventListener("mousedown", onPointer);
		return () => document.removeEventListener("mousedown", onPointer);
	}, [open, close]);

	const allResultsHref =
		debounced.length >= 2
			? `/products/all?search=${encodeURIComponent(debounced)}`
			: "/products/all";

	return (
		<>
			<button
				type="button"
				data-site-search-trigger
				onClick={() => onOpenChange(true)}
				className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-alt hover:text-foreground md:h-auto md:w-auto md:min-w-[200px] md:max-w-xs md:justify-start md:gap-2 md:rounded-lg md:border md:border-border md:bg-surface-alt/80 md:px-2.5 md:py-1.5 md:text-sm"
				aria-expanded={open}
				aria-controls={`${id}-search-panel`}
				aria-label="Search products"
			>
				<Search
					className="h-[22px] w-[22px] shrink-0 opacity-80 md:h-4 md:w-4 md:opacity-70"
					strokeWidth={1.75}
					aria-hidden
				/>
				<span className="hidden md:inline truncate text-left flex-1">
					Search products…
				</span>
				<kbd className="hidden md:inline pointer-events-none rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary tabular-nums">
					⌘K
				</kbd>
			</button>

			{open && (
				<div
					className="fixed inset-0 z-[60] flex items-start justify-center pt-[min(12vh,120px)] px-3 sm:px-4"
					role="presentation"
				>
					<button
						type="button"
						className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]"
						aria-label="Close search"
						onClick={close}
					/>
					<div
						ref={panelRef}
						id={`${id}-search-panel`}
						role="dialog"
						aria-modal="true"
						aria-labelledby={`${id}-search-title`}
						className="relative w-full max-w-xl rounded-2xl border border-border bg-surface shadow-[var(--shadow-card),0_24px_48px_rgba(0,0,0,0.08)] overflow-hidden animate-fade-in"
					>
						<div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
							<Search className="h-4 w-4 text-text-tertiary shrink-0" />
							<input
								ref={inputRef}
								type="search"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Search by name, type, or keyword…"
								className="flex-1 min-w-0 bg-transparent py-2 text-[15px] text-foreground placeholder:text-text-tertiary outline-none"
								autoComplete="off"
								autoCorrect="off"
								spellCheck={false}
								aria-describedby={`${id}-search-hint`}
							/>
							{loading && (
								<Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
							)}
							<button
								type="button"
								onClick={close}
								className="p-1.5 rounded-lg text-text-secondary hover:bg-surface-alt hover:text-foreground"
								aria-label="Close"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
						<p id={`${id}-search-hint`} className="sr-only">
							Results update as you type. Press Escape to close.
						</p>
						<h2 id={`${id}-search-title`} className="sr-only">
							Search products
						</h2>

						<div className="max-h-[min(55vh,420px)] overflow-y-auto">
							{debounced.length > 0 && debounced.length < 2 && (
								<p className="px-4 py-6 text-sm text-text-secondary text-center">
									Type at least 2 characters
								</p>
							)}
							{error && (
								<p className="px-4 py-6 text-sm text-error text-center">
									{error}
								</p>
							)}
							{!loading &&
								debounced.length >= 2 &&
								!error &&
								results.length === 0 && (
									<p className="px-4 py-8 text-sm text-text-secondary text-center">
										No matches for &ldquo;{debounced}&rdquo;
									</p>
								)}
							<ul className="py-1">
								{results.map((hit) => (
									<li key={hit.id}>
										<Link
											href={hit.href}
											onClick={close}
											className="flex items-center gap-3 px-3 py-2.5 hover:bg-surface-alt transition-colors"
										>
											<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-alt border border-border/60">
												{hit.imageUrl ? (
													<Image
														src={hit.imageUrl}
														alt=""
														fill
														className="object-cover"
														sizes="48px"
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center text-lg opacity-40">
														📦
													</div>
												)}
											</div>
											<div className="min-w-0 flex-1 text-left">
												<p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
													{hit.title}
												</p>
												<p className="text-xs text-text-tertiary mt-0.5 truncate">
													{hit.vendor || "FlameWood"} · ₹{hit.price.toFixed(2)}
												</p>
											</div>
											<ArrowRight className="h-4 w-4 text-text-tertiary shrink-0" />
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="border-t border-border bg-surface-alt/50 px-3 py-2.5 flex items-center justify-between gap-2">
							<Link
								href={allResultsHref}
								onClick={close}
								className="text-xs font-medium text-primary hover:text-primary-dark inline-flex items-center gap-1"
							>
								{debounced.length >= 2
									? "View all in catalog"
									: "Browse catalog"}
								<ArrowRight className="h-3.5 w-3.5" />
							</Link>
							<span className="text-[11px] text-text-tertiary hidden sm:inline">
								Esc closes
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
