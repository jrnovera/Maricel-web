import Link from "next/link";
import Image from "next/image";
import HeroCarousel, { type Slide } from "@/components/HeroCarousel";
import ServiceIcon from "@/components/ServiceIcon";
import { SectionHeading, Eyebrow, BookButton } from "@/components/ui";
import { images } from "@/lib/site";
import { serviceGroups } from "@/lib/services-data";

const slides: Slide[] = [
  {
    eyebrow: "Welcome to",
    brand: "Maricel Beauty Center",
    titleLead: "Luxury Beauty,",
    titleAccent: "Tailored For You",
    body: "Where expert care meets elegance. Indulge in personalized beauty treatments designed to enhance your natural glow, confidence, and well-being.",
    image: images.heroWoman,
  },
  {
    eyebrow: "Skin, Hair & Nails",
    brand: "Maricel Beauty Center",
    titleLead: "Expert Care,",
    titleAccent: "Every Visit",
    body: "From facials with GUINOT and Dr. Renaud to keratin treatments and gel nails — premium products in the hands of a trained team.",
    image: images.facial,
  },
  {
    eyebrow: "Bridal & Occasion",
    brand: "Maricel Beauty Center",
    titleLead: "Look Your Best,",
    titleAccent: "Feel Your Best",
    body: "Bridal makeup, styling and complete pamper packages for the days that matter most. Book a consultation with our beauty experts.",
    image: images.bridal,
  },
];

const whyChoose = [
  {
    icon: "expertise",
    title: "Expert Professionals",
    desc: "Skilled and certified experts dedicated to your beauty.",
  },
  {
    icon: "bottle",
    title: "Premium Products",
    desc: "We use high-quality, safe and trusted brands.",
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

export default function Home() {
  return (
    <div>
      <HeroCarousel slides={slides} />

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={images.interior}
              alt="Inside Maricel Beauty Center"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <Eyebrow>ABOUT US</Eyebrow>
            <h2 className="mt-3 font-display text-2xl leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
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
              className="mt-7 inline-flex rounded-full border border-pink-400 px-7 py-2.5 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-500 hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-blush-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Enhance. Refresh. Glow."
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
              className="inline-flex rounded-full border border-pink-400 px-7 py-2.5 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-500 hover:text-white"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Signature packages band */}
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
              className="mt-7 inline-flex rounded-full bg-pink-500 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <SectionHeading title="Why Choose Maricel Beauty Center" />

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

      {/* Soft CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-blush-100 to-pink-50 px-6 py-10 sm:px-12 sm:py-14">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="font-display text-2xl text-ink-900 sm:text-3xl">
                Ready to Reveal Your Best?
              </h2>
              <p className="mt-2 text-sm text-ink-500 sm:text-base">
                Book your appointment today and let us take care of you.
              </p>
            </div>
            <BookButton className="shrink-0" />
          </div>
        </div>
      </section>
    </div>
  );
}
