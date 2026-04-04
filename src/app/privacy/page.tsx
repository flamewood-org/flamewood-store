import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
	title: "Privacy Policy - FlameWood",
};

export default function PrivacyPolicyPage() {
	return (
		<div className="bg-background min-h-screen min-w-0 overflow-x-hidden">
			<PageHeader
				title="Privacy"
				description="Last updated April 2026."
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
			/>

			<div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
				<div className="prose prose-sm max-w-none prose-headings:text-foreground prose-headings:font-semibold prose-headings:text-base prose-p:text-text-secondary prose-p:text-[15px] prose-p:leading-relaxed prose-li:text-text-secondary">
					<h2>1. Introduction</h2>
					<p>
						At FlameWood, we respect your privacy and are committed to
						protecting your personal data. This privacy policy explains how we
						collect, use, and safeguard your information when you visit our
						website and purchase our products.
					</p>

					<h2>2. Data We Collect</h2>
					<p>
						We may collect, use, store and transfer different kinds of personal
						data about you which we have grouped together as follows:
					</p>
					<ul>
						<li>
							<strong>Identity Data</strong> includes first name, last name,
							username or similar identifier.
						</li>
						<li>
							<strong>Contact Data</strong> includes billing address, delivery
							address, email address and telephone numbers.
						</li>
						<li>
							<strong>Financial Data</strong> includes payment card details
							(processed securely via our payment gateways, not stored on our
							servers).
						</li>
						<li>
							<strong>Transaction Data</strong> includes details about payments
							to and from you and other details of products you have purchased
							from us.
						</li>
					</ul>

					<h2>3. How We Use Your Data</h2>
					<p>
						We will only use your personal data when the law allows us to. Most
						commonly, we will use your personal data to perform the contract we
						are about to enter into or have entered into with you (such as
						processing an order).
					</p>

					<h2>4. Data Security</h2>
					<p>
						We have put in place appropriate security measures to prevent your
						personal data from being accidentally lost, used, or accessed in an
						unauthorized way, altered, or disclosed. In addition, we limit
						access to your personal data to those employees, agents,
						contractors, and other third parties who have a business need to
						know.
					</p>

					<h2>5. Contact Us</h2>
					<p>
						If you have any questions about this privacy policy or our privacy
						practices, please contact us at support@flamewood.com.
					</p>
				</div>
			</div>
		</div>
	);
}
