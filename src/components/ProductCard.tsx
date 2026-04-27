"use client";

import Link from "next/link";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  return (
    <div
      className={`group relative bg-[#1A1A1A] border border-[#2E2E2E] flex flex-col ${className}`}
    >
      <div className="aspect-[4/5] bg-[#0F0F0F] relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-4 left-4 font-technical-data text-[10px] bg-[#FF5722] text-black px-3 py-1.5">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-headline-md text-white mb-2 uppercase tracking-tight text-lg lg:text-xl">
            {product.name}
          </h2>
          <p className="font-technical-data text-zinc-500 text-sm lg:text-base mb-4 lg:mb-6">
            {product.specs}
          </p>
        </div>
        <div className="flex justify-between items-center border-t border-[#2E2E2E] pt-4 lg:pt-6">
          <span className="font-headline-md text-[#FF5722] text-xl lg:text-2xl">
            ${product.price}
          </span>
          <Link
            href={`/product/${product.id}`}
            className="font-label-caps text-[10px] lg:text-xs text-white hover:text-[#FF5722] flex items-center gap-2"
          >
            VIEW DETAILS
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}