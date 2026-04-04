import type { IndiaPostOffice } from "@/lib/india-post-pincode";
import { detectRegion, REGION_RATES } from "@/lib/shipping";

export const DELIVERY_LOCATION_STORAGE_KEY = "flamewood:delivery-location";

export type SavedDeliveryLocation = {
	pincode: string;
	area: string;
	district: string;
	state: string;
	regionLabel: string;
	savedAt: string;
};

export function buildSavedLocation(
	office: IndiaPostOffice,
): Omit<SavedDeliveryLocation, "savedAt"> {
	const regionKey = detectRegion(office.Pincode);
	return {
		pincode: office.Pincode,
		area: office.Name,
		district: office.District,
		state: office.State,
		regionLabel: REGION_RATES[regionKey].name,
	};
}

export function readSavedDeliveryLocation(): SavedDeliveryLocation | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(DELIVERY_LOCATION_STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as SavedDeliveryLocation;
		if (
			!parsed?.pincode ||
			typeof parsed.area !== "string" ||
			typeof parsed.savedAt !== "string"
		) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

export function writeSavedDeliveryLocation(
	location: SavedDeliveryLocation,
): void {
	localStorage.setItem(DELIVERY_LOCATION_STORAGE_KEY, JSON.stringify(location));
}
