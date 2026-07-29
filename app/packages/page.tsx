import Image from "next/image";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero, CtaBanner, BookButton } from "@/components/ui";
import { images } from "@/lib/site";
import { packages } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Packages — Maricel Beauty Center",
  description:
    "Curated beauty packages for bridal, glow, hair revival and total relaxation.",
};

type ImageKey = keyof typeof images;

export default function PackagesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Signature Packages"
        title="Pamper Yourself, Love Your Glow"
        subtitle="Curated packages for your beauty, relaxation, and total confidence."
        image={images.spaTowels}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => {
            const src = images[pkg.image as ImageKey];
            return (
              <div
                key={pkg.name}
                className={`flex flex-col overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md ${
                  pkg.featured ? "border-pink-300" : "border-pink-100"
                }`}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={typeof src === "string" ? src : images.spaTowels}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  {pkg.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
                      MOST POPULAR
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="font-display text-lg text-ink-900 sm:text-xl">
                    {pkg.name}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500 sm:text-sm">
                    {pkg.desc}
                  </p>

                  <ul className="mt-4 flex-1 space-y-1.5">
                    {pkg.includes.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-start gap-2 text-xs text-ink-700 sm:text-sm"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0 text-pink-500"
                        />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 font-display text-2xl text-pink-500">
                    {pkg.price}
                  </p>

                  <BookButton className="mt-4 w-full" variant="outline">
                    Book This Package
                  </BookButton>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-ink-500">
          Package prices are indicative. Final pricing may vary with hair length,
          treatment type and add-ons — we&apos;ll confirm when you book.
        </p>
      </section>

      <CtaBanner
        title="Not sure which package suits you?"
        subtitle="Talk to our beauty experts and we'll build something around exactly what you need."
      />
    </div>
  );
}
