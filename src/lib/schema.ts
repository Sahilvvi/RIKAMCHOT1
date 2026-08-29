// Core domain types for the RIKAMCHOT attribute-driven marketplace.
// These are structural contracts intended to map to database tables later.

export type AttributeType =
  | "string"
  | "number"
  | "boolean"
  | "select"
  | "multiselect"
  | "color"
  | "dimension"
  | "rich_text";

export type Attribute = {
  id: string;
  slug: string; // e.g. "ram", "fabric-weight", "finish"
  name: string; // e.g. "RAM", "Fabric weight (GSM)", "Finish"
  type: AttributeType;
  unit?: string; // e.g. "GB", "GSM", "cm"
  options?: string[]; // for select / multiselect
  filterable: boolean;
  comparable: boolean;
  categoryIds: string[]; // belongs to one or more categories
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  parentId?: string;
  attributeIds: string[];
  seoTitle?: string;
  seoDescription?: string;
  bannerImage?: string;
};

export type Seller = {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  banner?: string;
  story?: string;
  status: "pending" | "active" | "suspended" | "under_review" | "rejected";
  verified: boolean;
  rating: number;
  commissionRate?: number;
};

export type ProductVariant = {
  id: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  attributes: Record<string, string | number | boolean>; // attribute slug -> value
  media: ProductMedia[]; // fallback to product media when empty
};

export type ProductMedia = {
  id: string;
  type: "image" | "video" | "360" | "3d" | "ar";
  url: string;
  alt?: string;
  sortOrder: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  categoryId: string;
  sellerId: string;
  status: "draft" | "pending_review" | "approved" | "rejected" | "suspended" | "live";
  basePrice: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  badges: ("new" | "limited" | "trending" | "bestseller" | "verified_seller" | "low_stock" | "exclusive")[];
  attributes: Record<string, string | number | boolean>; // attribute slug -> value (shared across variants)
  variants: ProductVariant[];
  media: ProductMedia[];
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
  };
};

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type Customer = {
  id: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  wishlistProductIds: string[];
  followedSellerIds: string[];
};

// Helper: derive the best available media fallback for a product or variant.
export function bestMediaFor(
  product: Product,
  variant?: ProductVariant
): { type: ProductMedia["type"]; url: string } | undefined {
  const pool = variant && variant.media.length > 0 ? variant.media : product.media;
  const ordered: ProductMedia["type"][] = ["3d", "360", "video", "image"];
  for (const type of ordered) {
    const found = pool.find((m) => m.type === type);
    if (found) return { type: found.type, url: found.url };
  }
  return undefined;
}
