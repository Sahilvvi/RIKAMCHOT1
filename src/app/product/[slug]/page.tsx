import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/catalog";
import { ProductDetail } from "@/components/product/product-detail";

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
