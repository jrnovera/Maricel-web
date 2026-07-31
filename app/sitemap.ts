import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/packages",
  "/our-team",
  "/careers",
  "/gallery",
  "/blog",
  "/contact",
];

async function getPostEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data } = await createAdminClient()
      .from("mbc_blog_posts")
      .select("*")
      .eq("is_active", true);

    return (data ?? []).map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at ?? p.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostEntries();

  return [
    ...staticPaths.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...posts,
  ];
}
