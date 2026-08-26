"use client";

import { useActionState, useState } from "react";
import { addProduct, type AddProductState } from "../actions";

const initialState: AddProductState = {};

const inputClass =
  "w-full rounded-xl border border-[#e8d5c4] bg-[#fdf8f5] px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#2c1a0e] focus:ring-2 focus:ring-[#2c1a0e]/10";

const labelClass = "block text-sm font-semibold text-[#2c1a0e] mb-1.5";

export default function AddProductForm() {
  const [state, formAction, pending] = useActionState(addProduct, initialState);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  return (
    <form
      action={formAction}
      className="max-w-2xl space-y-5 rounded-2xl bg-white border border-[#e8d5c4] p-6 md:p-8 shadow-sm"
    >
      {/* Product Name */}
      <div>
        <label htmlFor="name" className={labelClass}>Product Name</label>
        <input
          id="name"
          name="name"
          required
          className={inputClass}
          placeholder="e.g. Cotton 3-Piece Suit"
        />
      </div>

      {/* Category + Price */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <select id="category" name="category" required className={inputClass}>
            <option value="2 Piece">2 Piece</option>
            <option value="3 Piece">3 Piece</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className={labelClass}>Sale Price (Rs.)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            required
            className={inputClass}
            placeholder="7500"
          />
        </div>
      </div>

      {/* Original Price */}
      <div>
        <label htmlFor="originalPrice" className={labelClass}>
          Original Price (Rs.)
          <span className="ml-1 font-normal text-gray-400 text-xs">— optional, for discount badge</span>
        </label>
        <input
          id="originalPrice"
          name="originalPrice"
          type="number"
          min="0"
          className={inputClass}
          placeholder="9500"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className={inputClass}
          placeholder="Short product description..."
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className={labelClass}>Product Image</label>
        <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-[#e8d5c4] bg-[#fdf8f5] cursor-pointer hover:border-[#a0522d] hover:bg-[#f5ede6] transition-colors">
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="hidden"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-contain rounded-xl p-2"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Click to upload image</span>
              <span className="text-xs">PNG, JPG, WEBP supported</span>
            </div>
          )}
        </label>
        {preview && (
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="mt-2 text-xs text-red-500 hover:underline"
          >
            Remove image
          </button>
        )}
      </div>

      {/* Error */}
      {state.error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-red-600">{state.error}</p>
        </div>
      )}

      {/* Success */}
      {state.success && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-emerald-600">Product added successfully!</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#2c1a0e] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#5c3317] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading...
          </span>
        ) : "Add Product"}
      </button>
    </form>
  );
}
