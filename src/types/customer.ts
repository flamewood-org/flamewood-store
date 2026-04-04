export type CustomerOrderSummary = {
	id: string;
	name: string;
	processedAt: string | null;
	total: number;
	currencyCode: string;
	financialStatus: string | null;
	fulfillmentStatus: string | null;
};

export type CustomerProfile = {
	id: string;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	phone: string | null;
	orders: CustomerOrderSummary[];
};
