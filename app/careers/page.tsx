import type { Metadata } from "next";
import { FileText, Mail, Phone } from "lucide-react";
import ScriptHero, { GoldRule } from "@/components/ScriptHero";
import ServiceIcon from "@/components/ServiceIcon";
import RoleList from "@/components/RoleList";
import { Eyebrow } from "@/components/ui";
import { images, careers, careerRoles, contact, siteName } from "@/lib/site";
import { getHeroRows } from "@/lib/hero";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the team at Maricel Beauty Center in Dubai. Open roles for massage therapists, skin care specialists, nail technicians, hair stylists and front desk staff.",
  alternates: { canonical: "/careers" },
};

export const dynamic = "force-dynamic";

const applyHref = `mailto:${contact.email}?subject=${encodeURIComponent(
  `Career Application — ${siteName}`
)}`;

export default async function CareersPage() {
  const [hero] = await getHeroRows("careers");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": careerRoles.map((role) => ({
      "@type": "JobPosting",
      title: role.title,
      description: role.summary,
      hiringOrganization: { "@type": "Organization", name: siteName },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScriptHero
        title={hero?.title_lead ?? "Careers"}
        scriptTop={hero?.eyebrow ?? undefined}
        scriptBottom={hero ? undefined : "Join Our Team"}
        body={hero?.body ?? careers.body}
        image={hero?.image ?? images.careersTeam}
        imageAlt="Three smiling stylists with scissors and a brush at Maricel Beauty Center"
      />

      {/* Why work with us */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>Why Work With Us</Eyebrow>
            <GoldRule className="mt-3" />
            <h2 className="mt-4 font-display text-2xl leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
              More Than A Job,
              <br />
              It&apos;s A Passion
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-500 sm:text-base">
              At Maricel Beauty Center, we believe in growth, teamwork and
              creating a positive environment where you can shine.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-y-8 lg:mt-0 lg:grid-cols-4 lg:gap-y-0">
            {careers.perks.map((perk, i) => (
              <div
                key={perk.title}
                className={`px-3 text-center ${
                  i > 0 ? "lg:border-l lg:border-pink-100" : ""
                }`}
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-pink-200 text-pink-500">
                  <ServiceIcon name={perk.icon} size={28} />
                </span>
                <h3 className="mt-3 text-[11px] font-semibold leading-snug tracking-[0.1em] text-ink-900">
                  {perk.title.toUpperCase()}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-gradient-to-b from-pink-50 to-blush-100 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Eyebrow>Open Positions</Eyebrow>
            <GoldRule className="mx-auto mt-3 justify-center" />
            <h2 className="mt-4 font-display text-2xl leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
              Find Your Perfect Fit
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-500 sm:text-base">
              We&apos;re always looking for talented and dedicated individuals to
              join our growing team.
            </p>
          </div>

          <RoleList roles={careerRoles} email={contact.email} />

          {/* How to apply */}
          <div className="mt-8 rounded-xl border border-pink-200 bg-white p-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:gap-6">
              <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500 sm:flex">
                <FileText size={24} strokeWidth={1.5} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.15em] text-pink-500">
                  HOW TO APPLY
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  Send your resume to our email or give us a call. We can&apos;t
                  wait to meet you!
                </p>
              </div>

              <a
                href={applyHref}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-pink-500 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600 sm:mt-0 sm:w-auto sm:shrink-0"
              >
                Apply Now
              </a>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-pink-50 pt-4 text-sm sm:flex-row sm:gap-6">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-ink-500 hover:text-pink-500"
              >
                <Mail size={15} className="text-pink-400" />
                {contact.email}
              </a>
              <a
                href={contact.phoneHref}
                className="flex items-center gap-2 text-ink-500 hover:text-pink-500"
              >
                <Phone size={15} className="text-pink-400" />
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Closing band */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-pink-400 px-4 py-14 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl text-white sm:text-4xl">
          Join Our Team
        </h2>
        <div className="mt-4 flex justify-center">
          <GoldRule />
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm text-pink-50 sm:text-base">
          Together, let&apos;s create beauty, confidence and memories that last.
        </p>
        <a
          href={applyHref}
          className="mt-7 inline-flex rounded-lg bg-white px-8 py-3 text-sm font-medium text-pink-600 transition-colors hover:bg-pink-50"
        >
          Apply Today
        </a>
      </section>
    </div>
  );
}
