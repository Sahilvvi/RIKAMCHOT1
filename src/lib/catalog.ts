import { createServerClient } from "./supabase/server";
import { SEED_PRODUCTS } from "./seed";
import type { SortId } from "./seed";

export type { SortId };
export { SORTS, inr } from "./seed";

export type ColorOption = { name: string; hex: string };

export type ProductVariant = {
  id: string;
  sku: string;
  size: string;
  color: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  inStock: boolean;
};

export type StorefrontProduct = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description?: string;
  categorySlug: string;
  categoryName: string;
  rootCategory: string;
  collection: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: ColorOption[];
  material: string;
  inStock: boolean;
  isNew: boolean;
  isLimited: boolean;
  isBestSeller: boolean;
  rating: number;
  reviews: number;
  badges: string[];
  popularity: number;
  createdAt: number;
  variants: ProductVariant[];
  sellerName?: string;
  sellerVerified?: boolean;
  sellerRating?: number;
};

export type StorefrontCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
  position: number;
};

export const SEED_CATEGORIES: StorefrontCategory[] = [
  { id: "cat-fashion", slug: "fashion", name: "Fashion", description: "Clothing, footwear and accessories.", position: 1 },
  { id: "cat-tech", slug: "tech", name: "Technology", description: "Audio, wearables, gaming and everyday devices.", position: 2 },
  { id: "cat-lifestyle", slug: "lifestyle", name: "Lifestyle", description: "Objects for the spaces you live in.", position: 3 },
  { id: "cat-t-shirts", slug: "t-shirts", name: "T-Shirts", parentId: "cat-fashion", position: 1 },
  { id: "cat-polos", slug: "polos", name: "Polos", parentId: "cat-fashion", position: 2 },
  { id: "cat-hoodies", slug: "hoodies", name: "Hoodies", parentId: "cat-fashion", position: 3 },
  { id: "cat-sweatshirts", slug: "sweatshirts", name: "Sweatshirts", parentId: "cat-fashion", position: 4 },
  { id: "cat-bottoms", slug: "bottoms", name: "Bottoms", parentId: "cat-fashion", position: 5 },
  { id: "cat-footwear", slug: "footwear", name: "Footwear", parentId: "cat-fashion", position: 6 },
  { id: "cat-accessories", slug: "accessories", name: "Accessories", parentId: "cat-fashion", position: 7 },
  { id: "cat-audio", slug: "audio", name: "Audio", parentId: "cat-tech", position: 1 },
  { id: "cat-wearables", slug: "wearables", name: "Wearables", parentId: "cat-tech", position: 2 },
  { id: "cat-smartphones", slug: "smartphones", name: "Smartphones", parentId: "cat-tech", position: 3 },
  { id: "cat-gaming", slug: "gaming", name: "Gaming", parentId: "cat-tech", position: 4 },
  { id: "cat-computer-accessories", slug: "computer-accessories", name: "Computer Accessories", parentId: "cat-tech", position: 5 },
  { id: "cat-home", slug: "home", name: "Home", parentId: "cat-lifestyle", position: 1 },
  { id: "cat-lighting", slug: "lighting", name: "Lighting", parentId: "cat-lifestyle", position: 2 },
  { id: "cat-desk", slug: "desk", name: "Desk", parentId: "cat-lifestyle", position: 3 },
  { id: "cat-travel", slug: "travel", name: "Travel", parentId: "cat-lifestyle", position: 4 },
  { id: "cat-kitchen", slug: "kitchen", name: "Kitchen", parentId: "cat-lifestyle", position: 5 },
];

type ProductFilterOptions = {
  category?: string;
  sort?: SortId;
  search?: string;
};

function numeric(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return 0;
}

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function hasSupabaseConfig() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
}

function isColorOption(candidate: unknown): candidate is Record<string, unknown> {
  return typeof candidate === "object" && candidate !== null && "name" in candidate && "hex" in candidate;
}

function mapColors(value: unknown): ColorOption[] {
  if (Array.isArray(value)) {
    return value.filter(isColorOption).map((c) => ({ name: String(c.name), hex: String(c.hex) }));
  }
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      return mapColors(parsed);
    } catch {
      return [];
    }
  }
  return [];
}

type RawAttributeDef = { key: string };

type RawProductAttribute = {
  attribute_definitions: RawAttributeDef | RawAttributeDef[] | null | undefined;
  value: unknown;
};

type RawProductVariant = {
  id: string;
  sku: string;
  option_values: Record<string, unknown>;
  price: unknown;
  compare_at_price?: unknown | null;
  stock: unknown;
};

type RawProductMedia = {
  kind: string;
  url: string;
  position?: number;
};

type RawCategory = {
  id: string;
  slug: string;
  name: string;
  parent_id?: string | null;
  position?: number;
  description?: string | null;
  image_url?: string | null;
};

type RawProduct = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  collection?: string | null;
  category_id: string;
  base_price: unknown;
  compare_at_price?: unknown | null;
  currency?: string | null;
  badges?: string[] | null;
  rating: unknown;
  review_count: unknown;
  popularity: unknown;
  published_at?: string | null;
  created_at: string;
  categories: RawCategory | RawCategory[] | null | undefined;
  product_variants: RawProductVariant | RawProductVariant[] | null | undefined;
  product_media: RawProductMedia | RawProductMedia[] | null | undefined;
  product_attributes: RawProductAttribute | RawProductAttribute[] | null | undefined;
};

function buildStorefrontProduct(p: RawProduct, categoryMap: Map<string, StorefrontCategory>): StorefrontProduct {
  const categoryRows = asArray(p.categories);
  const category =
    categoryRows[0]
      ? {
          id: categoryRows[0].id,
          slug: categoryRows[0].slug,
          name: categoryRows[0].name,
          parentId: categoryRows[0].parent_id || undefined,
          position: categoryRows[0].position ?? 0,
        }
      : categoryMap.get(p.category_id) || { id: p.category_id, slug: "fashion", name: "Fashion", position: 0 };

  const computedRoot = category.parentId
    ? categoryMap.get(category.parentId)?.slug || category.slug
    : category.slug;
  const rootCategory = normalizeRootCategory(computedRoot) || normalizeRootCategory(category.slug) || "fashion";

  const variantsRows = asArray(p.product_variants);
  const mediaRows = asArray(p.product_media).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  const attrRows = asArray(p.product_attributes);

  const materialAttr = attrRows.find((a) => {
    const defs = asArray(a.attribute_definitions);
    return defs[0]?.key === "material";
  });

  const colorAttr = attrRows.find((a) => {
    const defs = asArray(a.attribute_definitions);
    return defs[0]?.key === "color";
  });

  const material = typeof materialAttr?.value === "string" ? materialAttr.value : "";
  const colors = mapColors(colorAttr?.value);

  const mediaUrls = mediaRows
    .filter((m) => m.kind === "image" || !m.kind)
    .map((m) => m.url);

  const image = mediaUrls[0] || "/products/fashion-1.jpg";

  const variants: ProductVariant[] = [];
  const sizesSet = new Set<string>();
  for (const v of variantsRows) {
    const size = typeof v.option_values.size === "string" ? v.option_values.size : "";
    if (!size) continue;
    sizesSet.add(size);
    const stock = numeric(v.stock);
    const price = numeric(v.price ?? p.base_price);
    const compare = v.compare_at_price != null ? numeric(v.compare_at_price) : undefined;

    const colorFromOption = typeof v.option_values.color === "string" ? v.option_values.color : undefined;
    const variantColors = colorFromOption ? [colorFromOption] : colors.map((c) => c.name);

    if (variantColors.length > 0) {
      for (const color of variantColors) {
        variants.push({
          id: `${p.id}-${size}-${color.toLowerCase().replace(/\s+/g, "-")}`,
          sku: `${v.sku}-${color.toUpperCase().replace(/\s+/g, "-")}`,
          size,
          color,
          price,
          compareAtPrice: compare,
          stock,
          inStock: stock > 0,
        });
      }
    } else {
      variants.push({
        id: `${p.id}-${size}`,
        sku: v.sku,
        size,
        color: "",
        price,
        compareAtPrice: compare,
        stock,
        inStock: stock > 0,
      });
    }
  }

  const sizes = Array.from(sizesSet);
  const badges = Array.isArray(p.badges) ? p.badges : [];
  const inStock = variants.some((v) => v.inStock);

  return {
    id: p.id,
    slug: p.slug,
    name: p.title,
    subtitle: p.collection || p.subtitle || undefined,
    description: p.description || `${p.title} from the ${p.collection || ""} collection.`,
    categorySlug: category.slug,
    categoryName: category.name,
    rootCategory,
    collection: p.collection || "",
    price: numeric(p.base_price),
    compareAtPrice: p.compare_at_price != null ? numeric(p.compare_at_price) : undefined,
    currency: p.currency || "INR",
    image,
    images: mediaUrls.length ? mediaUrls : [image],
    sizes,
    colors,
    material,
    inStock,
    isNew: badges.includes("new"),
    isLimited: badges.includes("limited"),
    isBestSeller: badges.includes("bestseller"),
    rating: numeric(p.rating),
    reviews: numeric(p.review_count),
    badges,
    popularity: numeric(p.popularity),
    createdAt: new Date(p.published_at || p.created_at).getTime() || 0,
    variants,
    sellerName: "RIKAMCHOT House",
    sellerVerified: true,
    sellerRating: 4.9,
  };
}

function applyFiltersAndSort(products: StorefrontProduct[], options: ProductFilterOptions) {
  let result = [...products];

  if (options.category) {
    const slug = options.category.toLowerCase();
    result = result.filter((p) => p.categorySlug === slug || p.rootCategory === slug);
  }

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q)
    );
  }

  switch (options.sort) {
    case "newest":
      result.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case "trending":
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.popularity - a.popularity);
      break;
    case "popular":
      result.sort((a, b) => b.popularity - a.popularity);
      break;
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      result.sort((a, b) => {
        const da = a.compareAtPrice ? (a.compareAtPrice - a.price) / a.compareAtPrice : 0;
        const db = b.compareAtPrice ? (b.compareAtPrice - b.price) / b.compareAtPrice : 0;
        return db - da;
      });
      break;
    default:
      result.sort((a, b) => b.popularity - a.popularity);
  }

  return result;
}

export async function getCategories(): Promise<StorefrontCategory[]> {
  if (hasSupabaseConfig()) {
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("position", { ascending: true });

      if (error) throw error;

      const rows = (data || []) as RawCategory[];
      return rows.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        description: c.description || undefined,
        parentId: c.parent_id || undefined,
        imageUrl: c.image_url || undefined,
        position: c.position ?? 0,
      }));
    } catch (e) {
      console.warn("Supabase categories query failed, using seed fallback", e);
    }
  }
  return SEED_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<StorefrontCategory | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug);
}

export async function getProducts(options: ProductFilterOptions = {}): Promise<StorefrontProduct[]> {
  if (hasSupabaseConfig()) {
    try {
      const supabase = createServerClient();
      const [categories, productsRes] = await Promise.all([
        getCategories(),
        supabase
          .from("products")
          .select(
            "*, categories(*), product_variants(*), product_media(*), product_attributes(*, attribute_definitions(*))"
          )
          .eq("status", "approved"),
      ]);

      if (productsRes.error) throw productsRes.error;

      const categoryMap = new Map<string, StorefrontCategory>();
      for (const c of categories) {
        categoryMap.set(c.id, c);
      }

      const rows = (productsRes.data || []) as RawProduct[];
      const mapped = rows.map((p) => buildStorefrontProduct(p, categoryMap));
      return applyFiltersAndSort(mapped, options);
    } catch (e) {
      console.warn("Supabase products query failed, using seed fallback", e);
    }
  }
  return applyFiltersAndSort(SEED_PRODUCTS, options);
}

export async function getProductBySlug(slug: string): Promise<StorefrontProduct | undefined> {
  if (hasSupabaseConfig()) {
    try {
      const supabase = createServerClient();
      const [categories, productRes] = await Promise.all([
        getCategories(),
        supabase
          .from("products")
          .select(
            "*, categories(*), product_variants(*), product_media(*), product_attributes(*, attribute_definitions(*))"
          )
          .eq("slug", slug)
          .eq("status", "approved")
          .single(),
      ]);

      if (productRes.error) throw productRes.error;
      if (!productRes.data) return undefined;

      const categoryMap = new Map<string, StorefrontCategory>();
      for (const c of categories) {
        categoryMap.set(c.id, c);
      }

      return buildStorefrontProduct(productRes.data as RawProduct, categoryMap);
    } catch (e) {
      console.warn("Supabase product query failed, using seed fallback", e);
    }
  }
  return SEED_PRODUCTS.find((p) => p.slug === slug);
}

function normalizeRootCategory(root: string): string {
  const r = root.toLowerCase();
  if (["fashion", "clothing", "apparel"].includes(r) || ["t-shirts", "polos", "hoodies", "sweatshirts", "bottoms", "footwear", "accessories"].includes(r)) return "fashion";
  if (["tech", "technology", "electronics", "gadgets"].includes(r) || ["audio", "wearables", "smartphones", "gaming", "computer-accessories"].includes(r)) return "tech";
  if (["lifestyle", "home", "living"].includes(r) || ["lighting", "desk", "travel", "kitchen"].includes(r)) return "lifestyle";
  return root;
}

export async function getRecommendedProducts(
  product: StorefrontProduct,
  limit: number = 6
): Promise<StorefrontProduct[]> {
  const all = await getProducts();
  const root = normalizeRootCategory(product.rootCategory);
  const others = all.filter((p) => p.id !== product.id);

  const byPopularity = (a: StorefrontProduct, b: StorefrontProduct) => b.popularity - a.popularity;

  const sameRoot = others
    .filter((p) => normalizeRootCategory(p.rootCategory) === root)
    .sort(byPopularity);

  return sameRoot.slice(0, limit);
}

export async function searchProducts(query: string, limit: number = 20): Promise<StorefrontProduct[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await getProducts();
  return all
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.rootCategory.toLowerCase().includes(q) ||
        (p.sellerName && p.sellerName.toLowerCase().includes(q))
    )
    .slice(0, limit);
}

export async function getProductById(id: string): Promise<StorefrontProduct | undefined> {
  if (hasSupabaseConfig()) {
    try {
      const supabase = createServerClient();
      const [categories, productRes] = await Promise.all([
        getCategories(),
        supabase
          .from("products")
          .select(
            "*, categories(*), product_variants(*), product_media(*), product_attributes(*, attribute_definitions(*))"
          )
          .eq("id", id)
          .eq("status", "approved")
          .single(),
      ]);

      if (productRes.error) throw productRes.error;
      if (!productRes.data) return undefined;

      const categoryMap = new Map<string, StorefrontCategory>();
      for (const c of categories) {
        categoryMap.set(c.id, c);
      }

      return buildStorefrontProduct(productRes.data as RawProduct, categoryMap);
    } catch (e) {
      console.warn("Supabase product query failed, using seed fallback", e);
    }
  }
  return SEED_PRODUCTS.find((p) => p.id === id);
}
