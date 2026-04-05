import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const metadata = {
	title: "Contact",
	description:
		"Contact FlameWood for orders, bulk quotes, and product questions. We reply to retail and business inquiries.",
};

export default function ContactPage() {
	return (
		<div className="bg-background min-h-screen min-w-0 overflow-x-hidden">
			<PageHeader
				title="Contact"
				description="Questions about an order, bulk pricing, or delivery — send a note and we’ll reply during business hours."
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
			/>

			<div className="w-full min-w-0 py-8 md:py-10">
				<div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
					<div className="space-y-4 lg:col-span-1">
						<div className="p-4 rounded-xl border border-border bg-surface">
							<MapPin className="w-5 h-5 text-primary mb-2" />
							<p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-1">
								Address
							</p>
							<p className="text-sm text-text-secondary leading-relaxed">
								Kochi EXZ, Ernakulam
								<br />
								Kerala 682001
							</p>
						</div>
						<div className="p-4 rounded-xl border border-border bg-surface">
							<Phone className="w-5 h-5 text-primary mb-2" />
							<p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-1">
								Phone
							</p>
							<a
								href="tel:+919876543210"
								className="text-sm text-foreground hover:text-primary"
							>
								+91 98765 43210
							</a>
						</div>
						<div className="p-4 rounded-xl border border-border bg-surface">
							<Mail className="w-5 h-5 text-primary mb-2" />
							<p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-1">
								Email
							</p>
							<a
								href="mailto:support@flamewood.com"
								className="text-sm text-foreground hover:text-primary break-all"
							>
								support@flamewood.com
							</a>
						</div>
						<div className="p-4 rounded-xl border border-border bg-surface flex gap-3">
							<Clock className="w-5 h-5 text-primary shrink-0" />
							<div>
								<p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-1">
									Hours
								</p>
								<p className="text-sm text-text-secondary">
									Mon–Sat 9:00–18:00
									<br />
									Sun closed
								</p>
							</div>
						</div>
					</div>

					<div className="lg:col-span-2 rounded-xl border border-border bg-surface p-6 md:p-8">
						<h2 className="text-base font-semibold text-foreground mb-6">
							Message
						</h2>
						<form className="space-y-4">
							<div className="grid sm:grid-cols-2 gap-4">
								<Input placeholder="First name" />
								<Input placeholder="Last name" />
							</div>
							<Input type="email" placeholder="Email" required />
							<div>
								<label className="block text-xs font-medium text-text-secondary mb-1.5">
									Message
								</label>
								<textarea
									className="w-full min-h-[120px] px-3.5 py-2.5 border border-border rounded-lg bg-surface text-[15px] text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/15"
									placeholder="How can we help?"
									required
								/>
							</div>
							<Button type="submit" className="gap-2">
								<Send className="w-4 h-4" />
								Send
							</Button>
							<p className="text-xs text-text-tertiary">
								This form is a front-end placeholder — wire it to your inbox or
								CRM when ready.
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
