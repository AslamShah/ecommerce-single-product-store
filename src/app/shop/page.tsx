"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images?: string[];
  image?: string;
  category?: string;
  features?: string[];
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setLoading(false);
    }, 8000);

    fetch('/api/proxy?path=products', { signal: controller.signal })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Response not ok');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="pt-20">
        <main className="pt-24 lg:pt-32 pb-24 lg:pb-40 max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-center min-h-[50vh]">
          <div className="text-[#FF5722] font-technical-data">LOADING...</div>
        </main>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="pt-20">
        <main className="pt-24 lg:pt-32 pb-24 lg:pb-40 max-w-[1440px] mx-auto px-6 lg:px-12">
          <header className="mb-12 lg:mb-16 text-center lg:text-left lg:border-l border-[#2E2E2E] lg:pl-8">
            <h1 className="font-display-xl uppercase text-white mb-4 text-3xl lg:text-5xl">
              THE APEX SERIES
            </h1>
            <p className="font-body-lg text-zinc-500 max-w-2xl text-base lg:text-lg">
              Products currently unavailable. Please check back later.
            </p>
          </header>
        </main>
      </div>
    );
  }

  const product = products[0];

  return (
    <div className="pt-20">
      <main className="pt-24 lg:pt-32 pb-24 lg:pb-40 max-w-[1440px] mx-auto px-6 lg:px-12">
        <header className="mb-12 lg:mb-16 text-center lg:text-left lg:border-l border-[#2E2E2E] lg:pl-8">
          <h1 className="font-display-xl uppercase text-white mb-4 text-3xl lg:text-5xl">
            THE APEX SERIES 01
          </h1>
          <p className="font-body-lg text-zinc-500 max-w-2xl text-base lg:text-lg">
            Precision engineering meets professional performance. The only tool you need for surgical accuracy.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative group">
            <div className="bg-[#1A1A1A] technical-border aspect-[4/5] overflow-hidden">
              <img
                src={product.images?.[0] || product.image}
                alt={product.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 font-technical-data text-[10px] bg-[#FF5722] text-black px-3 py-1.5">
                {product.category?.toUpperCase() || "CORE SERIES"}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between py-4 lg:py-8">
            <div>
              <span className="font-label-caps text-[#FF5722] mb-4 block tracking-[0.2em] text-xs">
                PROFESSIONAL HAIR CUTTER
              </span>
              <h2 className="font-display-xl text-white mb-4 text-3xl lg:text-5xl leading-tight">
                {product.name?.toUpperCase()}
              </h2>
              <p className="font-body-lg text-secondary mb-8 text-base lg:text-lg">
                {product.description?.slice(0, 100)}...
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="technical-border p-6 bg-[#1A1A1A]">
                  <p className="font-label-caps text-zinc-500 mb-2 text-[10px]">OUTPUT</p>
                  <p className="font-headline-md text-white text-xl lg:text-2xl">9,000 RPM</p>
                </div>
                <div className="technical-border p-6 bg-[#1A1A1A]">
                  <p className="font-label-caps text-zinc-500 mb-2 text-[10px]">RUNTIME</p>
                  <p className="font-headline-md text-white text-xl lg:text-2xl">300 MIN</p>
                </div>
              </div>

              <div className="flex items-end gap-6 mb-8">
                <span className="font-display-xl text-[#FF5722] text-4xl lg:text-5xl">
                  ${product.price}
                </span>
                {product.comparePrice && (
                  <span className="font-label-caps text-zinc-500 line-through mb-2 text-lg">
                    ${product.comparePrice}
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-10 text-sm lg:text-base">
                <p className="font-body-md text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {(product.features || []).slice(0, 4).map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#FF5722]" />
                    <span className="font-technical-data text-zinc-400 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Link href={`/product/${product._id || product.id}`} className="block">
                <button className="w-full bg-[#FF5722] text-black py-5 font-label-caps text-sm hover:bg-[#ff6a3d] transition-all tracking-wider">
                  VIEW FULL DETAILS
                </button>
              </Link>
              <div className="flex justify-between font-label-caps text-[10px] text-secondary">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  IN STOCK
                </span>
                <span>FREE EXPRESS DELIVERY</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 lg:mt-section-gap border-t border-[#2E2E2E] pt-12 lg:pt-16">
          <h3 className="font-headline-md text-white mb-8 text-xl lg:text-2xl">WHAT&apos;S INCLUDED</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Professional Charging Dock", icon: "electrical_services" },
              { name: "8 Magnetic Guards", icon: "straighten" },
              { name: "Precision Blade Kit", icon: "precision_manufacturing" },
            ].map((item) => (
              <div key={item.name} className="technical-border bg-[#1A1A1A] p-6 flex items-center gap-4">
                <span className="material-symbols-outlined text-[#FF5722] text-2xl">{item.icon}</span>
                <span className="font-technical-data text-white text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="bg-[#1A1A1A] py-16 lg:py-32 border-y border-[#2E2E2E]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <span className="font-label-caps text-[#FF5722] mb-6 block text-xs">ENGINEERING EXCELLENCE</span>
          <h2 className="font-headline-lg text-white uppercase mb-12 text-2xl lg:text-4xl">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              { label: "POWER SYSTEM", title: "Brushless DC Motor", desc: "Constant torque delivery at any battery level" },
              { label: "BLADE", title: "DLC Coated Titanium", desc: "Self-sharpening, stays 15% cooler" },
              { label: "CONSTRUCTION", title: "Carbon Fiber Housing", desc: "40% lighter, increased rigidity" },
              { label: "BATTERY", title: "3000mAh Li-Ion", desc: "4.5 hours continuous runtime" },
              { label: "WEIGHT", title: "340g Balanced", desc: "Center-weighted for control" },
              { label: "WARRANTY", title: "3 Year Professional", desc: "48-hour repair guarantee" },
            ].map((spec, index) => (
              <div key={index} className="border-l border-[#2E2E2E] pl-6">
                <span className="font-label-caps text-[#FF5722] block mb-2 text-[10px]">{spec.label}</span>
                <p className="font-technical-data text-white mb-2 text-base">{spec.title}</p>
                <p className="font-technical-data text-zinc-500 text-sm">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}