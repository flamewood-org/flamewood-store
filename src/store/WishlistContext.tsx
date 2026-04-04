"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { Product } from "@/types/product";

interface WishlistContextType {
	items: Product[];
	isOpen: boolean;
	openWishlist: () => void;
	closeWishlist: () => void;
	toggleWishlist: () => void;
	addToWishlist: (product: Product) => void;
	removeFromWishlist: (productId: string) => void;
	isInWishlist: (productId: string) => boolean;
	itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<Product[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	// Load wishlist from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem("wishlist");
			if (stored) {
				setItems(JSON.parse(stored));
			}
		} catch {
			// ignore parse errors
		}
	}, []);

	// Persist wishlist to localStorage
	useEffect(() => {
		localStorage.setItem("wishlist", JSON.stringify(items));
	}, [items]);

	const openWishlist = useCallback(() => setIsOpen(true), []);
	const closeWishlist = useCallback(() => setIsOpen(false), []);
	const toggleWishlist = useCallback(() => setIsOpen((prev) => !prev), []);

	const addToWishlist = useCallback((product: Product) => {
		setItems((prev) => {
			if (prev.some((item) => item.id === product.id)) return prev;
			return [...prev, product];
		});
	}, []);

	const removeFromWishlist = useCallback((productId: string) => {
		setItems((prev) => prev.filter((item) => item.id !== productId));
	}, []);

	const isInWishlist = useCallback(
		(productId: string) => {
			return items.some((item) => item.id === productId);
		},
		[items],
	);

	const value: WishlistContextType = {
		items,
		isOpen,
		openWishlist,
		closeWishlist,
		toggleWishlist,
		addToWishlist,
		removeFromWishlist,
		isInWishlist,
		itemCount: items.length,
	};

	return (
		<WishlistContext.Provider value={value}>
			{children}
		</WishlistContext.Provider>
	);
}

export function useWishlistContext() {
	const context = useContext(WishlistContext);
	if (context === undefined) {
		throw new Error(
			"useWishlistContext must be used within a WishlistProvider",
		);
	}
	return context;
}
