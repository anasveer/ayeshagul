"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { useCart } from "../cart-context";
import { placeOrder, type PlaceOrderState } from "./actions";

const initialState: PlaceOrderState = {};

const inputClass = "w-full rounded-[10px] border border-[#e8d5c4] bg-[#fdf8f5] px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#2c1a0e] focus:ring-2 focus:ring-[#2c1a0e]/10";
const inputErrorClass = "w-full rounded-[10px] border border-red-400 bg-red-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200";
const labelClass = "mb-1.5 block text-sm font-semibold text-[#2c1a0e]";

export default function CheckoutPage({ bankTitle, bankNumber }: { bankTitle: string; bankNumber: string }) {
  const { items, total, clear } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [hasScreenshot, setHasScreenshot] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (state.success) { clear(); } }, [state.success, clear]);

  function validate(form: HTMLFormElement): Record<string, string> {
    const errors: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value.trim();
    const city = (form.elements.namedItem("city") as HTMLInputElement)?.value.trim();
    const address = (form.elements.namedItem("address") as HTMLTextAreaElement)?.value.trim();
    if (!name) errors.name = "Full name is required";
    if (!phone) errors.phone = "Phone number is required";
    if (!city) errors.city = "City is required";
    if (!address) errors.address = "Address is required";
    if (!hasScreenshot) errors.screenshot = "Payment screenshot is required to place order";
    return errors;
  }

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-[#2c1a0e]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-[#5c3317] font-medium">Loading cart...</p>
        </div>
      </main>
    );
  }

  if (state.success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white p-4">
        <div className="w-full max-w-md rounded-2xl bg-white border border-[#e8d5c4] p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[#2c1a0e]">Order Placed!</h1>
          <p className="mt-2 text-sm text-gray-600">Thank you! Your order has been received. We will confirm it on WhatsApp after payment verification.</p>
          <p className="mt-3 text-sm text-gray-700">Order ID: <span className="font-bold text-[#2c1a0e]">{state.orderId}</span></p>
          <div className="mt-6 space-y-2">
            <Link href="/my-orders" className="btn-brand block rounded-[10px] py-3 text-sm font-semibold">Track My Orders</Link>
            <Link href="/" className="block rounded-[10px] border border-[#e8d5c4] py-3 text-sm font-semibold text-[#2c1a0e] hover:bg-white transition-colors">Continue Shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white p-4">
        <div className="w-full max-w-md rounded-2xl bg-white border border-[#e8d5c4] p-8 text-center shadow-xl">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-lg font-bold text-[#2c1a0e]">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-600">Add some products before checking out.</p>
          <Link href="/" className="mt-6 btn-brand block rounded-[10px] py-3 text-sm font-semibold">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#2c1a0e]">Checkout</h1>
          <Link href="/" className="text-sm font-medium text-[#5c3317] hover:text-[#2c1a0e] transition-colors">← Back to shop</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Order Summary */}
          <div className="lg:col-span-2 lg:order-2">
            <div className="rounded-2xl border border-[#e8d5c4] bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#a0522d]">Order Summary</h2>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3">
                    <div className="h-16 w-14 shrink-0 overflow-hidden rounded-[10px] border border-[#e8d5c4] bg-white cursor-pointer" onClick={() => item.image && setPreviewImg(item.image)}>
                      {item.image
                        ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        : <div className="flex h-full items-center justify-center text-xl">👗</div>}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm font-semibold text-[#2c1a0e] line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.category}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                        <span className="text-sm font-bold text-[#2c1a0e]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-[#e8d5c4] pt-4">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-xl font-bold text-[#2c1a0e]">Rs. {total.toLocaleString()}</span>
              </div>
              <p className="mt-4 rounded-[10px] bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                100% advance payment required. Order placed only after payment screenshot is attached.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 lg:order-1">
            <form
              action={formAction}
              onSubmit={(e) => {
                const errors = validate(e.currentTarget);
                if (Object.keys(errors).length > 0) {
                  e.preventDefault();
                  setFieldErrors(errors);
                  const firstKey = Object.keys(errors)[0];
                  document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                  setFieldErrors({});
                }
              }}
              className="space-y-5"
            >
              <input type="hidden" name="items" value={JSON.stringify(items)} />

              {/* Contact & Delivery */}
              <div className="rounded-2xl border border-[#e8d5c4] bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#a0522d]">Contact & Delivery</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                    <input id="name" name="name" className={fieldErrors.name ? inputErrorClass : inputClass} placeholder="Your name"
                      onChange={() => setFieldErrors(p => ({ ...p, name: "" }))} />
                    {fieldErrors.name && <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone / WhatsApp <span className="text-red-500">*</span></label>
                    <input id="phone" name="phone" className={fieldErrors.phone ? inputErrorClass : inputClass} placeholder="03xx xxxxxxx"
                      onChange={() => setFieldErrors(p => ({ ...p, phone: "" }))} />
                    {fieldErrors.phone && <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email <span className="font-normal text-gray-600 text-xs">(optional)</span></label>
                    <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label htmlFor="city" className={labelClass}>City <span className="text-red-500">*</span></label>
                    <input id="city" name="city" className={fieldErrors.city ? inputErrorClass : inputClass} placeholder="City"
                      onChange={() => setFieldErrors(p => ({ ...p, city: "" }))} />
                    {fieldErrors.city && <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.city}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className={labelClass}>Address <span className="text-red-500">*</span></label>
                    <textarea id="address" name="address" rows={2} className={fieldErrors.address ? inputErrorClass : inputClass} placeholder="Complete delivery address"
                      onChange={() => setFieldErrors(p => ({ ...p, address: "" }))} />
                    {fieldErrors.address && <p className="mt-1 text-xs text-red-500 font-medium">{fieldErrors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-2xl border border-[#e8d5c4] bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#a0522d]">Payment (100% Advance)</h2>
                <div className="rounded-[10px] bg-white border border-[#e8d5c4] p-4">
                  <p className="text-sm text-gray-700">Please transfer the total amount to:</p>
                  <p className="mt-2 text-sm font-semibold text-[#2c1a0e]">{bankTitle}</p>
                  <p className="mt-0.5 text-lg font-bold tracking-wide text-[#5c3317]">{bankNumber}</p>
                </div>
                <p className="mt-3 text-xs text-gray-600">After transferring, attach the payment screenshot below.</p>
                <div className="mt-3">
                  <label htmlFor="screenshot" className={labelClass}>
                    Payment Screenshot <span className="text-red-500">*</span>
                  </label>
                  <label className={`flex flex-col items-center justify-center w-full h-28 rounded-[10px] border-2 border-dashed cursor-pointer transition-colors mt-1 ${
                    fieldErrors.screenshot
                      ? "border-red-400 bg-red-50 hover:border-red-500"
                      : "border-[#e8d5c4] bg-[#fdf8f5] hover:border-[#a0522d] hover:bg-white"
                  }`}>
                    <input
                      id="screenshot"
                      name="screenshot"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setScreenshotPreview(URL.createObjectURL(file));
                          setHasScreenshot(true);
                          setFieldErrors(p => ({ ...p, screenshot: "" }));
                        } else {
                          setScreenshotPreview(null);
                          setHasScreenshot(false);
                        }
                      }}
                      className="hidden"
                    />
                    {screenshotPreview ? (
                      <img src={screenshotPreview} alt="Payment screenshot" className="h-full w-full object-contain rounded-[10px] p-1" />
                    ) : (
                      <div className={`flex flex-col items-center gap-1 ${fieldErrors.screenshot ? "text-red-500" : "text-gray-600"}`}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium">Click to upload screenshot</span>
                      </div>
                    )}
                  </label>
                  {fieldErrors.screenshot && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-medium">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {fieldErrors.screenshot}
                    </p>
                  )}
                </div>
              </div>

              {state.error && (
                <div className="flex items-center gap-2 rounded-[10px] bg-red-50 border border-red-200 px-4 py-3">
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium text-red-600">{state.error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-[10px] py-3.5 text-sm font-bold text-white overflow-hidden relative add-to-cart-btn disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Placing Order...
                  </span>
                ) : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {previewImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={() => setPreviewImg(null)}>
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewImg(null)} className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={previewImg} alt="Preview" className="w-full rounded-2xl shadow-2xl object-contain max-h-[80vh]" />
          </div>
        </div>
      )}
    </main>
  );
}
