import type { Metadata } from "next";
import { Phone, Clock, MousePointerClick, CalendarClock, CheckCircle2, Headset, ChevronRight } from "lucide-react";
import { SplitHero, CtaBanner, Eyebrow } from "@/components/ui";
import AppointmentForm from "@/components/AppointmentForm";
import { images, contact } from "@/lib/site";
import { createAdminClient } from "@/lib/supabase/admin";
import type { MbcService } from "@/lib/db";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request an appointment at Maricel Beauty Center. Choose your service, date and preferred time.",
  alternates: { canonical: "/appointment" },
};

export const dynamic = "force-dynamic";

const steps = [
  {
    icon: MousePointerClick,
    label: "Step 1",
    title: "Choose your service",
    desc: "Browse our services and pick what you need.",
  },
  {
    icon: CalendarClock,
    label: "Step 2",
    title: "Select your preferred schedule",
    desc: "Pick the date and time that works best for you.",
  },
  {
    icon: CheckCircle2,
    label: "Step 3",
    title: "Confirm your booking",
    desc: "Review your details and confirm your appointment.",
  },
];

async function getServices(): Promise<MbcService[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("mbc_services")
      .select("id, category, name, price, price_label, duration_minutes")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    // Before the migration runs the table is absent — the form renders a
    // "call us instead" fallback rather than breaking the page.
    if (error || !data) return [];
    return data as MbcService[];
  } catch {
    return [];
  }
}

export default async function AppointmentPage() {
  const services = await getServices();

  return (
    <div>
      <SplitHero
        eyebrowLines={["Welcome to", "Maricel Beauty Center"]}
        title={
          <>
            Book Your <span className="text-pink-500">Appointment</span>
          </>
        }
        subtitle="Booking your beauty time is quick and easy. We're here to help you look and feel your absolute best."
        image={images.facial}
        imageAlt="Treatment room at Maricel Beauty Center"
      />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-2xl border border-pink-100 bg-blush-50/60 p-5 sm:p-8">
          <AppointmentForm services={services} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href={contact.phoneHref}
            className="flex items-center gap-3 rounded-xl border border-pink-100 bg-white p-5 transition-colors hover:border-pink-300"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500">
              <Phone size={18} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-xs font-semibold tracking-[0.15em] text-pink-500">
                PREFER TO CALL?
              </span>
              <span className="mt-0.5 block text-sm text-ink-700">
                {contact.phone}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-3 rounded-xl border border-pink-100 bg-white p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500">
              <Clock size={18} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-xs font-semibold tracking-[0.15em] text-pink-500">
                OPENING HOURS
              </span>
              {contact.hours.map((h) => (
                <span key={h.days} className="mt-0.5 block text-xs text-ink-700">
                  {h.days} · {h.time}
                </span>
              ))}
            </span>
          </div>
        </div>
      </section>

      {/* How to book */}
      <section className="bg-blush-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Eyebrow>How to Book</Eyebrow>

          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {steps.map((s) => (
              <div key={s.title} className="flex flex-col items-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                  <s.icon size={26} strokeWidth={1.5} />
                </span>
                <p className="mt-4 text-[11px] font-semibold tracking-[0.15em] text-pink-500">
                  {s.label.toUpperCase()}
                </p>
                <h3 className="mt-1.5 font-display text-lg text-ink-900 sm:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-ink-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need help booking */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-pink-100 bg-white p-6 text-center sm:flex-row sm:justify-between sm:p-8 sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500">
              <Headset size={22} strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="font-display text-xl text-ink-900">
                Need help booking?
              </h3>
              <p className="mt-1 text-sm text-ink-500">
                Our team is happy to assist you. Get in touch with us and
                we&apos;ll be glad to help.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-pink-400 px-6 py-2.5 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-500 hover:text-white"
          >
            Contact Us
            <ChevronRight size={15} strokeWidth={2} />
          </a>
        </div>
      </section>

      <CtaBanner
        title="Your Beauty, Your Time. We'll Take Care of the Rest."
        subtitle="Book your appointment today and enjoy a luxurious experience made just for you."
      />
    </div>
  );
}
