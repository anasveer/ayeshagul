"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

const inputClass =
  "w-full rounded-xl border border-[#e8d5c4] bg-[#fdf8f5] px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#2c1a0e] focus:ring-2 focus:ring-[#2c1a0e]/10";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[#2c1a0e] mb-1.5">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
          placeholder="admin@ayeshagul.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-[#2c1a0e] mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
          placeholder="••••••••"
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-gray-600 select-none cursor-pointer">
        <input
          type="checkbox"
          name="remember"
          className="h-4 w-4 rounded border-[#e8d5c4] accent-[#2c1a0e]"
        />
        Remember me
      </label>

      {state.error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-red-600">{state.error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#2c1a0e] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#5c3317] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in...
          </span>
        ) : "Sign In"}
      </button>
    </form>
  );
}
