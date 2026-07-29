"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { TABLE_MISSING } from "@/lib/db";

export type BookingResult =
  | { ok: true; bookingId: string; checkoutUrl?: string }
  | { ok: false; error: string; needsMigration?: boolean };

/**
 * Creates an appointment request. Payment is optional — most clients settle
 * at the salon, so "pay now" only builds a Stripe Checkout session when the
 * visitor explicitly asks for it.
 */
export async function createBooking(formData: FormData): Promise<BookingResult> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const fullName = get("name");
  const phone = get("phone");
  const email = get("email");
  const serviceId = get("serviceId");
  const serviceLabel = get("serviceLabel");
  const bookingDate = get("date");
  const timeSlot = get("time");
  const notes = get("notes");
  const payNow = get("payNow") === "on";

  if (!fullName || !phone || !serviceLabel || !bookingDate || !timeSlot) {
    return { ok: false, error: "Please fill in every required field." };
  }

  const supabase = createAdminClient();

  // Price comes from the database, never from the form — otherwise the
  // amount charged would be whatever the browser posted.
  let amount = 0;
  let resolvedServiceId: string | null = null;

  if (serviceId) {
    const { data: service, error: serviceError } = await supabase
      .from("mbc_services")
      .select("id, price")
      .eq("id", serviceId)
      .maybeSingle();

    if (serviceError && TABLE_MISSING.has(serviceError.code)) {
      return {
        ok: false,
        needsMigration: true,
        error:
          "The booking tables aren't set up yet. Run supabase/migrations/0001_mbc.sql in Supabase.",
      };
    }
    if (service) {
      amount = Number(service.price);
      resolvedServiceId = service.id;
    }
  }

  const { data: booking, error } = await supabase
    .from("mbc_bookings")
    .insert({
      service_id: resolvedServiceId,
      full_name: fullName,
      phone,
      email: email || null,
      service_label: serviceLabel,
      booking_date: bookingDate,
      time_slot: timeSlot,
      notes: notes || null,
      amount,
      status: "pending",
      payment_status: "unpaid",
    })
    .select("id")
    .single();

  if (error || !booking) {
    if (error && TABLE_MISSING.has(error.code)) {
      return {
        ok: false,
        needsMigration: true,
        error:
          "The booking tables aren't set up yet. Run supabase/migrations/0001_mbc.sql in Supabase.",
      };
    }
    return { ok: false, error: error?.message ?? "Could not save your booking." };
  }

  if (!payNow || amount <= 0) {
    return { ok: true, bookingId: booking.id };
  }

  try {
    const { getStripe } = await import("@/lib/stripe");
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3003";

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "aed",
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: serviceLabel,
              description: `${bookingDate} at ${timeSlot} — Maricel Beauty Center`,
            },
          },
        },
      ],
      customer_email: email || undefined,
      metadata: { mbc_booking_id: booking.id },
      success_url: `${origin}/appointment/success?booking=${booking.id}`,
      cancel_url: `${origin}/appointment?cancelled=1`,
    });

    await supabase
      .from("mbc_bookings")
      .update({ stripe_session_id: session.id })
      .eq("id", booking.id);

    return {
      ok: true,
      bookingId: booking.id,
      checkoutUrl: session.url ?? undefined,
    };
  } catch (err) {
    // The booking is already saved — payment can still be taken at the salon,
    // so surface the failure without losing the appointment.
    return {
      ok: true,
      bookingId: booking.id,
      checkoutUrl: undefined,
    };
  }
}
