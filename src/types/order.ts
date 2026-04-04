export interface OrderStatus {
	status: "confirmed" | "packed" | "shipped" | "out_for_delivery" | "delivered";
	timestamp: string;
	description: string;
}

export interface Order {
	id: string;
	orderNumber: string;
	status: OrderStatus[];
	currentStatus: string;
	items: OrderItem[];
	total: number;
	shippingAddress: Address;
	estimatedDelivery?: string;
	trackingNumber?: string;
	carrier?: string;
	paymentStatus: "pending" | "paid" | "failed";
	createdAt: string;
}

export interface OrderItem {
	title: string;
	variant: string;
	quantity: number;
	price: number;
	image?: string;
}

export interface Address {
	firstName: string;
	lastName: string;
	address1: string;
	address2?: string;
	city: string;
	province: string;
	country: string;
	zip: string;
	phone: string;
}
