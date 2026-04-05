import {
	getAbsoluteUrl,
	getSiteUrlString,
	SITE_DESCRIPTION,
	SITE_KNOWS_ABOUT,
	SITE_LOGO_PNG,
	SITE_NAME,
} from "@/lib/site-config";

/**
 * Organization + WebSite structured data (@graph) for SEO and answer engines (AEO).
 */
export function SiteJsonLd() {
	const base = getSiteUrlString();
	const logoUrl = getAbsoluteUrl(SITE_LOGO_PNG);
	const orgId = `${base}/#organization`;
	const webId = `${base}/#website`;

	const data = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": orgId,
				name: SITE_NAME,
				description: SITE_DESCRIPTION,
				url: base,
				logo: { "@type": "ImageObject", url: logoUrl },
				image: logoUrl,
				knowsAbout: [...SITE_KNOWS_ABOUT],
			},
			{
				"@type": "WebSite",
				"@id": webId,
				name: SITE_NAME,
				description: SITE_DESCRIPTION,
				url: base,
				inLanguage: "en-IN",
				publisher: { "@id": orgId },
				potentialAction: {
					"@type": "SearchAction",
					target: {
						"@type": "EntryPoint",
						urlTemplate: `${base}/products/all?search={search_term_string}`,
					},
					"query-input": "required name=search_term_string",
				},
			},
		],
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires a script tag; content is JSON.stringify of static in-app data only.
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
