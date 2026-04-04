import type { Image, Variant } from "./product";

export interface CartItem {
	id: string;
	variant: Variant;
	quantity: number;
	productTitle: string;
	productHandle: string;
	image?: Image;
}

export interface Cart {
	id: string;
	items: CartItem[];
	subtotal: number;
	totalWeight: number;
	itemCount: number;
}

export interface ShippingEstimate {
	region: string;
	tier: "STANDARD" | "HEAVY" | "FREIGHT";
	cost: number;
	estimatedDays: string;
	requiresManualQuote: boolean;
}
