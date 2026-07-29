"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookButton } from "@/components/ui";

export type Slide = {
  eyebrow: string;
  brand: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  image: string;
};

const AUTOPLAY_MS = 6000;

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, go, slides.length]);

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-blush-100 to-pink-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-4 lg:px-8 lg:py-20">
        {/* Copy */}
        <div className="order-2 max-w-xl lg:order-1 lg:pr-8">
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

          <BookButton className="mt-7" />
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[999px_999px_24px_24px] sm:max-w-md lg:max-w-none lg:aspect-[5/6]">
            {slides.map((s, i) => (
              <Image
                key={s.image}
                src={s.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority={i === 0}
                className={`object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-pink-500 shadow-sm transition-colors hover:bg-white sm:flex lg:left-4"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-pink-500 shadow-sm transition-colors hover:bg-white sm:flex lg:right-4"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
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
