import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	addToCart,
	createCart,
	getCart,
	getCollections,
	getProductByHandle,
	getProducts,
	removeFromCart,
	updateCartItem,
} from "@/lib/shopify";
import type { Cart } from "@/types/cart";
import type { Collection, Product } from "@/types/product";

// Products
export function useProducts(first: number = 20, query?: string) {
	return useQuery<Product[]>({
		queryKey: ["products", first, query],
		queryFn: () => getProducts(first, query),
	});
}

export function useProduct(handle: string) {
	return useQuery<Product | null>({
		queryKey: ["product", handle],
		queryFn: () => getProductByHandle(handle),
		enabled: !!handle,
	});
}

// Collections
export function useCollections() {
	return useQuery<Collection[]>({
		queryKey: ["collections"],
		queryFn: getCollections,
	});
}

// Cart
export function useCreateCart() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCart,
		onSuccess: (cartId) => {
			if (cartId) {
				localStorage.setItem("cartId", cartId);
				queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
			}
		},
	});
}

export function useAddToCart() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			cartId,
			variantId,
			quantity,
		}: {
			cartId: string;
			variantId: string;
			quantity: number;
		}) => addToCart(cartId, variantId, quantity),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cart", variables.cartId] });
		},
	});
}

export function useUpdateCartItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			cartId,
			lineId,
			quantity,
		}: {
			cartId: string;
			lineId: string;
			quantity: number;
		}) => updateCartItem(cartId, lineId, quantity),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cart", variables.cartId] });
		},
	});
}

export function useRemoveFromCart() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ cartId, lineIds }: { cartId: string; lineIds: string[] }) =>
			removeFromCart(cartId, lineIds),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cart", variables.cartId] });
		},
	});
}

export function useCart(cartId: string | null) {
	return useQuery<Cart | null>({
		queryKey: ["cart", cartId],
		queryFn: () => (cartId ? getCart(cartId) : Promise.resolve(null)),
		enabled: !!cartId,
	});
}
