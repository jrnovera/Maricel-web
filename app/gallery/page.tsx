import Image from "next/image";
import type { Metadata } from "next";
import { SplitHero, CtaBanner, Eyebrow } from "@/components/ui";
import GalleryGrid from "@/components/GalleryGrid";
import { images, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery — Maricel Beauty Center",
  description:
    "Explore the elegance of our salon, the artistry of our treatments, and the beautiful results we create every day.",
};

const moments = [
  { src: images.interior, alt: "Maricel Beauty Center reception" },
  { src: images.skincare, alt: "Products and flowers at the salon" },
  { src: images.bridal, alt: "Stylist working with a client" },
];

export default function GalleryPage() {
  const founder = team[0];

  return (
    <div>
      <SplitHero
        eyebrowLines={["Our Gallery"]}
        title="Beauty in Every Detail"
        subtitle="Explore the elegance of our salon, the artistry of our treatments, and the beautiful results we create every day."
        image={images.interior}
        imageAlt="Maricel Beauty Center salon interior"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <GalleryGrid />
      </section>

      {/* Moments at MBC */}
      <section className="bg-blush-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <Eyebrow>Inside Maricel Beauty Center</Eyebrow>
            <h2 className="mt-3 font-display text-2xl leading-tight text-pink-500 sm:text-3xl lg:text-4xl">
              Moments at MBC
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-500 sm:text-base">
              Every corner of MBC is designed with love and attention to
              detail — to make you feel beautiful, relaxed, and cared for.
            </p>
            <p className="mt-8 font-display text-xl text-ink-900">
              {founder.name.split(" ")[0]} ♡
            </p>
            <p className="text-xs font-semibold tracking-[0.15em] text-pink-500">
              FOUNDER
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {moments.map((m) => (
              <div
                key={m.src}
                className="relative aspect-[3/4] overflow-hidden rounded-xl"
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 20vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to experience beauty with care?"
        subtitle="Book your appointment today and let us bring out the best in you."
      />
    </div>
  );
}
