import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
	return (
		<div className="min-h-[60vh] flex items-center justify-center">
			<div className="w-full min-w-0 flex justify-center">
				<div className="text-center max-w-md">
					<h1 className="text-5xl font-semibold text-primary/90 tabular-nums mb-2">
						404
					</h1>
					<h2 className="text-xl font-semibold text-foreground mb-3">
						Page not found
					</h2>
					<p className="text-text-secondary text-[15px] mb-8 leading-relaxed">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved.
					</p>
					<Link href="/">
						<Button size="lg">Go Home</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
