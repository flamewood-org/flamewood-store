"use client";

import { PackageSearch, Search } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function TrackOrderPage() {
	const [orderId, setOrderId] = useState("");

	const handleTrack = (e: React.FormEvent) => {
		e.preventDefault();
		if (!orderId) return;
		alert(`Tracking triggered for: ${orderId}`);
	};

	return (
		<div className="bg-background min-h-screen min-w-0 overflow-x-hidden flex flex-col">
			<PageHeader
				title="Track order"
				description="Enter your order ID to check status."
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Track order" }]}
			/>

			<div className="w-full min-w-0 flex-1 flex flex-col items-center py-10 md:py-14">
				<div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
					<div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center border border-border mb-6">
						<PackageSearch className="w-7 h-7 text-primary" />
					</div>

					<p className="text-[15px] text-text-secondary mb-8 leading-relaxed">
						Use the ID from your confirmation email or receipt.
					</p>

					<form onSubmit={handleTrack} className="w-full space-y-3 text-left">
						<div className="relative">
							<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
							<Input
								type="text"
								placeholder="e.g. ORD-12345"
								value={orderId}
								onChange={(e) => setOrderId(e.target.value)}
								className="pl-10 h-11 rounded-lg bg-surface"
								required
							/>
						</div>
						<Button type="submit" size="lg" className="w-full h-11 rounded-lg">
							Track shipment
						</Button>
					</form>

					<p className="mt-6 text-sm text-text-tertiary">
						Need help?{" "}
						<a
							href="/contact"
							className="font-medium text-primary hover:underline"
						>
							Contact support
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
