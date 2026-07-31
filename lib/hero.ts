import { createAdminClient } from "@/lib/supabase/admin";

export type HeroRow = {
  id: string;
  eyebrow: string | null;
  title_lead: string;
  title_accent: string | null;
  body: string | null;
  image: string;
};

/** Staff-uploaded hero content wins; hardcoded copy stands in until then. */
export async function getHeroRows(pageKey: string): Promise<HeroRow[]> {
  try {
    const { data } = await createAdminClient()
      .from("mbc_hero_images")
      .select("id, eyebrow, title_lead, title_accent, body, image")
      .eq("page_key", pageKey)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    return (data ?? []) as HeroRow[];
  } catch {
    return [];
  }
}
