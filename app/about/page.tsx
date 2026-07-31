import type { Metadata } from "next";
import HeroCarousel, { type Slide } from "@/components/HeroCarousel";
import { CtaBanner } from "@/components/ui";
import {
  AboutIntro,
  ServicesGrid,
  SignaturePackagesBand,
  WhyChooseMbc,
  Testimonials,
} from "@/components/sections";
import { images } from "@/lib/site";
import { getHeroRows } from "@/lib/hero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Luxury beauty, tailored for you. Premium treatments, expert care and a relaxing space at Maricel Beauty Center.",
  alternates: { canonical: "/about" },
};

export const dynamic = "force-dynamic";

const fallbackSlides: Slide[] = [
  {
    eyebrow: "Welcome to",
    brand: "Maricel Beauty Center",
    titleLead: "Luxury Beauty,",
    titleAccent: "Tailored For You",
    body: "Where expert care meets elegance. Indulge in personalized beauty treatments designed to enhance your natural glow, confidence, and well-being.",
    image: images.aboutWoman,
  },
];

export default async function AboutPage() {
  const rows = await getHeroRows("about");
  const slides: Slide[] =
    rows.length > 0
      ? rows.map((r) => ({
          eyebrow: r.eyebrow ?? "",
          brand: "Maricel Beauty Center",
          titleLead: r.title_lead,
          titleAccent: r.title_accent ?? "",
          body: r.body ?? "",
          image: r.image,
        }))
      : fallbackSlides;

  return (
    <div>
      <HeroCarousel slides={slides} />
      <AboutIntro />
      <ServicesGrid />
      <SignaturePackagesBand />
      <WhyChooseMbc />
      <Testimonials />

      <CtaBanner
        title="Ready to Reveal Your Best?"
        subtitle="Send us an enquiry today and let us take care of you."
      />
    </div>
  );
}
