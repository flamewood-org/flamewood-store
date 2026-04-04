import type { Collection } from "@/types/product";

/**
 * Tiny JPEG used as `blurDataURL` for hero `<Image placeholder="blur" />` while
 * full-size PNGs load (warm neutral, matches illustrated banners).
 */
export const HERO_IMAGE_BLUR_DATA_URL =
	"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/** Image + destination only — artwork includes its own headline and trust strip. */
export type HeroSlide = {
	id: string;
	imageUrl: string;
	href: string;
	alt: string;
};

/**
 * Illustrated hero art (PNG in `public/hero/`) — one slide per core category.
 * Regenerate assets by replacing files; keep filenames stable for caching.
 */
const HERO_BRAND_SLIDES: Omit<HeroSlide, "href">[] = [
	{
		id: "brand-firewood",
		imageUrl: "/hero/brand-firewood.png",
		alt: "FlameWood illustrated hero — Firewood category",
	},
	{
		id: "brand-coconut",
		imageUrl: "/hero/brand-coconut.png",
		alt: "FlameWood illustrated hero — Coconut and coir category",
	},
	{
		id: "brand-biomass",
		imageUrl: "/hero/brand-biomass.png",
		alt: "FlameWood illustrated hero — Biomass category",
	},
];

/** Prefer matching Shopify collection when present so links stay in sync with catalog. */
function hrefForSlideIndex(
	collections: Collection[],
	index: number,
	fallbackPath: string,
): string {
	const byOrder = collections[index];
	if (byOrder?.handle) return `/products/${byOrder.handle}`;

	const wanted = ["firewood", "coconut", "biomass"][index];
	if (wanted) {
		const match = collections.find(
			(c) => c.handle.toLowerCase() === wanted,
		);
		if (match) return `/products/${match.handle}`;
	}

	return fallbackPath;
}

const FALLBACK_HREFS = [
	"/products/firewood",
	"/products/coconut",
	"/products/biomass",
] as const;

export function buildHeroSlidesFromCollections(
	collections: Collection[],
): HeroSlide[] {
	return HERO_BRAND_SLIDES.map((b, i) => ({
		id: b.id,
		imageUrl: b.imageUrl,
		alt: b.alt,
		href: hrefForSlideIndex(collections, i, FALLBACK_HREFS[i] ?? "/products/all"),
	}));
}
