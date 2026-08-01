import { createAdminClient } from "@/lib/supabase/admin";
import { galleryItems, type GalleryEntry } from "@/lib/site";
import type { MbcGalleryItem } from "@/lib/db";

/** Staff-uploaded photos win; the curated stock set stands in until then. */
export async function getGallery(): Promise<GalleryEntry[]> {
  try {
    const { data } = await createAdminClient()
      .from("mbc_gallery")
      .select("id, image, caption, category")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    const rows = (data ?? []) as MbcGalleryItem[];
    if (rows.length === 0) return galleryItems;

    return rows.map((r) => ({
      src: r.image,
      caption: r.caption,
      category: r.category,
    }));
  } catch {
    return galleryItems;
  }
}
