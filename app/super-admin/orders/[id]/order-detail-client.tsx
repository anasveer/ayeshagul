"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { markOrderComplete, deleteOrder } from "../../actions";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
};

type Order = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "complete";
  paymentScreenshotUrl: string;
  createdAt: string;
};

function formatRs(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString()}`;
}

export default function OrderDetailClient({ order }: { order: Order }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState(order.status);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  async function handleMarkComplete() {
    const fd = new FormData();
    fd.set("id", order.id);
    await markOrderComplete(fd);
    setStatus("complete");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this order? This cannot be undone.")) return;
    const fd = new FormData();
    fd.set("id", order.id);
    await deleteOrder(fd);
    window.location.href = "/super-admin/orders";
  }

  return (
    <div className="space-y-6">
      {/* Image Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
            <img
              src={preview}
              alt="Preview"
              className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="rounded-2xl bg-[#2c1a0e] p-6 text-white">
        <Link
          href="/super-admin/orders"
          className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mb-3"
        >
          ← Back to Orders
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="mt-1 text-sm text-white/50">Tracking ID: <span className="font-mono text-white/80">{order.id}</span></p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                status === "complete"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/20 text-amber-300"
              }`}
            >
              {status === "complete" ? "✅ Completed" : "⏳ Pending"}
            </span>
            {status === "pending" && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="rounded-full bg-emerald-600 px-4 py-1 text-sm font-bold text-white hover:bg-emerald-700 transition active:scale-95"
                >
                  Change Status ▾
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-white shadow-xl border border-[#e8d5c4] z-10 overflow-hidden">
                    <button
                      onClick={async () => {
                        await handleMarkComplete();
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm font-medium text-[#2c1a0e] hover:bg-[#f5ede6] flex items-center gap-2 transition"
                    >
                      <span className="text-emerald-600">✓</span> Complete
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={handleDelete}
              className="rounded-full bg-red-600 px-4 py-1 text-sm font-bold text-white hover:bg-red-700 transition active:scale-95"
            >
              ✕ Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Info */}
        <div className="rounded-2xl border border-[#e8d5c4] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#a0522d]">Customer Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-[#f5ede6] pb-2">
              <span className="text-sm text-gray-500">Full Name</span>
              <span className="text-sm font-semibold text-[#2c1a0e]">{order.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-[#f5ede6] pb-2">
              <span className="text-sm text-gray-500">Phone / WhatsApp</span>
              <span className="text-sm font-semibold text-[#2c1a0e]">{order.phone}</span>
            </div>
            <div className="flex justify-between border-b border-[#f5ede6] pb-2">
              <span className="text-sm text-gray-500">Email</span>
              <span className="text-sm font-semibold text-[#2c1a0e]">{order.email || "—"}</span>
            </div>
            <div className="flex justify-between border-b border-[#f5ede6] pb-2">
              <span className="text-sm text-gray-500">City</span>
              <span className="text-sm font-semibold text-[#2c1a0e]">{order.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Address</span>
              <span className="text-sm font-semibold text-[#2c1a0e] text-right max-w-[60%]">{order.address}</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-2xl border border-[#e8d5c4] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#a0522d]">Order Summary</h2>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between border-b border-[#f5ede6] pb-2">
              <span className="text-sm text-gray-500">Order Date</span>
              <span className="text-sm font-semibold text-[#2c1a0e]">{order.createdAt}</span>
            </div>
            <div className="flex justify-between border-b border-[#f5ede6] pb-2">
              <span className="text-sm text-gray-500">Total Items</span>
              <span className="text-sm font-semibold text-[#2c1a0e]">{order.items.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Amount</span>
              <span className="text-lg font-bold text-[#2c1a0e]">{formatRs(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-2xl border border-[#e8d5c4] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#a0522d]">Items Ordered</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8d5c4]">
                <th className="pb-2 text-left text-xs font-semibold text-gray-500">Product</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500">Category</th>
                <th className="pb-2 text-center text-xs font-semibold text-gray-500">Qty</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500">Price</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b border-[#f5ede6] last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <button
                          onClick={() => setPreview(item.image)}
                          className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#e8d5c4] bg-[#f5ede6] hover:ring-2 hover:ring-[#a0522d] hover:ring-offset-1 transition-all cursor-pointer"
                        >
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </button>
                      ) : null}
                      <span className="font-medium text-[#2c1a0e]">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-600">{item.category}</td>
                  <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-600">{formatRs(item.price)}</td>
                  <td className="py-3 text-right font-semibold text-[#2c1a0e]">{formatRs(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#e8d5c4]">
                <td colSpan={4} className="pt-3 text-right font-bold text-[#2c1a0e]">Total</td>
                <td className="pt-3 text-right text-lg font-bold text-[#2c1a0e]">{formatRs(order.totalAmount)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment Screenshot */}
      {order.paymentScreenshotUrl && (
        <div className="rounded-2xl border border-[#e8d5c4] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#a0522d]">Payment Screenshot</h2>
          <div className="flex justify-center">
            <button
              onClick={() => setPreview(order.paymentScreenshotUrl)}
              className="block max-w-md rounded-xl border border-[#e8d5c4] overflow-hidden hover:shadow-lg hover:ring-2 hover:ring-[#a0522d] hover:ring-offset-1 transition-all cursor-pointer"
            >
              <img
                src={order.paymentScreenshotUrl}
                alt="Payment Screenshot"
                className="w-full h-auto"
              />
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-gray-400">Click image to preview</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Link
          href="/super-admin/orders"
          className="rounded-xl border border-[#e8d5c4] bg-white px-6 py-3 text-sm font-semibold text-[#2c1a0e] transition hover:bg-[#f5ede6] active:scale-95"
        >
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
}
