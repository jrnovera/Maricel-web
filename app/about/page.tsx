import Image from "next/image";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Eyebrow, CtaBanner, BookButton, SplitHero } from "@/components/ui";
import ServiceIcon from "@/components/ServiceIcon";
import { images } from "@/lib/site";
import { bridalLuxury } from "@/lib/services-data";
import { getHeroRows } from "@/lib/hero";
import { getPageCopy } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Beauty, care, and confidence in every detail — meet the story, values and experience behind Maricel Beauty Center.",
  alternates: { canonical: "/about" },
};

export const dynamic = "force-dynamic";

const values = [
  {
    icon: "quality",
    title: "Quality",
    desc: "We use premium products and modern techniques to deliver outstanding and lasting results.",
  },
  {
    icon: "care",
    title: "Care",
    desc: "Your comfort and well-being are our priority. Every service is delivered with heart and attention.",
  },
  {
    icon: "expertise",
    title: "Expertise",
    desc: "Our team is highly trained and passionate about helping you look and feel your absolute best.",
  },
  {
    icon: "hygiene",
    title: "Hygiene",
    desc: "We maintain the highest standards of cleanliness and safety in every treatment.",
  },
  {
    icon: "personal",
    title: "Personalized Service",
    desc: "We listen, we understand, and we create beauty solutions tailored just for you.",
  },
];

const experience = [
  {
    icon: "crown",
    title: "Luxury You Deserve",
    desc: "A refined space designed for relaxation, beauty, and self-care.",
  },
  {
    icon: "heart",
    title: "Results That Last",
    desc: "Advanced techniques and premium products for visible, long-lasting results.",
  },
  {
    icon: "hands",
    title: "You're In Good Hands",
    desc: "A professional team dedicated to enhancing your natural beauty.",
  },
  {
    icon: "lotus",
    title: "Confidence, Always",
    desc: "We're here to help you feel beautiful, confident, and empowered every day.",
  },
];

/**
 * Bordered panel of line-art icons split into evenly divided columns —
 * shared by "Our Values & Philosophy" and "The MBC Experience".
 */
function IconPanel({
  heading,
  items,
  columns,
  compactTitles = false,
}: {
  heading: string;
  items: { icon: string; title: string; desc: string }[];
  columns: string;
  compactTitles?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white px-4 py-10 shadow-[0_1px_30px_-18px_rgba(224,33,138,0.45)] sm:px-8 sm:py-12">
      <p className="text-center text-[11px] font-semibold tracking-[0.25em] text-pink-500 sm:text-xs">
        {heading}
      </p>
      <div className="mx-auto mt-3 h-px w-14 bg-pink-200" />

      <div className={`mt-10 grid grid-cols-2 gap-y-10 ${columns}`}>
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`group px-3 text-center sm:px-5 ${
              i > 0 ? "lg:border-l lg:border-pink-100" : ""
            }`}
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center text-pink-500 transition-transform duration-300 group-hover:scale-110">
              <ServiceIcon name={item.icon} size={32} />
            </span>
            <h3
              className={`mt-3.5 text-ink-900 ${
                compactTitles
                  ? "text-[11px] font-semibold uppercase tracking-[0.1em] sm:text-xs"
                  : "text-sm font-semibold sm:text-base"
              }`}
            >
              {item.title}
            </h3>
            <p className="mx-auto mt-2.5 max-w-[15rem] text-[11px] leading-relaxed text-ink-500 sm:text-xs">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const [[hero], c] = await Promise.all([
    getHeroRows("about"),
    getPageCopy("about"),
  ]);

  const valueCards = values.map((v, i) => ({
    icon: v.icon,
    title: c(`values.item${i + 1}.title`, v.title),
    desc: c(`values.item${i + 1}.desc`, v.desc),
  }));

  const experienceCards = experience.map((e, i) => ({
    icon: e.icon,
    title: c(`experience.item${i + 1}.title`, e.title),
    desc: c(`experience.item${i + 1}.desc`, e.desc),
  }));

  return (
    <div>
      <SplitHero
        eyebrowLines={[hero?.eyebrow ?? "About Us"]}
        title={
          hero ? (
            <>
              {hero.title_lead}{" "}
              {hero.title_accent && (
                <span className="text-pink-500">{hero.title_accent}</span>
              )}
            </>
          ) : (
            <>
              About <span className="text-pink-500">Maricel Beauty Center</span>
            </>
          )
        }
        subtitle={
          hero?.body ??
          "At Maricel Beauty Center, we believe true beauty comes from expert care, genuine passion, and a commitment to making every client feel their best."
        }
        image={hero?.image ?? images.aboutWoman}
        imageAlt="Maricel Beauty Center"
      />

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{c("story.eyebrow", "Our Story")}</Eyebrow>
            <h2 className="mt-3 font-display text-2xl leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
              {c("story.title", "A Passion That Became Our Purpose")}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-500 sm:text-base">
              {c(
                "story.body1",
                "Maricel Beauty Center was founded with a simple mission: to provide exceptional beauty care in a warm, elegant, and welcoming space."
              )}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-500 sm:text-base">
              {c(
                "story.body2",
                "From the very beginning, our focus has been on combining expertise, premium products, and personalized treatments to enhance natural beauty and boost confidence."
              )}
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={c("story.image", images.interior)}
                alt="Maricel Beauty Center salon interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 hidden aspect-[4/3] w-2/5 overflow-hidden rounded-xl border-4 border-white shadow-xl sm:block">
              <Image
                src={c("story.image2", images.interior2)}
                alt="Maricel Beauty Center treatment room"
                fill
                sizes="20vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values & Philosophy */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
        <IconPanel
          heading={c("values.heading", "OUR VALUES & PHILOSOPHY")}
          items={valueCards}
          columns="lg:grid-cols-5"
        />
      </section>

      {/* Bridal Luxury banner */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-blush-100 to-pink-50">
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src={c("bridal.image", images.bridal)}
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
                  <Eyebrow>Most Loved</Eyebrow>
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
                {bridalLuxury.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 lg:flex-col lg:text-center"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-300 text-pink-500">
                      <Check size={15} strokeWidth={1.75} />
                    </span>
                    <span className="text-xs text-ink-700">{feature}</span>
                  </div>
                ))}
              </div>

              <BookButton className="mt-7">Enquire About Bridal Package</BookButton>
            </div>
          </div>
        </div>
      </section>

      {/* The MBC Experience */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <IconPanel
          heading={c("experience.heading", "THE MBC EXPERIENCE")}
          items={experienceCards}
          columns="lg:grid-cols-4"
          compactTitles
        />
      </section>

      <CtaBanner
        title={c("cta.title", "Your Beauty Journey Starts Here")}
        subtitle={c(
          "cta.subtitle",
          "Let our experts bring out the best in you. Send us an enquiry today and experience the MBC difference."
        )}
        buttonLabel={c("cta.button", "Enquire Now")}
        variant="deep"
      />
    </div>
  );
}
