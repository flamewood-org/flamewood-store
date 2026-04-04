import type { Product } from "@/types/product";

export function getCategoryFromProduct(product: Product): string {
	const productType = product.productType?.toLowerCase() || "";
	const tags = product.tags.map((t: string) => t.toLowerCase());

	if (
		productType.includes("firewood") ||
		tags.some((tag: string) => tag.includes("firewood"))
	) {
		return "firewood";
	}
	if (
		productType.includes("coconut") ||
		productType.includes("coir") ||
		tags.some((tag: string) => tag.includes("coconut"))
	) {
		return "coconut";
	}
	if (
		productType.includes("biomass") ||
		productType.includes("wood powder") ||
		tags.some((tag: string) => tag.includes("biomass"))
	) {
		return "biomass";
	}

	return "firewood";
}
