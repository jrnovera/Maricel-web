"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StaticBookButton } from "@/components/ui";

export type Slide = {
  eyebrow: string;
  brand: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  image: string;
};

const AUTOPLAY_MS = 4000;

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  // Only the arrows/dots pause autoplay — not the whole hero — otherwise
  // just resting the cursor near the top of the page (to read the copy)
  // silently stops the slider, which read as "autoplay is broken".
  const [controlsHovered, setControlsHovered] = useState(false);
  // Every slide sits stacked in the viewport, so `loading="lazy"` can't defer
  // any of them — the browser treats them all as visible and pulls the whole
  // carousel down before first paint, delaying the one photo that's actually
  // on screen. Rendering only the first slide up front and adding the rest
  // once the page is idle keeps first paint to a single image while still
  // having every slide decoded long before autoplay (4s) reaches it.
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setShowAll(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setShowAll(true), 600);
    return () => clearTimeout(id);
  }, [slides.length]);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (controlsHovered || slides.length < 2) return;
    const id = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, controlsHovered, go, slides.length]);

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-blush-100 to-pink-50 lg:min-h-[60vh]"
      aria-roledescription="carousel"
    >
      {/* Photo bleeds to the right edge and fills the hero height on desktop;
          on narrow screens it sits above the copy as a banner. */}
      <div className="relative h-64 w-full sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
        {slides.map((s, i) =>
          i === 0 || showAll ? (
            <Image
              key={s.image}
              src={s.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              priority={i === 0}
              className={`object-cover object-center transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null
        )}
        {/* Soft fade so the photo melts into the pink panel. */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-100/70 to-transparent lg:bg-gradient-to-r lg:from-pink-100 lg:via-pink-100/25 lg:to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[60vh] lg:items-center lg:px-8 lg:py-16">
        <div className="max-w-xl lg:max-w-[46%]">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-ink-500 sm:text-xs">
            {slide.eyebrow.toUpperCase()}
          </p>
          <p className="mt-1.5 text-[10px] font-semibold tracking-[0.25em] text-pink-500 sm:text-xs">
            {slide.brand.toUpperCase()}
          </p>

          <h1 className="mt-4 font-display text-3xl leading-[1.15] text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            {slide.titleLead}{" "}
            <span className="text-pink-500">{slide.titleAccent}</span>
          </h1>

          <div className="mt-5 h-px w-16 bg-pink-300" />

          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-700 sm:text-base">
            {slide.body}
          </p>

          <StaticBookButton className="mt-7" />
        </div>
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(index - 1)}
            onMouseEnter={() => setControlsHovered(true)}
            onMouseLeave={() => setControlsHovered(false)}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-pink-500 shadow-sm transition-colors hover:bg-white sm:flex lg:left-4"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(index + 1)}
            onMouseEnter={() => setControlsHovered(true)}
            onMouseLeave={() => setControlsHovered(false)}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-pink-500 shadow-sm transition-colors hover:bg-white sm:flex lg:right-4"
          >
            <ChevronRight size={20} />
          </button>

          <div
            onMouseEnter={() => setControlsHovered(true)}
            onMouseLeave={() => setControlsHovered(false)}
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
          >
            {slides.map((s, i) => (
              <button
                key={s.image}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-5 bg-pink-500" : "w-2 bg-pink-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
