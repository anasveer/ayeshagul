"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { deleteProduct } from "../actions";

const filters = ["All", "2 Piece", "3 Piece"] as const;

export default function InventoryTable({ products }: { products: Product[] }) {
  const [list, setList] = useState(products);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

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
      {/* Filter + count */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition active:scale-95 ${
              filter === f
                ? "bg-[#2c1a0e] text-white"
                : "bg-white text-[#2c1a0e] border border-[#e8d5c4] hover:bg-[#f5ede6]"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-600">{filtered.length} product(s)</span>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#e8d5c4] bg-white overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-600">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-sm">No products found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5ede6] border-b border-[#e8d5c4]">
                  <th className="text-left px-4 py-3 font-semibold text-[#2c1a0e] w-14">#</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#2c1a0e] w-16">Image</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#2c1a0e]">Product Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#2c1a0e]">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#2c1a0e]">Sale Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#2c1a0e]">Orig. Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#2c1a0e]">Discount</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#2c1a0e]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5ede6]">
                {filtered.map((product, idx) => {
                  const discount =
                    product.originalPrice > product.price
                      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                      : 0;
                  return (
                    <tr key={product.id} className="hover:bg-[#fdf8f5] transition-colors">
                      <td className="px-4 py-3 text-gray-600">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setPreviewImg(product.image || null)}
                          className="block w-10 h-10 rounded-lg overflow-hidden border border-[#e8d5c4] bg-[#f5ede6] hover:scale-110 transition-transform"
                          title="Click to preview"
                        >
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="flex h-full items-center justify-center text-lg">👗</span>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 font-medium text-[#2c1a0e] max-w-[180px] truncate">{product.name}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-[#f5ede6] px-2.5 py-1 text-xs font-semibold text-[#5c3317]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#2c1a0e]">
                        Rs. {product.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {product.originalPrice > product.price
                          ? `Rs. ${product.originalPrice.toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {discount > 0 ? (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                            -{discount}%
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/super-admin/inventory/${product.id}`}
                            className="rounded-lg bg-[#2c1a0e] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5c3317] transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4"
          onClick={() => setPreviewImg(null)}
        >
          <div className="relative max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <img src={previewImg} alt="Preview" className="w-full rounded-2xl shadow-2xl object-contain max-h-[80vh]" />
            <button
              onClick={() => setPreviewImg(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
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
            <p className="text-sm text-gray-600 mb-5">
              &quot;{deleteTarget.name}&quot; will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 rounded-xl border border-[#e8d5c4] px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-[#f5ede6] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
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
