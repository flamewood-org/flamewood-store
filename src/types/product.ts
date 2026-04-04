export interface Image {
	url: string;
	altText?: string;
	width?: number;
	height?: number;
}

export interface ProductMetafields {
	moistureLevel?: string;
	woodType?: "hardwood" | "softwood";
	sizeGrade?: "small" | "medium" | "large";
	packagingType?: "loose" | "bundled" | "palletized";
	origin?: string;
}

export interface Variant {
	id: string;
	title: string;
	price: number;
	compareAtPrice?: number;
	weight: number;
	inventoryQuantity: number;
	sku: string;
	availableForSale: boolean;
}

export interface Product {
	id: string;
	title: string;
	handle: string;
	description: string;
	images: Image[];
	variants: Variant[];
	tags: string[];
	metafields?: ProductMetafields;
	vendor?: string;
	productType?: string;
}

export interface Collection {
	id: string;
	title: string;
	handle: string;
	description?: string;
	image?: Image;
}
