import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/lib/site-config";

const PATHS = [
	"/",
	"/about",
	"/contact",
	"/cart",
	"/wishlist",
	"/track-order",
	"/privacy",
	"/terms",
	"/refunds",
	"/products/all",
	"/products/firewood",
	"/products/coconut",
	"/products/biomass",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	const base = getSiteUrlString();
	const now = new Date();

	return PATHS.map((path) => ({
		url: `${base}${path}`,
		lastModified: now,
		changeFrequency: path === "/" ? "daily" : "weekly",
		priority: path === "/" ? 1 : 0.7,
	}));
}
