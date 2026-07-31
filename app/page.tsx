import HeroCarousel, { type Slide } from "@/components/HeroCarousel";
import { CtaBanner } from "@/components/ui";
import {
  AboutIntro,
  ServicesGrid,
  SignaturePackagesBand,
  WhyChooseMbc,
} from "@/components/sections";
import BrandsMarquee from "@/components/BrandsMarquee";
import { images } from "@/lib/site";
import { getHeroRows } from "@/lib/hero";

export const dynamic = "force-dynamic";

const fallbackSlides: Slide[] = [
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
    body: "Bridal makeup, styling and complete pamper packages for the days that matter most. Enquire for a consultation with our beauty experts.",
    image: images.bridal,
  },
];

export default async function Home() {
  const rows = await getHeroRows("home");
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
      <BrandsMarquee />
      <SignaturePackagesBand />
      <WhyChooseMbc />

      <CtaBanner
        title="Ready to Reveal Your Best?"
        subtitle="Send us an enquiry today and let us take care of you."
      />
    </div>
  );
}
