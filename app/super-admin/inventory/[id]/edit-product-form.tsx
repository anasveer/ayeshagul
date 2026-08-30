"use client";

import { useActionState } from "react";
import { updateProduct, deleteProduct, type UpdateProductState } from "../../actions";

const initialState: UpdateProductState = {};

const inputClass =
  "w-full rounded-xl border border-[#e8d5c4] bg-[#fdf8f5] px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#2c1a0e] focus:ring-2 focus:ring-[#2c1a0e]/10";
const labelClass = "block text-sm font-semibold text-[#2c1a0e] mb-1.5";

type Props = {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    image: string;
  };
};

export default function EditProductForm({ product }: Props) {
  const [state, formAction, pending] = useActionState(updateProduct, initialState);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Current Image */}
      <div className="rounded-2xl bg-white border border-[#e8d5c4] p-6 shadow-sm">
        <h2 className="text-sm font-bold text-[#2c1a0e] mb-4 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-[#2c1a0e] inline-block" />
          Current Product Image
        </h2>
        <div className="flex items-center gap-5">
          <div className="w-28 h-28 rounded-2xl overflow-hidden border border-[#e8d5c4] bg-[#f5ede6] shrink-0">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-4xl">👗</div>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2c1a0e]">{product.name}</p>
            <p className="text-xs text-gray-600 mt-1">{product.category}</p>
            <p className="text-xs text-gray-600 mt-0.5">
              Rs. {product.price.toLocaleString()}
              {product.originalPrice > product.price && (
                <span className="line-through ml-2 text-gray-400">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </p>
            <p className="text-xs text-amber-600 mt-2 bg-amber-50 rounded-lg px-2 py-1 inline-block">
              Image cannot be changed after upload
            </p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form action={formAction} className="rounded-2xl bg-white border border-[#e8d5c4] p-6 md:p-8 shadow-sm space-y-5">
        <input type="hidden" name="id" value={product.id} />

        <h2 className="text-sm font-bold text-[#2c1a0e] flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-[#2c1a0e] inline-block" />
          Edit Details
        </h2>

        <div>
          <label htmlFor="name" className={labelClass}>Product Name</label>
          <input
            id="name"
            name="name"
            required
            defaultValue={product.name}
            className={inputClass}
            placeholder="e.g. Cotton 3-Piece Suit"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <select id="category" name="category" required defaultValue={product.category} className={inputClass}>
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
              defaultValue={product.price}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="originalPrice" className={labelClass}>
            Original Price (Rs.)
            <span className="ml-1 font-normal text-gray-600 text-xs">— for discount badge</span>
          </label>
          <input
            id="originalPrice"
            name="originalPrice"
            type="number"
            min="0"
            defaultValue={product.originalPrice}
            className={inputClass}
          />
        </div>

        {state.error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-red-600">{state.error}</p>
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={pending}
            className="flex-1 rounded-xl bg-[#2c1a0e] px-4 py-3 text-sm font-semibold text-white hover:bg-[#5c3317] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </span>
            ) : "Save Changes"}
          </button>
          <a
            href="/super-admin/inventory"
            className="rounded-xl border border-[#e8d5c4] px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-[#f5ede6] transition-colors text-center"
          >
            Cancel
          </a>
        </div>
      </form>

      {/* Delete */}
      <div className="rounded-2xl bg-white border border-red-100 p-6 shadow-sm">
        <h2 className="text-sm font-bold text-red-600 mb-1 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-red-500 inline-block" />
          Danger Zone
        </h2>
        <p className="text-xs text-gray-600 mb-4">Permanently delete this product. This action cannot be undone.</p>
        <form
          action={deleteProduct}
          onSubmit={(e) => { if (!confirm(`Delete "${product.name}"?`)) e.preventDefault(); }}
        >
          <input type="hidden" name="id" value={product.id} />
          <button
            type="submit"
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
          >
            Delete Product
          </button>
        </form>
      </div>
    </div>
  );
}
