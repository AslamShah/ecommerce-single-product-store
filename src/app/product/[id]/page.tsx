'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '@/lib/api';
import { getProductById } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

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
    sku?: string;
  }

  const getStaticProduct = (id: string): Product | null => {
    const staticProduct = getProductById(id) || getProductById("apex-01");
    if (staticProduct) {
      return {
        id: staticProduct.id,
        name: staticProduct.name,
        slug: staticProduct.id,
        description: "Professional-grade hair clipper designed for precision cutting. Features ultra-sharp blades, powerful motor, and ergonomic design for comfortable handling.",
        price: staticProduct.price,
        comparePrice: 129.99,
        images: [staticProduct.image],
        category: "Clippers",
        features: [
          "Ultra-sharp stainless steel blades",
          "Powerful 9,000 RPM brushless motor",
          "Ergonomic lightweight carbon fiber design",
          "Adjustable cutting lengths (0.5mm - 25mm)",
          "Cordless with 300-minute battery life",
          "USB fast charging",
          "Silent operation technology"
        ],
        sku: "APX-01-CLP",
      };
    }
    return null;
  };

  const loadProduct = useCallback(async () => {
    const id = params.id as string;
    setLoading(true);
    try {
      let data;
      if (id.includes("-")) {
        data = await productsApi.getBySlug(id);
      } else {
        data = await productsApi.getById(id);
      }
      if (data && data.name) {
        setProduct(data);
      } else {
        setProduct(getStaticProduct(id));
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.warn("API error, using static fallback:", error?.message);
      const fallback = getStaticProduct(id);
      if (fallback) {
        setProduct(fallback);
      } else {
        setError("Product not found");
      }
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      loadProduct();
    }
  }, [params.id, loadProduct]);

  if (loading) {
    return (
      <div className="pt-20">
        <main className="pt-24 lg:pt-32 pb-40 max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-center min-h-[50vh]">
          <div className="text-[#FF5722] font-technical-data">LOADING...</div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-20">
        <main className="pt-24 lg:pt-32 pb-40 max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-white font-technical-data mb-4">PRODUCT NOT FOUND</p>
            <Link href="/shop" className="text-[#FF5722] hover:underline">
              ← BACK TO SHOP
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="pt-20">
      <main className="mt-20 pb-20">
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 lg:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 relative group">
            <div className="bg-[#1A1A1A] technical-border aspect-[4/5] overflow-hidden relative">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/4 right-1/4 flex items-center gap-4 hidden lg:flex">
                <div className="w-4 h-4 rounded-full bg-[#FF5722] animate-pulse" />
                <div className="technical-border bg-[#0F0F0F]/80 p-3 backdrop-blur-sm">
                  <p className="font-label-caps text-white text-[10px] lg:text-xs">
                    DLC COATED TITANIUM BLADES
                  </p>
                </div>
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 border-2 ${
                      selectedImage === i
                        ? "border-[#FF5722]"
                        : "border-transparent opacity-50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-[#FF5722] mb-4 block tracking-[0.2em] text-xs">
                {product.category?.toUpperCase() || "PROFESSIONAL SERIES"}
              </span>
              <h1 className="font-display-xl text-white mb-4 text-3xl lg:text-5xl">
                {product.name.toUpperCase()}
              </h1>
              <p className="font-body-lg text-secondary mb-8 text-base lg:text-lg">
                {product.description}
              </p>

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
              <button 
                onClick={() => {
                  if (product) {
                    addItem({
                      _id: product._id || product.id || '',
                      name: product.name,
                      price: product.price,
                      image: product.images?.[0] || product.image || '',
                      slug: product.slug,
                    });
                    setAddedToCart(true);
                    setTimeout(() => setAddedToCart(false), 2000);
                  }
                }}
                className="w-full bg-[#FF5722] text-black py-5 font-label-caps text-sm hover:bg-[#ff6a3d] transition-all tracking-wider"
              >
                {addedToCart ? "ADDED TO CART!" : "ADD TO CART"}
              </button>
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

        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-20 lg:mt-section-gap border-t border-[#2E2E2E] pt-12 lg:pt-16">
          <h3 className="font-headline-md text-white mb-8 text-xl lg:text-2xl">SPECIFICATIONS</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { label: "MOTOR", title: "9,000 RPM Brushless", desc: "Constant torque delivery" },
              { label: "BLADE", title: "DLC Titanium", desc: "Self-sharpening, stays cooler" },
              { label: "BATTERY", title: "3000mAh Li-Ion", desc: "4.5 hours runtime" },
              { label: "WEIGHT", title: "340g", desc: "Center-weighted" },
              { label: "CHARGING", title: "USB-C Fast", desc: "90 min full charge" },
              { label: "WARRANTY", title: "3 Year", desc: "Professional coverage" },
            ].map((spec, index) => (
              <div key={index} className="border-l border-[#2E2E2E] pl-6">
                <span className="font-label-caps text-[#FF5722] block mb-2 text-[10px]">{spec.label}</span>
                <p className="font-technical-data text-white mb-2 text-base">{spec.title}</p>
                <p className="font-technical-data text-zinc-500 text-sm">{spec.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}