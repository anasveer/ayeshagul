"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { useCart } from "../cart-context";
import { placeOrder, type PlaceOrderState } from "./actions";

const initialState: PlaceOrderState = {};

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

export default function CheckoutPage({
  bankTitle,
  bankNumber,
}: {
  bankTitle: string;
  bankNumber: string;
}) {
  const { items, total, clear } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  useEffect(() => {
    if (state.success) clear();
  }, [state.success, clear]);

  if (state.success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Order Placed!</h1>
          <p className="mt-2 text-sm text-gray-500">
            Thank you! Your order has been received. We will confirm it on
            WhatsApp after payment verification.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Order ID:{" "}
            <span className="font-semibold text-gray-900">{state.orderId}</span>
          </p>
          <div className="mt-6 space-y-2">
            <Link
              href="/my-orders"
              className="block rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600"
            >
              Track My Orders
            </Link>
            <Link
              href="/"
              className="block rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-lg font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-500">
            Add some products before checking out.
          </p>
          <Link
            href="/"
            className="mt-6 block rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to shop
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Order summary — first on mobile, right on desktop */}
          <div className="lg:col-span-2 lg:order-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                Order Summary
              </h2>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3">
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

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
                100% advance payment is required. Your order will be placed only
                after the payment screenshot is attached.
              </p>
            </div>
          </div>

          {/* Checkout form — second on mobile, left on desktop */}
          <div className="lg:col-span-3 lg:order-1">
            <form action={formAction} className="space-y-6">
              <input type="hidden" name="items" value={JSON.stringify(items)} />

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                  Contact & Delivery
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <input id="name" name="name" required className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Phone / WhatsApp
                    </label>
                    <input id="phone" name="phone" required className={inputClass} placeholder="03xx xxxxxxx" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Email <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-gray-700">
                      City
                    </label>
                    <input id="city" name="city" className={inputClass} placeholder="City" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Address
                    </label>
                    <textarea id="address" name="address" required rows={2} className={inputClass} placeholder="Complete delivery address" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                  Payment (100% Advance)
                </h2>
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-gray-700">
                    Please transfer the total amount to:
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{bankTitle}</p>
                  <p className="mt-0.5 text-lg font-bold tracking-wide text-blue-700">
                    {bankNumber}
                  </p>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  After transferring, attach the payment screenshot below. Your
                  order will not be placed without it.
                </p>
                <div className="mt-3">
                  <label htmlFor="screenshot" className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Payment Screenshot
                  </label>
                  <input
                    id="screenshot"
                    name="screenshot"
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setScreenshotPreview(URL.createObjectURL(file));
                      else setScreenshotPreview(null);
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:from-blue-600 hover:file:to-cyan-600"
                  />
                  {screenshotPreview ? (
                    <img
                      src={screenshotPreview}
                      alt="Payment screenshot preview"
                      className="mt-3 h-32 w-full rounded-xl border border-gray-200 object-cover"
                    />
                  ) : null}
                </div>
              </div>

              {state.error ? (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {state.error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600 disabled:opacity-60"
              >
                {pending ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
