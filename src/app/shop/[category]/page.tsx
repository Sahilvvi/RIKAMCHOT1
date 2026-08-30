import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getProducts, type SortId, SORTS } from "@/lib/catalog";
import { CategoryPageClient } from "@/components/shop/category-page";

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
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ category, sort: sortId, search: q }),
  ]);

  const relatedCategories = categories.filter(
    (c) =>
      c.parentId === categoryData.id ||
      (c.parentId && categoryData.parentId && c.parentId === categoryData.parentId && c.slug !== categoryData.slug)
  );

  return <CategoryPageClient category={categoryData} relatedCategories={relatedCategories} products={products} />;
}
