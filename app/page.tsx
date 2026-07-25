"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const WHATSAPP_NUMBER = "+923212259591";

const collections = [
  {
    id: 1,
    name: "Ruby Velvet 2-Piece Suit",
    price: 4500,
    originalPrice: 6500,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    category: "2 Piece",
    description: "Elegant velvet suit with intricate embroidery work",
  },
  {
    id: 2,
    name: "Crimson Silk 3-Piece Suit",
    price: 7200,
    originalPrice: 9800,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
    category: "3 Piece",
    description: "Premium silk suit with dupatta and trousers",
  },
  {
    id: 3,
    name: "Rose Linen Cotton Suit",
    price: 3800,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1585487000160-d50e2216d68b?w=400&h=500&fit=crop",
    category: "Linen Cotton",
    description: "Breathable linen cotton perfect for summer",
  },
  {
    id: 4,
    name: "Burgundy Luxury Formal",
    price: 8500,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    category: "Luxury",
    description: "Hand-crafted luxury suit with stone work",
  },
  {
    id: 5,
    name: "Scarlet Chiffon 2-Piece",
    price: 5100,
    originalPrice: 7000,
    image: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=400&h=500&fit=crop",
    category: "2 Piece",
    description: "Flowing chiffon with modern print design",
  },
  {
    id: 6,
    name: "Maroon Embroidered 3-Piece",
    price: 6900,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
    category: "3 Piece",
    description: "Full embroidery suit with organza dupatta",
  },
  {
    id: 7,
    name: "Wine Premium Cotton",
    price: 3200,
    originalPrice: 4800,
    image: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=400&h=500&fit=crop",
    category: "Linen Cotton",
    description: "Soft premium cotton with digital print",
  },
  {
    id: 8,
    name: "Cerise Designer Suit",
    price: 9200,
    originalPrice: 13500,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop",
    category: "Luxury",
    description: "Exclusive designer collection with Swarovski",
  },
  {
    id: 9,
    name: "Blush Pink 2-Piece Lawn",
    price: 2800,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1502716119720-b23a1e3b8b17?w=400&h=500&fit=crop",
    category: "2 Piece",
    description: "Lightweight lawn for casual elegance",
  },
  {
    id: 10,
    name: "Cherry Blossom Luxury",
    price: 11500,
    originalPrice: 16000,
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=500&fit=crop",
    category: "Luxury",
    description: "Bridal luxury suit with heavy zardozi work",
  },
];

const categories = ["All", "2 Piece", "3 Piece"];

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "Collections", href: "#collections" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#hero"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Ayesha Gul
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 hover:after:w-full after:transition-all text-gray-700 hover:text-indigo-600"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              Order Now
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all active:scale-[0.98]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block text-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3.5 rounded-xl font-semibold mt-2 active:scale-[0.98] transition-transform"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-white overflow-hidden flex items-center justify-center">
      {/* Top-left flower cluster */}
      <svg className="absolute -top-6 -left-6 w-48 sm:w-60 md:w-80 opacity-70" viewBox="0 0 300 300" fill="none">
        <defs>
          <linearGradient id="fl1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#C084FC"/><stop offset="1" stopColor="#A855F7"/></linearGradient>
          <linearGradient id="fl2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#E9D5FF"/><stop offset="1" stopColor="#D8B4FE"/></linearGradient>
          <linearGradient id="fl3" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#C084FC"/><stop offset="1" stopColor="#9333EA"/></linearGradient>
        </defs>
        {/* Main flower */}
        <g transform="translate(80,100)">
          {[...Array(8)].map((_, i) => (
            <ellipse key={i} cx="0" cy="-32" rx="12" ry="28" fill="url(#fl1)" transform={`rotate(${i*45})`} />
          ))}
          <circle cx="0" cy="0" r="14" fill="url(#fl3)" />
          <circle cx="0" cy="0" r="6" fill="#F3E8FF" />
        </g>
        {/* Small flower */}
        <g transform="translate(190,50) scale(0.55)">
          {[...Array(6)].map((_, i) => (
            <ellipse key={i} cx="0" cy="-28" rx="10" ry="24" fill="url(#fl2)" transform={`rotate(${i*60})`} />
          ))}
          <circle cx="0" cy="0" r="10" fill="#D8B4FE" />
          <circle cx="0" cy="0" r="4" fill="#F3E8FF" />
        </g>
        {/* Leaves */}
        <path d="M50 180Q30 130 10 100Q35 120 50 180Z" fill="url(#fl1)" opacity="0.5" />
        <path d="M120 210Q100 160 80 130Q105 150 120 210Z" fill="url(#fl1)" opacity="0.4" />
        <path d="M220 40Q240 80 270 110Q245 80 220 40Z" fill="url(#fl2)" opacity="0.5" />
        {/* Stems */}
        <path d="M80 140Q70 160 50 180" stroke="#9333EA" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
        <path d="M120 140Q115 165 100 200" stroke="#A855F7" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
        {/* Small dots/buds */}
        <circle cx="45" cy="185" r="4" fill="#D8B4FE" opacity="0.7" />
        <circle cx="35" cy="175" r="3" fill="#E9D5FF" opacity="0.6" />
        <circle cx="230" cy="45" r="3" fill="#D8B4FE" opacity="0.6" />
      </svg>

      {/* Top-right flower cluster */}
      <svg className="absolute -top-4 -right-4 w-48 sm:w-60 md:w-80 opacity-70 scale-x-[-1]" viewBox="0 0 300 300" fill="none">
        <defs>
          <linearGradient id="fr1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#D8B4FE"/><stop offset="1" stopColor="#A855F7"/></linearGradient>
          <linearGradient id="fr2" x1="1" y1="0" x2="0" y2="1"><stop stopColor="#F3E8FF"/><stop offset="1" stopColor="#C084FC"/></linearGradient>
        </defs>
        <g transform="translate(220,90) scale(0.7)">
          {[...Array(8)].map((_, i) => (
            <ellipse key={i} cx="0" cy="-30" rx="11" ry="26" fill="url(#fr1)" transform={`rotate(${i*45})`} />
          ))}
          <circle cx="0" cy="0" r="12" fill="#9333EA" />
          <circle cx="0" cy="0" r="5" fill="#FAF5FF" />
        </g>
        <g transform="translate(100,200) scale(0.5)">
          {[...Array(5)].map((_, i) => (
            <ellipse key={i} cx="0" cy="-25" rx="9" ry="22" fill="url(#fr2)" transform={`rotate(${i*72})`} />
          ))}
          <circle cx="0" cy="0" r="8" fill="#D8B4FE" />
          <circle cx="0" cy="0" r="3" fill="#FAF5FF" />
        </g>
        <path d="M250 140Q265 100 280 60Q260 95 250 140Z" fill="url(#fr1)" opacity="0.45" />
        <path d="M170 230Q160 260 140 290Q165 265 170 230Z" fill="url(#fr1)" opacity="0.35" />
        <circle cx="145" cy="260" r="3" fill="#D8B4FE" opacity="0.6" />
        <circle cx="275" cy="55" r="3.5" fill="#E9D5FF" opacity="0.5" />
      </svg>

      {/* Bottom-left flower cluster */}
      <svg className="absolute -bottom-6 -left-6 w-48 sm:w-60 md:w-80 opacity-65" viewBox="0 0 300 300" fill="none">
        <defs>
          <linearGradient id="bl1" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#E9D5FF"/><stop offset="1" stopColor="#A855F7"/></linearGradient>
          <linearGradient id="bl2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#C084FC"/><stop offset="1" stopColor="#7C3AED"/></linearGradient>
        </defs>
        <g transform="translate(60,180) scale(0.65)">
          {[...Array(8)].map((_, i) => (
            <ellipse key={i} cx="0" cy="-32" rx="13" ry="28" fill="url(#bl1)" transform={`rotate(${i*45})`} />
          ))}
          <circle cx="0" cy="0" r="14" fill="url(#bl2)" />
          <circle cx="0" cy="0" r="6" fill="#FAF5FF" />
        </g>
        <g transform="translate(170,240) scale(0.5)">
          {[...Array(6)].map((_, i) => (
            <ellipse key={i} cx="0" cy="-26" rx="9" ry="22" fill="url(#bl2)" transform={`rotate(${i*60})`} />
          ))}
          <circle cx="0" cy="0" r="9" fill="#C084FC" />
          <circle cx="0" cy="0" r="3.5" fill="#FAF5FF" />
        </g>
        <path d="M55 150Q45 120 20 90Q55 115 55 150Z" fill="url(#bl1)" opacity="0.45" />
        <path d="M140 220Q130 240 100 270Q135 250 140 220Z" fill="url(#bl2)" opacity="0.35" />
        <circle cx="75" cy="100" r="3" fill="#D8B4FE" opacity="0.5" />
      </svg>

      {/* Bottom-right flower cluster */}
      <svg className="absolute -bottom-4 -right-4 w-48 sm:w-60 md:w-80 opacity-60" viewBox="0 0 300 300" fill="none">
        <defs>
          <linearGradient id="br1" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#D8B4FE"/><stop offset="1" stopColor="#9333EA"/></linearGradient>
          <linearGradient id="br2" x1="1" y1="1" x2="0" y2="0"><stop stopColor="#E9D5FF"/><stop offset="1" stopColor="#7C3AED"/></linearGradient>
        </defs>
        <g transform="translate(230,200) scale(0.6)">
          {[...Array(7)].map((_, i) => (
            <ellipse key={i} cx="0" cy="-30" rx="12" ry="27" fill="url(#br1)" transform={`rotate(${i*51.4})`} />
          ))}
          <circle cx="0" cy="0" r="12" fill="#6B21A8" />
          <circle cx="0" cy="0" r="5" fill="#F3E8FF" />
        </g>
        <g transform="translate(80,240) scale(0.45)">
          {[...Array(5)].map((_, i) => (
            <ellipse key={i} cx="0" cy="-24" rx="8" ry="20" fill="url(#br2)" transform={`rotate(${i*72})`} />
          ))}
          <circle cx="0" cy="0" r="8" fill="#A855F7" />
          <circle cx="0" cy="0" r="3" fill="#FAF5FF" />
        </g>
        <path d="M240 140Q250 100 270 60Q245 95 240 140Z" fill="url(#br1)" opacity="0.4" />
        <circle cx="100" cy="230" r="3" fill="#D8B4FE" opacity="0.5" />
        <circle cx="265" cy="70" r="2.5" fill="#E9D5FF" opacity="0.5" />
      </svg>

      {/* Small floating petals */}
      <svg className="absolute top-1/4 left-[10%] w-8 h-8 text-purple-200 opacity-40 animate-float" viewBox="0 0 40 40" fill="currentColor" style={{animationDelay: "0.3s"}}>
        <ellipse cx="20" cy="20" rx="8" ry="16" transform="rotate(30 20 20)" />
      </svg>
      <svg className="absolute top-[15%] right-[15%] w-6 h-6 text-purple-200 opacity-40 animate-float" viewBox="0 0 40 40" fill="currentColor" style={{animationDelay: "1.2s"}}>
        <ellipse cx="20" cy="20" rx="8" ry="14" transform="rotate(-20 20 20)" />
      </svg>
      <svg className="absolute bottom-1/4 left-[20%] w-6 h-6 text-purple-200 opacity-35 animate-float" viewBox="0 0 40 40" fill="currentColor" style={{animationDelay: "0.8s"}}>
        <ellipse cx="20" cy="20" rx="7" ry="13" transform="rotate(50 20 20)" />
      </svg>
      <svg className="absolute bottom-[20%] right-[12%] w-7 h-7 text-purple-200 opacity-35 animate-float" viewBox="0 0 40 40" fill="currentColor" style={{animationDelay: "1.8s"}}>
        <ellipse cx="20" cy="20" rx="8" ry="15" transform="rotate(-40 20 20)" />
      </svg>

      {/* Center Content */}
      <div className="relative z-10 text-center px-4">
        <span className="inline-block text-sm font-bold uppercase tracking-[0.3em] text-purple-500 mb-4">
          Welcome to
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-4">
          <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Ayesha Gul
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
          Premium 2-Piece & 3-Piece Women&apos;s Suits — Elegance Redefined
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#collections"
            className="px-8 py-3.5 rounded-full font-bold text-base bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 transition-all shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50 active:scale-95"
          >
            Explore Collection
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=Hi! I'm interested in your collections.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full font-bold text-base border-2 border-purple-200 text-purple-600 hover:bg-purple-50 transition-all active:scale-95"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: (typeof collections)[0] }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = useCallback(() => {
    const message = `Hi! I want to order:\n\n${product.name}\nPrice: Rs. ${product.price.toLocaleString()}\nCategory: ${product.category}\n\nPlease share details for payment.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }, [product]);

  return (
    <div className="card-lift group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-100">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            -{discount}%
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="btn-brand px-6 py-3 rounded-full font-bold text-sm shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1 block">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-3 line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="md:hidden btn-brand p-2.5 rounded-full"
            aria-label="Add to cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Collections() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useScrollReveal();

  const filtered =
    activeCategory === "All"
      ? collections.filter((c) => c.category === "2 Piece" || c.category === "3 Piece")
      : collections.filter((c) => c.category === activeCategory);

  return (
    <section id="collections" className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <div className="reveal text-center mb-10 md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-3 block">
            Our Collections
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-4 tracking-tight">
            Trending{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Suits
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Explore our premium collection of 2-piece and 3-piece suits crafted with love.
          </p>
        </div>

        <div className="reveal flex justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="reveal-stagger grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const sectionRef = useScrollReveal();

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Premium Fabric",
      desc: "Only the finest quality fabrics sourced from trusted mills",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Expert Tailoring",
      desc: "Precision cutting and stitching by skilled artisans",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Fast Delivery",
      desc: "Free delivery across Pakistan on orders above Rs. 5000",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Quality Promise",
      desc: "100% satisfaction guaranteed with easy returns",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <div className="reveal text-center mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 tracking-tight">
            The Ayesha Gul{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
        </div>

        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-white border border-indigo-100/50 hover:border-indigo-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-indigo-500/20">
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const sectionRef = useScrollReveal();

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <div className="reveal text-center mb-10 md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 mb-3 block">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4 tracking-tight">
            Contact Us
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Have questions? Reach out to us on WhatsApp for instant support.
          </p>
        </div>

        <div className="reveal flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=Hi! I have a question about your clothing collection.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-base hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us Now
          </a>
          <div className="flex items-center justify-center gap-3 bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/15 transition-all">
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

function Footer() {
  return (
    <footer className="bg-white pt-14 md:pt-20 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Ayesha Gul</span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-sm text-gray-500">
              Premium women&apos;s clothing brand offering luxury suits, 2-piece,
              3-piece, and linen cotton collections. We believe in quality,
              elegance, and affordability.
            </p>
            <div className="flex gap-2">
              {["Facebook", "Instagram", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 hover:text-white transition-all active:scale-95"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {["Home", "Collections", "About Us", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s/g, "")}`} className="text-gray-500 hover:text-indigo-600 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              {["2 Piece Suits", "3 Piece Suits", "Luxury Collection", "Linen Cotton"].map((c) => (
                <li key={c}>
                  <a href="#collections" className="text-gray-500 hover:text-indigo-600 transition-colors">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 text-center text-xs text-gray-400">
          <p>&copy; 2025 Ayesha Gul. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function PaymentMethods() {
  return (
    <section className="py-12 md:py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500 mb-2 block">
            Secure Payments
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            We Accept
          </h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {/* JazzCash */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 overflow-hidden p-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7f/JazzCash_logo.svg"
                alt="JazzCash"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                  t.parentElement!.innerHTML = '<div style="background:#ED1C24;width:100%;height:100%;border-radius:16px;display:flex;align-items:center;justify-content:center"><span style="color:white;font-weight:800;font-size:18px">JazzCash</span></div>';
                }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-600">JazzCash</span>
          </div>

          {/* EasyPaisa */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 overflow-hidden p-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Easypaisa_logo.svg/512px-Easypaisa_logo.svg.png"
                alt="EasyPaisa"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                  t.parentElement!.innerHTML = '<div style="background:#00B140;width:100%;height:100%;border-radius:16px;display:flex;align-items:center;justify-content:center"><span style="color:white;font-weight:800;font-size:15px">EasyPaisa</span></div>';
                }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-600">EasyPaisa</span>
          </div>

          {/* UBL Bank */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 overflow-hidden p-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/United_Bank_Limited_logo.svg/512px-United_Bank_Limited_logo.svg.png"
                alt="UBL Bank"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                  t.parentElement!.innerHTML = '<div style="background:#003B71;width:100%;height:100%;border-radius:16px;display:flex;align-items:center;justify-content:center"><span style="color:white;font-weight:800;font-size:16px">UBL</span></div>';
                }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-600">UBL Bank</span>
          </div>

          {/* Bank Transfer */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
              <svg viewBox="0 0 200 160" className="w-16 h-16">
                <rect x="20" y="20" width="160" height="120" rx="16" fill="#1E1B4B" />
                <rect x="30" y="35" width="140" height="22" rx="6" fill="white" opacity="0.15" />
                <rect x="40" y="80" width="72" height="18" rx="5" fill="white" opacity="0.2" />
                <rect x="40" y="104" width="56" height="18" rx="5" fill="white" opacity="0.2" />
                <circle cx="160" cy="108" r="24" fill="#7C3AED" />
                <path d="M152 108L158 114L168 104" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-600">Bank Transfer</span>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          100% Advance Payment — Your money is safe & secure with us
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Collections />
      <About />
      <Contact />
      <PaymentMethods />
      <Footer />
    </div>
  );
}
