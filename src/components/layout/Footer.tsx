"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { SITE_LOGO_PNG, SITE_NAME } from "@/lib/site-config";
import { siteShellClass } from "@/lib/site-layout";

const linkClass =
	"inline-flex items-center gap-1 rounded-md py-1 text-sm text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-primary-light/40 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-surface";

export function Footer() {
	return (
		<footer className="mt-auto w-full min-w-0 border-t border-border bg-footer-surface text-white/90">
			<div
				className={`${siteShellClass} pb-8 pt-10 sm:pb-10 sm:pt-12 md:pb-12 md:pt-14`}
			>
				<FooterNewsletter className="mb-10 sm:mb-12 md:mb-14" />

				<div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-10 sm:gap-12 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-14">
					<div className="min-w-0 lg:col-span-4">
						<Link
							href="/"
							className="inline-block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary-light/40 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-surface"
							aria-label={`${SITE_NAME} home`}
						>
							<Image
								src={SITE_LOGO_PNG}
								alt=""
								width={260}
								height={64}
								className="h-12 w-auto max-w-[min(100%,260px)] object-contain object-left sm:h-14"
							/>
						</Link>
						<p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
							Premium biomass, firewood, and coconut products from Kerala —
							retail orders and bulk supply, shipped reliably across India.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:gap-6">
						<div>
							<h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
								Shop
							</h3>
							<ul className="space-y-2.5">
								<li>
									<Link href="/products/all" className={linkClass}>
										All products
										<ArrowUpRight
											className="h-3.5 w-3.5 opacity-50"
											aria-hidden
										/>
									</Link>
								</li>
								<li>
									<Link href="/products/firewood" className={linkClass}>
										Firewood
									</Link>
								</li>
								<li>
									<Link href="/products/coconut" className={linkClass}>
										Coconut
									</Link>
								</li>
								<li>
									<Link href="/products/biomass" className={linkClass}>
										Biomass
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
								Support
							</h3>
							<ul className="space-y-2.5">
								<li>
									<Link href="/contact" className={linkClass}>
										Contact
									</Link>
								</li>
								<li>
									<Link href="/track-order" className={linkClass}>
										Track order
									</Link>
								</li>
								<li>
									<Link href="/about" className={linkClass}>
										About
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-span-2 sm:col-span-1">
							<h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
								Legal
							</h3>
							<ul className="space-y-2.5">
								<li>
									<Link href="/privacy" className={linkClass}>
										Privacy
									</Link>
								</li>
								<li>
									<Link href="/terms" className={linkClass}>
										Terms
									</Link>
								</li>
								<li>
									<Link href="/refunds" className={linkClass}>
										Refunds
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="min-w-0 lg:col-span-3">
						<h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
							Contact
						</h3>
						<ul className="space-y-4 text-sm text-white/65">
							<li className="flex gap-3">
								<MapPin
									className="mt-0.5 h-4 w-4 shrink-0 text-primary-light"
									aria-hidden
								/>
								<span className="leading-relaxed">
									Kochi EXZ, Ernakulam
									<br />
									Kerala 682001
								</span>
							</li>
							<li className="flex items-center gap-3">
								<Mail
									className="h-4 w-4 shrink-0 text-primary-light"
									aria-hidden
								/>
								<a
									href="mailto:support@flamewood.com"
									className="rounded-md text-white/70 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white hover:decoration-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/40"
								>
									support@flamewood.com
								</a>
							</li>
							<li className="flex items-center gap-3">
								<Phone
									className="h-4 w-4 shrink-0 text-primary-light"
									aria-hidden
								/>
								<a
									href="tel:+919876543210"
									className="rounded-md text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/40"
								>
									+91 98765 43210
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-white/40 sm:flex-row sm:text-left">
					<p>
						&copy; {new Date().getFullYear()} Flame Wood. All rights reserved.
					</p>
					<p className="tabular-nums">Visa · Mastercard · UPI</p>
				</div>
			</div>
		</footer>
	);
}
