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
			// TODO: Integrate with email service
			alert(`Thank you for subscribing with: ${email}`);
			setEmail("");
		}
	};

	return (
		<footer className="bg-foreground text-surface-alt border-t-0 mt-auto rounded-t-[40px] md:rounded-t-[80px] overflow-hidden pt-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
				{/* Newsletter & Brand Block */}
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
					<div>
						<div className="flex items-center space-x-2 mb-6">
							<div className="relative w-12 h-12 bg-primary flex items-center justify-center rounded-xl transform -rotate-6 shadow-lg shadow-primary/20">
								<span className="text-2xl text-white">🔥</span>
							</div>
							<span className="text-3xl font-black text-white tracking-tight">
								FlameWood
							</span>
						</div>
						<p className="text-lg text-text-tertiary mb-8 leading-relaxed max-w-md">
							Premium biomass fuel and coconut products sourced directly from
							the heart of Kerala, India. Prepared for excellence.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
								aria-label="Instagram"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									viewBox="0 0 24 24"
								>
									<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
								</svg>
							</a>
							<a
								href="#"
								className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
								aria-label="Facebook"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									viewBox="0 0 24 24"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
							</a>
							<a
								href="#"
								className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
								aria-label="Twitter"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									viewBox="0 0 24 24"
								>
									<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
								</svg>
							</a>
						</div>
					</div>

					<div className="bg-white/5 rounded-[32px] p-8 md:p-10 border border-white/10">
						<h3 className="text-2xl font-bold text-white mb-3">
							Join the inner circle
						</h3>
						<p className="text-text-tertiary mb-8 leading-relaxed">
							Subscribe for exclusive offers, early access to new products, and
							industry insights.
						</p>
						<form
							onSubmit={handleNewsletterSubmit}
							className="flex flex-col sm:flex-row gap-3"
						>
							<Input
								type="email"
								placeholder="Enter your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="flex-1 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-text-tertiary focus:bg-white/15 h-14"
								required
							/>
							<Button
								type="submit"
								size="lg"
								className="rounded-xl px-8 shadow-md h-14 bg-primary hover:bg-primary-light border-0 text-white font-bold"
							>
								Subscribe
							</Button>
						</form>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
					{/* Shop */}
					<div>
						<h3 className="font-bold text-white mb-6 text-lg">Shop</h3>
						<ul className="space-y-4 text-sm font-medium">
							<li>
								<Link
									href="/products/all"
									className="text-text-tertiary hover:text-white transition-colors group flex items-center"
								>
									All Products
									<ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
								</Link>
							</li>
							<li>
								<Link
									href="/products/firewood"
									className="text-text-tertiary hover:text-white transition-colors group flex items-center"
								>
									Firewood
									<ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
								</Link>
							</li>
							<li>
								<Link
									href="/products/coconut"
									className="text-text-tertiary hover:text-white transition-colors group flex items-center"
								>
									Coconut Products
									<ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
								</Link>
							</li>
							<li>
								<Link
									href="/products/biomass"
									className="text-text-tertiary hover:text-white transition-colors group flex items-center"
								>
									Biomass
									<ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="font-bold text-white mb-6 text-lg">Support</h3>
						<ul className="space-y-4 text-sm font-medium">
							<li>
								<Link
									href="/contact"
									className="text-text-tertiary hover:text-white transition-colors"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="/track-order"
									className="text-text-tertiary hover:text-white transition-colors"
								>
									Track Order
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-text-tertiary hover:text-white transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/shipping"
									className="text-text-tertiary hover:text-white transition-colors"
								>
									Shipping Info
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h3 className="font-bold text-white mb-6 text-lg">Legal</h3>
						<ul className="space-y-4 text-sm font-medium">
							<li>
								<Link
									href="/privacy"
									className="text-text-tertiary hover:text-white transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-text-tertiary hover:text-white transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/refunds"
									className="text-text-tertiary hover:text-white transition-colors"
								>
									Refund Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div className="col-span-2 md:col-span-1">
						<h3 className="font-bold text-white mb-6 text-lg">Contact</h3>
						<div className="space-y-4 text-sm text-text-tertiary font-medium">
							<div className="flex items-start gap-3">
								<MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
								<span>
									Kochi EXZ, Ernakulam
									<br />
									Kerala, India 682001
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="h-5 w-5 text-primary flex-shrink-0" />
								<a
									href="mailto:support@flamewood.com"
									className="hover:text-white transition-colors"
								>
									support@flamewood.com
								</a>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="h-5 w-5 text-primary flex-shrink-0" />
								<span>+91 98765 43210</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm font-medium text-text-tertiary">
						&copy; {new Date().getFullYear()} Flame Wood. All rights reserved.
					</p>
					<div className="flex items-center gap-2">
						<div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white/50">
							VISA
						</div>
						<div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white/50">
							MC
						</div>
						<div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold text-white/50">
							AMEX
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
