"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { updateProduct, deleteProduct } from "../actions";

const filters = ["All", "2 Piece", "3 Piece"] as const;

const inputClass =
  "w-full rounded-lg border border-[#e8d5c4] bg-[#fdf8f5] px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#2c1a0e] focus:ring-2 focus:ring-[#2c1a0e]/10";

function EditControls({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (product: Product) => void;
}) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(String(product.price));
  const [originalPrice, setOriginalPrice] = useState(String(product.originalPrice));
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const scheduleSave = useCallback(
    (next: { name: string; category: string; price: string; originalPrice: string }) => {
      setStatus("saving");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        const fd = new FormData();
        fd.set("id", product.id);
        fd.set("name", next.name);
        fd.set("category", next.category);
        fd.set("price", next.price);
        fd.set("originalPrice", next.originalPrice);
        try {
          await updateProduct(fd);
          setStatus("saved");
          timer.current = setTimeout(() => setStatus("idle"), 1500);
        } catch {
          setStatus("idle");
        }
      }, 700);
    },
    [product.id]
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Top row: image + name */}
      <div className="flex items-start gap-3">
        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-[#e8d5c4] bg-[#f5ede6]">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl">👗</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            value={name}
            onChange={(e) => { const v = e.target.value; setName(v); scheduleSave({ name: v, category, price, originalPrice }); }}
            className={inputClass}
            placeholder="Product name"
          />
          <div className="mt-1.5 h-4">
            {status === "saving" && <span className="text-xs font-medium text-amber-500">Saving…</span>}
            {status === "saved" && <span className="text-xs font-medium text-emerald-600">✓ Saved</span>}
          </div>
        </div>
      </div>

      {/* Bottom row: fields + delete */}
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={category}
          onChange={(e) => { const v = e.target.value; setCategory(v); scheduleSave({ name, category: v, price, originalPrice }); }}
          className="rounded-lg border border-[#e8d5c4] bg-[#fdf8f5] px-3 py-2 text-sm outline-none focus:border-[#2c1a0e] focus:ring-2 focus:ring-[#2c1a0e]/10"
        >
          <option value="2 Piece">2 Piece</option>
          <option value="3 Piece">3 Piece</option>
        </select>
        <input
          value={price}
          type="number"
          min="0"
          onChange={(e) => { const v = e.target.value; setPrice(v); scheduleSave({ name, category, price: v, originalPrice }); }}
          className="w-28 rounded-lg border border-[#e8d5c4] bg-[#fdf8f5] px-3 py-2 text-sm outline-none focus:border-[#2c1a0e] focus:ring-2 focus:ring-[#2c1a0e]/10"
          placeholder="Price"
        />
        <input
          value={originalPrice}
          type="number"
          min="0"
          onChange={(e) => { const v = e.target.value; setOriginalPrice(v); scheduleSave({ name, category, price, originalPrice: v }); }}
          className="w-28 rounded-lg border border-[#e8d5c4] bg-[#fdf8f5] px-3 py-2 text-sm outline-none focus:border-[#2c1a0e] focus:ring-2 focus:ring-[#2c1a0e]/10"
          placeholder="Orig. Price"
        />
        <button
          onClick={() => onDelete(product)}
          className="ml-auto rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-95"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function InventoryTable({ products }: { products: Product[] }) {
  const [list, setList] = useState(products);
  const [prevProducts, setPrevProducts] = useState(products);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  if (prevProducts !== products) {
    setPrevProducts(products);
    setList(products);
  }

  const filtered = filter === "All" ? list : list.filter((p) => p.category === filter);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const fd = new FormData();
    fd.set("id", deleteTarget.id);
    try {
      await deleteProduct(fd);
      setList((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
              filter === f
                ? "bg-[#2c1a0e] text-white shadow-sm"
                : "bg-white text-[#2c1a0e] border border-[#e8d5c4] hover:bg-[#f5ede6]"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto self-center text-sm text-gray-400">{filtered.length} product(s)</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#e8d5c4] bg-white p-12 text-center text-gray-400">
          <div className="text-4xl mb-3">📦</div>
          <p className="text-sm">No products found.</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((product) => (
            <div key={product.id} className="rounded-2xl border border-[#e8d5c4] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <EditControls product={product} onDelete={setDeleteTarget} />
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-[#e8d5c4] p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Product?</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              &quot;{deleteTarget.name}&quot; will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 rounded-xl border border-[#e8d5c4] px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-[#f5ede6] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
