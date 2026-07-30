"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { galleryCategories, type GalleryEntry } from "@/lib/site";

export default function GalleryGrid({ items }: { items: GalleryEntry[] }) {
  const [active, setActive] =
    useState<(typeof galleryCategories)[number]>("All");

  const filtered =
    active === "All" ? items : items.filter((item) => item.category === active);

  // Only offer filters that actually have photos behind them.
  const tabs = galleryCategories.filter(
    (cat) => cat === "All" || items.some((item) => item.category === cat)
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {tabs.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2 text-xs font-medium transition-colors sm:text-sm ${
              active === cat
                ? "bg-pink-500 text-white"
                : "border border-pink-200 text-ink-700 hover:border-pink-400 hover:text-pink-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {filtered.map((item) => (
          <div
            key={item.src}
            className="group overflow-hidden rounded-xl border border-pink-100 bg-white"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-3 sm:px-4">
              <span className="text-xs font-medium text-ink-700 sm:text-sm">
                {item.caption}
              </span>
              <Search size={15} className="shrink-0 text-pink-400" />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink-500">
          No photos in this category yet.
        </p>
      )}
    </div>
  );
}
