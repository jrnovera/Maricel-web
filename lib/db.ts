// PostgREST reports a missing/uncached table as PGRST205 rather than passing
// through Postgres's raw 42P01, so both are treated as "run the migration".
export const TABLE_MISSING = new Set(["PGRST205", "42P01"]);

export type MbcService = {
  id: string;
  category: string;
  name: string;
  price: number;
  price_label: string | null;
  duration_minutes: number;
};

export type MbcBlogPost = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  published_at: string;
  meta_title: string | null;
  meta_description: string | null;
  author: string | null;
  tags: string[] | null;
  updated_at: string | null;
};

export type MbcGalleryItem = {
  id: string;
  image: string;
  caption: string;
  category: string;
};
