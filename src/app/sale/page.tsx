import { getProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";

export default async function SalePage() {
  const products = (await getProducts()).filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal variant="scale">
          <div className="rounded-3xl border border-pink/20 bg-pink/5 p-8 text-center lg:p-12">
            <p className="text-xs font-bold uppercase tracking-widest text-pink">Flash drop</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Sale
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Limited-time reductions on standout pieces. Once they&apos;re gone, they&apos;re gone.</p>
          </div>
        </ScrollReveal>
        <div className="my-10 border-y border-border/50 bg-card/40 py-2.5">
          <Marquee speed={26} direction="right" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {["Flash Sale", "Limited Stock", "Up to 50% Off", "Once Gone, Never Back", "Verified Sellers", "RIKAMCHOT"].map((w) => (
              <span key={w} className="inline-flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-pink" />
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
