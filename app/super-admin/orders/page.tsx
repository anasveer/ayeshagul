import { getDb } from "@/lib/mongodb";
import OrdersTable, { type Order } from "./orders-table";

export const metadata = {
  title: "Orders | Ayesha Gul Admin",
};

export default async function OrdersPage() {
  const db = await getDb();
  const docs = await db
    .collection("orders")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const orders: Order[] = docs.map((doc) => {
    const rawItems = (doc.items ?? []) as Array<{
      name?: string;
      price?: number;
      quantity?: number;
      category?: string;
      image?: string;
    }>;

    return {
      id: doc._id.toString(),
      customerName: doc.customerName ?? "",
      phone: doc.phone ?? "",
      email: doc.email ?? "",
      address: doc.address ?? "",
      city: doc.city ?? "",
      items: rawItems.map((item) => ({
        name: item.name ?? "",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        category: item.category ?? "",
        image: item.image ?? "",
      })),
      totalAmount: Number(doc.totalAmount) || 0,
      status: (doc.status === "complete" ? "complete" : "pending") as "pending" | "complete",
      paymentScreenshotUrl: doc.paymentScreenshotUrl ?? "",
      createdAt: doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "",
    };
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const completedCount = orders.filter((o) => o.status === "complete").length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#2c1a0e] p-6 text-white">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="mt-2 flex gap-4 text-sm text-white/60">
          <span>{orders.length} total</span>
          <span className="text-amber-400">{pendingCount} pending</span>
          <span className="text-emerald-400">{completedCount} completed</span>
        </div>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
