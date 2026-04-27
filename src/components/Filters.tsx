"use client";

import { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-[#2E2E2E] pt-6">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-label-caps text-white mb-0">{title}</h3>
        <span className="material-symbols-outlined text-[#FF5722] transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] mt-4" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

interface CheckboxFilterProps {
  label: string;
  count?: number;
}

export function CheckboxFilter({ label, count }: CheckboxFilterProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className="w-4 h-4 rounded-none bg-transparent border-[#2E2E2E] text-[#FF5722] focus:ring-[#FF5722] focus:ring-offset-0"
      />
      <span className="font-technical-data text-zinc-500 group-hover:text-white transition-colors text-sm">
        {label}
      </span>
      {count && <span className="text-zinc-600 ml-auto text-xs">{count}</span>}
    </label>
  );
}

interface CategoryFilterProps {
  categories: { name: string; count: number; active?: boolean }[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <ul className="space-y-4">
      {categories.map((cat) => (
        <li key={cat.name}>
          <a
            className={`font-technical-data flex justify-between ${
              cat.active ? "text-[#FF5722]" : "text-zinc-500 hover:text-white"
            } transition-colors text-sm`}
            href="#"
          >
            <span>{cat.name}</span>
            <span className="text-zinc-600">{cat.count}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}