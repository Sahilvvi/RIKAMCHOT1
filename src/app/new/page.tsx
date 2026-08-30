import { getProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";

export default async function NewArrivalsPage() {
  const products = (await getProducts()).filter((p) => p.isNew);

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal variant="fade-up">
          <div className="mb-12 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {products.length} products
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              New Arrivals
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              The latest drops from the RIKAMCHOT house label and curated sellers.
            </p>
          </div>
        </ScrollReveal>
        <div className="mb-10 border-y border-border/50 bg-card/40 py-2.5">
          <Marquee speed={26} className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {["New Drop", "Just Landed", "Limited Quantities", "Curated", "Verified Sellers", "RIKAMCHOT"].map((w) => (
              <span key={w} className="inline-flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {w}
              </span>
            ))}
          </Marquee>
        </div>
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
