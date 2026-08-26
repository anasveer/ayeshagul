"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "./actions";

const links = [
  {
    href: "/super-admin",
    label: "Dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/super-admin/add-product",
    label: "Add Product",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/super-admin/inventory",
    label: "Inventory",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    href: "/super-admin/orders",
    label: "Orders",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 border border-white/20">
        <span className="text-lg font-bold text-white">A</span>
      </div>
      <div className="leading-tight">
        <p className="font-bold text-white text-sm">Ayesha Gul</p>
        <p className="text-xs text-white/50">Super Admin</p>
      </div>
    </div>
  );
}

function LogoutBtn({ mobile = false }: { mobile?: boolean }) {
  return (
    <form action={logout}>
      <button
        type="submit"
        aria-label="Log out"
        className={
          mobile
            ? "flex h-9 w-9 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 transition"
            : "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
        }
      >
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        {!mobile && <span>Log out</span>}
      </button>
    </form>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/super-admin"
      ? pathname === "/super-admin"
      : pathname.startsWith(href);
  }

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#2c1a0e] lg:flex">
        {/* Brand */}
        <div className="border-b border-white/10 px-6 py-6">
          <Brand />
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-white/15 text-white border border-white/10"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <LogoutBtn />
        </div>
      </aside>

      {/* ── Mobile Top Header ── */}
      <header className="fixed inset-x-0 top-0 z-40 bg-[#2c1a0e] lg:hidden">
        {/* Top row */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <Brand />
          <LogoutBtn mobile />
        </div>
        {/* Nav pills */}
        <nav className="flex gap-1.5 overflow-x-auto px-3 py-2.5 no-scrollbar">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                isActive(link.href)
                  ? "bg-white text-[#2c1a0e]"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
