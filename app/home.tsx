"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { useCart } from "./cart-context";

const WHATSAPP_NUMBER = "+923212259591";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Icons ── */
function IconHome() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function IconCart() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  );
}
function IconBag() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function IconHeart({ filled = false }: { filled?: boolean }) {
  return (
    <svg className="w-5 h-5" fill={filled ? "#2c1a0e" : "none"} stroke="#2c1a0e" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

/* ── Desktop Navbar ── */
function DesktopNavbar() {
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "Collections", href: "#collections" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e8d5c4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#2c1a0e] flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-[#2c1a0e]">Ayesha Gul</span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-8">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-gray-700 hover:text-[#2c1a0e] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="/my-orders" className="text-sm font-medium text-gray-700 hover:text-[#2c1a0e] transition-colors">
              My Orders
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand px-5 py-2 rounded-full text-sm font-semibold"
            >
              Order Now
            </a>
            <button
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-[#f5ede6] transition-colors text-[#2c1a0e]"
              aria-label="Cart"
            >
              <IconCart />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#2c1a0e] text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            {/* Mobile menu toggle for tablet */}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-full hover:bg-[#f5ede6] text-[#2c1a0e]">
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-[#e8d5c4] px-6 py-4 space-y-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-gray-700 hover:text-[#2c1a0e] font-medium">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Mobile Top Bar ── */
function MobileTopBar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e8d5c4]">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 text-[#2c1a0e]">
            <IconMenu />
          </button>
          <a href="#hero" className="text-lg font-bold text-[#2c1a0e]">Ayesha Gul</a>
          <button onClick={openCart} className="relative p-1.5 text-[#2c1a0e]" aria-label="Cart">
            <IconCart />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2c1a0e] text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Mobile slide menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 h-14 border-b border-[#e8d5c4]">
              <span className="font-bold text-[#2c1a0e]">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-[#2c1a0e]"><IconClose /></button>
            </div>
            <div className="p-4 space-y-1">
              {[
                { label: "Home", href: "#hero" },
                { label: "Collections", href: "#collections" },
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
                { label: "My Orders", href: "/my-orders" },
              ].map((l) => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  className="block py-3 px-3 rounded-lg text-gray-700 hover:bg-[#f5ede6] hover:text-[#2c1a0e] font-medium transition-colors">
                  {l.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block mt-3 text-center bg-[#2c1a0e] text-white py-3 rounded-xl font-semibold"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Hero Banner ── */
function Hero() {
  return (
    <section id="hero" className="pt-14 md:pt-18">
      {/* Mobile Hero */}
      <div className="md:hidden mx-4 mt-4 rounded-2xl overflow-hidden bg-[#2c1a0e] relative min-h-[180px] flex items-center">
        <div className="relative z-10 p-6 max-w-[55%]">
          <p className="text-white/80 text-xs font-medium mb-1">New Arrivals</p>
          <h2 className="text-white text-xl font-bold leading-tight mb-3">
            Flat 20% off on your first order
          </h2>
          <a
            href="#collections"
            className="inline-block bg-white text-[#2c1a0e] text-xs font-bold px-5 py-2 rounded-full"
          >
            Shop Now
          </a>
        </div>
        {/* Decorative circles */}
        <div className="absolute right-0 top-0 bottom-0 w-[50%] flex items-center justify-center overflow-hidden">
          <div className="absolute w-40 h-40 rounded-full bg-[#5c3317]/40 -right-8 -top-8" />
          <div className="absolute w-28 h-28 rounded-full bg-[#a0522d]/30 right-8 bottom-4" />
          <div className="relative z-10 text-center">
            <div className="text-6xl">👗</div>
            <p className="text-white/60 text-xs mt-1">Premium Suits</p>
          </div>
        </div>
      </div>

      {/* Desktop Hero */}
      <div className="hidden md:block bg-[#f5ede6] border-b border-[#e8d5c4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex items-center gap-12">
          <div className="flex-1">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#a0522d] mb-4">
              New Collection 2025
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#2c1a0e] leading-tight mb-5">
              Premium<br />
              <span className="text-[#5c3317]">Women&apos;s Suits</span>
            </h1>
            <p className="text-[#5c3317]/70 text-lg mb-8 max-w-md">
              Elegant 2-Piece &amp; 3-Piece suits crafted with the finest fabrics. Free delivery across Pakistan.
            </p>
            <div className="flex gap-4">
              <a href="#collections" className="btn-brand px-8 py-3.5 rounded-full font-bold text-base">
                Explore Collection
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=Hi! I'm interested in your collections.`}
                target="_blank" rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-bold text-base border-2 border-[#2c1a0e] text-[#2c1a0e] hover:bg-[#2c1a0e] hover:text-white transition-all"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-[#e8d5c4]" />
              <div className="absolute inset-8 rounded-full bg-[#d4b896]" />
              <div className="absolute inset-0 flex items-center justify-center text-[120px] lg:text-[150px]">
                👗
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators mobile */}
      <div className="md:hidden flex justify-center gap-2 mt-3 mb-1">
        <span className="w-2 h-2 rounded-full bg-[#2c1a0e]" />
        <span className="w-2 h-2 rounded-full bg-[#e8d5c4]" />
        <span className="w-2 h-2 rounded-full bg-[#e8d5c4]" />
      </div>
    </section>
  );
}

/* ── Categories Bar ── */
function CategoriesBar({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  const cats = [
    { label: "All", icon: "✨" },
    { label: "2 Piece", icon: "👘" },
    { label: "3 Piece", icon: "👗" },
  ];

  return (
    <div className="px-4 md:px-0 mt-5 mb-2">
      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-[#2c1a0e]">Categories</h2>
        <a href="#collections" className="text-sm text-[#5c3317] font-medium">View all</a>
      </div>
      <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar">
        {cats.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
              activeCategory === cat.label
                ? "bg-[#2c1a0e] text-white shadow-md"
                : "bg-[#f5ede6] text-[#2c1a0e] hover:bg-[#e8d5c4]"
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [wished, setWished] = useState(false);
  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const handleAddToCart = useCallback(() => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    openCart();
  }, [addItem, openCart, product]);

  return (
    <div className="card-lift bg-white rounded-2xl overflow-hidden border border-[#e8d5c4] group">
      <div className="relative aspect-square bg-[#f5ede6] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">👗</div>
        )}
        {discount > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-[#2c1a0e] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          aria-label="Wishlist"
        >
          <IconHeart filled={wished} />
        </button>
        {/* Desktop hover overlay */}
        <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-5">
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="btn-brand px-6 py-2.5 rounded-full font-bold text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-2.5 md:p-3">
        <span className="text-[10px] font-600 text-[#a0522d] uppercase tracking-wider">{product.category}</span>
        <h3 className="font-semibold text-[#2c1a0e] text-xs md:text-sm mt-0.5 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#2c1a0e]">Rs. {product.price.toLocaleString()}</span>
            {discount > 0 && (
              <span className="text-[10px] text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="md:hidden w-7 h-7 rounded-full bg-[#2c1a0e] flex items-center justify-center text-white active:scale-90 transition-transform"
            aria-label="Add to cart"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Collections Section ── */
function Collections({ products, activeCategory, setActiveCategory }: {
  products: Product[];
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  const sectionRef = useScrollReveal();
  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <section id="collections" className="pb-24 md:pb-16">
      {/* Mobile categories inside section */}
      <div className="md:hidden">
        <CategoriesBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>

      {/* Desktop heading + filter */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#a0522d]">Our Collections</span>
            <h2 className="text-4xl font-bold text-[#2c1a0e] mt-1">
              Trending <span className="text-[#5c3317]">Suits</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {["All", "2 Piece", "3 Piece"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#2c1a0e] text-white"
                    : "bg-[#f5ede6] text-[#2c1a0e] hover:bg-[#e8d5c4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8" ref={sectionRef}>
        {/* Mobile section title */}
        <div className="md:hidden mt-5 mb-4">
          <h2 className="text-lg font-bold text-[#2c1a0e]">
            {activeCategory === "All" ? "All Products" : activeCategory + " Suits"}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="reveal text-center py-20 text-gray-400">No products available yet.</div>
        ) : (
          <div className="reveal-stagger grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  const sectionRef = useScrollReveal();
  const features = [
    { icon: "🧵", title: "Premium Fabric", desc: "Finest quality fabrics from trusted mills" },
    { icon: "✂️", title: "Expert Tailoring", desc: "Precision stitching by skilled artisans" },
    { icon: "🚚", title: "Fast Delivery", desc: "Free delivery across Pakistan above Rs. 5000" },
    { icon: "💯", title: "Quality Promise", desc: "100% satisfaction with easy returns" },
  ];

  return (
    <section id="about" className="py-14 md:py-20 bg-[#f5ede6]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8" ref={sectionRef}>
        <div className="reveal text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a0522d]">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c1a0e] mt-2">
            The Ayesha Gul <span className="text-[#5c3317]">Difference</span>
          </h2>
        </div>
        <div className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 md:p-7 text-center border border-[#e8d5c4] hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-[#2c1a0e] mb-1 text-sm md:text-base">{f.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  const sectionRef = useScrollReveal();
  return (
    <section id="contact" className="py-14 md:py-20 bg-[#2c1a0e]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center" ref={sectionRef}>
        <div className="reveal mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4b896]">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">Contact Us</h2>
          <p className="text-white/60 text-sm md:text-base max-w-md mx-auto">
            Have questions? Reach out on WhatsApp for instant support.
          </p>
        </div>
        <div className="reveal flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=Hi! I have a question about your clothing.`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-3.5 rounded-2xl font-bold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
          <div className="flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-2xl font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +92 321 2259591
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Payment Methods ── */
function PaymentMethods() {
  return (
    <section className="py-10 md:py-14 bg-white border-t border-[#e8d5c4]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a0522d] mb-2 block">Secure Payments</span>
        <h3 className="text-xl font-bold text-[#2c1a0e] mb-7">We Accept</h3>
        <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10">
          {[
            { src: "/JazzCash_logo_(2025).png", label: "JazzCash" },
            { src: "/easypaisa.png", label: "EasyPaisa" },
            { src: "/ubl.jpg", label: "UBL Bank" },
          ].map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white shadow border border-[#e8d5c4] flex items-center justify-center p-2 hover:-translate-y-1 transition-transform">
                <img src={p.src} alt={p.label} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold text-gray-600">{p.label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#2c1a0e] flex items-center justify-center hover:-translate-y-1 transition-transform">
              <span className="text-white text-3xl">🏦</span>
            </div>
            <span className="text-xs font-semibold text-gray-600">Bank Transfer</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-5">100% Advance Payment — Your money is safe &amp; secure</p>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-[#f5ede6] border-t border-[#e8d5c4] pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#2c1a0e] flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-lg font-bold text-[#2c1a0e]">Ayesha Gul</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Premium women&apos;s clothing brand offering luxury 2-piece &amp; 3-piece suits. Quality, elegance, and affordability.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#2c1a0e] mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "Collections", "About Us", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s/g, "")}`} className="text-gray-500 hover:text-[#2c1a0e] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#2c1a0e] mb-3 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-sm">
              {["2 Piece Suits", "3 Piece Suits"].map((c) => (
                <li key={c}>
                  <a href="#collections" className="text-gray-500 hover:text-[#2c1a0e] transition-colors">{c}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#e8d5c4] pt-5 text-center text-xs text-gray-400">
          &copy; 2025 Ayesha Gul. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ── Cart Drawer ── */
function CartDrawer() {
  const router = useRouter();
  const { items, total, isOpen, closeCart, removeItem, updateQty } = useCart();

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[60] bg-black/50" onClick={closeCart} />}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#e8d5c4] px-5 py-4">
            <h2 className="text-lg font-bold text-[#2c1a0e]">Your Cart</h2>
            <button onClick={closeCart} className="p-2 rounded-lg text-gray-500 hover:bg-[#f5ede6]" aria-label="Close">
              <IconClose />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-gray-400 gap-3">
                <IconCart />
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3 border-b border-[#f5ede6] pb-4">
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f5ede6]">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl">👗</div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-[#2c1a0e] line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.category}</p>
                        </div>
                        <button onClick={() => removeItem(item.productId)} className="text-gray-400 hover:text-red-500" aria-label="Remove">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="h-7 w-7 rounded-lg border border-[#e8d5c4] text-[#2c1a0e] hover:bg-[#f5ede6] font-bold">−</button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="h-7 w-7 rounded-lg border border-[#e8d5c4] text-[#2c1a0e] hover:bg-[#f5ede6] font-bold">+</button>
                        </div>
                        <span className="text-sm font-bold text-[#2c1a0e]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-[#e8d5c4] px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-bold text-[#2c1a0e]">Rs. {total.toLocaleString()}</span>
              </div>
              <button
                onClick={() => { closeCart(); router.push("/checkout"); }}
                className="btn-brand w-full rounded-xl py-3 text-sm font-semibold"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* ── Mobile Bottom Navigation ── */
function MobileBottomNav() {
  const { count, openCart } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2c1a0e] bottom-nav-safe">
      <div className="flex items-center justify-around py-3">
        <a href="#hero" className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
          <IconHome />
          <span className="text-[10px] font-medium">Home</span>
        </a>
        <button onClick={openCart} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors relative">
          <IconCart />
          {count > 0 && (
            <span className="absolute -top-1 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#2c1a0e] text-[9px] font-bold">
              {count}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </button>
        <a href="#collections" className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
          <IconBag />
          <span className="text-[10px] font-medium">Shop</span>
        </a>
        <a href="/my-orders" className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
          <IconUser />
          <span className="text-[10px] font-medium">Orders</span>
        </a>
      </div>
    </nav>
  );
}

/* ── Main Export ── */
export default function Home({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-white">
      <DesktopNavbar />
      <MobileTopBar />
      <main>
        <Hero />
        <Collections
          products={products}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <About />
        <Contact />
        <PaymentMethods />
        <Footer />
      </main>
      <CartDrawer />
      <MobileBottomNav />
    </div>
  );
}
