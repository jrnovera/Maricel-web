import type { Metadata } from "next";
import ServiceIcon from "@/components/ServiceIcon";
import { PageHero, CtaBanner } from "@/components/ui";
import { images, brands } from "@/lib/site";
import {
  serviceGroups,
  bodyMassage,
  type ServiceGroup,
} from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services & Price List — Maricel Beauty Center",
  description:
    "Hair, nails, facials, brows & lashes, waxing, makeup and massage. Premium care, tailored beauty, and refined results in Dubai.",
};

function PriceCard({
  group,
  wide = false,
}: {
  group: ServiceGroup;
  wide?: boolean;
}) {
  return (
    <div className="rounded-xl border border-pink-100 bg-blush-50/60 p-5 sm:p-6">
      <div className={wide ? "sm:flex sm:items-start sm:gap-8" : ""}>
        <div className={wide ? "sm:w-56 sm:shrink-0 sm:text-center" : ""}>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500">
            <ServiceIcon name={group.icon} size={28} />
          </span>
          <h2 className="mt-3 text-center font-display text-lg tracking-wide text-pink-500 sm:text-xl">
            {group.title}
          </h2>
          <div className="divider-lotus mt-2">
            <span>✦</span>
          </div>
        </div>

        <div className={wide ? "mt-5 flex-1 sm:mt-0" : "mt-5"}>
          <ul
            className={`space-y-2.5 ${
              wide ? "sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-2.5 sm:space-y-0" : ""
            }`}
          >
            {group.items.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="text-ink-700">{item.name}</span>
                <span className="shrink-0 font-medium text-ink-900">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>

          {group.note && (
            <p className="mt-4 text-center text-[11px] italic leading-relaxed text-pink-500 sm:text-xs">
              {group.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        title="Our Services"
        subtitle="Premium care, tailored beauty, and refined results."
        image={images.massage}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((g) => (
            <PriceCard key={g.slug} group={g} />
          ))}
        </div>

        <div className="mt-5">
          <PriceCard group={bodyMassage} wide />
        </div>
      </section>

      {/* Brand strip */}
      <section className="bg-gradient-to-r from-pink-50 via-blush-100 to-pink-50 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divider-lotus mb-5">
            <span>✦</span>
          </div>
          <p className="text-center text-[11px] font-semibold tracking-[0.25em] text-pink-600 sm:text-xs">
            OUR PROFESSIONAL BEAUTY BRANDS
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8">
            {brands.map((b, i) => (
              <span key={b} className="flex items-center gap-5 sm:gap-8">
                <span className="text-xs font-medium tracking-wide text-ink-700 sm:text-sm">
                  {b}
                </span>
                {i < brands.length - 1 && (
                  <span className="hidden h-3 w-px bg-pink-300 sm:inline-block" />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20">
        <CtaBanner
          title="Ready to look and feel your best?"
          subtitle="Book your appointment today and let our experts pamper you with the care you deserve."
          buttonLabel="BOOK APPOINTMENT"
          variant="deep"
        />
      </div>
    </div>
  );
}
