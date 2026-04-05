import type { Metadata } from "next";
import { LegalDocShell } from "@/components/legal/LegalDocShell";

export const metadata: Metadata = {
	title: "Terms of Service",
	description:
		"Terms and conditions for using the FlameWood website and purchasing our products.",
};

const toc = [
	{ id: "agreement", label: "Agreement" },
	{ id: "eligibility", label: "Eligibility & account" },
	{ id: "products", label: "Products & pricing" },
	{ id: "orders", label: "Orders & payment" },
	{ id: "shipping", label: "Shipping & risk" },
	{ id: "prohibited", label: "Acceptable use" },
	{ id: "ip", label: "Intellectual property" },
	{ id: "liability", label: "Disclaimer & liability" },
	{ id: "law", label: "Governing law" },
	{ id: "changes", label: "Changes" },
	{ id: "contact", label: "Contact" },
] as const;

export default function TermsOfServicePage() {
	return (
		<LegalDocShell
			title="Terms of service"
			description="Rules for using our website, placing orders, and receiving deliveries from FlameWood."
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
			lastUpdated="4 April 2026"
			estimatedRead="9 min"
			toc={[...toc]}
		>
			<h2 id="agreement">1. Agreement to these terms</h2>
			<p>
				By accessing <strong>flamewood.com</strong> (or related domains we
				operate), creating an account, or placing an order, you agree to these
				Terms of Service and our Privacy Policy. If you do not agree, please do
				not use our services.
			</p>
			<p>
				We may update these terms periodically. When we do, we will revise the
				“Last updated” date above. Material changes may be communicated by email
				or a notice on the site. Your continued use after changes constitutes
				acceptance, except where additional consent is required by law.
			</p>

			<h2 id="eligibility">2. Eligibility &amp; accounts</h2>
			<p>
				You must be at least 18 years old and capable of entering a binding
				contract to place orders. You are responsible for maintaining the
				confidentiality of your account credentials and for all activity under
				your account. Notify us immediately if you suspect unauthorised access.
			</p>
			<p>
				We reserve the right to refuse service, suspend accounts, or cancel
				orders where we reasonably believe there is fraud, abuse, or violation
				of these terms.
			</p>

			<h2 id="products">3. Products, descriptions &amp; pricing</h2>
			<p>
				We aim to describe products accurately, including weights, grades, and
				packaging. Natural variation (e.g. moisture, density of biomass) may
				occur; where tolerances apply, we will state them on the product page or
				at checkout where possible.
			</p>
			<p>
				Prices are shown in Indian Rupees (unless stated otherwise) and exclude
				taxes and shipping unless explicitly marked as inclusive. We may correct
				obvious pricing errors before accepting an order; if we have already
				charged you incorrectly, we will notify you and offer a refund or
				revised order.
			</p>
			<p>
				Product availability is subject to stock. We may substitute a comparable
				item only where you have agreed or where our policy explicitly allows
				(e.g. equivalent grade at the same price).
			</p>

			<h2 id="orders">4. Orders, payment &amp; acceptance</h2>
			<p>
				Placing an order constitutes an offer to purchase. We confirm acceptance
				by order confirmation email or by starting fulfilment. We may decline or
				cancel orders in limited circumstances (e.g. stock unavailability,
				payment failure, delivery restrictions to your pincode).
			</p>
			<p>
				Payment is processed through our secure checkout and payment partners.
				You authorise us and our payment
				partners to charge your selected payment method for the total amount
				shown at checkout, including applicable taxes and shipping.
			</p>

			<h2 id="shipping">5. Shipping, delivery &amp; risk</h2>
			<p>
				Delivery timelines are estimates and depend on carriers, weather, and
				remote locations. Risk of loss or damage passes to you upon delivery to
				the address you provide, unless local law requires otherwise.
			</p>
			<p>
				You are responsible for providing accurate delivery details and ensuring
				safe access for unloading where applicable (e.g. bulk firewood). Failed
				delivery attempts may incur additional charges as disclosed at checkout
				or by the carrier.
			</p>

			<h2 id="prohibited">6. Acceptable use</h2>
			<p>You agree not to:</p>
			<ul>
				<li>
					Use the site for any unlawful purpose or in violation of applicable
					regulations.
				</li>
				<li>
					Attempt to gain unauthorised access to our systems, other users’
					accounts, or data.
				</li>
				<li>
					Scrape, crawl, or overload our infrastructure without permission, or
					misuse product listings.
				</li>
				<li>
					Upload malware, spam, or misleading content through forms or reviews.
				</li>
			</ul>

			<h2 id="ip">7. Intellectual property</h2>
			<p>
				All content on this website — including text, graphics, logos, and
				layout — is owned by FlameWood or our licensors and is protected by
				copyright and trademark laws. You may not copy, modify, distribute, or
				create derivative works without our written permission, except for
				temporary viewing and personal use as permitted by law.
			</p>

			<h2 id="liability">8. Disclaimer &amp; limitation of liability</h2>
			<p>
				Our website and services are provided on an “as is” and “as available”
				basis. To the fullest extent permitted by law, we disclaim warranties of
				merchantability, fitness for a particular purpose, and non-infringement,
				except any that cannot be excluded under Indian consumer law.
			</p>
			<p>
				To the extent permitted by law, FlameWood and its directors, employees,
				and suppliers will not be liable for any indirect, incidental, special,
				consequential, or punitive damages, or for loss of profits, data, or
				goodwill, arising from your use of the site or products. Our total
				liability for any claim arising from an order is generally limited to
				the amount you paid for that order, except where liability cannot be
				limited by law (including death or personal injury caused by negligence,
				or fraud).
			</p>

			<h2 id="law">9. Governing law &amp; disputes</h2>
			<p>
				These terms are governed by the laws of India. Subject to mandatory
				consumer protections in your jurisdiction, you agree that the courts at
				Kochi, Kerala shall have non-exclusive jurisdiction over disputes
				arising from these terms or your use of our services. We encourage you
				to contact us first so we can try to resolve concerns informally.
			</p>

			<h2 id="changes">10. Changes to these terms</h2>
			<p>
				We may modify these terms to reflect changes in our business, legal
				requirements, or services. The updated version will be posted on this
				page with a new “Last updated” date. For ongoing subscriptions or repeat
				purchases, continued use after notice may constitute acceptance of the
				revised terms where permitted by law.
			</p>

			<h2 id="contact">11. Contact</h2>
			<p>
				Questions about these terms? Email{" "}
				<a href="mailto:support@flamewood.com">support@flamewood.com</a> or use
				the contact options on our <a href="/contact">Contact</a> page.
			</p>
		</LegalDocShell>
	);
}
