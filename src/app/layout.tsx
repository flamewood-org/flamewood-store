import type { Metadata, Viewport } from "next";
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
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { WishlistSidebar } from "@/components/wishlist/WishlistSidebar";
import {
	getSiteUrlString,
	SITE_DESCRIPTION,
	SITE_LOGO_PNG,
	SITE_NAME,
	SITE_NAME_FULL,
	SITE_TAGLINE,
} from "@/lib/site-config";
import { siteShellClass } from "@/lib/site-layout";
import { AuthModalProvider } from "@/store/AuthModalContext";
import { CartProvider } from "@/store/CartContext";
import { DeliveryLocationProvider } from "@/store/DeliveryLocationContext";
import { WishlistProvider } from "@/store/WishlistContext";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const siteUrl = getSiteUrlString();

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: `${SITE_NAME} — ${SITE_TAGLINE}`,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	keywords: [
		"firewood India",
		"biomass fuel",
		"coconut coir",
		"coconut shell",
		"wood powder",
		"Kerala firewood",
		"bulk biomass",
		SITE_NAME,
	],
	authors: [{ name: SITE_NAME_FULL, url: siteUrl }],
	creator: SITE_NAME_FULL,
	publisher: SITE_NAME_FULL,
	formatDetection: { email: false, address: false, telephone: false },
	robots: { index: true, follow: true },
	openGraph: {
		type: "website",
		locale: "en_IN",
		url: siteUrl,
		siteName: SITE_NAME,
		title: `${SITE_NAME} — ${SITE_TAGLINE}`,
		description: SITE_DESCRIPTION,
		images: [
			{
				url: SITE_LOGO_PNG,
				alt: `${SITE_NAME} logo`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${SITE_NAME} — ${SITE_TAGLINE}`,
		description: SITE_DESCRIPTION,
		images: [SITE_LOGO_PNG],
	},
	// Favicons: `src/app/icon.png` + `apple-icon.png` (from brand logo); Next.js emits links automatically.
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#2a2220" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-IN" className={`${inter.variable} h-full antialiased`}>
			<body className="min-h-full min-w-0 flex flex-col overflow-x-hidden bg-background text-foreground/95 selection:bg-primary/15 selection:text-foreground">
				<SiteJsonLd />
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
