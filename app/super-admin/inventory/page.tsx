import { getProducts } from "@/lib/products";
import InventoryTable from "./inventory-table";

export const metadata = {
  title: "Inventory | Ayesha Gul Admin",
};

export default async function InventoryPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#2c1a0e] p-6 text-white">
        <h1 className="text-2xl font-bold">Total Inventory</h1>
        <p className="mt-1 text-sm text-white/50">{products.length} product(s) in your store</p>
      </div>
      <InventoryTable products={products} />
    </div>
  );
}
