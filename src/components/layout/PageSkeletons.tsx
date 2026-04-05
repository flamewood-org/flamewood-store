import type { ReactNode } from "react";
import {
	CartItemSkeleton,
	ProductCardSkeleton,
	Skeleton,
} from "@/components/ui/Skeleton";

function LoadingStatus({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			role="status"
			aria-busy="true"
			aria-live="polite"
			className={className}
		>
			<span className="sr-only">Loading page…</span>
			{children}
		</div>
	);
}

/** Breadcrumb + title + optional description — matches PageHeader rhythm */
export function PageHeaderSkeleton({
	showBreadcrumbs = true,
}: {
	showBreadcrumbs?: boolean;
}) {
	return (
		<div className="w-full min-w-0 border-b border-border bg-surface">
			<div className="w-full min-w-0 py-8 sm:py-10 md:py-12">
				{showBreadcrumbs && (
					<div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
						<Skeleton className="h-3 w-14 rounded" />
						<Skeleton className="h-3 w-3 rounded-full" />
						<Skeleton className="h-3 w-24 rounded" />
					</div>
				)}
				<Skeleton className="h-8 max-w-md rounded-lg sm:h-9 md:h-10" />
				<Skeleton className="mt-3 h-4 max-w-xl rounded md:mt-4" />
				<Skeleton className="mt-2 h-4 max-w-lg rounded" />
			</div>
		</div>
	);
}

export function HomePageSkeleton() {
	return (
		<LoadingStatus className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-background">
			{/* Hero */}
			<div className="w-full min-w-0 border-b border-border/80 bg-background">
				<div className="mx-auto w-full max-w-7xl min-w-0 box-border py-5 md:py-10">
					<Skeleton className="relative w-full h-[min(32vh,240px)] sm:h-[min(36vh,280px)] md:h-[min(52vh,520px)] md:min-h-[400px] rounded-2xl" />
				</div>
			</div>

			{/* Promo Bar */}
			<div className="w-full min-w-0 border-b border-border bg-surface py-1 sm:py-2 px-0">
				<div className="flex flex-col divide-y divide-border md:flex-row md:divide-x md:divide-y-0">
					{Array.from({ length: 3 }, (_, i) => (
						<div key={`promo-skel-${i}`} className="flex flex-1 min-w-0 gap-3 px-4 py-4 sm:px-5 md:px-6 lg:px-8">
							<Skeleton className="h-7 w-7 shrink-0 rounded-full" />
							<div className="flex-1 space-y-2 pt-1">
								<Skeleton className="h-3 w-full rounded" />
								<Skeleton className="h-3 w-2/3 rounded" />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Shop by category */}
			<div className="py-10 sm:py-12 md:py-14">
				<div className="mb-8 space-y-3 sm:mb-10 text-center">
					<Skeleton className="mx-auto h-8 w-64 rounded-lg" />
					<Skeleton className="mx-auto h-4 w-96 max-w-full rounded" />
				</div>
				<div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
					{Array.from({ length: 3 }, (_, i) => (
						<div
							key={`home-cat-${i}`}
							className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-sm"
						>
							<Skeleton className="aspect-4/3 w-full rounded-none" />
							<div className="space-y-3 p-4 sm:p-6">
								<Skeleton className="h-5 w-1/2 rounded" />
								<div className="space-y-2">
									<Skeleton className="h-3 w-full rounded" />
									<Skeleton className="h-3 w-4/5 rounded" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Business Section */}
			<div className="py-10 md:py-14">
				<Skeleton className="min-h-[320px] w-full rounded-3xl bg-neutral-900" />
			</div>

			{/* Trust indicators */}
			<div className="py-8 border-b border-border/60">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
					{Array.from({ length: 3 }, (_, i) => (
						<div key={`trust-${i}`} className="flex gap-3">
							<Skeleton className="h-8 w-8 shrink-0 rounded-md" />
							<div className="min-w-0 flex-1 space-y-2.5 pt-1">
								<Skeleton className="h-4 w-28 rounded" />
								<Skeleton className="h-3 w-full rounded" />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* CTA */}
			<div className="py-10 md:py-12">
				<Skeleton className="min-h-[160px] w-full rounded-2xl bg-primary/5" />
			</div>
		</LoadingStatus>
	);
}

export function MarketingPageSkeleton() {
	return (
		<LoadingStatus className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-background">
			<PageHeaderSkeleton />
			<div className="w-full min-w-0 py-8 md:py-10">
				<div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
					<Skeleton className="aspect-4/3 w-full rounded-xl border border-border bg-surface-alt" />
					<div className="space-y-4">
						{Array.from({ length: 5 }, (_, i) => (
							<Skeleton key={`mk-p-${i}`} className="h-4 w-full rounded" />
						))}
						<Skeleton className="h-4 w-4/5 rounded" />
					</div>
				</div>
			</div>
		</LoadingStatus>
	);
}

export function ContactPageSkeleton() {
	return (
		<LoadingStatus className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background">
			<PageHeaderSkeleton />
			<div className="w-full min-w-0 py-8 md:py-10">
				<div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
					<div className="space-y-4 lg:col-span-1">
						{Array.from({ length: 4 }, (_, i) => (
							<Skeleton
								key={`cs-${i}`}
								className="h-28 w-full rounded-xl border border-border"
							/>
						))}
					</div>
					<div className="space-y-4 rounded-xl border border-border bg-surface p-6 md:p-8 lg:col-span-2">
						<Skeleton className="mb-2 h-5 w-24 rounded" />
						<div className="grid gap-4 sm:grid-cols-2">
							<Skeleton className="h-11 w-full rounded-lg" />
							<Skeleton className="h-11 w-full rounded-lg" />
						</div>
						<Skeleton className="h-11 w-full rounded-lg" />
						<Skeleton className="h-28 w-full rounded-lg" />
						<Skeleton className="h-11 w-full max-w-[180px] rounded-lg" />
					</div>
				</div>
			</div>
		</LoadingStatus>
	);
}

export function LegalPageSkeleton() {
	return (
		<LoadingStatus className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-hidden">
			<PageHeaderSkeleton />
			<div className="w-full min-w-0 py-8 md:py-12 lg:py-14">
				<div className="mx-auto w-full min-w-0 max-w-7xl">
					<div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
						<div className="flex flex-wrap gap-3">
							<Skeleton className="h-4 w-40 rounded" />
							<Skeleton className="h-4 w-28 rounded" />
						</div>
						<Skeleton className="h-4 w-36 rounded" />
					</div>
					<div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-(--shadow-card)">
						<div className="border-b border-border/70 bg-surface-alt/50 px-5 py-5 sm:px-8 sm:py-6">
							<Skeleton className="mb-3 h-3 w-28 rounded" />
							<div className="grid list-none gap-2 sm:grid-cols-2 lg:grid-cols-3">
								{Array.from({ length: 6 }, (_, i) => (
									<Skeleton
										key={`toc-${i}`}
										className="h-9 w-full rounded-lg"
									/>
								))}
							</div>
						</div>
						<div className="mx-auto w-full max-w-[68ch] space-y-4 px-5 py-9 sm:px-6 sm:py-10 md:py-12 lg:px-8 lg:py-14">
							{Array.from({ length: 12 }, (_, i) => (
								<Skeleton
									key={`legal-line-${i}`}
									className={`h-4 rounded ${i % 5 === 4 ? "w-2/3" : "w-full"}`}
								/>
							))}
						</div>
					</div>
					<Skeleton className="mx-auto mt-10 h-12 max-w-[68ch] rounded-lg" />
				</div>
			</div>
		</LoadingStatus>
	);
}

export function CartPageSkeleton() {
	return (
		<LoadingStatus className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background">
			<div className="border-b border-border bg-surface">
				<div className="w-full min-w-0 py-3 sm:py-4">
					<Skeleton className="h-4 w-40 rounded" />
				</div>
			</div>
			<div className="w-full min-w-0 py-8 md:py-12">
				<div className="mb-6">
					<Skeleton className="h-8 w-48 rounded-lg" />
				</div>
				<div className="space-y-4">
					{Array.from({ length: 3 }, (_, i) => (
						<CartItemSkeleton key={`cart-load-${i}`} />
					))}
				</div>
				<div className="mt-8 flex justify-end border-t border-border pt-6">
					<Skeleton className="h-28 w-full max-w-sm rounded-xl" />
				</div>
			</div>
		</LoadingStatus>
	);
}

export function WishlistPageSkeleton() {
	return (
		<LoadingStatus className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background">
			<PageHeaderSkeleton />
			<div className="flex w-full min-w-0 flex-col items-center py-8 md:py-10">
				<Skeleton className="mb-6 h-12 w-12 rounded-full" />
				<Skeleton className="mb-8 h-4 max-w-md rounded" />
				<Skeleton className="h-40 w-full max-w-lg rounded-xl border border-border" />
			</div>
		</LoadingStatus>
	);
}

export function TrackOrderPageSkeleton() {
	return (
		<LoadingStatus className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-background">
			<PageHeaderSkeleton />
			<div className="flex w-full min-w-0 flex-1 flex-col items-center py-10 md:py-14">
				<Skeleton className="mb-6 h-14 w-14 rounded-full" />
				<Skeleton className="mb-8 h-4 max-w-md rounded" />
				<div className="w-full max-w-md space-y-3">
					<Skeleton className="h-11 w-full rounded-lg" />
					<Skeleton className="h-11 w-full rounded-lg" />
				</div>
			</div>
		</LoadingStatus>
	);
}

export function AccountPageSkeleton() {
	return (
		<LoadingStatus className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background pb-24">
			<div className="border-b border-border bg-surface pb-6 pt-10">
				<div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
					<div className="flex items-center gap-5">
						<Skeleton className="h-16 w-16 shrink-0 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-8 w-48 rounded-lg" />
							<Skeleton className="h-4 w-64 max-w-full rounded" />
						</div>
					</div>
					<Skeleton className="hidden h-10 w-32 rounded-lg md:block" />
				</div>
			</div>
			<div className="flex w-full min-w-0 flex-col gap-8 py-8 lg:flex-row">
				<div className="w-full shrink-0 space-y-2 lg:w-64">
					{Array.from({ length: 4 }, (_, i) => (
						<Skeleton key={`acc-nav-${i}`} className="h-12 w-full rounded-xl" />
					))}
				</div>
				<div className="min-h-[280px] flex-1 rounded-2xl border border-border bg-surface p-6">
					<Skeleton className="mb-4 h-6 w-40 rounded" />
					<div className="space-y-3">
						{Array.from({ length: 6 }, (_, i) => (
							<Skeleton key={`acc-body-${i}`} className="h-4 w-full rounded" />
						))}
					</div>
				</div>
			</div>
		</LoadingStatus>
	);
}

export function ProductCategoryPageSkeleton() {
	return (
		<LoadingStatus className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background pb-12 md:pb-16">
			<PageHeaderSkeleton />
			<div className="w-full min-w-0 pt-6 md:pt-8">
				<div className="space-y-2 border-b border-border/80 pb-6">
					<Skeleton className="h-4 w-full max-w-xl rounded" />
					<Skeleton className="h-4 w-48 rounded" />
				</div>
				<div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
					{Array.from({ length: 8 }, (_, i) => (
						<ProductCardSkeleton key={`pl-${i}`} />
					))}
				</div>
			</div>
		</LoadingStatus>
	);
}

/** PDP layout — also used by client loading state */
export function ProductDetailPageSkeleton() {
	return (
		<LoadingStatus className="min-h-screen min-w-0 overflow-x-hidden bg-background pb-20 sm:pb-24">
			<div className="w-full min-w-0 py-8 md:py-12">
				<div className="animate-pulse">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
						<div className="space-y-4 lg:col-span-7">
							<div className="aspect-square rounded-2xl bg-surface-alt" />
							<div className="flex gap-3 overflow-x-auto pb-2">
								{Array.from({ length: 4 }, (_, i) => (
									<div
										key={`pdp-th-${i}`}
										className="h-20 w-20 shrink-0 rounded-xl bg-surface-alt"
									/>
								))}
							</div>
						</div>
						<div className="lg:col-span-5">
							<div className="mb-6 h-6 w-24 rounded-full bg-surface-alt" />
							<div className="mb-4 h-10 w-3/4 rounded-lg bg-surface-alt" />
							<div className="mb-8 h-6 w-1/2 rounded-lg bg-surface-alt" />
							<div className="mb-8 h-24 rounded-2xl bg-surface-alt" />
							<div className="mb-8 h-16 rounded-2xl bg-surface-alt" />
							<div className="h-32 rounded-2xl bg-surface-alt" />
						</div>
					</div>
				</div>
			</div>
		</LoadingStatus>
	);
}
