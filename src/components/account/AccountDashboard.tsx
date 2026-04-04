"use client";

import {
	LogOut,
	Mail,
	MapPin,
	Package,
	Settings,
	ShoppingBag,
	Truck,
	User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { CustomerProfile } from "@/types/customer";

function formatDate(iso: string | null) {
	if (!iso) return "—";
	try {
		return new Intl.DateTimeFormat("en-IN", {
			dateStyle: "medium",
		}).format(new Date(iso));
	} catch {
		return iso;
	}
}

export function AccountDashboard({ customer }: { customer: CustomerProfile }) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("dashboard");
	const [signingOut, setSigningOut] = useState(false);

	const displayName =
		[customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
		customer.email?.split("@")[0] ||
		"Customer";

	const letterMark =
		`${customer.firstName?.[0] ?? ""}${customer.lastName?.[0] ?? ""}`.trim();
	const initials =
		letterMark || customer.email?.slice(0, 2).toUpperCase() || "?";

	const handleSignOut = async () => {
		setSigningOut(true);
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			window.dispatchEvent(new Event("auth-changed"));
			router.push("/");
			router.refresh();
		} finally {
			setSigningOut(false);
		}
	};

	return (
		<div className="bg-background min-h-screen min-w-0 overflow-x-hidden pb-24">
			<div className="bg-surface border-b border-border pt-10 pb-6">
				<div className="w-full min-w-0">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
						<div className="flex items-center gap-5">
							<div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-semibold shadow-md shadow-primary/15 uppercase">
								{initials}
							</div>
							<div>
								<h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">
									Welcome, {displayName}
								</h1>
								<p className="text-text-secondary flex items-center gap-2 text-sm">
									<Mail className="w-4 h-4 shrink-0" /> {customer.email}
								</p>
							</div>
						</div>
						<Button
							variant="outline"
							className="hidden md:flex items-center gap-2 bg-white"
							onClick={handleSignOut}
							disabled={signingOut}
						>
							<LogOut className="w-4 h-4" />{" "}
							{signingOut ? "Signing out…" : "Sign out"}
						</Button>
					</div>
				</div>
			</div>

			<div className="w-full min-w-0 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="w-full lg:w-64 shrink-0 space-y-2">
						{(
							[
								["dashboard", User, "Dashboard"],
								["orders", Package, "Orders"],
								["addresses", MapPin, "Addresses"],
								["settings", Settings, "Settings"],
							] as const
						).map(([id, Icon, label]) => (
							<button
								key={id}
								type="button"
								onClick={() => setActiveTab(id)}
								className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
									activeTab === id
										? "bg-primary text-white shadow-md shadow-primary/20"
										: "text-text-secondary hover:bg-surface hover:text-primary"
								}`}
							>
								<span className="flex items-center gap-3">
									<Icon className="w-5 h-5" /> {label}
								</span>
								{id === "orders" && customer.orders.length > 0 && (
									<span
										className={`text-xs px-2 py-0.5 rounded-full ${
											activeTab === "orders"
												? "bg-white/20 text-white"
												: "bg-primary/10 text-primary"
										}`}
									>
										{customer.orders.length}
									</span>
								)}
							</button>
						))}

						<div className="pt-6 mt-6 border-t border-border lg:hidden">
							<Button
								variant="outline"
								fullWidth
								className="flex items-center justify-center gap-2"
								onClick={handleSignOut}
								disabled={signingOut}
							>
								<LogOut className="w-4 h-4" /> Sign out
							</Button>
						</div>
					</div>

					<div className="flex-1">
						{activeTab === "dashboard" && (
							<div className="space-y-8 animate-fade-in-up">
								<h2 className="text-xl font-semibold text-foreground">Overview</h2>
								<div className="grid sm:grid-cols-2 gap-6">
									<Card className="p-6 border-border">
										<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
											<Package className="w-6 h-6" />
										</div>
										<h3 className="text-text-secondary font-medium mb-1 text-sm">
											Orders
										</h3>
										<p className="text-3xl font-semibold text-foreground">
											{customer.orders.length}
										</p>
									</Card>
									<Card className="p-6 bg-linear-to-br from-primary to-primary-light text-white border-0 shadow-lg shadow-primary/20">
										<div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
											<Truck className="w-6 h-6" />
										</div>
										<h3 className="text-white/90 font-medium mb-2 text-sm">
											Track an order
										</h3>
										<Link href="/track-order">
											<Button
												variant="secondary"
												size="sm"
												className="bg-white/20 border-0 text-white hover:bg-white/30"
											>
												Open tracking
											</Button>
										</Link>
									</Card>
								</div>

								{customer.orders.length > 0 && (
									<div>
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-lg font-semibold text-foreground">
												Recent orders
											</h3>
											<button
												type="button"
												onClick={() => setActiveTab("orders")}
												className="text-primary text-sm font-semibold hover:underline"
											>
												View all
											</button>
										</div>
										<div className="space-y-4">
											{customer.orders.slice(0, 3).map((order) => (
												<Card
													key={order.id}
													className="p-5 border-border hover:shadow-md transition-shadow"
												>
													<div className="flex flex-wrap items-center justify-between gap-4">
														<div className="flex items-start gap-4">
															<div className="w-12 h-12 rounded-xl bg-surface-alt flex items-center justify-center shrink-0">
																<ShoppingBag className="w-6 h-6 text-text-tertiary" />
															</div>
															<div>
																<h4 className="font-semibold text-foreground">
																	{order.name}
																</h4>
																<p className="text-sm text-text-secondary">
																	{formatDate(order.processedAt)}
																</p>
															</div>
														</div>
														<p className="font-semibold text-lg text-foreground tabular-nums">
															{order.currencyCode === "INR" ? "₹" : ""}
															{order.total.toFixed(2)}
														</p>
													</div>
												</Card>
											))}
										</div>
									</div>
								)}
							</div>
						)}

						{activeTab === "orders" && (
							<div className="space-y-6 animate-fade-in-up">
								<h2 className="text-2xl font-semibold text-foreground mb-6">
									Order history
								</h2>
								{customer.orders.length === 0 ? (
									<Card className="p-10 text-center border-border">
										<Package className="w-12 h-12 mx-auto text-text-tertiary mb-3" />
										<p className="text-text-secondary">
											No orders yet.{" "}
											<Link
												href="/products/all"
												className="text-primary font-semibold"
											>
												Start shopping
											</Link>
										</p>
									</Card>
								) : (
									<div className="space-y-4">
										{customer.orders.map((order) => (
											<Card
												key={order.id}
												className="overflow-hidden border-border hover:border-primary/25 transition-all"
											>
												<div className="bg-surface-alt/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-border">
													<div>
														<p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">
															Placed
														</p>
														<p className="font-semibold text-sm">
															{formatDate(order.processedAt)}
														</p>
													</div>
													<div>
														<p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">
															Total
														</p>
														<p className="font-semibold text-sm tabular-nums">
															₹{order.total.toFixed(2)}
														</p>
													</div>
													<div>
														<p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">
															Order
														</p>
														<p className="font-semibold text-sm">
															{order.name}
														</p>
													</div>
												</div>
											</Card>
										))}
									</div>
								)}
							</div>
						)}

						{activeTab === "addresses" && (
							<div className="space-y-6 animate-fade-in-up">
								<h2 className="text-2xl font-semibold text-foreground mb-2">
									Addresses
								</h2>
								<p className="text-text-secondary text-sm mb-6">
									Addresses from checkout are managed in Shopify. Update them at
									checkout or in your{" "}
									<a
										href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ""}/account/addresses`}
										className="text-primary font-semibold hover:underline"
										target="_blank"
										rel="noreferrer"
									>
										Shopify account portal
									</a>
									.
								</p>
								<Card className="p-8 text-center border-dashed border-border text-text-secondary">
									<MapPin className="w-10 h-10 mx-auto mb-2 opacity-50" />
									<p className="text-sm">
										Saved addresses sync with your next Shopify checkout.
									</p>
								</Card>
							</div>
						)}

						{activeTab === "settings" && (
							<div className="space-y-6 animate-fade-in-up">
								<h2 className="text-2xl font-semibold text-foreground mb-6">
									Profile
								</h2>
								<Card className="p-6 space-y-4 border-border">
									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<p className="text-xs font-semibold text-text-tertiary uppercase mb-1">
												First name
											</p>
											<p className="font-medium">{customer.firstName || "—"}</p>
										</div>
										<div>
											<p className="text-xs font-semibold text-text-tertiary uppercase mb-1">
												Last name
											</p>
											<p className="font-medium">{customer.lastName || "—"}</p>
										</div>
									</div>
									<div>
										<p className="text-xs font-semibold text-text-tertiary uppercase mb-1">
											Email
										</p>
										<p className="font-medium">{customer.email}</p>
									</div>
									<div>
										<p className="text-xs font-semibold text-text-tertiary uppercase mb-1">
											Phone
										</p>
										<p className="font-medium">{customer.phone || "—"}</p>
									</div>
									<p className="text-sm text-text-secondary pt-4 border-t border-border">
										To change your password or email, use your store&apos;s
										customer account settings in Shopify.
									</p>
								</Card>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
