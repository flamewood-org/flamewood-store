"use client";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-[60vh] flex items-center justify-center px-4">
			<div className="text-center max-w-md">
				<h2 className="text-3xl font-bold text-foreground mb-4">
					Something went wrong!
				</h2>
				<p className="text-text-secondary mb-6">
					{error.message || "An unexpected error occurred. Please try again."}
				</p>
				<button
					type="button"
					onClick={reset}
					className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
				>
					Try again
				</button>
			</div>
		</div>
	);
}
