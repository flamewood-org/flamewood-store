"use client";

import { Loader2, MapPin, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { buildSavedLocation } from "@/lib/delivery-location";
import {
	fetchPincodeOffices,
	type IndiaPostOffice,
	isFlameWoodDeliverable,
	searchPostOffices,
} from "@/lib/india-post-pincode";
import { useDeliveryLocation } from "@/store/DeliveryLocationContext";

const DEBOUNCE_MS = 450;

function filterDeliverable(offices: IndiaPostOffice[]): IndiaPostOffice[] {
	return offices.filter(isFlameWoodDeliverable);
}

function officeKey(o: IndiaPostOffice): string {
	return `${o.Pincode}:${o.Name}`;
}

export function DeliveryLocationModal() {
	const {
		hydrated,
		isModalOpen,
		location,
		closeModal,
		commitVerifiedLocation,
	} = useDeliveryLocation();
	const allowDismiss = !!location;

	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<IndiaPostOffice[]>([]);
	const [selectedOffice, setSelectedOffice] = useState<IndiaPostOffice | null>(
		null,
	);
	const [highlight, setHighlight] = useState(-1);
	const [error, setError] = useState<string | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);

	const abortRef = useRef<AbortController | null>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const skipLookupRef = useRef(false);

	useEffect(() => {
		if (!isModalOpen || !hydrated) return;
		setQuery(location?.pincode ?? "");
		setError(null);
		setSuggestions([]);
		setSelectedOffice(null);
		setHighlight(-1);
		const t = window.setTimeout(() => {
			document.getElementById("delivery-pin-input")?.focus();
		}, 50);
		return () => window.clearTimeout(t);
	}, [isModalOpen, hydrated, location]);

	useEffect(() => {
		if (!isModalOpen || !allowDismiss) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [isModalOpen, allowDismiss, closeModal]);

	useEffect(() => {
		if (!isModalOpen) return;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isModalOpen]);

	useEffect(() => {
		if (!isModalOpen) return;

		if (skipLookupRef.current) {
			skipLookupRef.current = false;
			setIsSearching(false);
			return;
		}

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
			debounceRef.current = null;
		}
		if (abortRef.current) {
			abortRef.current.abort();
		}

		const trimmed = query.trim();
		const digitsOnly = query.replace(/\D/g, "");
		const hasLetter = /[a-zA-Z]/.test(query);
		const onlyNumericPinEntry = !hasLetter && /^[\d\s]*$/.test(query);

		if (trimmed.length === 0) {
			setSuggestions([]);
			setSelectedOffice(null);
			setIsSearching(false);
			return;
		}

		if (onlyNumericPinEntry && digitsOnly.length > 0 && digitsOnly.length < 6) {
			setSuggestions([]);
			setSelectedOffice(null);
			setIsSearching(false);
			setError(null);
			return;
		}

		const ac = new AbortController();
		abortRef.current = ac;

		debounceRef.current = setTimeout(async () => {
			setIsSearching(true);
			setError(null);
			setSelectedOffice(null);
			setHighlight(-1);

			try {
				if (digitsOnly.length === 6 && !hasLetter) {
					const r = await fetchPincodeOffices(digitsOnly, ac.signal);
					if (!r.ok) {
						setSuggestions([]);
						setError(r.error);
						return;
					}
					const filtered = filterDeliverable(r.offices);
					if (filtered.length === 0) {
						setSuggestions([]);
						setError(
							"Delivery is not available for this pincode (India Post non-delivery or outside our service area).",
						);
						return;
					}
					setSuggestions(filtered);
					if (filtered.length === 1) {
						setSelectedOffice(filtered[0] ?? null);
					}
					return;
				}

				if (trimmed.length >= 3 && (hasLetter || digitsOnly.length < 6)) {
					const r = await searchPostOffices(trimmed, ac.signal);
					if (!r.ok) {
						setSuggestions([]);
						setError(r.error);
						return;
					}
					const filtered = filterDeliverable(r.offices).slice(0, 25);
					setSuggestions(filtered);
					if (filtered.length === 1) {
						setSelectedOffice(filtered[0] ?? null);
					}
					return;
				}

				setSuggestions([]);
			} catch (e) {
				if (e instanceof DOMException && e.name === "AbortError") return;
				setSuggestions([]);
				setError("Could not reach pincode service. Try again.");
			} finally {
				setIsSearching(false);
			}
		}, DEBOUNCE_MS);

		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
				debounceRef.current = null;
			}
			ac.abort();
		};
	}, [query, isModalOpen]);

	const applyOffice = (office: IndiaPostOffice) => {
		skipLookupRef.current = true;
		setSelectedOffice(office);
		setQuery(`${office.Pincode} · ${office.Name}`);
		setSuggestions([]);
		setHighlight(-1);
		setError(null);
	};

	const verifyAndSave = async () => {
		setError(null);

		let office = selectedOffice;
		if (!office && suggestions.length === 1) {
			office = suggestions[0] ?? null;
		}
		if (!office) {
			setError(
				"Choose a location from the list after search (type 6-digit pincode or area name).",
			);
			return;
		}

		setIsVerifying(true);
		try {
			const again = await fetchPincodeOffices(office.Pincode);
			if (!again.ok) {
				setError(again.error);
				return;
			}
			const match = again.offices.find(
				(o) =>
					o.Pincode === office.Pincode &&
					o.Name === office.Name &&
					isFlameWoodDeliverable(o),
			);
			if (!match) {
				setError(
					"Delivery could not be confirmed for this selection. Pick another office or pincode.",
				);
				return;
			}
			commitVerifiedLocation(buildSavedLocation(match));
		} catch {
			setError("Verification failed. Try again.");
		} finally {
			setIsVerifying(false);
		}
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown" && suggestions.length) {
			e.preventDefault();
			setHighlight((h) => Math.min(suggestions.length - 1, h + 1));
		} else if (e.key === "ArrowUp" && suggestions.length) {
			e.preventDefault();
			setHighlight((h) => Math.max(-1, h - 1));
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (suggestions.length > 0 && highlight >= 0 && suggestions[highlight]) {
				applyOffice(suggestions[highlight]);
			} else {
				void verifyAndSave();
			}
		} else if (e.key === "Escape" && allowDismiss) {
			closeModal();
		}
	};

	if (!hydrated || !isModalOpen) return null;

	return (
		<div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
			<button
				type="button"
				className={`absolute inset-0 bg-black/55 backdrop-blur-sm animate-fade-in ${
					allowDismiss ? "cursor-pointer" : "cursor-default"
				}`}
				aria-label={allowDismiss ? "Close" : "Background"}
				onClick={() => allowDismiss && closeModal()}
				disabled={!allowDismiss}
			/>

			<div
				className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl animate-scale-in overflow-hidden border border-border max-h-[min(90vh,640px)] flex flex-col"
				role="dialog"
				aria-modal="true"
				aria-labelledby="delivery-location-title"
			>
				<div className="bg-linear-to-br from-primary/10 to-accent/5 px-6 pt-6 pb-4 border-b border-border/60 shrink-0">
					<div className="flex items-start gap-3">
						<div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
							<MapPin className="w-6 h-6 text-primary" aria-hidden />
						</div>
						<div>
							<h2
								id="delivery-location-title"
								className="text-xl font-black text-foreground tracking-tight"
							>
								Delivery pincode required
							</h2>
							<p className="text-sm text-text-secondary mt-1 leading-snug">
								Data from India Post (PostalPinCode.in). Enter a 6-digit
								pincode or search by post office / area, then confirm we deliver
								there.
							</p>
						</div>
					</div>
				</div>

				<div className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
					<div className="relative">
						<div className="relative">
							<Input
								id="delivery-pin-input"
								type="text"
								inputMode="text"
								autoComplete="postal-code"
								placeholder="e.g. 682001 or Kochi"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onKeyDown={onKeyDown}
								disabled={isVerifying}
								className="pl-11 pr-12 py-3.5 font-semibold tracking-wide"
								aria-invalid={!!error}
								aria-describedby={error ? "pincode-error" : undefined}
							/>
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
							{isSearching && (
								<Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
							)}
						</div>

						{suggestions.length > 0 && (
							<div className="absolute z-10 left-0 right-0 mt-2 max-h-48 overflow-y-auto rounded-xl border border-border bg-white shadow-lg py-1">
								{suggestions.map((row, i) => (
									<button
										key={`${officeKey(row)}-${i}`}
										type="button"
										className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
											i === highlight
												? "bg-primary/10 text-foreground"
												: "hover:bg-surface-alt text-foreground"
										}`}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => applyOffice(row)}
									>
										<span className="font-bold tabular-nums">
											{row.Pincode}
										</span>
										<span className="text-text-secondary font-medium">
											{" "}
											· {row.Name}, {row.District}
										</span>
									</button>
								))}
							</div>
						)}
					</div>

					{selectedOffice && (
						<div className="rounded-xl border border-success/30 bg-success/5 px-4 py-3 text-sm">
							<p className="font-bold text-foreground">Selected</p>
							<p className="text-text-secondary mt-0.5">
								<span className="tabular-nums font-semibold text-foreground">
									{selectedOffice.Pincode}
								</span>
								{" — "}
								{selectedOffice.Name}, {selectedOffice.District},{" "}
								{selectedOffice.State}
							</p>
						</div>
					)}

					{error && (
						<p
							id="pincode-error"
							className="text-sm font-medium text-error"
							role="alert"
						>
							{error}
						</p>
					)}

					<Button
						type="button"
						onClick={() => void verifyAndSave()}
						disabled={isVerifying}
						className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
					>
						{isVerifying ? (
							<span className="inline-flex items-center gap-2">
								<Loader2 className="h-4 w-4 animate-spin" />
								Verifying…
							</span>
						) : (
							"Verify delivery & save"
						)}
					</Button>

					<p className="text-xs text-text-tertiary text-center leading-relaxed">
						We require a valid India Post pincode with delivery service in our
						shipping zones. This is saved only in your browser.
					</p>
				</div>
			</div>
		</div>
	);
}
