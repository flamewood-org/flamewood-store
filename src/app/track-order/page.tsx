"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface TrackingStep {
	status: string;
	completed: boolean;
	date?: string;
}

interface TrackingResult {
	orderId: string;
	status: string;
	estimatedDelivery: string;
	trackingNumber: string;
	carrier: string;
	steps: TrackingStep[];
}

export default function TrackOrderPage() {
	const [orderId, setOrderId] = useState("");
	const [email, setEmail] = useState("");
	const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(
		null,
	);

	const handleTrack = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement order tracking API call
		// For now, show mock data
		setTrackingResult({
			orderId: orderId,
			status: "shipped",
			estimatedDelivery: "2024-01-15",
			trackingNumber: "FW123456789",
			carrier: "Shiprocket",
			steps: [
				{ status: "confirmed", completed: true, date: "2024-01-10" },
				{ status: "packed", completed: true, date: "2024-01-11" },
				{ status: "shipped", completed: true, date: "2024-01-12" },
				{ status: "out_for_delivery", completed: false },
				{ status: "delivered", completed: false },
			],
		});
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "confirmed":
				return <CheckCircle2 className="h-5 w-5" />;
			case "packed":
				return <Package className="h-5 w-5" />;
			case "shipped":
			case "out_for_delivery":
				return <Truck className="h-5 w-5" />;
			default:
				return <CheckCircle2 className="h-5 w-5" />;
		}
	};

	const getStatusLabel = (status: string) => {
		const labels: Record<string, string> = {
			confirmed: "Order Confirmed",
			packed: "Packed",
			shipped: "Shipped",
			out_for_delivery: "Out for Delivery",
			delivered: "Delivered",
		};
		return labels[status] || status;
	};

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-foreground mb-4">
					Track Your Order
				</h1>
				<p className="text-text-secondary">
					Enter your order ID and email to track your shipment
				</p>
			</div>

			{/* Tracking Form */}
			<div className="bg-surface border border-border rounded-lg p-6 mb-8">
				<form onSubmit={handleTrack} className="space-y-4">
					<div className="grid sm:grid-cols-2 gap-4">
						<Input
							label="Order ID"
							type="text"
							required
							value={orderId}
							onChange={(e) => setOrderId(e.target.value)}
							placeholder="e.g., #1001"
						/>
						<Input
							label="Email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your@email.com"
						/>
					</div>
					<Button type="submit" size="lg" className="w-full">
						<Search className="h-4 w-4 mr-2" />
						Track Order
					</Button>
				</form>
			</div>

			{/* Tracking Results */}
			{trackingResult && (
				<div className="space-y-6">
					{/* Order Summary */}
					<div className="bg-surface border border-border rounded-lg p-6">
						<h2 className="text-xl font-semibold text-foreground mb-4">
							Order #{trackingResult.orderId}
						</h2>
						<div className="grid sm:grid-cols-3 gap-4 text-sm">
							<div>
								<p className="text-text-secondary mb-1">Status</p>
								<p className="font-semibold text-primary capitalize">
									{trackingResult.status.replace("_", " ")}
								</p>
							</div>
							<div>
								<p className="text-text-secondary mb-1">Estimated Delivery</p>
								<p className="font-semibold text-foreground">
									{new Date(
										trackingResult.estimatedDelivery,
									).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className="text-text-secondary mb-1">Tracking Number</p>
								<p className="font-semibold text-foreground">
									{trackingResult.trackingNumber}
								</p>
							</div>
						</div>
					</div>

					{/* Timeline */}
					<div className="bg-surface border border-border rounded-lg p-6">
						<h3 className="text-lg font-semibold text-foreground mb-6">
							Delivery Timeline
						</h3>
						<div className="space-y-6">
							{trackingResult.steps.map((step: TrackingStep, index: number) => (
								<div key={index} className="flex items-start space-x-4">
									<div
										className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
											step.completed
												? "bg-primary text-white"
												: "bg-gray-200 text-gray-400"
										}`}
									>
										{getStatusIcon(step.status)}
									</div>
									<div className="flex-1">
										<p
											className={`font-medium ${step.completed ? "text-foreground" : "text-text-secondary"}`}
										>
											{getStatusLabel(step.status)}
										</p>
										{step.date && (
											<p className="text-sm text-text-secondary">
												{new Date(step.date).toLocaleDateString()}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
