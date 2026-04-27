"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="pt-20">
        <main className="pt-24 lg:pt-32 pb-24 lg:pb-40 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center py-20">
            <h1 className="font-display-xl text-white text-3xl mb-4">YOUR CART IS EMPTY</h1>
            <p className="font-body-md text-zinc-500 mb-8">
              ADD SOME PRODUCTS TO GET STARTED
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#FF5722] text-black px-8 py-4 font-label-caps text-sm tracking-wider hover:bg-[#FF7043]"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <main className="pt-24 lg:pt-32 pb-24 lg:pb-40 max-w-[1440px] mx-auto px-6 lg:px-12">
        <h1 className="font-display-xl text-white text-3xl lg:text-4xl mb-8 lg:mb-12">
          SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="bg-[#1A1A1A] border border-[#2E2E2E]">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#2E2E2E] font-label-caps text-xs text-zinc-500">
                <div className="col-span-5">PRODUCT</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-3 text-center">QUANTITY</div>
                <div className="col-span-2 text-right">TOTAL</div>
              </div>

              {items.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-[#2E2E2E] items-center"
                >
                  <div className="col-span-5 flex gap-4">
                    <div className="w-20 h-20 bg-[#0F0F0F] border border-[#2E2E2E] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-technical-data text-white text-sm hover:text-[#FF5722]"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="block mt-2 text-xs text-zinc-500 hover:text-red-500 font-label-caps"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-technical-data text-white text-sm">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="col-span-3 flex justify-center">
                    <div className="flex items-center border border-[#2E2E2E]">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-2 text-white hover:text-[#FF5722]"
                      >
                        −
                      </button>
                      <span className="px-3 py-2 font-technical-data text-white text-sm min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-2 text-white hover:text-[#FF5722]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-technical-data text-white text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Link
                href="/shop"
                className="border border-[#2E2E2E] text-white px-6 py-3 font-label-caps text-xs tracking-wider hover:bg-[#2E2E2E]"
              >
                CONTINUE SHOPPING
              </Link>
              <button
                onClick={clearCart}
                className="text-zinc-500 hover:text-red-500 font-label-caps text-xs"
              >
                CLEAR CART
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 lg:p-8">
              <h2 className="font-label-caps text-white text-xs mb-6 pb-4 border-b border-[#2E2E2E]">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-xs text-zinc-500 font-label-caps">SUBTOTAL</span>
                  <span className="font-technical-data text-white text-sm">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-zinc-500 font-label-caps">SHIPPING</span>
                  <span className="font-technical-data text-white text-sm">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-zinc-500 font-label-caps">TAX (EST.)</span>
                  <span className="font-technical-data text-white text-sm">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#2E2E2E]">
                  <span className="font-label-caps text-white">TOTAL</span>
                  <span className="text-xl font-bold text-[#FF5722]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href={`/checkout?cart=true`}
                className="block w-full bg-[#FF5722] text-black py-4 text-center font-label-caps text-sm tracking-wider hover:bg-[#FF7043]"
              >
                PROCEED TO CHECKOUT
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-zinc-500">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
                <span className="text-[10px] font-label-caps">SECURE CHECKOUT</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}