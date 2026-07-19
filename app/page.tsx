"use client";

import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "+923212259591";

const heroImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=600&fit=crop",
];

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

const categories = ["All", "2 Piece", "3 Piece", "Luxury", "Linen Cotton"];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "Collections", href: "#collections" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Ayesha Gul
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-red-600 ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-600 to-red-800 text-white px-5 py-2 rounded-full text-sm font-semibold hover:from-red-700 hover:to-red-900 transition-all shadow-md hover:shadow-lg"
            >
              Order Now
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? "text-gray-800" : "text-white"}`}
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

      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-800 hover:text-red-600 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-full font-semibold"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden">
      {heroImages.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-[3500ms] ease-in-out ${
            i === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={src}
            alt={`Banner ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl" key={current}>
            <span className="inline-block px-4 py-1 bg-red-600/90 text-white text-sm font-semibold rounded-full mb-4">
              New Collection 2025
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              Premium{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Women
              </span>{" "}
              Clothing
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
              Discover luxury suits, 2-piece & 3-piece collections, linen cotton
              and exclusive designer wear at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#collections"
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-900 transition-all shadow-xl hover:shadow-2xl text-center"
              >
                Shop Now
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=Hi! I'm interested in your collections.`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-700 transition-all text-center"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-red-500 w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Free Delivery on Orders Above Rs. 5000",
    "New Arrivals Every Week",
    "Premium Quality Fabric",
    "Cash on Delivery Available",
    "Easy Returns within 7 Days",
    "Wholesale Prices",
  ];

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 py-3 overflow-hidden">
      <div className="marquee-track whitespace-nowrap flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-white text-sm font-medium">
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof collections)[0] }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    const message = `Hi! I want to order:\n\n📦 *${product.name}*\n💰 Price: Rs. ${product.price.toLocaleString()}\n🏷️ Category: ${product.category}\n\nPlease share details for payment.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{discount}%
          </span>
          <span className="bg-white/90 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-full font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:from-red-700 hover:to-red-900 shadow-lg"
        >
          Add to Cart
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-red-600">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="md:hidden bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
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

  const filtered =
    activeCategory === "All"
      ? collections
      : collections.filter((c) => c.category === activeCategory);

  return (
    <section id="collections" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
            Our Collections
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Trending{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Suits
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our premium collection of 2-piece, 3-piece, luxury and linen
            cotton suits crafted with love.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const features = [
    {
      icon: "🧵",
      title: "Premium Fabric",
      desc: "Only the finest quality fabrics sourced from trusted mills",
    },
    {
      icon: "✂️",
      title: "Expert Tailoring",
      desc: "Precision cutting and stitching by skilled artisans",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      desc: "Free delivery across Pakistan on orders above Rs. 5000",
    },
    {
      icon: "💯",
      title: "Quality Promise",
      desc: "100% satisfaction guaranteed with easy returns",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
            The Ayesha Gul{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have questions? Reach out to us on WhatsApp for instant support.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=Hi! I have a question about your clothing collection.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us Now
          </a>
          <div className="flex items-center justify-center gap-3 bg-white/10 text-white px-8 py-5 rounded-2xl font-bold text-lg border border-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white">Ayesha Gul</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Premium women&apos;s clothing brand offering luxury suits, 2-piece,
              3-piece, and linen cotton collections. We believe in quality,
              elegance, and affordability.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-red-600 hover:text-white transition-all"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "Collections", "About Us", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ", "")}`} className="hover:text-red-400 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {["2 Piece Suits", "3 Piece Suits", "Luxury Collection", "Linen Cotton"].map((c) => (
                <li key={c}>
                  <a href="#collections" className="hover:text-red-400 transition-colors">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2025 Ayesha Gul. All rights reserved. Made with ❤️ in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <Collections />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
