import { notFound } from "next/navigation";
import { getCategoryBySlug, getProducts, type SortId, SORTS } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-grid";
import { SortSelect } from "@/components/shop/sort-select";

type Params = Promise<{ category: string }>;
type SearchParams = Promise<{ sort?: string; q?: string }>;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { category } = await params;
  const { sort, q } = await searchParams;

  const categoryData = await getCategoryBySlug(category);
  if (!categoryData) notFound();

  const sortId = (SORTS.find((s) => s.id === sort)?.id as SortId | undefined) || undefined;
  const products = await getProducts({ category, sort: sortId, search: q });

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {products.length} products
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {categoryData.name}
          </h1>
          {categoryData.description && (
            <p className="max-w-2xl text-muted-foreground">{categoryData.description}</p>
          )}
        </div>

        <div className="mb-8 flex items-center justify-between">
          <SortSelect value={sortId} />
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {products.length} results
          </span>
        </div>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
