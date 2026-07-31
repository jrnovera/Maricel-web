import Image from "next/image";
import type { Metadata } from "next";
import { Clock, Check, Star, Sparkles, Heart } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import {
  SectionHeading,
  Eyebrow,
  CtaBanner,
  BookButton,
  SplitHero,
} from "@/components/ui";
import { images } from "@/lib/site";
import { packages, bridalLuxury } from "@/lib/services-data";
import { getHeroRows } from "@/lib/hero";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Luxury beauty packages designed for you — curated treatments combined for the ultimate convenience, value and experience.",
  alternates: { canonical: "/packages" },
};

export const dynamic = "force-dynamic";

const whyChoose = [
  {
    icon: "expertise",
    title: "Expert Therapists",
    desc: "Skilled and certified professionals dedicated to your beauty.",
  },
  {
    icon: "bottle",
    title: "Premium Products",
    desc: "We use high-quality, safe and trusted products.",
  },
  {
    icon: "lotus",
    title: "Personalized Care",
    desc: "Every package is tailored to your unique needs.",
  },
  {
    icon: "heart",
    title: "Relaxing Ambience",
    desc: "A calm, luxurious space designed for your comfort and renewal.",
  },
];

const bridalIcons = [Check, Star, Sparkles, Heart];

export default async function PackagesPage() {
  const [hero] = await getHeroRows("packages");

  return (
    <div>
      <SplitHero
        eyebrowLines={[hero?.eyebrow ?? "Premium Beauty Packages"]}
        title={
          hero ? (
            <>
              {hero.title_lead}
              {hero.title_accent && (
                <>
                  <br />
                  <span className="text-pink-500">{hero.title_accent}</span>
                </>
              )}
            </>
          ) : (
            <>
              Luxury Packages
              <br />
              <span className="text-pink-500">Designed For You</span>
            </>
          )
        }
        subtitle={
          hero?.body ??
          "Our thoughtfully curated packages combine multiple treatments for the ultimate convenience, value, and a complete beauty experience."
        }
        image={hero?.image ?? images.spaTowels}
        imageAlt="Spa candle and towels at Maricel Beauty Center"
        action={<BookButton href="#packages">Explore Packages</BookButton>}
      />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8">
        <Eyebrow>BEAUTY. CONVENIENCE. VALUE.</Eyebrow>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-ink-500 sm:text-base">
          Our packages are designed to give you a complete head-to-toe
          experience, combining our most popular treatments in one seamless
          session. Save time, enjoy better value, and leave feeling renewed.
        </p>
      </section>

      {/* Package cards */}
      <section
        id="packages"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
      >
        <SectionHeading
          eyebrow="Our Packages"
          title="Choose Your Perfect Experience"
          divider={false}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="flex flex-col rounded-xl border border-pink-100 bg-white p-5 transition-shadow hover:shadow-md sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <ServiceIcon name={pkg.icon} size={26} />
                </span>
                <div>
                  <h2 className="font-display text-lg text-ink-900">
                    {pkg.name}
                  </h2>
                  <ul className="mt-1.5 space-y-0.5">
                    {pkg.includes.map((inc) => (
                      <li key={inc} className="text-xs text-ink-500 sm:text-sm">
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-1 items-end justify-between border-t border-pink-50 pt-4">
                <span className="flex items-center gap-1.5 text-xs text-ink-500">
                  <Clock size={14} className="text-pink-400" />
                  {pkg.duration}
                </span>
                <span className="font-display text-xl text-pink-600">
                  {pkg.price}
                </span>
              </div>

              <BookButton
                variant="outline"
                chevron={false}
                className="mt-4 w-full"
              >
                Enquire About This Package
              </BookButton>
            </div>
          ))}
        </div>
      </section>

      {/* Bridal Luxury feature */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-blush-100 to-pink-50">
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src={images.bridal}
                alt="Bride prepared by Maricel Beauty Center"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-6 sm:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Eyebrow>MOST LOVED</Eyebrow>
                  <h2 className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl">
                    {bridalLuxury.name}
                  </h2>
                </div>
                <div className="shrink-0 rounded-xl bg-pink-600 px-5 py-3 text-center text-white">
                  <p className="font-display text-xl leading-none">
                    {bridalLuxury.price}
                  </p>
                  <p className="mt-1 text-[11px] text-pink-100">
                    {bridalLuxury.duration}
                  </p>
                </div>
              </div>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-500 sm:text-base">
                {bridalLuxury.desc}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {bridalLuxury.features.map((feature, i) => {
                  const Icon = bridalIcons[i % bridalIcons.length];
                  return (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 lg:flex-col lg:text-center"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-300 text-pink-500">
                        <Icon size={15} strokeWidth={1.75} />
                      </span>
                      <span className="text-xs text-ink-700">{feature}</span>
                    </div>
                  );
                })}
              </div>

              <BookButton className="mt-7">Enquire About Bridal Package</BookButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose our packages */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="text-center">
          <Eyebrow>WHY CHOOSE OUR PACKAGES</Eyebrow>
          <div className="mx-auto mt-2.5 h-0.5 w-10 rounded-full bg-pink-300" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {whyChoose.map((w) => (
            <div key={w.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center text-pink-500">
                <ServiceIcon name={w.icon} size={32} />
              </span>
              <h3 className="mt-3 text-[11px] font-semibold tracking-[0.1em] text-ink-900 sm:text-xs">
                {w.title.toUpperCase()}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-500 sm:text-sm">
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Ready to Pamper Yourself?"
        subtitle="Enquire about your favorite package today and let us take care of you."
        buttonLabel="Enquire About a Package"
      />
    </div>
  );
}
