import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { DeliveryLocationModal } from "@/components/delivery/DeliveryLocationModal";
import { Footer } from "@/components/layout/Footer";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Providers } from "@/components/Providers";
import { WishlistSidebar } from "@/components/wishlist/WishlistSidebar";
import { CartProvider } from "@/store/CartContext";
import { DeliveryLocationProvider } from "@/store/DeliveryLocationContext";
import { WishlistProvider } from "@/store/WishlistContext";

const outfit = Outfit({
	subsets: ["latin"],
	variable: "--font-inter", // keeping the variable name same so we don't break globals.css
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
		<html lang="en" className={`${outfit.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
				<Providers>
					<DeliveryLocationProvider>
						<CartProvider>
							<WishlistProvider>
								<HeaderWrapper />
								<main className="flex-1 max-w-[1920px] mx-auto w-full">
									{children}
								</main>
								<Footer />
								<CartSidebar />
								<WishlistSidebar />
								<DeliveryLocationModal />
							</WishlistProvider>
						</CartProvider>
					</DeliveryLocationProvider>
				</Providers>
			</body>
		</html>
	);
}
