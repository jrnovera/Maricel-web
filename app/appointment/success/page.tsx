import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Booking Received",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ booking?: string }>;
}) {
  const { booking } = await searchParams;

  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-500">
        <Check size={30} strokeWidth={1.5} />
      </span>

      <h1 className="mt-6 font-display text-3xl text-ink-900 sm:text-4xl">
        Thank You!
      </h1>
      <div className="divider-lotus mt-4">
        <span>✦</span>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink-500 sm:text-base">
        We&apos;ve received your appointment request. Our team will call you
        shortly to confirm your slot.
      </p>

      {booking && (
        <p className="mt-4 text-xs text-ink-500">
          Reference:{" "}
          <span className="font-mono text-pink-500">
            {booking.slice(0, 8).toUpperCase()}
          </span>
        </p>
      )}

      <p className="mt-6 text-sm text-ink-500">
        Questions? Call us on{" "}
        <a href={contact.phoneHref} className="text-pink-500 hover:underline">
          {contact.phone}
        </a>
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-pink-500 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600"
      >
        Back to Home
      </Link>
    </section>
  );
}
