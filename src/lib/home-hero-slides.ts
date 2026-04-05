import type { Collection } from "@/types/product";

/**
 * Tiny JPEG for `placeholder="blur"` on hero images while full assets load.
 */
export const HERO_IMAGE_BLUR_DATA_URL =
	"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/** Hero slide: image fills the card; entire area links to `href`. */
export type HeroSlide = {
	id: string;
	imageUrl: string;
	href: string;
	alt: string;
};

/** Alternates catalog JPGs with illustrated PNG banners. */
const HERO_BRAND_BASE: Omit<HeroSlide, "href">[] = [
	{
		id: "hero-firewood",
		imageUrl: "/hero/FireWood.jpg",
		alt: "FlameWood — premium firewood and kiln-dried logs",
	},
	{
		id: "hero-coconut-coir",
		imageUrl: "/hero/hero-coir-illustration.png",
		alt: "FlameWood — coconut coir and natural fibre",
	},
	{
		id: "hero-biomass",
		imageUrl: "/hero/powder.jpg",
		alt: "FlameWood — wood powder and biomass",
	},
	{
		id: "hero-coconut-shell",
		imageUrl: "/hero/hero-coconut-illustration.png",
		alt: "FlameWood — coconut shell products",
	},
];

function hrefForSlideIndex(
	collections: Collection[],
	index: number,
	fallbackPath: string,
): string {
	const byOrder = collections[index];
	if (byOrder?.handle) return `/products/${byOrder.handle}`;

	const wanted = ["firewood", "coconut", "biomass", "coconut"][index];
	if (wanted) {
		const match = collections.find((c) => c.handle.toLowerCase() === wanted);
		if (match) return `/products/${match.handle}`;
	}

	return fallbackPath;
}

const FALLBACK_HREFS = [
	"/products/firewood",
	"/products/coconut",
	"/products/biomass",
	"/products/coconut",
] as const;

export function buildHeroSlidesFromCollections(
	collections: Collection[],
): HeroSlide[] {
	return HERO_BRAND_BASE.map((b, i) => ({
		...b,
		href: hrefForSlideIndex(
			collections,
			i,
			FALLBACK_HREFS[i] ?? "/products/all",
		),
	}));
}
