import Image from "next/image";
import type { Metadata } from "next";
import ServiceIcon from "@/components/ServiceIcon";
import { SectionHeading, Eyebrow, CtaBanner } from "@/components/ui";
import { images, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Maricel Beauty Center",
  description:
    "A passion that became our purpose. Meet the team behind Maricel Beauty Center in Dubai.",
};

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
    icon: "sparkle",
    title: "Confidence, Always",
    desc: "We're here to help you feel beautiful, confident, and empowered every day.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blush-50 via-white to-pink-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <Eyebrow>ABOUT US</Eyebrow>
              <span className="h-px w-10 bg-pink-300" />
            </div>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-ink-900 sm:text-5xl lg:text-6xl">
              About
              <span className="mt-1 block text-pink-500">
                Maricel Beauty Center
              </span>
            </h1>
            <div className="mt-5 h-px w-16 bg-pink-300" />
            <p className="mt-5 font-display text-lg italic text-pink-500 sm:text-xl">
              Beauty, Care, and Confidence in Every Detail.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-500 sm:text-base">
              At Maricel Beauty Center, we believe true beauty comes from expert
              care, genuine passion, and a commitment to making every client feel
              their best.
            </p>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[999px_999px_20px_20px] sm:max-w-md">
              <Image
                src={images.aboutWoman}
                alt="Maricel Beauty Center client"
                fill
                sizes="(max-width: 1024px) 80vw, 45vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Round brand seal */}
            <div className="absolute -bottom-2 right-2 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-pink-100 text-center sm:right-6 sm:h-28 sm:w-28">
              <span className="text-[7px] font-semibold tracking-[0.18em] text-pink-600">
                BEAUTY · CARE
              </span>
              <span className="font-display text-lg font-bold text-pink-500">
                MBC
              </span>
              <span className="text-[7px] font-semibold tracking-[0.18em] text-pink-600">
                CONFIDENCE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <Eyebrow>OUR STORY</Eyebrow>
              <span className="h-px w-10 bg-pink-300" />
            </div>
            <h2 className="mt-4 font-display text-2xl leading-tight text-ink-900 sm:text-4xl">
              A Passion That
              <br />
              Became Our Purpose
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ink-500 sm:text-base">
              Maricel Beauty Center was founded with a simple mission: to provide
              exceptional beauty care in a warm, elegant, and welcoming space.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-500 sm:text-base">
              From the very beginning, our focus has been on combining expertise,
              premium products, and personalized treatments to enhance natural
              beauty and boost confidence.
            </p>
          </div>

          {/* Overlapping interior shots */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={images.interior}
                alt="Maricel Beauty Center salon floor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative -mt-12 ml-auto hidden aspect-[3/4] w-2/5 overflow-hidden rounded-xl border-4 border-white sm:block">
              <Image
                src={images.interior2}
                alt="Retail display at Maricel Beauty Center"
                fill
                sizes="30vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-blush-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Values & Philosophy" title="" divider={false} />

          <div className="mt-8 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-5">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center text-pink-500">
                  <ServiceIcon name={v.icon} size={32} />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Our Team"
          title="The Experts Behind Your Beauty"
          divider={false}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {team.map((m) => (
            <div key={m.name} className="text-center">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-3 text-xs font-semibold text-pink-500 sm:text-sm">
                {m.name}
              </h3>
              <p className="mt-0.5 text-[11px] leading-snug text-ink-500">
                {m.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The MBC experience */}
      <section className="bg-blush-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="The MBC Experience" title="" divider={false} />

          <div className="mt-8 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {experience.map((e) => (
              <div key={e.title} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center text-pink-500">
                  <ServiceIcon name={e.icon} size={32} />
                </span>
                <h3 className="mt-3 text-[11px] font-semibold tracking-[0.1em] text-ink-900 sm:text-xs">
                  {e.title.toUpperCase()}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-16 sm:pt-20">
        <CtaBanner
          title="Your Beauty Journey Starts Here"
          subtitle="Let our experts bring out the best in you. Book your appointment today and experience the MBC difference."
        />
      </div>
    </div>
  );
}
