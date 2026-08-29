import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { CategoryWorlds } from "@/components/home/category-worlds";
import { getProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";

async function TrendingSection() {
  const products = await getProducts({ sort: "trending" });
  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Curated now
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Trending now
            </h2>
          </div>
          <Link
            href="/shop/fashion"
            className="hidden text-sm font-medium text-gold hover:underline sm:inline"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 8)} />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryWorlds />
      <TrendingSection />
    </>
  );
}
