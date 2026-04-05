import type { Metadata } from "next";
import { LegalDocShell } from "@/components/legal/LegalDocShell";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"How FlameWood collects, uses, stores, and protects your personal information when you shop with us.",
};

const toc = [
	{ id: "introduction", label: "Introduction" },
	{ id: "data-we-collect", label: "Data we collect" },
	{ id: "legal-bases", label: "Why we use your data" },
	{ id: "how-we-use", label: "How we use data" },
	{ id: "cookies", label: "Cookies & analytics" },
	{ id: "sharing", label: "Sharing & processors" },
	{ id: "retention", label: "Retention" },
	{ id: "your-rights", label: "Your rights" },
	{ id: "security", label: "Security" },
	{ id: "children", label: "Children" },
	{ id: "changes", label: "Changes" },
	{ id: "contact", label: "Contact" },
] as const;

export default function PrivacyPolicyPage() {
	return (
		<LegalDocShell
			title="Privacy policy"
			description="How we handle personal information when you browse or buy from FlameWood."
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
			lastUpdated="4 April 2026"
			estimatedRead="8 min"
			toc={[...toc]}
		>
			<h2 id="introduction">1. Introduction</h2>
			<p>
				FlameWood (“we”, “us”) operates this website and sells biomass,
				firewood, and coconut products online. We are committed to protecting
				your privacy and being transparent about how we collect and use personal
				data in line with applicable laws in India, including the Digital
				Personal Data Protection Act, 2023 where it applies to our processing
				activities.
			</p>
			<p>
				This policy describes what we collect, why we use it, who we share it
				with, how long we keep it, and what choices you have. If anything here
				conflicts with a specific agreement you have with us, the agreement
				prevails for that matter.
			</p>

			<h2 id="data-we-collect">2. Data we collect</h2>
			<p>Depending on how you use our site and services, we may process:</p>
			<ul>
				<li>
					<strong>Identity &amp; account data</strong> — name, account or
					customer identifiers when you create or use an account with us.
				</li>
				<li>
					<strong>Contact data</strong> — email address, phone number, billing
					and delivery addresses.
				</li>
				<li>
					<strong>Order &amp; transaction data</strong> — items purchased,
					quantities, order value, delivery preferences, and communication
					related to your order.
				</li>
				<li>
					<strong>Payment data</strong> — payments are processed by our secure
					payment providers and gateways. We do not store
					full card numbers on our own servers; we may receive limited
					confirmation data (e.g. last four digits, status).
				</li>
				<li>
					<strong>Technical &amp; usage data</strong> — IP address, browser
					type, device type, approximate region, pages viewed, and referring
					URLs, collected via cookies and similar technologies.
				</li>
				<li>
					<strong>Communications</strong> — messages you send us via contact
					forms, email, or support channels.
				</li>
			</ul>
			<p>
				We do not intend to collect “sensitive” personal data (such as health
				data) unless you voluntarily provide it and we have a clear purpose; if
				we do, we will explain why at the point of collection.
			</p>

			<h2 id="legal-bases">3. Why we use your data (legal bases)</h2>
			<p>We process personal data where:</p>
			<ul>
				<li>
					<strong>Performance of a contract</strong> — to take orders, process
					payments, arrange delivery, and provide customer support.
				</li>
				<li>
					<strong>Legitimate interests</strong> — to secure our website, prevent
					fraud, improve our services, analyse aggregated usage, and send
					service-related emails (e.g. order updates).
				</li>
				<li>
					<strong>Legal obligation</strong> — where we must retain or disclose
					information for tax, accounting, or regulatory reasons.
				</li>
				<li>
					<strong>Consent</strong> — where required (for example, certain
					marketing emails or non-essential cookies), which you can withdraw at
					any time.
				</li>
			</ul>

			<h2 id="how-we-use">4. How we use your data</h2>
			<p>Typical uses include:</p>
			<ul>
				<li>
					Confirming and fulfilling orders, including delivery coordination.
				</li>
				<li>Processing refunds or disputes when applicable.</li>
				<li>
					Responding to enquiries and providing technical or product support.
				</li>
				<li>
					Sending transactional messages (order confirmations, shipping
					updates).
				</li>
				<li>
					Improving website performance, security, and user experience through
					aggregated analytics.
				</li>
			</ul>

			<h2 id="cookies">5. Cookies &amp; analytics</h2>
			<p>
				We use cookies and similar technologies to keep your session secure,
				remember preferences, and understand how visitors use our site. Some
				cookies are strictly necessary; others (e.g. analytics or marketing) may
				require your consent depending on your region and settings.
			</p>
			<p>
				You can control cookies through your browser settings. Blocking certain
				cookies may limit site functionality (for example, staying signed in).
			</p>

			<h2 id="sharing">6. Sharing &amp; processors</h2>
			<p>
				We share personal data only as needed to run our business. Categories of
				recipients may include:
			</p>
			<ul>
				<li>
					<strong>Platform partners</strong> — our secure e-commerce platform
					(hosting, checkout, and related services).
				</li>
				<li>
					<strong>Payment providers</strong> — to authorise and settle payments.
				</li>
				<li>
					<strong>Logistics partners</strong> — to deliver orders and provide
					tracking information.
				</li>
				<li>
					<strong>IT &amp; security vendors</strong> — hosting, email delivery,
					and fraud prevention, under strict confidentiality and data-processing
					terms where applicable.
				</li>
			</ul>
			<p>
				We do not sell your personal data. If we ever use personal data for
				profiling or automated decisions with legal or similarly significant
				effects, we will provide clear information and options as required by
				law.
			</p>

			<h2 id="retention">7. Retention</h2>
			<p>
				We keep personal data only as long as necessary for the purposes above,
				including legal, tax, and accounting requirements. Order and invoice
				data may be retained for several years; marketing preferences and
				inactive account data are reviewed periodically and deleted or
				anonymised when no longer needed.
			</p>

			<h2 id="your-rights">8. Your rights</h2>
			<p>
				Depending on applicable law, you may have the right to access, correct,
				update, or delete your personal data; restrict or object to certain
				processing; request portability where technically feasible; and withdraw
				consent where processing is consent-based.
			</p>
			<p>
				To exercise these rights, contact us using the details below. We may
				need to verify your identity before fulfilling a request. You may also
				lodge a complaint with a supervisory authority if you believe our
				processing violates applicable law.
			</p>

			<h2 id="security">9. Security</h2>
			<p>
				We implement appropriate technical and organisational measures to
				protect personal data against unauthorised access, alteration, or loss.
				No method of transmission over the internet is completely secure; we
				encourage you to use strong passwords and protect your account
				credentials.
			</p>

			<h2 id="children">10. Children</h2>
			<p>
				Our services are not directed at individuals under 18. We do not
				knowingly collect personal data from children. If you believe we have
				collected such information, please contact us and we will delete it
				promptly.
			</p>

			<h2 id="changes">11. Changes to this policy</h2>
			<p>
				We may update this policy from time to time. The “Last updated” date at
				the top of this page will change when we do. For material changes, we
				may provide additional notice (for example, by email or a banner on the
				site). Continued use of our services after changes means you accept the
				updated policy, except where your explicit consent is required.
			</p>

			<h2 id="contact">12. Contact us</h2>
			<p>
				For privacy questions, requests, or complaints, email{" "}
				<a href="mailto:support@flamewood.com">support@flamewood.com</a> or
				write to us at our registered business address in Kerala, India (see our
				Contact page for full details).
			</p>
		</LegalDocShell>
	);
}
