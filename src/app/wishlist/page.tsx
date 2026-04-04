import { Heart } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata = {
	title: "Wishlist - Flame Wood",
	description: "View your saved products",
};

export default function WishlistPage() {
	return (
		<div className="bg-background min-h-screen min-w-0 overflow-x-hidden">
			<PageHeader
				title="Wishlist"
				description="Saved products appear here when you’re signed in."
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
			/>

			<div className="w-full min-w-0 py-8 md:py-10">
				<div className="flex flex-col items-center text-center max-w-md mx-auto mb-8">
					<div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4">
						<Heart className="h-5 w-5 text-primary" />
					</div>
					<p className="text-[15px] text-text-secondary leading-relaxed">
						We&apos;re finishing wishlist sync with your account. You can still
						browse and shop as usual.
					</p>
				</div>

				<div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
					<p className="text-text-secondary text-sm mb-5">
						Sign in to access saved items when the feature is enabled.
					</p>
					<Link href="/account">
						<Button size="lg">Sign in</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
