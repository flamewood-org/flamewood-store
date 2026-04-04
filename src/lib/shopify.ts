/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Cart, CartItem } from "@/types/cart";
import type { Collection, Product } from "@/types/product";

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_API_TOKEN =
	process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN;

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_API_TOKEN) {
	console.warn(
		"Shopify credentials not configured. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN",
	);
}

const SHOP_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch<T>({
	query,
	variables,
}: {
	query: string;
	variables?: Record<string, unknown>;
}): Promise<{ data?: T; error?: string }> {
	try {
		const response = await fetch(SHOP_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN || "",
			},
			body: JSON.stringify({ query, variables }),
			cache: "no-store",
		});

		const json = await response.json();

		if (json.errors) {
			console.error("Shopify API Error:", json.errors);
			return { error: json.errors[0]?.message || "Unknown error" };
		}

		return { data: json.data };
	} catch (error) {
		console.error("Shopify Fetch Error:", error);
		return { error: "Failed to fetch from Shopify" };
	}
}

// GraphQL Queries
const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          vendor
          productType
          tags
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
                weight
                quantityAvailable
                sku
                availableForSale
              }
            }
          }
          metafields(identifiers: [{ namespace: "custom", key: "moisture_level" }, { namespace: "custom", key: "wood_type" }, { namespace: "custom", key: "size_grade" }, { namespace: "custom", key: "packaging_type" }, { namespace: "custom", key: "origin" }]) {
            key
            value
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      vendor
      productType
      tags
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
            }
            compareAtPrice {
              amount
            }
            weight
            quantityAvailable
            sku
            availableForSale
          }
        }
      }
      metafields(first: 10) {
        edges {
          node {
            key
            value
          }
        }
      }
    }
  }
`;

const GET_COLLECTIONS_QUERY = `
  query getCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation createCart {
    cartCreate {
      cart {
        id
        createdAt
        updatedAt
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                  }
                  weight
                  sku
                  quantityAvailable
                  availableForSale
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
          }
        }
      }
    }
  }
`;

const UPDATE_CART_ITEM_MUTATION = `
  mutation updateCartItem($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                  }
                  weight
                  sku
                  quantityAvailable
                  availableForSale
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
          }
        }
      }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                  }
                  weight
                  sku
                  quantityAvailable
                  availableForSale
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
          }
        }
      }
    }
  }
`;

const GET_CART_QUERY = `
  query getCart($id: ID!) {
    cart(id: $id) {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                }
                weight
                sku
                quantityAvailable
                availableForSale
                product {
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      cost {
        subtotalAmount {
          amount
        }
      }
    }
  }
`;

// Helper functions to transform Shopify data
function transformProduct(node: Record<string, any>): Product {
	return {
		id: node.id,
		title: node.title,
		handle: node.handle,
		description: node.description || "",
		vendor: node.vendor,
		productType: node.productType,
		tags: node.tags || [],
		images:
			node.images?.edges?.map((edge: Record<string, any>) => ({
				url: edge.node.url,
				altText: edge.node.altText,
				width: edge.node.width,
				height: edge.node.height,
			})) || [],
		variants:
			node.variants?.edges?.map((edge: Record<string, any>) => ({
				id: edge.node.id,
				title: edge.node.title,
				price: parseFloat(edge.node.price.amount),
				compareAtPrice: edge.node.compareAtPrice
					? parseFloat(edge.node.compareAtPrice.amount)
					: undefined,
				weight: edge.node.weight || 0,
				inventoryQuantity: edge.node.quantityAvailable || 0,
				sku: edge.node.sku || "",
				availableForSale: edge.node.availableForSale,
			})) || [],
		metafields: node.metafields?.reduce(
			(acc: Record<string, any>, metafield: Record<string, any>) => {
				acc[metafield.key] = metafield.value;
				return acc;
			},
			{},
		),
	};
}

// API Functions
export async function getProducts(
	first: number = 20,
	query?: string,
): Promise<Product[]> {
	const { data, error } = await shopifyFetch<{
		products: { edges: Array<{ node: Record<string, any> }> };
	}>({
		query: GET_PRODUCTS_QUERY,
		variables: { first, query },
	});

	if (error || !data?.products?.edges) {
		console.error("Error fetching products:", error);
		return [];
	}

	return data.products.edges.map((edge: { node: Record<string, any> }) =>
		transformProduct(edge.node),
	);
}

export async function getProductByHandle(
	handle: string,
): Promise<Product | null> {
	const { data, error } = await shopifyFetch<{
		product: Record<string, any> | null;
	}>({
		query: GET_PRODUCT_BY_HANDLE_QUERY,
		variables: { handle },
	});

	if (error || !data?.product) {
		console.error("Error fetching product:", error);
		return null;
	}

	return transformProduct(data.product);
}

export async function getCollections(): Promise<Collection[]> {
	const { data, error } = await shopifyFetch<{
		collections: { edges: Array<{ node: Record<string, any> }> };
	}>({
		query: GET_COLLECTIONS_QUERY,
	});

	if (error || !data?.collections?.edges) {
		console.error("Error fetching collections:", error);
		return [];
	}

	return data.collections.edges.map((edge: { node: Record<string, any> }) => ({
		id: edge.node.id,
		title: edge.node.title,
		handle: edge.node.handle,
		description: edge.node.description,
		image: edge.node.image
			? {
					url: edge.node.image.url,
					altText: edge.node.image.altText,
				}
			: undefined,
	}));
}

export async function createCart(): Promise<string | null> {
	const { data, error } = await shopifyFetch<{
		cartCreate: { cart: { id: string } } | null;
	}>({
		query: CREATE_CART_MUTATION,
	});

	if (error || !data?.cartCreate?.cart) {
		console.error("Error creating cart:", error);
		return null;
	}

	return data.cartCreate.cart.id;
}

export async function addToCart(
	cartId: string,
	variantId: string,
	quantity: number,
): Promise<Cart | null> {
	const { data, error } = await shopifyFetch<{
		cartLinesAdd: { cart: Record<string, any> } | null;
	}>({
		query: ADD_TO_CART_MUTATION,
		variables: {
			cartId,
			lines: [{ merchandiseId: variantId, quantity }],
		},
	});

	if (error || !data?.cartLinesAdd?.cart) {
		console.error("Error adding to cart:", error);
		return null;
	}

	return transformCart(data.cartLinesAdd.cart);
}

export async function updateCartItem(
	cartId: string,
	lineId: string,
	quantity: number,
): Promise<Cart | null> {
	const { data, error } = await shopifyFetch<{
		cartLinesUpdate: { cart: Record<string, any> } | null;
	}>({
		query: UPDATE_CART_ITEM_MUTATION,
		variables: {
			cartId,
			lines: [{ id: lineId, quantity }],
		},
	});

	if (error || !data?.cartLinesUpdate?.cart) {
		console.error("Error updating cart item:", error);
		return null;
	}

	return transformCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(
	cartId: string,
	lineIds: string[],
): Promise<Cart | null> {
	const { data, error } = await shopifyFetch<{
		cartLinesRemove: { cart: Record<string, any> } | null;
	}>({
		query: REMOVE_FROM_CART_MUTATION,
		variables: {
			cartId,
			lineIds,
		},
	});

	if (error || !data?.cartLinesRemove?.cart) {
		console.error("Error removing from cart:", error);
		return null;
	}

	return transformCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
	const { data, error } = await shopifyFetch<{
		cart: Record<string, any> | null;
	}>({
		query: GET_CART_QUERY,
		variables: { id: cartId },
	});

	if (error || !data?.cart) {
		console.error("Error fetching cart:", error);
		return null;
	}

	return transformCart(data.cart);
}

function transformCart(cartData: Record<string, any>): Cart {
	const items: CartItem[] =
		cartData.lines?.edges?.map((edge: Record<string, any>) => {
			const node = edge.node;
			const merchandise = node.merchandise;
			return {
				id: node.id,
				variant: {
					id: merchandise.id,
					title: merchandise.title,
					price: parseFloat(merchandise.price.amount),
					weight: merchandise.weight || 0,
					sku: merchandise.sku || "",
					inventoryQuantity: merchandise.quantityAvailable || 0,
					availableForSale: merchandise.availableForSale,
				},
				quantity: node.quantity,
				productTitle: merchandise.product.title,
				productHandle: merchandise.product.handle,
				image: merchandise.product.images?.edges?.[0]?.node
					? {
							url: merchandise.product.images.edges[0].node.url,
							altText: merchandise.product.images.edges[0].node.altText,
						}
					: undefined,
			};
		}) || [];

	const totalWeight = items.reduce(
		(sum, item) => sum + item.variant.weight * item.quantity,
		0,
	);

	return {
		id: cartData.id,
		items,
		subtotal: parseFloat(cartData.cost?.subtotalAmount?.amount || 0),
		totalWeight,
		itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
	};
}

// Generate checkout URL
export function generateCheckoutUrl(cartId: string): string {
	return `https://${SHOPIFY_STORE_DOMAIN}/cart/${cartId}`;
}
