import { isStandardDeliveryAvailable } from "@/lib/shipping";

/** Fields we use from India Post JSON (PostalPinCode.in / api.postalpincode.in). */
export type IndiaPostOffice = {
	Name: string;
	District: string;
	State: string;
	Pincode: string;
	DeliveryStatus: string;
};

type RawOffice = Record<string, unknown>;

function isRawOffice(v: unknown): v is RawOffice {
	return typeof v === "object" && v !== null;
}

function toOffice(raw: RawOffice): IndiaPostOffice | null {
	const Name = typeof raw.Name === "string" ? raw.Name : "";
	const District = typeof raw.District === "string" ? raw.District : "";
	const State = typeof raw.State === "string" ? raw.State : "";
	const Pincode = typeof raw.Pincode === "string" ? raw.Pincode : "";
	const DeliveryStatus =
		typeof raw.DeliveryStatus === "string" ? raw.DeliveryStatus : "";
	if (!/^\d{6}$/.test(Pincode.replace(/\D/g, ""))) {
		return null;
	}
	return {
		Name,
		District,
		State,
		Pincode: Pincode.replace(/\D/g, "").slice(0, 6),
		DeliveryStatus,
	};
}

function parseEnvelope(data: unknown): {
	status: string;
	message: string;
	offices: IndiaPostOffice[];
} | null {
	if (!Array.isArray(data) || data.length === 0) {
		return null;
	}
	const row = data[0] as Record<string, unknown>;
	const Status = typeof row.Status === "string" ? row.Status : "";
	const Message = typeof row.Message === "string" ? row.Message : "";
	const rawList = row.PostOffice;
	const offices: IndiaPostOffice[] = [];
	if (Array.isArray(rawList)) {
		for (const item of rawList) {
			if (!isRawOffice(item)) continue;
			const o = toOffice(item);
			if (o) offices.push(o);
		}
	}
	return { status: Status, message: Message, offices };
}

/** India Post marks some offices as non-delivery; couriers often still align with Delivery areas. */
export function isIndiaPostDelivery(office: IndiaPostOffice): boolean {
	return office.DeliveryStatus === "Delivery";
}

/** FlameWood delivery: India Post delivery area + our domestic zone rules. */
export function isFlameWoodDeliverable(office: IndiaPostOffice): boolean {
	if (!isIndiaPostDelivery(office)) {
		return false;
	}
	return isStandardDeliveryAvailable(office.Pincode);
}

export async function fetchPincodeOffices(
	pincode: string,
	signal?: AbortSignal,
): Promise<
	{ ok: true; offices: IndiaPostOffice[] } | { ok: false; error: string }
> {
	const p = pincode.replace(/\D/g, "").slice(0, 6);
	if (!/^\d{6}$/.test(p)) {
		return { ok: false, error: "Enter a valid 6-digit pincode." };
	}
	const res = await fetch(`/api/pincode?pincode=${encodeURIComponent(p)}`, {
		signal,
	});
	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		const msg =
			typeof err === "object" && err && "error" in err
				? String((err as { error: string }).error)
				: "Could not look up pincode.";
		return { ok: false, error: msg };
	}
	const data: unknown = await res.json();
	const parsed = parseEnvelope(data);
	if (!parsed || parsed.status !== "Success" || parsed.offices.length === 0) {
		return {
			ok: false,
			error: "Pincode not found. Check the number and try again.",
		};
	}
	return { ok: true, offices: parsed.offices };
}

export async function searchPostOffices(
	query: string,
	signal?: AbortSignal,
): Promise<
	{ ok: true; offices: IndiaPostOffice[] } | { ok: false; error: string }
> {
	const q = query.trim();
	if (q.length < 3) {
		return { ok: true, offices: [] };
	}
	const res = await fetch(`/api/pincode?postoffice=${encodeURIComponent(q)}`, {
		signal,
	});
	if (!res.ok) {
		return { ok: false, error: "Could not search post offices." };
	}
	const data: unknown = await res.json();
	const parsed = parseEnvelope(data);
	if (!parsed || parsed.status !== "Success" || parsed.offices.length === 0) {
		return { ok: true, offices: [] };
	}
	return { ok: true, offices: parsed.offices };
}
