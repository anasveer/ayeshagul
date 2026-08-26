import { getProducts } from "@/lib/products";
import { CartProvider } from "./cart-context";
import Home from "./home";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();

  return (
    <CartProvider>
      <Home products={products} />
    </CartProvider>
  );
}
