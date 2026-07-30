"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { createEnquiry } from "@/app/contact/actions";
import { contact } from "@/lib/site";

const field =
  "w-full rounded-lg border border-pink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500/50 focus:border-pink-400 disabled:bg-pink-50/50";

export default function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const result = await createEnquiry(data);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      form.reset();
      setSent(true);
    });
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-pink-200 bg-white p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-500">
          <CheckCircle2 size={26} strokeWidth={1.5} />
        </span>
        <h3 className="mt-4 font-display text-xl text-ink-900">
          Thank you for your enquiry
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Our team has received your message and will get back to you shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 rounded-lg border border-pink-400 px-6 py-2.5 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-500 hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          disabled={pending}
          placeholder="Your name"
          className={field}
        />
        <input
          name="phone"
          type="tel"
          required
          disabled={pending}
          placeholder="Phone number"
          className={field}
        />
      </div>

      <input
        name="email"
        type="email"
        disabled={pending}
        placeholder="Email (optional)"
        className={field}
      />

      <input
        name="subject"
        disabled={pending}
        placeholder="Subject (optional)"
        className={field}
      />

      <select name="service" defaultValue="" disabled={pending} className={field}>
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
        disabled={pending}
        placeholder="How can we help?"
        className={field}
      />

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-pink-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Message"}
        {!pending && <Send size={15} strokeWidth={1.75} />}
      </button>

      <p className="text-center text-xs text-ink-500">
        Prefer to call? Reach us on{" "}
        <a href={contact.phoneHref} className="text-pink-500 hover:underline">
          {contact.phone}
        </a>
      </p>
    </form>
  );
}
