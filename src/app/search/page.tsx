import Link from "next/link";
import { searchProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";
import { SearchInput } from "@/components/search/search-input";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";

type SearchParams = Promise<{ q?: string }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const query = q || "";
  const products = await searchProducts(query, 24);

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal variant="fade-up">
          <div className="mb-12 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Search results
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {query ? `“${query}”` : "Search"}
              </h1>
            </div>
            <SearchInput className="max-w-xl" />
            {products.length > 0 ? (
              <p className="max-w-2xl text-muted-foreground">{products.length} products found</p>
            ) : (
              <div className="max-w-xl text-muted-foreground">
                <p className="text-lg text-foreground">No products match your search.</p>
                <p>Try a category like Fashion, Tech or Lifestyle, or a collection like Sovereign.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["fashion", "tech", "lifestyle"].map((c) => (
                    <Link
                      key={c}
                      href={`/shop/${c}`}
                      className="rounded-full border border-border px-4 py-2 text-sm capitalize transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
        {products.length > 0 && (
          <>
            <div className="mb-10 border-y border-border/50 bg-card/40 py-2.5">
              <Marquee speed={26} className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {["Search", "Discover", "Fashion", "Tech", "Lifestyle", "Curated", "RIKAMCHOT"].map((w) => (
                  <span key={w} className="inline-flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {w}
                  </span>
                ))}
              </Marquee>
            </div>
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </main>
  );
}
