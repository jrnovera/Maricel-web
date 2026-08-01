import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Star, MessageSquare, Heart, User, ArrowRight } from "lucide-react";
import { images, testimonials, reviewStats } from "@/lib/site";
import { getHeroRows } from "@/lib/hero";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Real experiences from our beautiful clients — see what our customers say about Maricel Beauty Center.",
  alternates: { canonical: "/reviews" },
};

export const revalidate = 300;

const statIcons: Record<
  string,
  React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
> = {
  star: Star,
  chat: MessageSquare,
  heart: Heart,
  person: User,
};

/** Champagne rule with a small diamond at its centre. */
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-300 to-gold-300" />
      <span className="rotate-45 text-[7px] leading-none text-gold-400">◆</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-300 to-gold-300" />
    </div>
  );
}

function Stars({ size = 13 }: { size?: number }) {
  return (
    <span className="flex justify-center gap-0.5 text-gold-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-gold-400" strokeWidth={0} />
      ))}
    </span>
  );
}

export default async function ReviewsPage() {
  const [hero] = await getHeroRows("reviews");

  return (
    <div>
      {/* Hero — copy left, salon photo right, wave sweep along the bottom */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-pink-50">
        <div className="relative h-56 w-full sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%]">
          <Image
            src={hero?.image ?? images.teamSalon}
            alt="Styling stations at Maricel Beauty Center"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/45 lg:to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:py-28">
          <div className="max-w-md lg:max-w-[42%]">
            <h1 className="font-display text-4xl leading-[1.05] text-ink-900 sm:text-6xl">
              Customer
              <br />
              <span className="text-pink-500">Reviews</span>
            </h1>

            <GoldRule className="mt-6 max-w-xs" />

            <p className="mt-6 text-sm leading-relaxed text-ink-700 sm:text-base">
              {hero?.body ??
                "Real experiences from our beautiful clients. Your trust and satisfaction inspire us every day."}
            </p>
          </div>
        </div>

        {/* Soft wave sweeping the hero into the page below */}
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="relative block h-10 w-full sm:h-16"
        >
          <path
            d="M0,40 C240,90 480,0 720,24 C960,48 1200,88 1440,44 L1440,80 L0,80 Z"
            className="fill-pink-100"
          />
          <path
            d="M0,56 C240,100 480,18 720,40 C960,62 1200,96 1440,60 L1440,80 L0,80 Z"
            className="fill-white"
          />
        </svg>
      </section>

      {/* Stats bar */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="grid grid-cols-2 rounded-2xl border border-pink-200 bg-pink-50/60 px-4 py-7 sm:grid-cols-4 sm:px-8">
          {reviewStats.map((s, i) => {
            const Icon = statIcons[s.icon] ?? Star;
            const isRating = s.icon === "star";
            return (
              <div
                key={s.label}
                className={`flex items-center justify-center gap-3 px-2 py-3 sm:py-0 ${
                  i > 0 ? "sm:border-l sm:border-pink-200" : ""
                }`}
              >
                <Icon
                  size={30}
                  strokeWidth={1.5}
                  className={
                    isRating
                      ? "shrink-0 fill-pink-500 text-pink-500"
                      : "shrink-0 text-pink-400"
                  }
                />
                <div>
                  <p className="font-display text-2xl leading-none text-pink-500 sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-ink-700 sm:text-xs">
                    {s.label}
                  </p>
                  {isRating && (
                    <span className="mt-1 flex">
                      <Stars size={11} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonial grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-2xl leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
            What Our Clients Say
          </h2>
          <GoldRule className="mx-auto mt-4 max-w-[10rem]" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-700 sm:text-base">
            We love making you look and feel your best.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative flex flex-col rounded-xl border border-pink-100 bg-white px-6 pb-6 pt-8 shadow-[0_1px_3px_rgba(43,39,48,0.04)]"
            >
              {/* Oversized opening quote, tucked into the top-left corner */}
              <span
                aria-hidden="true"
                className="absolute left-4 top-2 font-display text-4xl leading-none text-pink-300"
              >
                &ldquo;
              </span>

              <Stars />

              <blockquote className="mt-4 flex-1 text-center text-sm leading-relaxed text-ink-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center justify-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-pink-100">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    loading="lazy"
                  />
                </span>
                <span>
                  <span className="block text-sm font-medium text-pink-500">
                    {t.name}
                  </span>
                  <span className="block text-xs text-ink-500">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Closing appreciation band */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-blush-100 to-pink-100 px-6 py-12 text-center sm:px-10 sm:py-14">
          {/* Soft florals anchoring both ends, faded so the copy stays legible */}
          <div className="pointer-events-none absolute -left-6 bottom-0 top-0 hidden w-48 opacity-60 [mask-image:linear-gradient(to_right,black,transparent)] sm:block">
            <Image
              src={images.spaTowels}
              alt=""
              fill
              sizes="200px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="pointer-events-none absolute -right-6 bottom-0 top-0 hidden w-48 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)] sm:block">
            <Image
              src={images.skincare}
              alt=""
              fill
              sizes="200px"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div className="relative mx-auto max-w-lg">
            <h2 className="font-display text-2xl text-pink-600 sm:text-3xl">
              We Appreciate Your Trust
            </h2>
            <GoldRule className="mx-auto mt-3 max-w-[8rem]" />
            <p className="mt-4 text-sm text-ink-700 sm:text-base">
              Thank you for being part of our MBC family.
              <br />
              We can&apos;t wait to pamper you again!
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3 text-xs font-semibold tracking-[0.12em] text-white transition-colors hover:bg-pink-600 sm:text-sm"
            >
              SEND US AN ENQUIRY
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
