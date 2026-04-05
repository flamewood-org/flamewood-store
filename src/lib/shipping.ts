// Shipping configuration based on PRD specifications

export const SHIPPING_TIERS = {
	STANDARD: { maxWeight: 10, carrier: "courier", estimatedDays: "3-5" },
	HEAVY: { maxWeight: 50, carrier: "heavy_shipping", estimatedDays: "5-7" },
	FREIGHT: { maxWeight: Infinity, carrier: "freight", estimatedDays: "7-10" },
};

export const REGION_RATES = {
	KERALA: { baseRate: 50, perKgRate: 10, name: "Kerala", requiresQuote: false },
	SOUTH_INDIA: {
		baseRate: 80,
		perKgRate: 15,
		name: "South India",
		requiresQuote: false,
	},
	REST_INDIA: {
		baseRate: 120,
		perKgRate: 20,
		name: "Rest of India",
		requiresQuote: false,
	},
	INTERNATIONAL: {
		baseRate: 0,
		perKgRate: 0,
		name: "Outside Service Area",
		requiresQuote: true,
	},
};

// Kerala pincodes: 670xxx-695xxx
// South India: Karnataka (560-591), Tamil Nadu (600-643), Andhra Pradesh (500-535), Telangana (500-509)
export function detectRegion(pincode: string): keyof typeof REGION_RATES {
	const code = parseInt(pincode, 10);

	if (Number.isNaN(code)) {
		return "REST_INDIA";
	}

	// Kerala: 670000-695999
	if (code >= 670000 && code <= 695999) {
		return "KERALA";
	}

	// Karnataka: 560000-591999
	if (code >= 560000 && code <= 591999) {
		return "SOUTH_INDIA";
	}

	// Tamil Nadu: 600000-643999
	if (code >= 600000 && code <= 643999) {
		return "SOUTH_INDIA";
	}

	// Andhra Pradesh & Telangana: 500000-535999
	if (code >= 500000 && code <= 535999) {
		return "SOUTH_INDIA";
	}

	// Outside India (simplified check for 6-digit Indian pincode standard)
	if (pincode.length !== 6 || code < 100000 || code > 999999) {
		return "INTERNATIONAL";
	}

	return "REST_INDIA";
}

/** True when the pincode is served for standard India delivery (not treated as international). */
export function isStandardDeliveryAvailable(pincode: string): boolean {
	if (!/^\d{6}$/.test(pincode.trim())) {
		return false;
	}
	return detectRegion(pincode.trim()) !== "INTERNATIONAL";
}

export function calculateShipping(totalWeight: number, pincode: string) {
	const region = detectRegion(pincode);
	const regionData = REGION_RATES[region];

	// Check if region is served
	if (regionData.requiresQuote) {
		return {
			region: regionData.name,
			tier: "FREIGHT" as const,
			cost: 0,
			estimatedDays: "N/A",
			requiresManualQuote: true,
		};
	}

	// Determine weight tier
	let tier: keyof typeof SHIPPING_TIERS = "STANDARD";
	if (totalWeight > SHIPPING_TIERS.HEAVY.maxWeight) {
		tier = "FREIGHT";
	} else if (totalWeight > SHIPPING_TIERS.STANDARD.maxWeight) {
		tier = "HEAVY";
	}

	const tierData = SHIPPING_TIERS[tier];

	// Shipping is included in product price (Free Shipping strategy)
	return {
		region: regionData.name,
		tier,
		cost: 0, // Always 0 as per user strategy
		estimatedDays: tierData.estimatedDays,
		requiresManualQuote: false,
	};
}
