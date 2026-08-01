import { createAdminClient } from "@/lib/supabase/admin";

export type PublicStaffMember = {
  name: string;
  role: string;
  image: string | null;
  bio: string | null;
  /** Which Our Team sections this person appears under — e.g. someone doing
   *  both nails and massage carries ["Beauty Specialist", "Therapist"] and
   *  is listed in both groups. Empty until an admin tags them. */
  categories: string[];
};

/** Staff who've opted into the public Our Team page; empty until an admin adds one. */
export async function getTeam(): Promise<PublicStaffMember[]> {
  try {
    const { data } = await createAdminClient()
      .from("profiles")
      .select("full_name, display_role, photo_url, bio, sort_order, team_categories")
      .eq("show_on_site", true)
      .order("sort_order", { ascending: true });

    return (data ?? [])
      .filter((r) => r.full_name)
      .map((r) => ({
        name: r.full_name as string,
        role: r.display_role || "Team Member",
        image: r.photo_url,
        bio: r.bio,
        categories: (r.team_categories as string[] | null) ?? [],
      }));
  } catch {
    return [];
  }
}
