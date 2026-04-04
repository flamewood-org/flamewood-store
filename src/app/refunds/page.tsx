import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
	title: "Refund Policy - FlameWood",
};

export default function RefundPolicyPage() {
	return (
		<div className="bg-background min-h-screen min-w-0 overflow-x-hidden">
			<PageHeader
				title="Refunds"
				description="Returns, replacements, and how we handle issues."
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Refunds" }]}
			/>

			<div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
				<div className="p-5 rounded-xl border border-border bg-surface mb-8">
					<h3 className="text-base font-semibold mb-2 text-foreground">
						Our approach
					</h3>
					<p className="text-text-secondary">
						We stand behind the premium quality of our firewood, coconut, and
						biomass products. If your order arrives damaged or fails to meet
						reasonable expectations, we will make it right.
					</p>
				</div>

				<div className="prose prose-sm max-w-none prose-headings:text-foreground prose-headings:font-semibold prose-headings:text-base prose-p:text-text-secondary prose-p:text-[15px] prose-p:leading-relaxed prose-li:text-text-secondary">
					<h2>Returns</h2>
					<p>
						Due to the heavy and consumable nature of our biomass products, we
						generally do not accept returns for buyer's remorse. However, if
						there is a fundamental defect with your delivery (e.g., incorrect
						grade of wood or critical moisture issues), you have 7 days after
						receiving your item to request a return.
					</p>
					<p>
						To be eligible for a return, your item must be unused and in the
						same condition that you received it. It must also be in the original
						packaging.
					</p>

					<h2>Refunds</h2>
					<p>
						Once your return is received and inspected, we will send you an
						email to notify you that we have received your returned item. We
						will also notify you of the approval or rejection of your refund.
					</p>
					<p>
						If you are approved, then your refund will be processed, and a
						credit will automatically be applied to your credit card or original
						method of payment, within a certain amount of days.
					</p>

					<h2>Exchanges & Replacements</h2>
					<p>
						We only replace items if they are defective or damaged in transit.
						If you need to exchange it for the same item, send us an email at
						support@flamewood.com and we will organize a freight pickup
						coordinate.
					</p>

					<h2>Shipping Returns</h2>
					<p>
						You will be responsible for paying for your own shipping costs for
						returning your item unless the return is due to our error. Shipping
						costs are non-refundable. If you receive a refund, the cost of
						return shipping will be deducted from your refund.
					</p>
				</div>
			</div>
		</div>
	);
}
