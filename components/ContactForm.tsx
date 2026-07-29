"use client";

import { useState } from "react";
import { contact } from "@/lib/site";

const field =
  "w-full rounded-lg border border-pink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500/50 focus:border-pink-400";

/**
 * There's no mail backend on this site yet, so the form hands off to the
 * visitor's own mail client with the message pre-filled. Swap the submit
 * handler for a POST once an email service is wired up.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const service = String(data.get("service") ?? "");
    const message = String(data.get("message") ?? "");

    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      service ? `Service of interest: ${service}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Website enquiry from ${name}`
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={field} />
        <input
          name="phone"
          type="tel"
          required
          placeholder="Phone number"
          className={field}
        />
      </div>

      <input name="email" type="email" placeholder="Email (optional)" className={field} />

      <select name="service" defaultValue="" className={field}>
        <option value="">Service of interest (optional)</option>
        <option>Hair Services</option>
        <option>Nail Care</option>
        <option>Skin Care / Facials</option>
        <option>Brows &amp; Lashes</option>
        <option>Waxing</option>
        <option>Makeup &amp; Styling</option>
        <option>Body &amp; Massage</option>
        <option>Packages</option>
      </select>

      <textarea
        name="message"
        rows={4}
        required
        placeholder="How can we help?"
        className={field}
      />

      <button
        type="submit"
        className="w-full rounded-full bg-pink-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600"
      >
        Send Message
      </button>

      {sent && (
        <p className="rounded-lg bg-pink-50 px-4 py-3 text-xs text-pink-700">
          Your mail app should have opened with the message ready to send. If it
          didn&apos;t, email us directly at{" "}
          <a href={`mailto:${contact.email}`} className="underline">
            {contact.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
