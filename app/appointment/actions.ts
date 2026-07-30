"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { TABLE_MISSING } from "@/lib/db";

export type BookingResult =
  | { ok: true; bookingId: string }
  | { ok: false; error: string; needsMigration?: boolean };

/** Creates an appointment request. Payment is always settled at the salon. */
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

  if (!fullName || !phone || !serviceLabel || !bookingDate || !timeSlot) {
    return { ok: false, error: "Please fill in every required field." };
  }

  const supabase = createAdminClient();

  // Price comes from the database, never from the form — otherwise the
  // recorded amount would be whatever the browser posted.
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

  return { ok: true, bookingId: booking.id };
}
