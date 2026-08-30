import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/catalog";
import { CustomizeClient } from "@/components/customize/customize-client";

type Params = Promise<{ slug: string }>;

export default async function CustomizePage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <CustomizeClient product={product} />;
}
