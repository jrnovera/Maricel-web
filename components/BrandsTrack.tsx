"use client";

import { useEffect, useRef } from "react";
import { brandLogos } from "@/lib/site";

/** Pixels per second — deliberately slow so logos stay readable. */
const SPEED = 18;

function LogoCard({ name, src }: { name: string; src: string }) {
  return (
    <figure className="flex h-28 w-40 shrink-0 flex-col items-center justify-center gap-2.5 rounded-2xl border border-pink-100/80 bg-white px-4 shadow-[0_1px_2px_rgba(43,39,48,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(224,33,138,0.10)] sm:h-32 sm:w-48 sm:gap-3 sm:px-6 lg:h-36 lg:w-56">
      {/* Local SVG wordmarks — next/image's optimizer rejects SVG by default. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        draggable={false}
        className="h-9 w-full select-none object-contain sm:h-11 lg:h-12"
      />
      <figcaption className="text-[9px] font-semibold tracking-[0.12em] text-ink-500 sm:text-[10px]">
        {name.toUpperCase()}
      </figcaption>
    </figure>
  );
}

export default function BrandsTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Kept in refs, not state — this updates every frame and must never re-render.
  const offset = useRef(0);
  const half = useRef(0);
  const dragging = useRef(false);
  const paused = useRef(false);
  const pointerStart = useRef(0);
  const offsetStart = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // The list is rendered twice, so one copy is exactly half the scroll width.
    const measure = () => {
      half.current = track.scrollWidth / 2;
      if (offset.current === 0) offset.current = -half.current;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;

      if (!dragging.current && !paused.current && !reduced.matches) {
        offset.current += SPEED * delta;
      }

      // Wrap within [-half, 0) so the duplicated copy hides the seam.
      const width = half.current;
      if (width > 0) {
        while (offset.current >= 0) offset.current -= width;
        while (offset.current < -width) offset.current += width;
      }

      track.style.transform = `translate3d(${offset.current}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    pointerStart.current = e.clientX;
    offsetStart.current = offset.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    offset.current = offsetStart.current + (e.clientX - pointerStart.current);
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  const track = [...brandLogos, ...brandLogos];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* Feathered edges so cards fade out rather than clipping at the bezel. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-blush-50 to-transparent sm:w-24 lg:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-blush-50 to-transparent sm:w-24 lg:w-40" />

      <div
        role="region"
        aria-label="Professional brands we use"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // pan-y keeps vertical page scrolling working on touch devices.
        className="cursor-grab touch-pan-y select-none py-2 active:cursor-grabbing"
      >
        <div ref={trackRef} className="flex w-max gap-3 sm:gap-5 lg:gap-6">
          {track.map((brand, i) => (
            <LogoCard key={`${brand.name}-${i}`} {...brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
