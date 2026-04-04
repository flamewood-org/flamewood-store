import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { AuthModal } from "@/components/auth/AuthModal";
import { AuthUrlSync } from "@/components/auth/AuthUrlSync";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { DeliveryLocationModal } from "@/components/delivery/DeliveryLocationModal";
import { Footer } from "@/components/layout/Footer";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Providers } from "@/components/Providers";
import { WishlistSidebar } from "@/components/wishlist/WishlistSidebar";
import { AuthModalProvider } from "@/store/AuthModalContext";
import { CartProvider } from "@/store/CartContext";
import { DeliveryLocationProvider } from "@/store/DeliveryLocationContext";
import { siteShellClass } from "@/lib/site-layout";
import { WishlistProvider } from "@/store/WishlistContext";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Flame Wood - Premium Biomass & Coconut Products",
	description:
		"Quality firewood, coconut products, and biomass fuel sourced from Kerala, India. Bulk and retail orders with reliable delivery.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} h-full antialiased`}>
			<body className="min-h-full min-w-0 flex flex-col overflow-x-hidden bg-background text-foreground/95 selection:bg-primary/15 selection:text-foreground">
				<Providers>
					<AuthModalProvider>
						<DeliveryLocationProvider>
							<CartProvider>
								<WishlistProvider>
									<Suspense fallback={null}>
										<AuthUrlSync />
									</Suspense>
									<HeaderWrapper />
									<main className="flex min-h-0 flex-1 w-full min-w-0 flex-col overflow-x-hidden">
										<div
											className={`${siteShellClass} flex min-h-0 flex-1 flex-col`}
										>
											{children}
										</div>
									</main>
									<Footer />
									<CartSidebar />
									<WishlistSidebar />
									<DeliveryLocationModal />
									<AuthModal />
								</WishlistProvider>
							</CartProvider>
						</DeliveryLocationProvider>
					</AuthModalProvider>
				</Providers>
			</body>
		</html>
	);
}
