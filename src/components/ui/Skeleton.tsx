interface SkeletonProps {
	className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
	return (
		<div
			className={`animate-pulse bg-gray-200 rounded ${className}`}
			aria-hidden="true"
		/>
	);
}

export function ProductCardSkeleton() {
	return (
		<div className="bg-surface rounded-lg border border-border p-4">
			<Skeleton className="h-48 w-full mb-4" />
			<Skeleton className="h-4 w-3/4 mb-2" />
			<Skeleton className="h-3 w-1/2 mb-4" />
			<div className="flex gap-2 mb-4">
				<Skeleton className="h-8 w-16" />
				<Skeleton className="h-8 w-16" />
				<Skeleton className="h-8 w-16" />
			</div>
			<Skeleton className="h-10 w-full" />
		</div>
	);
}

export function CartItemSkeleton() {
	return (
		<div className="flex gap-4 p-4 border border-border rounded-lg">
			<Skeleton className="h-20 w-20 flex-shrink-0" />
			<div className="flex-1">
				<Skeleton className="h-4 w-3/4 mb-2" />
				<Skeleton className="h-3 w-1/2 mb-2" />
				<Skeleton className="h-8 w-24" />
			</div>
			<Skeleton className="h-8 w-20" />
		</div>
	);
}
