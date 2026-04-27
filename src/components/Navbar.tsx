"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CartIcon from "@/components/cart-icon";

const navLinks = [
  { href: "/#specs", label: "SPECS" },
  { href: "/#features", label: "FEATURES" },
  { href: "/#testimonials", label: "TESTIMONIALS" },
  { href: "/#purchase", label: "PURCHASE" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0F0F0F]/90 backdrop-blur-md border-b border-[#2E2E2E]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl lg:text-2xl font-black tracking-tighter text-white uppercase"
          >
            APEX PRECISION
          </Link>

          <div className="hidden lg:flex gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-label-caps text-white/80 hover:text-[#FF5722] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="text-label-caps text-[#FF5722] hover:text-white transition-colors duration-200"
            >
              SHOP
            </Link>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <CartIcon />
            <button
              className="lg:hidden text-white hover:text-[#FF5722] transition-colors"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 lg:w-80 bg-[#0F0F0F] border-l border-[#2E2E2E] transform transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                MENU
              </span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-white hover:text-[#FF5722] transition-colors"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-label-caps text-white/80 hover:text-[#FF5722] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-[#2E2E2E] pt-6">
                <a
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="text-label-caps text-[#FF5722] hover:text-white transition-colors duration-200"
                >
                  SHOP
                </a>
              </div>
            </div>
            <div className="mt-auto pt-12 border-t border-[#2E2E2E]">
              <p className="text-technical-data text-zinc-500 text-[10px]">
                ENGINEERED FOR PROFESSIONAL PERFORMANCE
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}