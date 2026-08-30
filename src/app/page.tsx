import { getProducts } from "@/lib/catalog";
import { HomePage } from "@/components/home/home-page";

export default async function Home() {
  const products = await getProducts({ sort: "trending" });
  return <HomePage products={products} />;
}
