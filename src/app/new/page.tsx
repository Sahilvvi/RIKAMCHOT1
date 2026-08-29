import { getProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";

export default async function NewArrivalsPage() {
  const products = (await getProducts()).filter((p) => p.isNew);

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
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
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
