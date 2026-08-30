import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const phone = url.searchParams.get("phone")?.trim() ?? "";
    const orderId = url.searchParams.get("orderId")?.trim() ?? "";

    if (!phone && !orderId) {
      return NextResponse.json({ error: "Phone or Order ID is required" }, { status: 400 });
    }

    const db = await getDb();

    let docs;
    if (orderId) {
      if (!ObjectId.isValid(orderId)) {
        return NextResponse.json({ orders: [] });
      }
      docs = await db
        .collection("orders")
        .find({ _id: new ObjectId(orderId) })
        .toArray();
    } else {
      docs = await db
        .collection("orders")
        .find({ phone })
        .sort({ createdAt: -1 })
        .limit(30)
        .toArray();
    }

    const orders = docs.map((doc) => {
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
        status: (doc.status === "complete" ? "complete" : "pending") as
          | "pending"
          | "complete",
        paymentScreenshotUrl: doc.paymentScreenshotUrl ?? "",
        createdAt: doc.createdAt ? doc.createdAt.toISOString() : "",
      };
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Fetch orders failed:", error);
    return NextResponse.json(
      { error: "Failed to load orders. Please try again." },
      { status: 500 }
    );
  }
}
