import { getProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";

export default async function SalePage() {
  const products = (await getProducts()).filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-pink/20 bg-pink/5 p-8 text-center lg:p-12">
          <p className="text-xs font-bold uppercase tracking-widest text-pink">Flash drop</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Sale
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Limited-time reductions on standout pieces. Once they&apos;re gone, they&apos;re gone.</p>
        </div>
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}
