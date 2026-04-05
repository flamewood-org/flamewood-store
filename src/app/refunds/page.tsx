import type { Metadata } from "next";
import { LegalDocShell } from "@/components/legal/LegalDocShell";

export const metadata: Metadata = {
	title: "Refunds & Returns",
	description:
		"How FlameWood handles returns, refunds, replacements, and delivery issues for biomass and coconut products.",
};

const toc = [
	{ id: "overview", label: "Overview" },
	{ id: "eligibility", label: "When we help" },
	{ id: "not-eligible", label: "What we can’t refund" },
	{ id: "how-to", label: "How to request help" },
	{ id: "timing", label: "Refunds & timing" },
	{ id: "exchanges", label: "Replacements" },
	{ id: "shipping-returns", label: "Return shipping" },
	{ id: "cancellations", label: "Cancellations" },
	{ id: "contact", label: "Contact" },
] as const;

export default function RefundPolicyPage() {
	return (
		<LegalDocShell
			title="Refunds &amp; returns"
			description="Fair handling of damaged goods, wrong items, and quality issues — built around heavy, consumable products."
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Refunds" }]}
			lastUpdated="4 April 2026"
			estimatedRead="7 min"
			toc={[...toc]}
		>
			<h2 id="overview">1. Overview</h2>
			<p>
				We sell firewood, biomass, and coconut products that are heavy, often
				bulk, and sometimes naturally variable. This policy explains how we
				handle refunds, returns, and replacements while staying practical for
				both you and our logistics partners.
			</p>
			<p>
				Our goal is simple: if something arrives{" "}
				<strong>wrong, damaged, or materially different</strong> from what you
				ordered, we will work with you to fix it — usually through a
				replacement, partial refund, or full refund where appropriate.
			</p>

			<h2 id="eligibility">2. When we can help</h2>
			<p>We typically offer a remedy when:</p>
			<ul>
				<li>
					<strong>Damage in transit</strong> — visible crushing, soaking, or
					breakage that makes the product unfit for reasonable use.
				</li>
				<li>
					<strong>Wrong item or grade</strong> — you received a different
					product, pack size, or grade than shown on your order confirmation.
				</li>
				<li>
					<strong>Critical quality failure</strong> — for example, moisture or
					contamination that falls clearly outside what we describe for that
					SKU, where you report it in time (see below).
				</li>
			</ul>
			<p>
				Please inspect deliveries on arrival where possible. For bulk drops,
				photograph packaging labels and the issue so we can verify with the
				carrier if needed.
			</p>

			<h2 id="not-eligible">3. What we generally don’t refund</h2>
			<p>
				Because of the nature of our products, we <strong>don’t</strong> accept
				returns for:
			</p>
			<ul>
				<li>Change of mind or “buyer’s remorse” after delivery.</li>
				<li>
					Minor colour, texture, or weight variation that is normal for natural
					biomass or coir, within stated tolerances.
				</li>
				<li>
					Issues reported after the window below, unless we agree otherwise in
					writing.
				</li>
				<li>
					Problems caused after delivery (e.g. improper storage outdoors without
					cover) unless we determine otherwise.
				</li>
			</ul>

			<h2 id="how-to">4. How to request help</h2>
			<p>
				<strong>Step 1 — Contact us promptly.</strong> Email{" "}
				<a href="mailto:support@flamewood.com">support@flamewood.com</a> with
				your order number, a short description, and clear photos of the issue
				(packaging label, damage, or wrong item).
			</p>
			<p>
				<strong>Step 2 — Time window.</strong> For damage, wrong items, or
				serious quality concerns, please reach out within{" "}
				<strong>7 calendar days</strong> of delivery unless a longer period is
				required by law. Late reports may still be reviewed case-by-case but are
				harder to verify with carriers.
			</p>
			<p>
				<strong>Step 3 — Keep packaging where reasonable.</strong> We may ask
				you to retain bags, pallets, or labels until we confirm next steps
				(refund, pickup, or disposal instructions).
			</p>

			<h2 id="timing">5. Refunds &amp; processing time</h2>
			<p>
				Once we approve a refund, we aim to process it within{" "}
				<strong>5–10 business days</strong>. The time for funds to appear
				depends on your bank or card issuer. Refunds go to the original payment
				method unless we agree otherwise (e.g. store credit for operational
				reasons).
			</p>
			<p>
				Partial refunds may apply if only part of an order is affected or if you
				choose to keep usable product after we’ve agreed a fair adjustment.
			</p>

			<h2 id="exchanges">6. Replacements</h2>
			<p>
				Where stock allows, we may offer a <strong>replacement shipment</strong>{" "}
				instead of a refund — especially for wrong items or transit damage. If
				the exact SKU is unavailable, we may offer an equivalent product at the
				same price or a refund for the affected line items.
			</p>

			<h2 id="shipping-returns">7. Return shipping &amp; pickup</h2>
			<p>
				For approved returns (not change-of-mind), we will usually arrange
				collection or provide a prepaid label where feasible. If a return is due
				to <strong>our error</strong>, we cover reasonable return freight. If we
				later find the claim was not valid under this policy, we may recover
				reasonable costs as permitted by law.
			</p>
			<p>
				Original outbound shipping charges are generally non-refundable except
				where required by law or where the entire order is cancelled before
				dispatch (see below).
			</p>

			<h2 id="cancellations">8. Cancellations before dispatch</h2>
			<p>
				If you need to cancel, contact us as soon as possible. Orders that have
				not yet been packed or handed to a carrier can often be cancelled for a
				full refund. Once fulfilment has started, cancellation may only be
				possible by refusing delivery or following this returns policy after
				receipt.
			</p>

			<h2 id="contact">9. Contact</h2>
			<p>
				For refund or return questions, email{" "}
				<a href="mailto:support@flamewood.com">support@flamewood.com</a> or
				visit our <a href="/contact">Contact</a> page. Include your order number
				and photos whenever possible — it helps us resolve cases faster.
			</p>
		</LegalDocShell>
	);
}
