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
	const { hydrated, isModalOpen, location, commitVerifiedLocation } =
		useDeliveryLocation();

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
						setError("Delivery not available for this pincode.");
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

	const resolvedOffice =
		selectedOffice ??
		(suggestions.length === 1 ? (suggestions[0] ?? null) : null);
	const canSubmit = resolvedOffice !== null && !isSearching && !isVerifying;

	const verifyAndSave = async () => {
		setError(null);

		const office = resolvedOffice;
		if (!office) {
			setError("Select a location from the list.");
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
				setError("Could not confirm delivery. Try another office.");
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
			} else if (canSubmit) {
				void verifyAndSave();
			}
		}
	};

	if (!hydrated || !isModalOpen) return null;

	return (
		<div className="fixed inset-0 z-110 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-contain">
			{/* Backdrop: does not close the modal — must complete verification */}
			<div
				className="absolute inset-0 bg-black/55 backdrop-blur-sm animate-fade-in cursor-default"
				aria-hidden
			/>

			<div
				className="relative z-1 my-auto w-full max-w-[min(100%,28rem)] rounded-2xl border border-border bg-surface shadow-lg animate-scale-in overflow-hidden flex flex-col max-h-[min(92dvh,40rem)]"
				role="dialog"
				aria-modal="true"
				aria-labelledby="delivery-location-title"
			>
				<div className="bg-linear-to-br from-primary/10 to-accent/5 px-5 pt-5 pb-3 border-b border-border/60 shrink-0">
					<div className="flex items-center gap-3">
						<div className="shrink-0 w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
							<MapPin className="w-5 h-5 text-primary" aria-hidden />
						</div>
						<div>
							<h2
								id="delivery-location-title"
								className="text-base font-semibold text-foreground tracking-tight"
							>
								Delivery pincode
							</h2>
							<p className="text-xs text-text-secondary mt-0.5">
								6-digit pincode or search by area.
							</p>
						</div>
					</div>
				</div>

				<div className="p-5 space-y-3 overflow-y-auto flex-1 min-h-0">
					<div className="relative">
						<div className="relative">
							<Input
								id="delivery-pin-input"
								type="text"
								inputMode="text"
								autoComplete="postal-code"
								placeholder="Pincode or area"
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
							<div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-primary/20 bg-surface-alt/40 shadow-inner py-1.5 custom-scrollbar">
								<div className="px-3 py-1.5 mb-1 text-[10px] uppercase font-bold tracking-widest text-primary/60 border-b border-primary/10">
									Select your area
								</div>
								{suggestions.map((row, i) => (
									<button
										key={`${officeKey(row)}-${i}`}
										type="button"
										className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 ${
											i === highlight
												? "bg-primary text-white shadow-md"
												: "hover:bg-primary/5 text-foreground border-b border-border/50 last:border-0"
										}`}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => applyOffice(row)}
									>
										<div className="flex items-center gap-2">
											<span className="font-bold tabular-nums">
												{row.Pincode}
											</span>
											<span className={`text-[10px] px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-tighter ${i === highlight ? "bg-white/20 text-white" : "bg-primary/5 text-primary/70"}`}>
												{row.District}
											</span>
										</div>
										<span className={`block text-xs mt-1.5 font-medium ${i === highlight ? "text-white/90" : "text-text-secondary"}`}>
											{row.Name}, {row.State}
										</span>
									</button>
								))}
							</div>
						)}
					</div>

					{selectedOffice && (
						<p className="text-sm text-text-secondary">
							<span className="tabular-nums font-semibold text-foreground">
								{selectedOffice.Pincode}
							</span>
							{" · "}
							{selectedOffice.Name}, {selectedOffice.District}
						</p>
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
						disabled={!canSubmit}
						className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:pointer-events-none"
					>
						{isVerifying ? (
							<span className="inline-flex items-center gap-2">
								<Loader2 className="h-4 w-4 animate-spin" />
								Saving…
							</span>
						) : (
							"Save"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
