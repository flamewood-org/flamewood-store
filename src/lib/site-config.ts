/**
 * Central branding + URLs for SEO, Open Graph, JSON-LD (AEO), and UI.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.yourdomain.com).
 */
export const SITE_NAME = "FlameWood";
export const SITE_NAME_FULL = "Flame Wood";
export const SITE_TAGLINE =
	"Premium biomass, firewood, and coconut products from Kerala";

export const SITE_DESCRIPTION =
	"Shop quality firewood, biomass fuel, and coconut coir products sourced in Kerala, India. Retail and bulk orders with reliable delivery across India.";

/** Paths under `public/` */
export const SITE_LOGO_PNG = "/logo/logopng.png";
export const SITE_LOGO_JPG = "/logo/logo.jpg";

const DEFAULT_SITE_URL = "https://flamewood.org";

export function getSiteUrlString(): string {
	const raw =
		typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
			? process.env.NEXT_PUBLIC_SITE_URL.trim()
			: "";
	const base = (raw || DEFAULT_SITE_URL).replace(/\/+$/, "");
	return base;
}

export function getAbsoluteUrl(path: string): string {
	const base = getSiteUrlString();
	const p = path.startsWith("/") ? path : `/${path}`;
	return `${base}${p}`;
}

/** Topics for answer engines / knowledge panels (Organization.knowsAbout). */
export const SITE_KNOWS_ABOUT = [
	"Firewood",
	"Biomass fuel",
	"Coconut coir",
	"Coconut shell products",
	"Wood powder",
	"Sustainable fuel Kerala",
] as const;
