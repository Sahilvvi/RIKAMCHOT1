import type { StorefrontProduct, ProductVariant, ColorOption } from "./catalog";

export type RawSeedProduct = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  image: string;
  category: string;
  rootCategory: string;
  collection: string;
  sizes: string[];
  colors: ColorOption[];
  material: string;
  inStock: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviews: number;
  createdAt: number;
  popularity: number;
};

const fashionImgs = {
  tee: "/products/fashion-1.jpg",
  hoodie: "/products/fashion-2.jpg",
  bottoms: "/products/fashion-3.jpg",
  cap: "/products/fashion-4.jpg",
  sneaker: "/products/fashion-5.jpg",
  bag: "/products/fashion-6.jpg",
};

const techImgs = [
  "/products/tech-1.jpg",
  "/products/tech-2.jpg",
  "/products/tech-3.jpg",
  "/products/tech-4.jpg",
  "/products/tech-5.jpg",
];

const lifestyleImgs = [
  "/products/lifestyle-1.jpg",
  "/products/lifestyle-2.jpg",
  "/products/lifestyle-3.jpg",
  "/products/lifestyle-4.jpg",
  "/products/lifestyle-5.jpg",
];

function imagePool(root: string) {
  if (root === "tech") return techImgs;
  if (root === "lifestyle") return lifestyleImgs;
  return Object.values(fashionImgs);
}

function pickFashionImage(p: typeof rawSeed[number]) {
  const name = p.name.toLowerCase();
  if (name.includes("hoodie") || name.includes("crewneck") || name.includes("sweatshirt")) return fashionImgs.hoodie;
  if (name.includes("tee") || name.includes("polo") || name.includes("shirt")) return fashionImgs.tee;
  if (name.includes("pant") || name.includes("jogger") || name.includes("trouser") || name.includes("cargo")) return fashionImgs.bottoms;
  if (name.includes("sneaker") || name.includes("shoe")) return fashionImgs.sneaker;
  if (name.includes("bag")) return fashionImgs.bag;
  if (name.includes("cap") || name.includes("hat")) return fashionImgs.cap;
  return fashionImgs.tee;
}

function pickImage(p: typeof rawSeed[number]) {
  if (p.rootCategory === "tech") return pickTechImage(p);
  if (p.rootCategory === "lifestyle") return pickLifestyleImage(p);
  return pickFashionImage(p);
}

function pickTechImage(p: typeof rawSeed[number]) {
  const name = p.name.toLowerCase();
  if (name.includes("headphone")) return techImgs[0];
  if (name.includes("watch") || name.includes("wearable")) return techImgs[1];
  if (name.includes("speaker")) return techImgs[2];
  if (name.includes("mouse")) return techImgs[3];
  if (name.includes("keyboard")) return techImgs[4];
  return techImgs[0];
}

function pickLifestyleImage(p: typeof rawSeed[number]) {
  const name = p.name.toLowerCase();
  if (name.includes("stand")) return lifestyleImgs[0];
  if (name.includes("lamp")) return lifestyleImgs[1];
  if (name.includes("kit")) return lifestyleImgs[2];
  if (name.includes("diffuser")) return lifestyleImgs[3];
  if (name.includes("sleeve")) return lifestyleImgs[4];
  return lifestyleImgs[0];
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/—/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const rawSeed: Omit<RawSeedProduct, "id" | "image" | "createdAt" | "popularity">[] = [
  { name: "Monarch Oversized Tee", price: 2499, compareAt: 2999, category: "T-Shirts", rootCategory: "fashion", collection: "Sovereign", sizes: ["S","M","L","XL","XXL"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Gold",hex:"#c9a24c"}], material: "Cotton 240gsm", inStock: true, isNew: true, rating: 4.8, reviews: 214 },
  { name: "Crown Hoodie — Ember", price: 4299, category: "Hoodies", rootCategory: "fashion", collection: "Sovereign", sizes: ["S","M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Pink",hex:"#ff2f8f"}], material: "Fleece 340gsm", inStock: true, isBestSeller: true, rating: 4.9, reviews: 512 },
  { name: "Sovereign Cargo Pant", price: 3899, category: "Bottoms", rootCategory: "fashion", collection: "Sovereign", sizes: ["28","30","32","34","36"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Ripstop Cotton", inStock: true, isLimited: true, rating: 4.7, reviews: 143 },
  { name: "RC Monogram Cap", price: 1499, category: "Accessories", rootCategory: "fashion", collection: "Heritage", sizes: ["One"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Wine",hex:"#5d1a2a"}], material: "Cotton Twill", inStock: true, isNew: true, rating: 4.6, reviews: 88 },
  { name: "Regal Polo — Gold Tip", price: 2799, category: "Polos", rootCategory: "fashion", collection: "Heritage", sizes: ["S","M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Pique Cotton", inStock: true, rating: 4.7, reviews: 96 },
  { name: "Baroque Sweatshirt", price: 3699, compareAt: 4299, category: "Sweatshirts", rootCategory: "fashion", collection: "Atelier", sizes: ["M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Gold",hex:"#c9a24c"}], material: "French Terry", inStock: true, isLimited: true, rating: 4.9, reviews: 274 },
  { name: "Sovereign Jogger", price: 3299, category: "Bottoms", rootCategory: "fashion", collection: "Sovereign", sizes: ["S","M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Tech Fleece", inStock: true, isBestSeller: true, rating: 4.8, reviews: 331 },
  { name: "Neon Reign Sneaker", price: 6999, compareAt: 8499, category: "Footwear", rootCategory: "fashion", collection: "Atelier", sizes: ["7","8","9","10","11"], colors: [{name:"Pink",hex:"#ff2f8f"},{name:"Black",hex:"#0a0a0b"}], material: "Leather + Mesh", inStock: false, isLimited: true, rating: 4.9, reviews: 62 },
  { name: "Nocturne Oversized Tee", price: 2299, category: "T-Shirts", rootCategory: "fashion", collection: "Nocturne", sizes: ["S","M","L","XL","XXL"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Cotton 220gsm", inStock: true, rating: 4.5, reviews: 51 },
  { name: "Heirloom Hoodie", price: 4599, category: "Hoodies", rootCategory: "fashion", collection: "Atelier", sizes: ["S","M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Gold",hex:"#c9a24c"}], material: "Fleece 380gsm", inStock: true, isNew: true, rating: 4.8, reviews: 118 },
  { name: "Palace Trouser", price: 3599, category: "Bottoms", rootCategory: "fashion", collection: "Heritage", sizes: ["28","30","32","34"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Wool Blend", inStock: true, rating: 4.6, reviews: 44 },
  { name: "Gilded Bucket Hat", price: 1299, category: "Accessories", rootCategory: "fashion", collection: "Heritage", sizes: ["One"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Pink",hex:"#ff2f8f"}], material: "Cotton Canvas", inStock: true, rating: 4.4, reviews: 27 },
  { name: "Coronation Tee", price: 2599, category: "T-Shirts", rootCategory: "fashion", collection: "Sovereign", sizes: ["S","M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Pink",hex:"#ff2f8f"}], material: "Cotton 240gsm", inStock: true, isBestSeller: true, rating: 4.9, reviews: 402 },
  { name: "Velour Track Pant", price: 3899, category: "Bottoms", rootCategory: "fashion", collection: "Nocturne", sizes: ["S","M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Velour", inStock: true, rating: 4.7, reviews: 71 },
  { name: "Empress Crewneck", price: 3199, compareAt: 3799, category: "Sweatshirts", rootCategory: "fashion", collection: "Sovereign", sizes: ["S","M","L"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Loopback Cotton", inStock: true, rating: 4.7, reviews: 134 },
  { name: "Reign High-Top Sneaker", price: 7499, category: "Footwear", rootCategory: "fashion", collection: "Atelier", sizes: ["7","8","9","10","11"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Leather", inStock: true, isLimited: true, rating: 4.8, reviews: 39 },
  { name: "Signet Cap", price: 1199, category: "Accessories", rootCategory: "fashion", collection: "Nocturne", sizes: ["One"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Cotton Twill", inStock: true, rating: 4.5, reviews: 21 },
  { name: "Ember Cargo — Rose", price: 4199, category: "Bottoms", rootCategory: "fashion", collection: "Atelier", sizes: ["30","32","34"], colors: [{name:"Pink",hex:"#ff2f8f"}], material: "Ripstop Cotton", inStock: false, isLimited: true, rating: 4.6, reviews: 33 },
  { name: "Sanctum Polo", price: 2699, category: "Polos", rootCategory: "fashion", collection: "Nocturne", sizes: ["S","M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Pique Cotton", inStock: true, isNew: true, rating: 4.5, reviews: 18 },
  { name: "Golden Fleece Hoodie", price: 5199, compareAt: 5899, category: "Hoodies", rootCategory: "fashion", collection: "Atelier", sizes: ["M","L","XL"], colors: [{name:"Gold",hex:"#c9a24c"},{name:"Black",hex:"#0a0a0b"}], material: "Fleece 400gsm", inStock: true, isLimited: true, rating: 4.9, reviews: 91 },
  { name: "Twilight Tee", price: 2199, category: "T-Shirts", rootCategory: "fashion", collection: "Nocturne", sizes: ["S","M","L","XL","XXL"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Cotton 220gsm", inStock: true, rating: 4.4, reviews: 24 },
  { name: "Regalia Jogger", price: 3499, category: "Bottoms", rootCategory: "fashion", collection: "Heritage", sizes: ["S","M","L","XL"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Tech Fleece", inStock: true, isBestSeller: true, rating: 4.7, reviews: 189 },
  { name: "Crown Belt Bag", price: 2299, category: "Accessories", rootCategory: "fashion", collection: "Atelier", sizes: ["One"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Gold",hex:"#c9a24c"}], material: "Vegan Leather", inStock: true, isNew: true, rating: 4.6, reviews: 12 },
  { name: "Court Sneaker — Onyx", price: 6499, category: "Footwear", rootCategory: "fashion", collection: "Heritage", sizes: ["8","9","10","11"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Leather", inStock: true, rating: 4.8, reviews: 56 },

  // Technology
  { name: "Aural One Headphones", price: 14999, compareAt: 17999, category: "Audio", rootCategory: "tech", collection: "Sonic", sizes: ["One"], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Gold",hex:"#c9a24c"}], material: "Anodised aluminium + memory foam", inStock: true, isBestSeller: true, rating: 4.9, reviews: 312 },
  { name: "Pulse Smartwatch", price: 8999, category: "Wearables", rootCategory: "tech", collection: "Sonic", sizes: ["One"], colors: [{name:"Midnight",hex:"#111317"},{name:"Rose Gold",hex:"#c9a24c"}], material: "Sapphire glass + aluminium", inStock: true, isNew: true, rating: 4.7, reviews: 156 },
  { name: "Sonic Portable Speaker", price: 6999, compareAt: 8499, category: "Audio", rootCategory: "tech", collection: "Sonic", sizes: ["One"], colors: [{name:"Charcoal",hex:"#262626"},{name:"Cream",hex:"#f4f1ea"}], material: "Woven fabric + steel", inStock: true, isLimited: true, rating: 4.8, reviews: 98 },
  { name: "Vortex Gaming Mouse", price: 4999, category: "Gaming", rootCategory: "tech", collection: "Digitron", sizes: ["One"], colors: [{name:"Black",hex:"#0a0a0b"}], material: "Matte polycarbonate", inStock: true, rating: 4.6, reviews: 74 },
  { name: "Cipher Mechanical Keyboard", price: 11999, category: "Computer Accessories", rootCategory: "tech", collection: "Digitron", sizes: ["One"], colors: [{name:"Grey",hex:"#5a5a5a"},{name:"Cream",hex:"#f4f1ea"}], material: "PBT keycaps + aluminium plate", inStock: true, isNew: true, rating: 4.8, reviews: 42 },

  // Lifestyle
  { name: "Nebula Smartphone Stand", price: 2499, category: "Desk", rootCategory: "lifestyle", collection: "Atelier Home", sizes: ["One"], colors: [{name:"Oak",hex:"#c9a24c"},{name:"Black",hex:"#0a0a0b"}], material: "Solid oak + steel", inStock: true, rating: 4.5, reviews: 61 },
  { name: "Lumina Desk Lamp", price: 4999, compareAt: 5999, category: "Lighting", rootCategory: "lifestyle", collection: "Atelier Home", sizes: ["One"], colors: [{name:"White",hex:"#f5f5f0"},{name:"Charcoal",hex:"#262626"}], material: "Powder-coated steel", inStock: true, isBestSeller: true, rating: 4.8, reviews: 144 },
  { name: "Nomad Travel Kit", price: 3499, category: "Travel", rootCategory: "lifestyle", collection: "Wander", sizes: ["One"], colors: [{name:"Olive",hex:"#4b5320"},{name:"Sand",hex:"#d8cfc4"}], material: "Recycled canvas", inStock: true, isNew: true, rating: 4.6, reviews: 38 },
  { name: "Aroma Ceramic Diffuser", price: 3999, category: "Home", rootCategory: "lifestyle", collection: "Wander", sizes: ["One"], colors: [{name:"Bone",hex:"#e8e4dc"},{name:"Charcoal",hex:"#262626"}], material: "Hand-glazed ceramic", inStock: true, isLimited: true, rating: 4.7, reviews: 89 },
  { name: "Silhouette Laptop Sleeve", price: 2299, category: "Travel", rootCategory: "lifestyle", collection: "Atelier Home", sizes: ["13\"","14\"","15\"","16\""], colors: [{name:"Black",hex:"#0a0a0b"},{name:"Cream",hex:"#f4f1ea"}], material: "Felt + vegan leather", inStock: true, rating: 4.5, reviews: 52 },
];

function buildVariants(p: RawSeedProduct): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (const size of p.sizes) {
    for (const color of p.colors) {
      const stock = p.inStock ? 25 : 0;
      variants.push({
        id: `${p.id}-${size}-${color.name.toLowerCase().replace(/\s+/g, "-")}`,
        sku: `RC-${p.id.replace("rc-", "")}-${size}-${color.name.toUpperCase().replace(/\s+/g, "-")}`,
        size,
        color: color.name,
        price: p.price,
        compareAtPrice: p.compareAt,
        stock,
        inStock: stock > 0,
      });
    }
  }
  return variants;
}

function categorySlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const categoryCounters: Record<string, number> = {};

export const SEED_PRODUCTS: StorefrontProduct[] = rawSeed.map((p, i) => {
  const id = `rc-${(i + 1).toString().padStart(3, "0")}`;
  const pool = imagePool(p.rootCategory);
  const count = categoryCounters[p.rootCategory] || 0;
  categoryCounters[p.rootCategory] = count + 1;
  const image = pickImage(p);
  const filteredPool = pool.filter((img) => img !== image);
  const nextImage = filteredPool[count % filteredPool.length] || image;
  const slug = slugify(p.name);
  const raw = { ...p, id, image } as RawSeedProduct;
  const badges: string[] = [];
  if (p.isNew) badges.push("new");
  if (p.isLimited) badges.push("limited");
  if (p.isBestSeller) badges.push("bestseller");

  return {
    id,
    slug,
    name: p.name,
    subtitle: p.collection,
    description: `${p.name} from the ${p.collection} collection. Crafted from ${p.material}.`,
    categorySlug: categorySlug(p.category),
    categoryName: p.category,
    rootCategory: p.rootCategory,
    collection: p.collection,
    price: p.price,
    compareAtPrice: p.compareAt,
    currency: "INR",
    image,
    images: [image, nextImage],
    sizes: p.sizes,
    colors: p.colors,
    material: p.material,
    inStock: p.inStock,
    isNew: !!p.isNew,
    isLimited: !!p.isLimited,
    isBestSeller: !!p.isBestSeller,
    rating: p.rating,
    reviews: p.reviews,
    badges,
    popularity: p.reviews + p.rating * 40 + (p.isBestSeller ? 200 : 0),
    createdAt: Date.now() - i * 86_400_000,
    variants: buildVariants(raw),
    sellerName: "RIKAMCHOT House",
    sellerVerified: true,
    sellerRating: 4.9,
  };
});

export const CATEGORY_NAMES = [
  "T-Shirts", "Polos", "Hoodies", "Sweatshirts", "Bottoms", "Footwear", "Accessories",
] as const;

export const COLLECTIONS = ["Sovereign", "Heritage", "Atelier", "Nocturne"] as const;

export const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "trending", label: "Trending" },
  { id: "popular", label: "Most Popular" },
  { id: "price-asc", label: "Price · Low → High" },
  { id: "price-desc", label: "Price · High → Low" },
  { id: "discount", label: "Biggest Discount" },
] as const;

export type SortId = (typeof SORTS)[number]["id"];

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
