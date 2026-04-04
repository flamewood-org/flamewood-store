"use client";

import { useState } from "react";
import { 
	User, 
	Package, 
	MapPin, 
	LogOut, 
	Clock, 
	ArrowRight, 
	Truck, 
	Mail, 
	Phone, 
	ShoppingBag, 
	CreditCard,
	Settings
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

// Mock Data for demonstration
const mockUser = {
	name: "Alex",
	lastName: "Johnson",
	email: "alex@example.com",
	phone: "+91 98765 43210",
	address: "123, Palm Grove Villas, Kochi, Kerala, 682001",
};

const mockOrders = [
	{
		id: "#ORD-93021",
		date: "April 2, 2026",
		status: "In Transit",
		statusColor: "text-blue-600 bg-blue-100",
		total: 2450.00,
		items: 2,
		description: "Premium Firewood (100kg), Coconut Shells (50kg)",
		isPending: false,
	},
	{
		id: "#ORD-93010",
		date: "March 28, 2026",
		status: "Pending Checkout",
		statusColor: "text-warning bg-warning/10",
		total: 800.00,
		items: 1,
		description: "Biomass Briquettes (20kg)",
		isPending: true,
	},
	{
		id: "#ORD-92899",
		date: "March 15, 2026",
		status: "Delivered",
		statusColor: "text-success bg-success/10",
		total: 1200.00,
		items: 1,
		description: "Premium Firewood (50kg)",
		isPending: false,
	}
];

export default function AccountPage() {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [trackOrderNo, setTrackOrderNo] = useState("");
	
	const handleTrackOrder = (e: React.FormEvent) => {
		e.preventDefault();
		if (trackOrderNo.trim()) {
			// In reality, this would query the API or redirect to /track-order with ?id=
			alert(`Tracking order: ${trackOrderNo}`);
		}
	};

	return (
		<div className="bg-background min-h-screen pb-24">
			{/* Header area */}
			<div className="bg-surface border-b border-border pt-12 pb-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
						<div className="flex items-center gap-6">
							<div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20">
								{mockUser.name.charAt(0)}{mockUser.lastName.charAt(0)}
							</div>
							<div>
								<h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-1">
									Welcome back, {mockUser.name}!
								</h1>
								<p className="text-text-secondary flex items-center gap-2">
									<Mail className="w-4 h-4" /> {mockUser.email}
								</p>
							</div>
						</div>
						<Button variant="outline" className="flex items-center gap-2 bg-white hidden md:flex">
							<LogOut className="w-4 h-4" /> Sign Out
						</Button>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar Navigation */}
					<div className="w-full lg:w-64 shrink-0 space-y-2">
						<button 
							onClick={() => setActiveTab("dashboard")}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
								activeTab === "dashboard" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-secondary hover:bg-surface hover:text-primary"
							}`}
						>
							<User className="w-5 h-5" /> Dashboard
						</button>
						<button 
							onClick={() => setActiveTab("orders")}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
								activeTab === "orders" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-secondary hover:bg-surface hover:text-primary"
							}`}
						>
							<div className="flex items-center gap-3">
								<Package className="w-5 h-5" /> My Orders
							</div>
							<span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "orders" ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
								{mockOrders.length}
							</span>
						</button>
						<button 
							onClick={() => setActiveTab("addresses")}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
								activeTab === "addresses" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-secondary hover:bg-surface hover:text-primary"
							}`}
						>
							<MapPin className="w-5 h-5" /> Addresses
						</button>
						<button 
							onClick={() => setActiveTab("settings")}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
								activeTab === "settings" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-secondary hover:bg-surface hover:text-primary"
							}`}
						>
							<Settings className="w-5 h-5" /> Settings
						</button>
						
						<div className="pt-6 mt-6 border-t border-border lg:hidden">
							<Button variant="outline" fullWidth className="flex items-center justify-center gap-2">
								<LogOut className="w-4 h-4" /> Sign Out
							</Button>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="flex-1">
						{activeTab === "dashboard" && (
							<div className="space-y-8 animate-fade-in-up">
								<h2 className="text-2xl font-bold text-foreground">Overview</h2>
								
								<div className="grid sm:grid-cols-2 gap-6">
									<Card className="p-6 bg-gradient-to-br from-surface to-surface-alt border-border">
										<div className="flex items-start justify-between mb-4">
											<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
												<Package className="w-6 h-6" />
											</div>
										</div>
										<h3 className="text-text-secondary font-medium mb-1">Total Orders</h3>
										<p className="text-3xl font-bold text-foreground">{mockOrders.length}</p>
									</Card>
									
									<Card className="p-6 bg-gradient-to-br from-primary to-primary-light text-white border-0 shadow-lg shadow-primary/20">
										<div className="flex items-start justify-between mb-4">
											<div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
												<Truck className="w-6 h-6" />
											</div>
										</div>
										<h3 className="text-white/80 font-medium mb-1">Track an Order</h3>
										<form onSubmit={handleTrackOrder} className="flex gap-2">
											<Input 
												placeholder="Order ID" 
												value={trackOrderNo}
												onChange={(e) => setTrackOrderNo(e.target.value)}
												className="bg-white/20 border-white/20 text-white placeholder:text-white/50 h-10" 
											/>
											<Button type="submit" variant="secondary" className="h-10 px-4">
												Track
											</Button>
										</form>
									</Card>
								</div>

								{/* Recent Orders Snapshot */}
								<div>
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
										<button onClick={() => setActiveTab("orders")} className="text-primary text-sm font-semibold hover:underline">
											View All
										</button>
									</div>
									<div className="space-y-4">
										{mockOrders.slice(0, 2).map((order) => (
											<Card key={order.id} className="p-0 overflow-hidden group hover:shadow-md transition-shadow border-border">
												<div className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-4">
													<div className="flex items-start gap-4">
														<div className="w-12 h-12 rounded-xl bg-surface-alt flex items-center justify-center shrink-0">
															<ShoppingBag className="w-6 h-6 text-text-tertiary group-hover:text-primary transition-colors" />
														</div>
														<div>
															<div className="flex items-center gap-3 mb-1">
																<h4 className="font-bold text-foreground">{order.id}</h4>
																<span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${order.statusColor}`}>
																	{order.status}
																</span>
															</div>
															<p className="text-sm text-text-secondary">{order.date} • {order.items} items</p>
														</div>
													</div>
													<div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-border">
														<div className="text-right flex-1 md:flex-none">
															<p className="font-bold text-lg text-foreground">₹{order.total.toFixed(2)}</p>
														</div>
														<Button 
															variant={order.isPending ? "primary" : "outline"} 
															size="sm" 
															onClick={() => setActiveTab("orders")}
														>
															{order.isPending ? "Checkout" : "View"}
														</Button>
													</div>
												</div>
											</Card>
										))}
									</div>
								</div>
							</div>
						)}

						{activeTab === "orders" && (
							<div className="space-y-6 animate-fade-in-up">
								<h2 className="text-2xl font-bold text-foreground mb-6">Order History</h2>
								
								<div className="space-y-4">
									{mockOrders.map((order) => (
										<Card key={order.id} className="overflow-hidden border-border transition-all hover:border-primary/30 hover:shadow-md">
											<div className="bg-surface-alt/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-border">
												<div className="flex items-center gap-6">
													<div>
														<p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">Order Placed</p>
														<p className="font-semibold text-sm text-foreground">{order.date}</p>
													</div>
													<div>
														<p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">Total</p>
														<p className="font-semibold text-sm text-foreground">₹{order.total.toFixed(2)}</p>
													</div>
												</div>
												<div className="text-right">
													<p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">Order ID</p>
													<p className="font-semibold text-sm text-foreground">{order.id}</p>
												</div>
											</div>
											
											<div className="p-6">
												<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
													<div className="flex-1">
														<div className="flex items-center gap-3 mb-3">
															<span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
																{order.status}
															</span>
															{order.status === "In Transit" && (
																<span className="text-sm font-medium text-text-secondary flex items-center gap-1">
																	<Truck className="w-4 h-4" /> Arriving by April 5
																</span>
															)}
														</div>
														<p className="font-medium text-foreground">{order.description}</p>
													</div>
													
													<div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
														{order.isPending ? (
															<Button className="w-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
																<CreditCard className="w-4 h-4" /> Pay Now
															</Button>
														) : (
															<>
																<Button variant="outline" className="w-full">
																	Track Package
																</Button>
																<Button variant="secondary" className="w-full">
																	Reorder
																</Button>
															</>
														)}
													</div>
												</div>
											</div>
										</Card>
									))}
								</div>
							</div>
						)}

						{activeTab === "addresses" && (
							<div className="space-y-6 animate-fade-in-up">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-2xl font-bold text-foreground">Saved Addresses</h2>
									<Button>Add New Address</Button>
								</div>
								
								<div className="grid sm:grid-cols-2 gap-6">
									<Card className="p-6 border-primary bg-primary/5 relative">
										<div className="absolute top-4 right-4">
											<span className="px-2.5 py-0.5 bg-primary rounded-full text-white text-xs font-bold">Default</span>
										</div>
										<h3 className="font-bold text-lg text-foreground mb-1">{mockUser.name} {mockUser.lastName}</h3>
										<p className="text-text-secondary text-sm mb-4">{mockUser.phone}</p>
										<p className="text-foreground leading-relaxed mb-6">
											{mockUser.address}
										</p>
										<div className="flex gap-3">
											<Button variant="outline" size="sm">Edit</Button>
											<Button variant="outline" size="sm" className="text-error hover:bg-error/10 border-border">Delete</Button>
										</div>
									</Card>

									<button type="button" className="p-6 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-text-tertiary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all min-h-[250px]">
										<MapPin className="w-8 h-8 mb-3" />
										<span className="font-bold">Add a new address</span>
									</button>
								</div>
							</div>
						)}

						{activeTab === "settings" && (
							<div className="space-y-6 animate-fade-in-up">
								<h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>
								
								<Card className="p-6 space-y-6">
									<div className="grid md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="text-sm font-bold text-foreground">First Name</label>
											<Input defaultValue={mockUser.name} />
										</div>
										<div className="space-y-2">
											<label className="text-sm font-bold text-foreground">Last Name</label>
											<Input defaultValue={mockUser.lastName} />
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-bold text-foreground">Email Address</label>
										<Input defaultValue={mockUser.email} type="email" />
									</div>
									<div className="space-y-2">
										<label className="text-sm font-bold text-foreground">Phone Number</label>
										<Input defaultValue={mockUser.phone} type="tel" />
									</div>
									<div className="pt-4 border-t border-border">
										<Button>Save Changes</Button>
									</div>
								</Card>

								<Card className="p-6 border-error/20 bg-error/5">
									<h3 className="text-error font-bold mb-2">Danger Zone</h3>
									<p className="text-sm text-text-secondary mb-4">
										Once you delete your account, there is no going back. Please be certain.
									</p>
									<Button variant="outline" className="text-error border-error hover:bg-error hover:text-white">
										Delete Account
									</Button>
								</Card>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
