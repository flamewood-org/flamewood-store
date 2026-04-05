"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	isLocationExpired,
	readSavedDeliveryLocation,
	type SavedDeliveryLocation,
	writeSavedDeliveryLocation,
} from "@/lib/delivery-location";

interface DeliveryLocationContextType {
	location: SavedDeliveryLocation | null;
	hydrated: boolean;
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	/** Persists a location already validated (India Post + delivery rules) in the modal. */
	commitVerifiedLocation: (
		payload: Omit<SavedDeliveryLocation, "savedAt">,
	) => void;
}

const DeliveryLocationContext = createContext<
	DeliveryLocationContextType | undefined
>(undefined);

export function DeliveryLocationProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [location, setLocation] = useState<SavedDeliveryLocation | null>(null);
	const [hydrated, setHydrated] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const stored = readSavedDeliveryLocation();
		setLocation(stored);
		setHydrated(true);

		if (!stored || isLocationExpired(stored.savedAt)) {
			setIsModalOpen(true);
		}
	}, []);

	const openModal = useCallback(() => setIsModalOpen(true), []);

	const closeModal = useCallback(() => {
		if (location) {
			setIsModalOpen(false);
		}
	}, [location]);

	const commitVerifiedLocation = useCallback(
		(payload: Omit<SavedDeliveryLocation, "savedAt">) => {
			const saved: SavedDeliveryLocation = {
				...payload,
				savedAt: new Date().toISOString(),
			};
			writeSavedDeliveryLocation(saved);
			setLocation(saved);
			setIsModalOpen(false);
		},
		[],
	);

	const value = useMemo(
		() => ({
			location,
			hydrated,
			isModalOpen,
			openModal,
			closeModal,
			commitVerifiedLocation,
		}),
		[
			location,
			hydrated,
			isModalOpen,
			openModal,
			closeModal,
			commitVerifiedLocation,
		],
	);

	return (
		<DeliveryLocationContext.Provider value={value}>
			{children}
		</DeliveryLocationContext.Provider>
	);
}

export function useDeliveryLocation() {
	const ctx = useContext(DeliveryLocationContext);
	if (!ctx) {
		throw new Error(
			"useDeliveryLocation must be used within DeliveryLocationProvider",
		);
	}
	return ctx;
}
