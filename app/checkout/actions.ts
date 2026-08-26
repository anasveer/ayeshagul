"use server";

import { getDb } from "@/lib/mongodb";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export type PlaceOrderState = {
  error?: string;
  success?: boolean;
  orderId?: string;
};

type ItemInput = {
  productId?: string;
  name?: string;
  price?: number;
  category?: string;
  quantity?: number;
  image?: string;
};

export async function placeOrder(
  _prev: PlaceOrderState,
  formData: FormData
): Promise<PlaceOrderState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const screenshot = formData.get("screenshot");

  let items: ItemInput[] = [];
  try {
    const raw = JSON.parse(String(formData.get("items") ?? "[]"));
    if (Array.isArray(raw)) items = raw;
  } catch {
    items = [];
  }

  if (!name || !phone || !address || items.length === 0) {
    return { error: "Please fill in all required fields." };
  }
  if (!screenshot || typeof screenshot === "string" || screenshot.size === 0) {
    return {
      error: "Please attach the payment screenshot to place your order.",
    };
  }

  const orderItems = items.map((item) => ({
    productId: String(item.productId ?? ""),
    name: String(item.name ?? ""),
    price: Number(item.price) || 0,
    category: String(item.category ?? ""),
    quantity: Number(item.quantity) || 1,
    image: String(item.image ?? ""),
  }));

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let screenshotUrl: string;
  try {
    screenshotUrl = await uploadImage(screenshot, "ayesha-gul/payments");
  } catch (error) {
    console.error("Screenshot upload failed:", error);
    return {
      error: "Payment screenshot upload failed. Please try again.",
    };
  }

  const db = await getDb();
  const result = await db.collection("orders").insertOne({
    customerName: name,
    phone,
    email,
    address,
    city,
    items: orderItems,
    totalAmount,
    status: "pending",
    paymentScreenshotUrl: screenshotUrl,
    createdAt: new Date(),
  });

  revalidatePath("/super-admin");
  revalidatePath("/super-admin/orders");

  return { success: true, orderId: result.insertedId.toString() };
}
