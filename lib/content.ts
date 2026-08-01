import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Copy a staff member has overridden in the admin portal, keyed by field.
 * Anything they have not touched falls through to the string hardcoded in the
 * page, so the site reads the same with an empty table.
 */
export type PageCopy = (key: string, fallback: string) => string;

export async function getPageCopy(pageKey: string): Promise<PageCopy> {
  let overrides: Record<string, string> = {};

  try {
    const { data } = await createAdminClient()
      .from("mbc_page_content")
      .select("field_key, value")
      .eq("page_key", pageKey);

    for (const row of data ?? []) {
      const value = String(row.value ?? "").trim();
      // Blank means "no override" — an admin clearing a box restores the
      // original copy rather than blanking the section on the live site.
      if (value) overrides[row.field_key] = value;
    }
  } catch {
    overrides = {};
  }

  return (key, fallback) => overrides[key] ?? fallback;
}
