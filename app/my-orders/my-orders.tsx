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
  "w-full rounded-xl border border-[#e8d5c4] bg-[#fdf8f5] px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#a0522d] focus:ring-2 focus:ring-[#a0522d]/20";

export default function MyOrders() {
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setOrders(null);
    try {
      const params = new URLSearchParams();
      if (orderId.trim()) {
        params.set("orderId", orderId.trim());
      } else if (phone.trim()) {
        params.set("phone", phone.trim());
      }
      const res = await fetch(`/api/orders?${params.toString()}`);
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
    <main className="min-h-screen bg-[#f5ede6] py-10">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-12 mt-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-emerald-600">
            Enter your phone number or Order ID to see your order
            status and details.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mb-8 space-y-3">
          <div className="flex gap-2">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className={inputClass}
            />
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Order ID"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={loading || (!phone.trim() && !orderId.trim())}
            className="w-full rounded-[10px] px-6 py-3 text-sm font-bold text-white overflow-hidden relative add-to-cart-btn disabled:opacity-60"
          >
            {loading ? "Loading..." : "Check Orders"}
          </button>
          <p className="text-xs text-gray-600 text-center">
            Order ID will show one specific order. Phone number will show all orders for that number.
          </p>
        </form>

        {error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        ) : null}

        {orders && orders.length === 0 ? (
          <p className="py-10 text-center text-gray-400">
            No orders found. Please check your phone number or Order ID.
          </p>
        ) : null}

        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-[#e8d5c4] bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#f5ede6] pb-3">
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
                      <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-[#e8d5c4] bg-[#f5ede6]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#a0522d]">
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

                <p className="mt-4 border-t border-[#f5ede6] pt-3 text-xs text-gray-500">
                  {order.address}
                  {order.city ? `, ${order.city}` : ""}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <p className="mt-10 text-center">
          <Link href="/" className="text-sm font-medium text-[#a0522d] hover:text-[#2c1a0e]">
            ← Back to shop
          </Link>
        </p>
      </div>
    </main>
  );
}
