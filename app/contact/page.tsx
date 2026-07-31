import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SplitHero, CtaBanner } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { images, contact } from "@/lib/site";
import { getHeroRows } from "@/lib/hero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit or call Maricel Beauty Center in Dubai. Opening hours, location and enquiries.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

const infoCards = [
  {
    icon: Phone,
    label: "Phone Call",
    lines: [contact.phone],
    href: contact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email ID",
    lines: [contact.email],
    href: `mailto:${contact.email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    lines: [contact.address],
  },
];

export default async function ContactPage() {
  const [hero] = await getHeroRows("contact");
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contact.address
  )}`;

  return (
    <div>
      <SplitHero
        eyebrowLines={[hero?.eyebrow ?? "Get in Touch"]}
        title={
          hero ? (
            <>
              {hero.title_lead}{" "}
              {hero.title_accent && (
                <span className="text-pink-500">{hero.title_accent}</span>
              )}
            </>
          ) : (
            <>
              Contact <span className="text-pink-500">Us</span>
            </>
          )
        }
        subtitle={
          hero?.body ??
          "We're here for you! Whether you have a question, want to learn more about our services, or want to send an enquiry, our team is happy to assist you."
        }
        image={hero?.image ?? images.interior2}
        imageAlt="Maricel Beauty Center reception"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {infoCards.map((card) => {
              const Content = (
                <div className="flex items-start gap-4 rounded-xl border border-pink-100 bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500">
                    <card.icon size={18} strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.15em] text-pink-500">
                      {card.label.toUpperCase()}
                    </p>
                    {card.lines.map((line) => (
                      <p
                        key={line}
                        className="mt-1 break-words text-sm text-ink-700 sm:text-base"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  className="block transition-colors hover:border-pink-300"
                >
                  {Content}
                </a>
              ) : (
                <div key={card.label}>{Content}</div>
              );
            })}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-pink-100 bg-blush-50/60 p-5 sm:p-8">
            <h2 className="font-display text-xl text-ink-900 sm:text-2xl">
              Send Us a <span className="text-pink-500">Message</span>
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map + hours */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-xl text-ink-900 sm:text-2xl">
              Visit Our <span className="text-pink-500">Salon</span>
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              We&apos;d love to welcome you to Maricel Beauty Center. Find us
              at our convenient location.
            </p>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-5 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-pink-100 bg-blush-50 transition-colors hover:border-pink-300"
            >
              <span className="flex flex-col items-center gap-2 text-pink-500">
                <MapPin size={28} strokeWidth={1.5} />
                <span className="text-xs font-medium text-ink-700 group-hover:text-pink-500">
                  View on Google Maps
                </span>
              </span>
            </a>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 sm:text-2xl">
              Opening <span className="text-pink-500">Hours</span>
            </h2>
            <ul className="mt-5 space-y-3">
              {contact.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex items-center justify-between rounded-xl border border-pink-100 bg-white px-5 py-4 text-sm"
                >
                  <span className="text-ink-900">{h.days}</span>
                  <span className="text-ink-500">{h.time}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-blush-50 px-5 py-4">
              <Clock size={16} className="mt-0.5 shrink-0 text-pink-400" />
              <p className="text-xs text-ink-500 sm:text-sm">
                Walk-ins are welcome, but appointments are recommended.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to Feel Your Best?"
        subtitle="Send us an enquiry today and let us take care of you with love and expertise."
      />
    </div>
  );
}
