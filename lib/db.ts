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
};
