import HeroCarousel, { type Slide } from "@/components/HeroCarousel";
import { CtaBanner } from "@/components/ui";
import {
  AboutIntro,
  ServicesGrid,
  SignaturePackagesBand,
  WhyChooseMbc,
} from "@/components/sections";
import { images } from "@/lib/site";

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

export default function Home() {
  return (
    <div>
      <HeroCarousel slides={slides} />
      <AboutIntro />
      <ServicesGrid />
      <SignaturePackagesBand />
      <WhyChooseMbc />

      <CtaBanner
        title="Ready to Reveal Your Best?"
        subtitle="Book your appointment today and let us take care of you."
      />
    </div>
  );
}
