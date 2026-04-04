"use client";

import { useState, useEffect } from "react";
import {
	Search,
	Heart,
	User,
	Menu,
	X,
	ShoppingBag,
	ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { useCartContext } from "@/store/CartContext";
import { useWishlistContext } from "@/store/WishlistContext";

export function Header() {
	const { itemCount, openCart } = useCartContext();
	const { itemCount: wishlistCount, openWishlist } = useWishlistContext();
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [scrolled, setScrolled] = useState(false);

	// Add scroll listener for sticky header styling
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
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

	return (
		<header 
			className={`sticky top-0 z-50 transition-all duration-300 ${
				scrolled 
					? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm py-2" 
					: "bg-white border-b-transparent py-4"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-14 md:h-16">
					
					{/* Logo & Mobile Menu */}
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="lg:hidden p-2 -ml-2 text-foreground hover:bg-surface-alt rounded-xl transition-all duration-200"
							aria-label="Toggle menu"
						>
							<Menu className="h-6 w-6" />
						</button>

						<Link href="/" className="flex items-center space-x-2 shrink-0 group">
							<div className="relative w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center transform group-hover:-rotate-6 transition-all duration-300">
								<span className="text-xl">🔥</span>
							</div>
							<span className="text-2xl font-black bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent hidden sm:block tracking-tight">
								FlameWood
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center justify-center flex-1 mx-8 bg-surface-alt/50 border border-border/50 backdrop-blur-md rounded-full px-2 py-1.5 h-12">
						{[
							{ label: "Products", href: "/products/all" },
							{ label: "B2B Bulk", href: "/#bulk-deals" },
							{ label: "About", href: "/about" },
							{ label: "Contact", href: "/contact" },
						].map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="px-5 py-2 text-sm font-bold text-text-secondary hover:text-foreground hover:bg-white rounded-full transition-all duration-300 relative group"
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Search Bar - Desktop */}
					<div className={`hidden lg:flex transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-64 opacity-100 mr-4' : 'w-0 opacity-0'}`}>
						<form onSubmit={handleSearch} className="w-full">
							<div className="relative group">
								<Input
									type="search"
									placeholder="Search..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 pr-4 py-2 bg-surface-alt border-transparent focus:bg-white focus:border-border transition-all duration-300 rounded-full h-10 text-sm font-medium"
								/>
								<Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
							</div>
						</form>
					</div>

					{/* Action Icons */}
					<div className="flex items-center space-x-1 sm:space-x-2">
						<button
							type="button"
							onClick={() => setIsSearchOpen(!isSearchOpen)}
							className={`hidden lg:flex p-2.5 rounded-xl transition-all duration-200 ${isSearchOpen ? 'bg-surface-alt text-foreground' : 'text-text-secondary hover:text-foreground hover:bg-surface-alt'}`}
							aria-label="Toggle search"
						>
							{isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
						</button>

						<button
							type="button"
							onClick={() => setIsMobileMenuOpen(false)} // close mobile menu if search triggers
							className="lg:hidden p-2.5 text-text-secondary hover:text-foreground hover:bg-surface-alt rounded-xl transition-all duration-200"
							aria-label="Search"
						>
							<Search className="h-5 w-5" />
						</button>

						<Link
							href="/account"
							className="hidden sm:flex p-2.5 text-text-secondary hover:text-foreground hover:bg-surface-alt rounded-xl transition-all duration-200"
							aria-label="Account"
						>
							<User className="h-5 w-5" />
						</Link>

						{/* Wishlist CTA */}
						<button
							type="button"
							onClick={openWishlist}
							className="p-2.5 text-text-secondary hover:text-foreground hover:bg-surface-alt rounded-xl transition-all duration-200 relative"
							aria-label="Wishlist"
						>
							<Heart className="h-5 w-5" />
							{wishlistCount > 0 && (
								<span className="absolute 2 top-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
							)}
						</button>

						{/* Cart CTA - Highlighted */}
						<button
							type="button"
							onClick={openCart}
							className="flex items-center gap-2 pl-3 pr-4 py-2 bg-foreground text-white rounded-xl hover:bg-primary transition-all duration-300 ml-1 shadow-md shadow-foreground/10"
							aria-label="Cart"
						>
							<ShoppingBag className="h-4 w-4" />
							<span className="text-sm font-bold">{itemCount}</span>
						</button>
					</div>
				</div>

				{/* Mobile Menu Backdrop */}
				{isMobileMenuOpen && (
					<div 
						className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
						onClick={() => setIsMobileMenuOpen(false)}
					/>
				)}

				{/* Mobile Menu Panel */}
				<div 
					className={`fixed inset-y-0 left-0 w-[300px] bg-background shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
				>
					<div className="flex flex-col h-full">
						<div className="flex items-center justify-between p-4 border-b border-border">
							<span className="text-xl font-black">Menu</span>
							<button 
								onClick={() => setIsMobileMenuOpen(false)}
								className="p-2 bg-surface-alt rounded-full text-foreground"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
						
						<div className="p-4">
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

							<nav className="space-y-2">
								{[
									{ label: "All Products", href: "/products/all" },
									{ label: "Bulk Orders", href: "/#bulk-deals" },
									{ label: "About Us", href: "/about" },
									{ label: "Contact", href: "/contact" },
									{ label: "My Account", href: "/account" },
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
									className="flex-1 flex justify-center items-center gap-2 p-3 bg-white rounded-xl font-bold text-sm shadow-sm"
									onClick={() => { setIsMobileMenuOpen(false); openWishlist(); }}
								>
									<Heart className="w-4 h-4" /> Wishlist
								</button>
								<button 
									className="flex-1 flex justify-center items-center gap-2 p-3 bg-foreground text-white rounded-xl font-bold text-sm shadow-sm"
									onClick={() => { setIsMobileMenuOpen(false); openCart(); }}
								>
									<ShoppingBag className="w-4 h-4" /> Cart ({itemCount})
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
