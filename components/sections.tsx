import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import { SectionHeading, Eyebrow } from "@/components/ui";
import { images, testimonials } from "@/lib/site";
import { serviceGroups } from "@/lib/services-data";

/**
 * The stack of marketing sections shared by the home and About pages —
 * both render the same sequence in the reference design.
 */

const whyChoose = [
  {
    icon: "expertise",
    title: "Expert Professionals",
    desc: "Skilled and certified experts dedicated to your beauty.",
  },
  {
    icon: "bottle",
    title: "Premium Products",
    desc: "We use high-quality, safe and trusted products.",
  },
  {
    icon: "lotus",
    title: "Relaxing Ambience",
    desc: "A calm, luxurious space designed for your comfort.",
  },
  {
    icon: "heart",
    title: "Personalized Care",
    desc: "Treatments tailored to your unique needs and goals.",
  },
];

/** Photo bleeds to the left edge, copy sits in the right column. */
export function AboutIntro() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-0">
        <div className="relative h-64 w-full sm:h-80 lg:h-[26rem]">
          <Image
            src={images.interior}
            alt="Inside Maricel Beauty Center"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div className="px-4 pt-8 sm:px-6 lg:px-12 lg:pt-0 xl:px-20">
          <div className="max-w-md">
            <Eyebrow>ABOUT US</Eyebrow>
            <div className="mt-2.5 h-px w-12 bg-pink-300" />
            <h2 className="mt-4 font-display text-2xl leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
              Your Premium Beauty Destination
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-500 sm:text-base">
              At Maricel Beauty Center, we believe beauty is personal. Our expert
              team is dedicated to providing exceptional services using premium
              products in a relaxing, hygienic, and luxurious environment.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-500 sm:text-base">
              Because you deserve to look and feel your best.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex rounded-lg border border-pink-400 px-7 py-2.5 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-500 hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <section className="bg-blush-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Enhance. Refresh. Glow."
          divider={false}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
          {serviceGroups.map((s) => (
            <Link
              key={s.slug}
              href="/services"
              className="group flex flex-col items-center rounded-xl border border-pink-100 bg-white px-3 py-6 text-center transition-all hover:border-pink-300 hover:shadow-sm"
            >
              <span className="text-pink-500 transition-transform group-hover:scale-110">
                <ServiceIcon name={s.icon} size={34} />
              </span>
              <h3 className="mt-4 text-[11px] font-semibold tracking-[0.1em] text-ink-900 sm:text-xs">
                {s.title.toUpperCase()}
              </h3>
              <p className="mt-1.5 text-[10px] leading-snug text-ink-500 sm:text-[11px]">
                {s.blurb}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex rounded-lg border border-pink-400 px-7 py-2.5 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-500 hover:text-white"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SignaturePackagesBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={images.spaTowels}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/60 to-ink-900/20" />
        <div className="relative px-6 py-14 sm:px-12 sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-pink-200">
            SIGNATURE PACKAGES
          </p>
          <h2 className="mt-3 max-w-md font-display text-2xl leading-tight text-white sm:text-4xl">
            Pamper Yourself,
            <br />
            Love Your Glow
          </h2>
          <p className="mt-4 max-w-sm text-sm text-white/75 sm:text-base">
            Curated packages for your beauty, relaxation, and total confidence.
          </p>
          <Link
            href="/packages"
            className="mt-7 inline-flex rounded-lg bg-pink-500 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600"
          >
            Explore Packages
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseMbc() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="text-center">
        <Eyebrow>WHY CHOOSE MARICEL BEAUTY CENTER</Eyebrow>
        <div className="mx-auto mt-2.5 h-px w-12 bg-pink-300" />
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
  );
}

/** Client review cards — used by the About page. */
export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow="Client Love"
        title="What Our Clients Say"
        subtitle="Real reviews from clients who trust us with their beauty routine."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-xl border border-pink-100 bg-white p-6"
          >
            <div className="flex gap-0.5 text-pink-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={
                    i < t.rating
                      ? "fill-pink-400"
                      : "fill-none text-pink-200"
                  }
                />
              ))}
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-700 sm:text-base">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  {t.name}
                </p>
                <p className="text-xs text-ink-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
