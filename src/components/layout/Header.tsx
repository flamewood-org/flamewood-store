"use client";

import {
	ChevronRight,
	Heart,
	Mail,
	MapPin,
	Menu,
	Phone,
	Search,
	ShoppingBag,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderAccountLink } from "@/components/layout/HeaderAccountLink";
import { Input } from "@/components/ui/Input";
import { useCartContext } from "@/store/CartContext";
import { useDeliveryLocation } from "@/store/DeliveryLocationContext";
import { useWishlistContext } from "@/store/WishlistContext";
import type { Collection } from "@/types/product";

type HeaderProps = {
	collections?: Collection[];
};

export function Header({ collections = [] }: HeaderProps) {
	const { itemCount, openCart } = useCartContext();
	const { itemCount: wishlistCount, openWishlist } = useWishlistContext();
	const { location, hydrated, openModal } = useDeliveryLocation();
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 12);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/products/all?search=${encodeURIComponent(searchQuery)}`;
		}
	};

	const categoryLinks = collections.slice(0, 8);

	return (
		<header
			className={`sticky top-0 z-50 transition-shadow duration-300 ${
				scrolled ? "shadow-md" : ""
			}`}
		>
			{/* Top utility bar */}
			<div className="bg-secondary text-white text-xs sm:text-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-2 py-2.5">
					<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/95">
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
					<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90">
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
							className="hover:text-white transition-colors"
						>
							Track order
						</Link>
						<HeaderAccountLink />
					</div>
				</div>
			</div>

			{/* Main bar */}
			<div
				className={`border-b transition-colors duration-300 ${
					scrolled
						? "bg-white/95 backdrop-blur-xl border-border"
						: "bg-white border-border/60"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
					<div className="flex items-center gap-3 md:gap-6">
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="lg:hidden p-2 -ml-2 text-foreground hover:bg-surface-alt rounded-xl transition-colors"
							aria-label="Toggle menu"
						>
							<Menu className="h-6 w-6" />
						</button>

						<Link href="/" className="flex items-center gap-2 shrink-0 group">
							<div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-linear-to-br from-primary/15 to-secondary/15 flex items-center justify-center border border-border/50">
								<span className="text-lg md:text-xl" aria-hidden>
									🔥
								</span>
							</div>
							<span className="text-xl md:text-2xl font-black tracking-tight">
								<span className="text-primary">Flame</span>
								<span className="text-secondary">Wood</span>
							</span>
						</Link>

						{/* Center search — desktop */}
						<form
							onSubmit={handleSearch}
							className="hidden md:flex flex-1 max-w-xl mx-auto"
						>
							<div className="relative w-full group">
								<Input
									type="search"
									placeholder="Search products..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-4 pr-12 py-2.5 h-11 rounded-full border-border bg-surface-alt/80 focus:bg-white focus:border-primary/35 text-sm font-medium shadow-inner"
								/>
								<button
									type="submit"
									className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors"
									aria-label="Search"
								>
									<Search className="w-4 h-4" />
								</button>
							</div>
						</form>

						<div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 ml-auto">
							<button
								type="button"
								onClick={() => setIsSearchOpen(!isSearchOpen)}
								className={`md:hidden p-2.5 rounded-xl transition-colors ${
									isSearchOpen
										? "bg-surface-alt text-foreground"
										: "text-text-secondary hover:text-foreground hover:bg-surface-alt"
								}`}
								aria-label="Toggle search"
							>
								{isSearchOpen ? (
									<X className="h-5 w-5" />
								) : (
									<Search className="h-5 w-5" />
								)}
							</button>

							<button
								type="button"
								onClick={openWishlist}
								className="p-2.5 text-text-secondary hover:text-primary hover:bg-surface-alt rounded-xl transition-colors relative"
								aria-label="Wishlist"
							>
								<Heart className="h-5 w-5" />
								{wishlistCount > 0 && (
									<span className="absolute top-1.5 right-1.5 min-w-[8px] h-2 px-0.5 bg-error rounded-full border-2 border-white" />
								)}
							</button>

							<button
								type="button"
								onClick={openCart}
								className="relative flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-xl border border-border bg-white hover:border-primary/25 hover:bg-hero-tint/60 transition-colors"
								aria-label="Cart"
							>
								<ShoppingBag className="h-5 w-5 text-primary" />
								<span className="min-w-[1.25rem] h-6 px-1.5 rounded-full bg-error text-white text-xs font-bold flex items-center justify-center">
									{itemCount}
								</span>
							</button>
						</div>
					</div>

					{/* Mobile expand search */}
					{isSearchOpen && (
						<form onSubmit={handleSearch} className="md:hidden mt-3 pb-1">
							<div className="relative">
								<Input
									type="search"
									placeholder="Search products..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-4 pr-12 py-3 rounded-full border-border bg-surface-alt font-medium text-sm"
								/>
								<button
									type="submit"
									className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center"
									aria-label="Search"
								>
									<Search className="w-4 h-4" />
								</button>
							</div>
						</form>
					)}
				</div>
			</div>

			{/* Category strip — from Shopify collections only */}
			{categoryLinks.length > 0 && (
				<div className="bg-white border-b border-border/70 hidden lg:block">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<nav
							className="flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 overflow-x-auto"
							aria-label="Collections"
						>
							{categoryLinks.map((c) => (
								<Link
									key={c.id}
									href={`/products/${c.handle}`}
									className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-full text-xs font-semibold text-secondary hover:bg-hero-tint hover:text-primary transition-colors"
								>
									<span className="relative w-6 h-6 rounded-full overflow-hidden bg-surface-alt border border-border/50 shrink-0">
										{c.image ? (
											<Image
												src={c.image.url}
												alt=""
												width={24}
												height={24}
												className="object-cover w-full h-full"
											/>
										) : (
											<span className="flex items-center justify-center w-full h-full text-[9px]">
												🌿
											</span>
										)}
									</span>
									<span className="max-w-[120px] truncate">{c.title}</span>
								</Link>
							))}
						</nav>
					</div>
				</div>
			)}

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<button
					type="button"
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden w-full h-full border-none p-0 m-0"
					onClick={() => setIsMobileMenuOpen(false)}
					aria-label="Close menu"
				/>
			)}

			<div
				className={`fixed inset-y-0 left-0 w-[300px] bg-background shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between p-4 border-b border-border">
						<span className="text-xl font-black">
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

					<div className="p-4 flex-1 overflow-y-auto">
						{hydrated && location && (
							<button
								type="button"
								onClick={() => {
									setIsMobileMenuOpen(false);
									openModal();
								}}
								className="w-full flex items-center gap-3 p-3 mb-4 rounded-xl bg-hero-tint/90 border border-border text-left"
							>
								<MapPin className="w-5 h-5 text-primary shrink-0" aria-hidden />
								<div className="min-w-0">
									<p className="text-xs font-bold text-text-tertiary uppercase tracking-wide">
										Delivery pincode
									</p>
									<p className="font-bold text-foreground truncate">
										{location.pincode}{" "}
										<span className="font-semibold text-text-secondary">
											· {location.area}
										</span>
									</p>
								</div>
							</button>
						)}
						<form onSubmit={handleSearch} className="mb-6">
							<div className="relative">
								<Input
									type="search"
									placeholder="Search products..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-11 pr-4 py-3 bg-surface-alt border-transparent rounded-xl w-full font-bold text-sm"
								/>
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
							</div>
						</form>

						{categoryLinks.length > 0 && (
							<div className="mb-6">
								<p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2">
									Shop by collection
								</p>
								<nav className="space-y-1">
									{categoryLinks.map((c) => (
										<Link
											key={c.id}
											href={`/products/${c.handle}`}
											className="flex items-center justify-between p-3 rounded-xl font-semibold text-foreground hover:bg-surface-alt"
											onClick={() => setIsMobileMenuOpen(false)}
										>
											<span className="truncate">{c.title}</span>
											<ChevronRight className="w-5 h-5 text-text-tertiary shrink-0" />
										</Link>
									))}
								</nav>
							</div>
						)}

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
									className="flex items-center justify-between p-4 rounded-xl font-bold text-foreground hover:bg-surface-alt transition-colors"
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
								className="flex-1 flex justify-center items-center gap-2 p-3 bg-white rounded-xl font-bold text-sm shadow-sm"
								onClick={() => {
									setIsMobileMenuOpen(false);
									openWishlist();
								}}
							>
								<Heart className="w-4 h-4" /> Wishlist
							</button>
							<button
								type="button"
								className="flex-1 flex justify-center items-center gap-2 p-3 bg-secondary text-white rounded-xl font-bold text-sm shadow-sm"
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
