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

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Luxury beauty, tailored for you. Premium treatments, expert care and a relaxing space at Maricel Beauty Center.",
  alternates: { canonical: "/about" },
};

const slides: Slide[] = [
  {
    eyebrow: "Welcome to",
    brand: "Maricel Beauty Center",
    titleLead: "Luxury Beauty,",
    titleAccent: "Tailored For You",
    body: "Where expert care meets elegance. Indulge in personalized beauty treatments designed to enhance your natural glow, confidence, and well-being.",
    image: images.aboutWoman,
  },
  {
    eyebrow: "Skin, Hair & Nails",
    brand: "Maricel Beauty Center",
    titleLead: "Expert Care,",
    titleAccent: "Every Visit",
    body: "From facials with GUINOT and Dr. Renaud to keratin treatments and gel nails — premium products in the hands of a trained team.",
    image: images.lashes,
  },
  {
    eyebrow: "Hair & Styling",
    brand: "Maricel Beauty Center",
    titleLead: "Styled To",
    titleAccent: "Perfection",
    body: "Cuts, colour, keratin and blow-dries by stylists trained on Kemon and evo — finished exactly the way you pictured it.",
    image: images.hair,
  },
];

export default function AboutPage() {
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
        subtitle="Book your appointment today and let us take care of you."
      />
    </div>
  );
}
