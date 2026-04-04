"use client";

import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Footer() {
	const [email, setEmail] = useState("");

	const handleNewsletterSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email.trim()) {
			alert(`Thank you for subscribing with: ${email}`);
			setEmail("");
		}
	};

	return (
		<footer className="mt-auto border-t border-border bg-foreground text-white/90">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 min-w-0">
				<div className="flex flex-col lg:flex-row lg:items-end gap-6 sm:gap-8 lg:gap-12 pb-8 sm:pb-10 border-b border-white/10">
					<div className="flex-1 max-w-md">
						<Link href="/" className="inline-flex items-center gap-2 mb-3">
							<span className="text-lg font-semibold tracking-tight">
								<span className="text-primary-light">Flame</span>
								<span className="text-white/95">Wood</span>
							</span>
						</Link>
						<p className="text-sm text-white/60 leading-relaxed">
							Biomass fuel and coconut products from Kerala — retail and bulk,
							shipped with care.
						</p>
					</div>
					<form
						onSubmit={handleNewsletterSubmit}
						className="flex flex-col sm:flex-row gap-2 w-full lg:max-w-md"
					>
						<Input
							type="email"
							placeholder="Email for updates"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/35 text-sm min-h-[42px]"
							required
						/>
						<Button
							type="submit"
							variant="secondary"
							className="shrink-0 border-0 bg-primary text-white hover:bg-primary-light"
						>
							Subscribe
						</Button>
					</form>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 md:gap-8 pt-8 sm:pt-10">
					<div>
						<h3 className="text-xs font-medium text-white/45 uppercase tracking-wide mb-3">
							Shop
						</h3>
						<ul className="space-y-2.5 text-sm">
							<li>
								<Link
									href="/products/all"
									className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group"
								>
									All products
									<ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
								</Link>
							</li>
							<li>
								<Link
									href="/products/firewood"
									className="text-white/70 hover:text-white transition-colors"
								>
									Firewood
								</Link>
							</li>
							<li>
								<Link
									href="/products/coconut"
									className="text-white/70 hover:text-white transition-colors"
								>
									Coconut
								</Link>
							</li>
							<li>
								<Link
									href="/products/biomass"
									className="text-white/70 hover:text-white transition-colors"
								>
									Biomass
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-xs font-medium text-white/45 uppercase tracking-wide mb-3">
							Support
						</h3>
						<ul className="space-y-2.5 text-sm">
							<li>
								<Link
									href="/contact"
									className="text-white/70 hover:text-white transition-colors"
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href="/track-order"
									className="text-white/70 hover:text-white transition-colors"
								>
									Track order
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-white/70 hover:text-white transition-colors"
								>
									About
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-xs font-medium text-white/45 uppercase tracking-wide mb-3">
							Legal
						</h3>
						<ul className="space-y-2.5 text-sm">
							<li>
								<Link
									href="/privacy"
									className="text-white/70 hover:text-white transition-colors"
								>
									Privacy
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-white/70 hover:text-white transition-colors"
								>
									Terms
								</Link>
							</li>
							<li>
								<Link
									href="/refunds"
									className="text-white/70 hover:text-white transition-colors"
								>
									Refunds
								</Link>
							</li>
						</ul>
					</div>
					<div className="sm:col-span-2 lg:col-span-1">
						<h3 className="text-xs font-medium text-white/45 uppercase tracking-wide mb-3">
							Contact
						</h3>
						<ul className="space-y-3 text-sm text-white/65">
							<li className="flex gap-2.5">
								<MapPin className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
								<span>
									Kochi EXZ, Ernakulam
									<br />
									Kerala 682001
								</span>
							</li>
							<li className="flex items-center gap-2.5">
								<Mail className="w-4 h-4 text-primary-light shrink-0" />
								<a
									href="mailto:support@flamewood.com"
									className="hover:text-white transition-colors"
								>
									support@flamewood.com
								</a>
							</li>
							<li className="flex items-center gap-2.5">
								<Phone className="w-4 h-4 text-primary-light shrink-0" />
								<span>+91 98765 43210</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-white/45 text-center sm:text-left">
					<p>
						&copy; {new Date().getFullYear()} Flame Wood. All rights reserved.
					</p>
					<p className="tabular-nums">Visa · Mastercard · UPI</p>
				</div>
			</div>
		</footer>
	);
}
