import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
	title: "Terms of Service - FlameWood",
};

export default function TermsOfServicePage() {
	return (
		<div className="bg-background min-h-screen min-w-0 overflow-x-hidden">
			<PageHeader
				title="Terms of service"
				description="Last updated April 2026."
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
			/>

			<div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
				<div className="prose prose-sm max-w-none prose-headings:text-foreground prose-headings:font-semibold prose-headings:text-base prose-p:text-text-secondary prose-p:text-[15px] prose-p:leading-relaxed prose-li:text-text-secondary">
					<h2>1. Agreement to Terms</h2>
					<p>
						By accessing our website at flamewood.com, you are agreeing to be
						bound by these terms of service, all applicable laws and
						regulations, and agree that you are responsible for compliance with
						any applicable local laws.
					</p>

					<h2>2. Use License</h2>
					<p>
						Permission is granted to temporarily download one copy of the
						materials (information or software) on FlameWood's website for
						personal, non-commercial transitory viewing only.
					</p>

					<h2>3. Disclaimer</h2>
					<p>
						The materials on FlameWood's website are provided on an 'as is'
						basis. FlameWood makes no warranties, expressed or implied, and
						hereby disclaims and negates all other warranties including, without
						limitation, implied warranties or conditions of merchantability,
						fitness for a particular purpose, or non-infringement of
						intellectual property or other violation of rights.
					</p>

					<h2>4. Limitations</h2>
					<p>
						In no event shall FlameWood or its suppliers be liable for any
						damages (including, without limitation, damages for loss of data or
						profit, or due to business interruption) arising out of the use or
						inability to use the materials on FlameWood's website.
					</p>

					<h2>5. Governing Law</h2>
					<p>
						These terms and conditions are governed by and construed in
						accordance with the laws of India and you irrevocably submit to the
						exclusive jurisdiction of the courts in Kerala.
					</p>
				</div>
			</div>
		</div>
	);
}
