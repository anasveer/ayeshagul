"use server";

import { getDb } from "@/lib/mongodb";
import { getSession, destroySession } from "@/lib/session";
import { uploadImage } from "@/lib/cloudinary";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}

async function requireAdmin(): Promise<string> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export type AddProductState = { error?: string };

export async function addProduct(
  _prev: AddProductState,
  formData: FormData
): Promise<AddProductState> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const originalPriceRaw = formData.get("originalPrice");
  const originalPrice = originalPriceRaw ? Number(originalPriceRaw) : price;
  const description = String(formData.get("description") ?? "").trim();
  const image = formData.get("image");

  if (!name || !category || !price) {
    return { error: "Name, category and price are required." };
  }
  if (!image || typeof image === "string") {
    return { error: "Product image is required." };
  }

  let imageUrl: string;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    console.error("Image upload failed:", error);
    return { error: "Image upload failed. Please try again." };
  }

  const db = await getDb();
  await db.collection("products").insertOne({
    name,
    category,
    price,
    originalPrice,
    description,
    imageUrl,
    createdAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath("/super-admin/inventory");
  redirect("/super-admin/inventory");
}

export async function updateProduct(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id || !ObjectId.isValid(id)) return;

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const originalPriceRaw = formData.get("originalPrice");
  const originalPrice = originalPriceRaw ? Number(originalPriceRaw) : price;

  const db = await getDb();
  await db.collection("products").updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, category, price, originalPrice } }
  );

  revalidatePath("/");
  revalidatePath("/super-admin/inventory");
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id || !ObjectId.isValid(id)) return;

  const db = await getDb();
  await db.collection("products").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/");
  revalidatePath("/super-admin/inventory");
}

export async function markOrderComplete(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id || !ObjectId.isValid(id)) return;

  const db = await getDb();
  await db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "complete" } }
  );

  revalidatePath("/super-admin");
  revalidatePath("/super-admin/orders");
}

export async function deleteOrder(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id || !ObjectId.isValid(id)) return;

  const db = await getDb();
  await db.collection("orders").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/super-admin");
  revalidatePath("/super-admin/orders");
}
