"use client";

import {
	ChevronRight,
	Heart,
	Mail,
	MapPin,
	Menu,
	Phone,
	ShoppingBag,
	X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderAccountLink } from "@/components/layout/HeaderAccountLink";
import { SiteSearch } from "@/components/search/SiteSearch";
import { useCartContext } from "@/store/CartContext";
import { useDeliveryLocation } from "@/store/DeliveryLocationContext";
import { siteShellClass } from "@/lib/site-layout";
import { useWishlistContext } from "@/store/WishlistContext";

export function Header() {
	const { itemCount, openCart } = useCartContext();
	const { itemCount: wishlistCount, openWishlist } = useWishlistContext();
	const { location, hydrated, openModal } = useDeliveryLocation();
	const [searchOpen, setSearchOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 12);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 w-full min-w-0 bg-surface transition-shadow duration-200 ${
				scrolled ? "shadow-sm border-b border-border/80" : "border-b border-border/50 md:border-transparent"
			}`}
		>
			{/* Top utility strip — contact, nav shortcuts, account (hidden on small screens) */}
			<div className="hidden md:block bg-secondary text-white text-[12px] md:text-[13px]">
				<div
					className={`${siteShellClass} flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-y-1.5 py-1.5 md:py-2`}
				>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/95 shrink-0 min-w-0">
						<a
							href="tel:+919876543210"
							className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
						>
							<Phone className="w-3.5 h-3.5 shrink-0 opacity-90" />
							<span className="hidden sm:inline">+91 98765 43210</span>
						</a>
						<a
							href="mailto:support@flamewood.example"
							className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
						>
							<Mail className="w-3.5 h-3.5 shrink-0 opacity-90" />
							<span className="hidden sm:inline">
								support@flamewood.example
							</span>
						</a>
					</div>
					<div className="flex items-center gap-3 sm:gap-4 text-white/90 overflow-x-auto no-scrollbar max-w-full sm:flex-wrap sm:overflow-visible pb-0.5 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
						{hydrated && location && (
							<button
								type="button"
								onClick={openModal}
								className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium"
								aria-label="Change delivery pincode"
							>
								<MapPin
									className="w-3.5 h-3.5 shrink-0 opacity-90"
									aria-hidden
								/>
								<span className="tabular-nums">{location.pincode}</span>
								<span className="hidden md:inline text-white/75 font-normal">
									· {location.area}
								</span>
							</button>
						)}
						<Link href="/about" className="hover:text-white transition-colors">
							About
						</Link>
						<Link
							href="/contact"
							className="hover:text-white transition-colors"
						>
							Contact
						</Link>
						<Link
							href="/track-order"
							className="hover:text-white transition-colors shrink-0"
						>
							Track order
						</Link>
						<HeaderAccountLink variant="inverse" />
					</div>
				</div>
			</div>

			<div
				className={`transition-colors duration-200 ${
					scrolled ? "bg-white/95 backdrop-blur-md" : "bg-surface"
				}`}
			>
				<div
					className={`${siteShellClass} py-2.5 md:py-3 pt-[max(0.625rem,env(safe-area-inset-top,0px))]`}
				>
					<div className="grid h-11 min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 md:h-auto md:gap-4">
						<div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
							<button
								type="button"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="lg:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-surface-alt active:bg-surface-alt/80"
								aria-label="Open menu"
							>
								<Menu className="h-[22px] w-[22px]" strokeWidth={1.75} />
							</button>

							<Link
								href="/"
								className="group flex min-w-0 max-w-[min(52vw,14rem)] items-center gap-2 sm:max-w-none md:gap-2.5"
							>
								<div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/12 to-secondary/10 ring-1 ring-border/50">
									<span className="text-lg leading-none" aria-hidden>
										🔥
									</span>
								</div>
								<span className="truncate text-[1.0625rem] font-semibold leading-tight tracking-tight sm:text-lg md:text-[1.05rem]">
									<span className="text-primary">Flame</span>
									<span className="text-secondary">Wood</span>
								</span>
							</Link>
						</div>

						<div className="flex min-w-0 justify-end md:justify-center md:px-2">
							<SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />
						</div>

						<div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
							<button
								type="button"
								onClick={openWishlist}
								className="relative flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-alt hover:text-primary"
								aria-label="Wishlist"
							>
								<Heart className="h-[22px] w-[22px]" strokeWidth={1.75} />
								{wishlistCount > 0 && (
									<span className="absolute right-1 top-1 h-2 min-w-[8px] rounded-full bg-error px-0.5 ring-2 ring-white" />
								)}
							</button>

							<button
								type="button"
								onClick={openCart}
								className="relative flex h-10 min-w-[2.5rem] items-center justify-center gap-1 rounded-xl border border-border/80 bg-surface px-1.5 text-text-secondary transition-colors hover:border-primary/25 hover:bg-surface-alt"
								aria-label={`Shopping cart, ${itemCount} items`}
							>
								<ShoppingBag className="h-[20px] w-[20px]" strokeWidth={1.75} />
								<span className="min-w-[1.125rem] rounded-md bg-foreground px-1 py-0.5 text-center text-[10px] font-semibold leading-none text-white tabular-nums">
									{itemCount}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{isMobileMenuOpen && (
				<button
					type="button"
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden w-full h-full border-none p-0 m-0"
					onClick={() => setIsMobileMenuOpen(false)}
					aria-label="Close menu"
				/>
			)}

			<div
				className={`fixed inset-y-0 left-0 w-[min(100vw,20rem)] max-w-full bg-background shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between p-4 border-b border-border">
						<span className="text-lg font-semibold">
							<span className="text-primary">Flame</span>
							<span className="text-secondary">Wood</span>
						</span>
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen(false)}
							className="p-2 bg-surface-alt rounded-full text-foreground"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="p-4 flex-1 overflow-y-auto min-h-0">
						{hydrated && location && (
							<button
								type="button"
								onClick={() => {
									setIsMobileMenuOpen(false);
									openModal();
								}}
								className="w-full flex items-center gap-3 p-3 mb-3 rounded-lg bg-surface-alt border border-border text-left"
							>
								<MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden />
								<div className="min-w-0">
									<p className="text-[11px] font-medium text-text-tertiary">
										Delivery pincode
									</p>
									<p className="text-sm font-medium text-foreground truncate">
										{location.pincode}{" "}
										<span className="font-normal text-text-secondary">
											· {location.area}
										</span>
									</p>
								</div>
							</button>
						)}
						<button
							type="button"
							onClick={() => {
								setSearchOpen(true);
								setIsMobileMenuOpen(false);
							}}
							className="w-full flex items-center justify-between p-3 mb-6 rounded-lg border border-border bg-surface text-sm font-medium text-foreground hover:bg-surface-alt transition-colors"
						>
							Search products
							<ChevronRight className="w-5 h-5 text-text-tertiary" />
						</button>

						<nav className="space-y-2">
							{[
								{ label: "All products", href: "/products/all" },
								{ label: "Bulk orders", href: "/#bulk-deals" },
								{ label: "About", href: "/about" },
								{ label: "Contact", href: "/contact" },
								{ label: "My account", href: "/account" },
							].map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="flex items-center justify-between p-3 rounded-lg text-sm font-medium text-foreground hover:bg-surface-alt transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.label}
									<ChevronRight className="w-5 h-5 text-text-tertiary" />
								</Link>
							))}
						</nav>
					</div>

					<div className="mt-auto p-4 border-t border-border bg-surface-alt">
						<div className="flex gap-2">
							<button
								type="button"
								className="flex-1 flex justify-center items-center gap-2 p-2.5 bg-surface rounded-lg font-medium text-sm border border-border"
								onClick={() => {
									setIsMobileMenuOpen(false);
									openWishlist();
								}}
							>
								<Heart className="w-4 h-4" /> Wishlist
							</button>
							<button
								type="button"
								className="flex-1 flex justify-center items-center gap-2 p-2.5 bg-secondary text-white rounded-lg font-medium text-sm"
								onClick={() => {
									setIsMobileMenuOpen(false);
									openCart();
								}}
							>
								<ShoppingBag className="w-4 h-4" /> Cart ({itemCount})
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
