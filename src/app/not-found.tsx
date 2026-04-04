import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
	return (
		<div className="min-h-[60vh] flex items-center justify-center px-4">
			<div className="text-center max-w-md">
				<h1 className="text-6xl font-bold text-primary mb-4">404</h1>
				<h2 className="text-2xl font-semibold text-foreground mb-4">
					Page Not Found
				</h2>
				<p className="text-text-secondary mb-8">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<Link href="/">
					<Button size="lg">Go Home</Button>
				</Link>
			</div>
		</div>
	);
}
