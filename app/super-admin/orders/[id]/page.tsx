import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import OrderDetailClient from "./order-detail-client";

export const metadata = {
  title: "Order Details | Ayesha Gul Admin",
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id || !ObjectId.isValid(id)) notFound();

  const db = await getDb();
  const doc = await db.collection("orders").findOne({ _id: new ObjectId(id) });

  if (!doc) notFound();

  const rawItems = (doc.items ?? []) as Array<{
    name?: string;
    price?: number;
    quantity?: number;
    category?: string;
    image?: string;
  }>;

  const order = {
    id: doc._id.toString(),
    customerName: (doc.customerName as string) ?? "",
    phone: (doc.phone as string) ?? "",
    email: (doc.email as string) ?? "",
    address: (doc.address as string) ?? "",
    city: (doc.city as string) ?? "",
    items: rawItems.map((item) => ({
      name: item.name ?? "",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      category: item.category ?? "",
      image: item.image ?? "",
    })),
    totalAmount: Number(doc.totalAmount) || 0,
    status: (doc.status === "complete" ? "complete" : "pending") as "pending" | "complete",
    paymentScreenshotUrl: (doc.paymentScreenshotUrl as string) ?? "",
    createdAt: doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "",
  };

  return <OrderDetailClient order={order} />;
}
