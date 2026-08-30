import { getDb } from "./mongodb";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  createdAt: Date;
};

export async function getProducts(): Promise<Product[]> {
  const db = await getDb();
  const docs = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name ?? "",
    price: Number(doc.price) || 0,
    originalPrice: Number(doc.originalPrice) || Number(doc.price) || 0,
    category: doc.category ?? "",
    image: doc.imageUrl ?? "",
    createdAt: doc.createdAt ?? new Date(0),
  }));
}
