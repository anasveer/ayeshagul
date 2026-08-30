import { notFound } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import EditProductForm from "./edit-product-form";

export const metadata = {
  title: "Edit Product | Ayesha Gul Admin",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) notFound();

  const db = await getDb();
  const doc = await db.collection("products").findOne({ _id: new ObjectId(id) });

  if (!doc) notFound();

  const product = {
    id: doc._id.toString(),
    name: doc.name ?? "",
    category: doc.category ?? "",
    price: Number(doc.price) || 0,
    originalPrice: Number(doc.originalPrice) || Number(doc.price) || 0,
    image: doc.imageUrl ?? "",
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#2c1a0e] p-6 text-white flex items-center gap-4">
        <a
          href="/super-admin/inventory"
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="mt-0.5 text-sm text-white/50">{product.name}</p>
        </div>
      </div>
      <EditProductForm product={product} />
    </div>
  );
}
