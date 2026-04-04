import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
	title: "Wishlist - Flame Wood",
	description: "View your saved products",
};

export default function WishlistPage() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="text-center mb-12">
				<Heart className="h-16 w-16 text-primary mx-auto mb-4" />
				<h1 className="text-4xl font-bold text-foreground mb-4">My Wishlist</h1>
				<p className="text-text-secondary max-w-2xl mx-auto">
					Save your favorite products for later. Your wishlist will be available
					when you sign in.
				</p>
			</div>

			<div className="bg-surface border border-border rounded-lg p-12 text-center">
				<p className="text-text-secondary mb-6">
					Wishlist feature coming soon! Sign in to save products for later.
				</p>
				<Link href="/account">
					<Button size="lg">Sign In</Button>
				</Link>
			</div>
		</div>
	);
}
