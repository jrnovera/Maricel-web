import { SectionHeading } from "@/components/ui";
import BrandsTrack from "@/components/BrandsTrack";

export default function BrandsMarquee() {
  return (
    <section className="overflow-hidden bg-blush-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Maricel Beauty Center"
          title="Professional Brands We Use"
          subtitle="We work only with trusted, salon-grade names — so every treatment delivers results you can see and feel."
        />
      </div>

      <div className="mt-8 sm:mt-12">
        <BrandsTrack />
      </div>
    </section>
  );
}
