import Image from "next/image";
import type { Metadata } from "next";
import { SplitHero, CtaBanner, Eyebrow } from "@/components/ui";
import GalleryGrid from "@/components/GalleryGrid";
import { images, founder } from "@/lib/site";
import { getGallery } from "@/lib/gallery";
import { getHeroRows } from "@/lib/hero";
import { getPageCopy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore the elegance of our salon, the artistry of our treatments, and the beautiful results we create every day.",
  alternates: { canonical: "/gallery" },
};

export const revalidate = 300;

const momentsDefaults = [
  { key: "moments.image1", src: images.interior, alt: "Maricel Beauty Center reception" },
  { key: "moments.image2", src: images.skincare, alt: "Products and flowers at the salon" },
  { key: "moments.image3", src: images.bridal, alt: "Stylist working with a client" },
];

export default async function GalleryPage() {
  const { name: founderName } = founder;
  const [items, [hero], c] = await Promise.all([
    getGallery(),
    getHeroRows("gallery"),
    getPageCopy("gallery"),
  ]);

  const moments = momentsDefaults.map((m) => ({
    src: c(m.key, m.src),
    alt: m.alt,
  }));

  return (
    <div>
      <SplitHero
        eyebrowLines={[hero?.eyebrow ?? "Our Gallery"]}
        title={
          hero ? (
            <>
              {hero.title_lead}{" "}
              {hero.title_accent && (
                <span className="text-pink-500">{hero.title_accent}</span>
              )}
            </>
          ) : (
            "Beauty in Every Detail"
          )
        }
        subtitle={
          hero?.body ??
          "Explore the elegance of our salon, the artistry of our treatments, and the beautiful results we create every day."
        }
        image={hero?.image ?? images.interior}
        imageAlt="Maricel Beauty Center salon interior"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <GalleryGrid items={items} />
      </section>

      {/* Moments at MBC */}
      <section className="bg-blush-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <Eyebrow>{c("moments.eyebrow", "Inside Maricel Beauty Center")}</Eyebrow>
            <h2 className="mt-3 font-display text-2xl leading-tight text-pink-500 sm:text-3xl lg:text-4xl">
              {c("moments.title", "Moments at MBC")}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-500 sm:text-base">
              {c(
                "moments.body",
                "Every corner of MBC is designed with love and attention to detail — to make you feel beautiful, relaxed, and cared for."
              )}
            </p>
            <p className="mt-8 font-display text-xl text-ink-900">
              {founderName.split(" ")[0]} ♡
            </p>
            <p className="text-xs font-semibold tracking-[0.15em] text-pink-500">
              {c("moments.founderLabel", "FOUNDER")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {moments.map((m, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden rounded-xl"
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 20vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={c("cta.title", "Ready to experience beauty with care?")}
        subtitle={c(
          "cta.subtitle",
          "Send us an enquiry today and let us bring out the best in you."
        )}
        buttonLabel={c("cta.button", "Book Appointment")}
      />
    </div>
  );
}
