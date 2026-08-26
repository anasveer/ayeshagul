"use client";

import { useState } from "react";
import { markOrderComplete, deleteOrder } from "../actions";

export type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  category: string;
};

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "complete";
  createdAt: string;
};

const filters = ["All", "pending", "complete"] as const;

function formatRs(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString()}`;
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e8d5c4] bg-white p-12 text-center">
        <div className="text-4xl mb-3">📋</div>
        <p className="text-sm text-gray-400">No orders yet.</p>
      </div>
    );
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
            {f === "All" ? "All Orders" : f === "pending" ? "⏳ Pending" : "✅ Completed"}
          </button>
        ))}
        <span className="ml-auto self-center text-sm text-gray-400">{filtered.length} order(s)</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#e8d5c4] bg-white p-12 text-center">
          <p className="text-sm text-gray-400">
            No {filter === "pending" ? "pending" : "completed"} orders.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className={`rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow ${
                order.status === "pending" ? "border-amber-200" : "border-[#e8d5c4]"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-[#2c1a0e]">{order.customerName}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        order.status === "complete"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.status === "complete" ? "✅ Completed" : "⏳ Pending"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    📞 {order.phone}
                  </p>
                  <p className="text-xs text-gray-500">
                    📍 {order.address}{order.city ? `, ${order.city}` : ""}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">{order.createdAt}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-[#2c1a0e]">{formatRs(order.totalAmount)}</p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-1.5 border-t border-[#f5ede6] pt-3 mb-3">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">
                      {item.name}
                      <span className="text-gray-400 ml-1">({item.category} ×{item.quantity})</span>
                    </span>
                    <span className="font-semibold text-[#2c1a0e] shrink-0">
                      {formatRs(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex gap-2">
                {order.status === "pending" && (
                  <form action={markOrderComplete} className="flex-1">
                    <input type="hidden" name="id" value={order.id} />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
                    >
                      Mark Complete
                    </button>
                  </form>
                )}
                <form
                  action={deleteOrder}
                  onSubmit={(e) => { if (!confirm("Delete this order?")) e.preventDefault(); }}
                  className={order.status === "pending" ? "" : "flex-1"}
                >
                  <input type="hidden" name="id" value={order.id} />
                  <button
                    type="submit"
                    className={`rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-95 ${
                      order.status !== "pending" ? "w-full" : ""
                    }`}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
