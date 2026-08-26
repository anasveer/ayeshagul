"use client";

import { useState } from "react";
import Link from "next/link";

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
  createdAt: string;
};

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

export default function MyOrders() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setOrders(null);
    try {
      const res = await fetch(
        `/api/orders?phone=${encodeURIComponent(phone.trim())}`
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load orders.");
      setOrders(json.orders);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Enter the phone number you used at checkout to see your order
            status and details.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="03xx xxxxxxx"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Check Orders"}
          </button>
        </form>

        {error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        ) : null}

        {orders && orders.length === 0 ? (
          <p className="py-10 text-center text-gray-400">
            No orders found for this number.
          </p>
        ) : null}

        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-50 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">
                        {order.customerName}
                      </p>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          order.status === "complete"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status === "complete" ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    Rs. {order.totalAmount.toLocaleString()}
                  </p>
                </div>

                <ul className="mt-3 space-y-3">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-blue-200">
                            A
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">{item.category}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 border-t border-gray-50 pt-3 text-xs text-gray-500">
                  {order.address}
                  {order.city ? `, ${order.city}` : ""}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <p className="mt-10 text-center">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to shop
          </Link>
        </p>
      </div>
    </main>
  );
}
