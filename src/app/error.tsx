"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-[60vh] flex items-center justify-center">
			<div className="w-full min-w-0 flex justify-center">
				<div className="text-center max-w-md">
					<h2 className="text-xl font-semibold text-foreground mb-3">
						Something went wrong
					</h2>
					<p className="text-text-secondary text-[15px] mb-6 leading-relaxed">
						{error.message || "An unexpected error occurred. Please try again."}
					</p>
					<Button type="button" onClick={reset}>
						Try again
					</Button>
				</div>
			</div>
		</div>
	);
}
