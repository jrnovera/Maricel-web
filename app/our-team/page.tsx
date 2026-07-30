import type { Metadata } from "next";
import { SplitHero, CtaBanner } from "@/components/ui";
import { TeamGrid, CareersSection } from "@/components/sections";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the licensed beauty professionals behind Maricel Beauty Center, and explore career opportunities to join our team.",
  alternates: { canonical: "/our-team" },
};

export default function OurTeamPage() {
  return (
    <div>
      <SplitHero
        eyebrowLines={["Meet The Experts"]}
        title="Our Team"
        subtitle="A dedicated team of licensed, passionate beauty professionals ready to bring out your best."
        image={images.aboutWoman}
        imageAlt="Maricel Beauty Center team member at work"
      />

      <TeamGrid />
      <CareersSection />

      <CtaBanner
        title="Ready to Reveal Your Best?"
        subtitle="Book your appointment today and let our team take care of you."
      />
    </div>
  );
}
