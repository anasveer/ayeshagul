import { getProducts } from "@/lib/products";
import Home from "./home";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();
  return <Home products={products} />;
}
