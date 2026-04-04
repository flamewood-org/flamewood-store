import { getCollections } from "@/lib/shopify";
import { Header } from "./Header";

export async function HeaderWrapper() {
	const collections = await getCollections();
	return <Header collections={collections} />;
}
