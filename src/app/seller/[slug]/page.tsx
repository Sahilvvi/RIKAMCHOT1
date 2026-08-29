import { getProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";

type SellerParams = Promise<{ slug: string }>;

const sellers: Record<string, { name: string; verified: boolean; rating: number; story: string }> = {
  "rikamchot-house": { name: "RIKAMCHOT House", verified: true, rating: 4.9, story: "The in-house label crafting premium streetwear with cinematic design language." },
  "sovereign-studio": { name: "Sovereign Studio", verified: true, rating: 4.7, story: "Limited-run drops and signature silhouettes for the modern wardrobe." },
};

function titleCaseSlug(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default async function SellerStorefrontPage({ params }: { params: SellerParams }) {
  const { slug } = await params;
  const seller = sellers[slug] || {
    name: titleCaseSlug(slug),
    verified: true,
    rating: 4.8,
    story: "A curated RIKAMCHOT seller.",
  };
  const products = (await getProducts()).filter((p) => p.sellerName?.toLowerCase().replace(/\s+/g, "-") === slug);

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 lg:p-12">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {seller.name}
              </h1>
              {seller.verified && <span className="rounded-full bg-gold/10 px-2 py-1 text-[10px] font-bold uppercase text-gold">Verified</span>}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{seller.rating} ★ · {products.length} products</p>
            <p className="mt-4 max-w-xl text-muted-foreground">{seller.story}</p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="mt-12">
            <ProductGrid products={products} />
          </div>
        ) : (
          <div className="mt-16 text-center text-muted-foreground">
            <p>No products from this seller yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
