"use client";

import { PackageSearch, Search } from "lucide-react";
import { useState } from "react";
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
		<div className="bg-background min-h-[80vh] flex flex-col pt-20 pb-32">
			{/* Decorative Blobs */}
			<div className="fixed top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
			<div className="fixed bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

			<div className="max-w-3xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center items-center text-center">
				<div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center shadow-xl shadow-primary/10 mb-8 animate-fade-in-up">
					<PackageSearch className="w-12 h-12 text-primary" />
				</div>

				<h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
					Track Your Order
				</h1>
				<p className="text-lg md:text-xl text-text-secondary mb-12 max-w-lg">
					Enter your Order ID below to get real-time status updates on your
					premium shipment.
				</p>

				<form onSubmit={handleTrack} className="w-full max-w-md space-y-4">
					<div className="relative">
						<Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-text-tertiary" />
						<Input
							type="text"
							placeholder="e.g. ORD-12345"
							value={orderId}
							onChange={(e) => setOrderId(e.target.value)}
							className="pl-14 h-16 rounded-2xl bg-white shadow-lg border-transparent focus:border-primary text-lg"
							required
						/>
					</div>
					<Button
						type="submit"
						size="lg"
						className="w-full h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/30"
					>
						Track Shipment
					</Button>
				</form>

				<p className="mt-8 text-sm text-text-tertiary">
					Need help?{" "}
					<a href="/contact" className="font-bold text-primary hover:underline">
						Contact Support
					</a>
				</p>
			</div>
		</div>
	);
}
