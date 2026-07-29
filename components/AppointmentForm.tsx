"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/appointment/actions";
import { contact } from "@/lib/site";
import type { MbcService } from "@/lib/db";

const field =
  "w-full rounded-lg border border-pink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500/50 focus:border-pink-400 disabled:bg-pink-50/50";

const label = "mb-1.5 block text-xs font-semibold tracking-[0.12em] text-ink-900";

const times = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

export default function AppointmentForm({
  services,
}: {
  services: MbcService[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [serviceId, setServiceId] = useState("");

  const byCategory = services.reduce<Record<string, MbcService[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  const selected = services.find((s) => s.id === serviceId);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    // Snapshot the human-readable label so the booking still reads correctly
    // if the service is later renamed or removed.
    formData.set(
      "serviceLabel",
      selected ? `${selected.name} — ${priceLabel(selected)}` : ""
    );

    startTransition(async () => {
      const result = await createBooking(formData);

      if (!result.ok) {
        setError(result.error);
        return;
      }
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      router.push(`/appointment/success?booking=${result.bookingId}`);
    });
  }

  const today = new Date().toISOString().split("T")[0];

  if (services.length === 0) {
    return (
      <div className="rounded-lg border border-pink-200 bg-white p-5 text-sm text-ink-700">
        <p className="font-medium text-ink-900">Online booking isn&apos;t live yet</p>
        <p className="mt-2 text-ink-500">
          The service list hasn&apos;t been loaded into the database. Run{" "}
          <code className="text-pink-500">
            supabase/migrations/0001_mbc.sql
          </code>{" "}
          in Supabase to enable it.
        </p>
        <p className="mt-3 text-ink-500">
          In the meantime, call us on{" "}
          <a href={contact.phoneHref} className="text-pink-500 hover:underline">
            {contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>YOUR NAME</label>
          <input name="name" required disabled={pending} className={field} />
        </div>
        <div>
          <label className={label}>PHONE NUMBER</label>
          <input
            name="phone"
            type="tel"
            required
            disabled={pending}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label}>EMAIL (OPTIONAL)</label>
        <input name="email" type="email" disabled={pending} className={field} />
      </div>

      <div>
        <label className={label}>SERVICE</label>
        <select
          name="serviceId"
          required
          disabled={pending}
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className={field}
        >
          <option value="" disabled>
            Choose a service
          </option>
          {Object.entries(byCategory).map(([category, items]) => (
            <optgroup key={category} label={category}>
              {items.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {priceLabel(s)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>PREFERRED DATE</label>
          <input
            name="date"
            type="date"
            required
            min={today}
            disabled={pending}
            className={field}
          />
        </div>
        <div>
          <label className={label}>PREFERRED TIME</label>
          <select
            name="time"
            required
            defaultValue=""
            disabled={pending}
            className={field}
          >
            <option value="" disabled>
              Choose a time
            </option>
            {times.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>NOTES (OPTIONAL)</label>
        <textarea
          name="notes"
          rows={3}
          disabled={pending}
          placeholder="Anything we should know before your visit?"
          className={field}
        />
      </div>

      {selected && (
        <label className="flex items-start gap-3 rounded-lg border border-pink-200 bg-white p-4">
          <input
            type="checkbox"
            name="payNow"
            disabled={pending}
            className="mt-0.5 h-4 w-4 accent-pink-500"
          />
          <span className="text-sm text-ink-700">
            Pay online now
            <span className="mt-0.5 block text-xs text-ink-500">
              Secure card payment of AED {Number(selected.price).toLocaleString()}.
              Leave unticked to pay at the salon.
            </span>
          </span>
        </label>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-pink-500 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-pink-600 disabled:opacity-60"
      >
        {pending ? "SENDING…" : "Request Appointment"}
      </button>

      <p className="text-center text-xs text-ink-500">
        Your slot isn&apos;t reserved until we confirm by phone.
      </p>
    </form>
  );
}

function priceLabel(s: MbcService) {
  return s.price_label ?? `AED ${Number(s.price).toLocaleString()}`;
}
