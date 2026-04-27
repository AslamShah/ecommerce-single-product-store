"use client";

import { useState, FormEvent } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0F0F0F] w-full border-t border-[#2E2E2E]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="text-white font-black text-lg lg:text-xl mb-6 lg:mb-8 uppercase">
            APEX PRECISION
          </div>
          <p className="font-technical-data text-zinc-500 text-[10px] lg:text-xs max-w-xs leading-relaxed">
            Engineered in Stuttgart. Designed for the global elite of grooming
            professionals.
          </p>
        </div>

        <div className="lg:col-span-2">
          <span className="font-label-caps text-[#FF5722] mb-4 lg:mb-6 block">
            SYSTEM
          </span>
          <ul className="space-y-3">
            {["CLIPPERS", "TRIMMERS", "BLADES", "ACCESSORIES"].map((item) => (
              <li key={item}>
                <a
                  className="font-label-caps text-[10px] lg:text-[10px] text-zinc-500 hover:text-white transition-all"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <span className="font-label-caps text-[#FF5722] mb-4 lg:mb-6 block">
            SUPPORT
          </span>
          <ul className="space-y-3">
            {["WARRANTY", "REPAIR LAB", "MANUALS", "CONTACT"].map((item) => (
              <li key={item}>
                <a
                  className="font-label-caps text-[10px] lg:text-[10px] text-zinc-500 hover:text-white transition-all"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <span className="font-label-caps text-[#FF5722] mb-4 lg:mb-6 block">
            NEWSLETTER
          </span>
          {submitted ? (
            <p className="font-technical-data text-[#FF5722] text-[10px] lg:text-xs">
              THANK YOU FOR SUBSCRIBING
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL@DOMAIN.COM"
                className="bg-transparent border-b border-[#2E2E2E] border-t-0 border-l-0 border-r-0 focus:ring-0 focus:border-[#FF5722] w-full font-label-caps text-[10px] lg:text-xs text-white placeholder-zinc-700 py-2"
                required
              />
              <button
                type="submit"
                className="border-b border-[#2E2E2E] px-3 lg:px-4 text-white hover:text-[#FF5722] transition-colors"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-12 mt-12 lg:mt-24 pt-8 lg:pt-12 flex flex-col lg:flex-row justify-between items-center border-t border-[#2E2E2E]">
          <span className="font-label-caps text-[10px] tracking-[0.2em] uppercase text-zinc-500 text-center lg:text-left">
            &copy; {currentYear} APEX PRECISION GROOMING. ENGINEERED FOR PROFESSIONAL
            PERFORMANCE.
          </span>
          <div className="flex gap-6 lg:gap-8 mt-4 lg:mt-0">
            <a
              className="font-label-caps text-[10px] text-zinc-500 hover:text-white"
              href="#"
            >
              PRIVACY
            </a>
            <a
              className="font-label-caps text-[10px] text-zinc-500 hover:text-white"
              href="#"
            >
              TERMS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}