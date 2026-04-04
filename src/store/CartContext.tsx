"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	useAddToCart,
	useCart,
	useCreateCart,
	useRemoveFromCart,
	useUpdateCartItem,
} from "@/hooks/useShopify";
import type { Cart } from "@/types/cart";

interface CartContextType {
	cart: Cart | null;
	isLoading: boolean;
	isOpen: boolean;
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;
	addToCart: (variantId: string, quantity: number) => Promise<void>;
	updateQuantity: (lineId: string, quantity: number) => Promise<void>;
	removeFromCart: (lineId: string) => Promise<void>;
	clearCart: () => void;
	itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartId, setCartId] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const createCartMutation = useCreateCart();
	const addToCartMutation = useAddToCart();
	const updateCartItemMutation = useUpdateCartItem();
	const removeFromCartMutation = useRemoveFromCart();

	const { data: cart, isLoading } = useCart(cartId);

	// Initialize cart from localStorage on mount
	useEffect(() => {
		const storedCartId = localStorage.getItem("cartId");
		if (storedCartId) {
			setCartId(storedCartId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const openCart = useCallback(() => setIsOpen(true), []);
	const closeCart = useCallback(() => setIsOpen(false), []);
	const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

	const ensureCartId = async (): Promise<string> => {
		if (!cartId) {
			const newCartId = await createCartMutation.mutateAsync();
			if (newCartId) {
				setCartId(newCartId);
				return newCartId;
			}
			throw new Error("Failed to create cart");
		}
		return cartId;
	};

	const handleAddToCart = async (variantId: string, quantity: number) => {
		try {
			const currentCartId = await ensureCartId();
			await addToCartMutation.mutateAsync({
				cartId: currentCartId,
				variantId,
				quantity,
			});
			// Auto-open cart sidebar after adding
			setIsOpen(true);
		} catch (error) {
			console.error("Error adding to cart:", error);
			throw error;
		}
	};

	const handleUpdateQuantity = async (lineId: string, quantity: number) => {
		if (!cartId) return;

		try {
			await updateCartItemMutation.mutateAsync({
				cartId,
				lineId,
				quantity,
			});
		} catch (error) {
			console.error("Error updating cart item:", error);
			throw error;
		}
	};

	const handleRemoveFromCart = async (lineId: string) => {
		if (!cartId) return;

		try {
			await removeFromCartMutation.mutateAsync({
				cartId,
				lineIds: [lineId],
			});
		} catch (error) {
			console.error("Error removing from cart:", error);
			throw error;
		}
	};

	const clearCart = () => {
		localStorage.removeItem("cartId");
		setCartId(null);
	};

	const value: CartContextType = {
		cart: cart || null,
		isLoading,
		isOpen,
		openCart,
		closeCart,
		toggleCart,
		addToCart: handleAddToCart,
		updateQuantity: handleUpdateQuantity,
		removeFromCart: handleRemoveFromCart,
		clearCart,
		itemCount: cart?.itemCount || 0,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCartContext must be used within a CartProvider");
	}
	return context;
}
