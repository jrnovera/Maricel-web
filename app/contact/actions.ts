"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { TABLE_MISSING } from "@/lib/db";

export type EnquiryResult = { ok: true } | { ok: false; error: string };

/** Saves a website enquiry for the staff portal to pick up. */
export async function createEnquiry(formData: FormData): Promise<EnquiryResult> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const fullName = get("name");
  const phone = get("phone");
  const message = get("message");

  if (!fullName || !phone || !message) {
    return { ok: false, error: "Please fill in your name, phone and message." };
  }

  const { error } = await createAdminClient().from("mbc_enquiries").insert({
    full_name: fullName,
    phone,
    email: get("email") || null,
    subject: get("subject") || null,
    service: get("service") || null,
    message,
  });

  if (error) {
    if (TABLE_MISSING.has(error.code)) {
      return {
        ok: false,
        error:
          "Enquiries aren't set up yet. Run supabase/migrations/0004_mbc_enquiries.sql in Supabase.",
      };
    }
    return { ok: false, error: "Could not send your message. Please try again." };
  }

  return { ok: true };
}
