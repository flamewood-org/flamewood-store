export const CUSTOMER_TOKEN_COOKIE = "fw_customer_at";

export function maxAgeSecondsFromExpiresAt(expiresAt: string | null): number {
	const fallback = 60 * 60 * 24 * 14;
	if (!expiresAt) return fallback;
	const ms = new Date(expiresAt).getTime() - Date.now();
	if (Number.isNaN(ms) || ms <= 0) return 3600;
	return Math.min(Math.floor(ms / 1000), 60 * 60 * 24 * 90);
}
