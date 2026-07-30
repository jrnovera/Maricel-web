import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { SplitHero, CtaBanner } from "@/components/ui";
import { images, siteUrl, siteName } from "@/lib/site";
import { createAdminClient } from "@/lib/supabase/admin";
import type { MbcBlogPost } from "@/lib/db";

const description =
  "Expert beauty tips, skincare advice and wellness inspiration from the team at Maricel Beauty Center in Dubai.";

export const metadata: Metadata = {
  title: "Beauty Tips & Skincare Advice",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: `Beauty Tips & Skincare Advice — ${siteName}`,
    description,
    siteName,
  },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

type ListPost = Pick<
  MbcBlogPost,
  "id" | "slug" | "category" | "title" | "excerpt" | "image" | "published_at"
>;

async function getPosts(page: number, category?: string) {
  try {
    const supabase = createAdminClient();
    const from = (page - 1) * PAGE_SIZE;

    let query = supabase
      .from("mbc_blog_posts")
      .select("id, slug, category, title, excerpt, image, published_at", {
        count: "exact",
      })
      .eq("is_active", true);

    if (category) query = query.eq("category", category);

    const { data, error, count } = await query
      .order("published_at", { ascending: false })
      .order("sort_order", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    // Before the migration runs the table is absent — the page renders a
    // "not set up yet" notice rather than breaking.
    if (error || !data) return { posts: [] as ListPost[], count: 0 };
    return { posts: data as ListPost[], count: count ?? 0 };
  } catch {
    return { posts: [] as ListPost[], count: 0 };
  }
}

/** Every category that has at least one published post, for the filter row. */
async function getCategories(): Promise<string[]> {
  try {
    const { data } = await createAdminClient()
      .from("mbc_blog_posts")
      .select("category")
      .eq("is_active", true);

    return [...new Set((data ?? []).map((r) => r.category as string))].sort();
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function pageHref(page: number, category?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page: pageParam, category } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const [{ posts, count }, categories] = await Promise.all([
    getPosts(currentPage, category),
    getCategories(),
  ]);
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog`,
    name: `${siteName} Blog`,
    description,
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      image: p.image,
      datePublished: p.published_at,
      url: `${siteUrl}/blog/${p.slug}`,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SplitHero
        eyebrowLines={["Our Blog"]}
        title={
          <>
            Beauty Tips, Skincare
            <br />& Self-Care
          </>
        }
        subtitle="Expert advice from our stylists and estheticians to help you look and feel your best between visits."
        image={images.heroWoman}
        imageAlt="Woman enjoying a relaxing spa moment"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            <Link
              href="/blog"
              className={`rounded-full px-5 py-2 text-xs font-medium transition-colors sm:text-sm ${
                !category
                  ? "bg-pink-500 text-white"
                  : "border border-pink-200 text-ink-700 hover:border-pink-400 hover:text-pink-500"
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog?category=${encodeURIComponent(c)}`}
                className={`rounded-full px-5 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  category === c
                    ? "bg-pink-500 text-white"
                    : "border border-pink-200 text-ink-700 hover:border-pink-400 hover:text-pink-500"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="rounded-lg border border-pink-200 bg-white p-6 text-sm text-ink-700">
            <p className="font-medium text-ink-900">
              {category ? "No posts in this category yet" : "No posts yet"}
            </p>
            <p className="mt-2 text-ink-500">
              {category ? (
                <Link href="/blog" className="text-pink-500 hover:underline">
                  View all posts
                </Link>
              ) : (
                <>
                  Staff can publish articles from the Blog section of the portal.
                  If this is a fresh install, run{" "}
                  <code className="rounded bg-pink-50 px-1.5 py-0.5 text-pink-600">
                    supabase/migrations/0003_mbc_blog.sql
                  </code>{" "}
                  in Supabase first.
                </>
              )}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-xl border border-pink-100 bg-white transition-shadow hover:shadow-md"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] font-semibold tracking-[0.15em] text-pink-500">
                        {post.category.toUpperCase()}
                      </p>
                      <h2 className="mt-2 font-display text-lg leading-snug text-ink-900 sm:text-xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-pink-50 pt-4 text-xs">
                        <span className="flex items-center gap-1.5 text-ink-500">
                          <Calendar size={13} className="text-pink-400" />
                          <time dateTime={post.published_at}>
                            {formatDate(post.published_at)}
                          </time>
                        </span>
                        <span className="flex items-center gap-1 font-medium text-pink-500">
                          Read More
                          <ArrowRight
                            size={13}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Blog pages"
                className="mt-12 flex items-center justify-center gap-2"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={pageHref(p, category)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      p === currentPage
                        ? "bg-pink-500 text-white"
                        : "border border-pink-200 text-ink-700 hover:border-pink-400 hover:text-pink-500"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link
                    href={pageHref(currentPage + 1, category)}
                    aria-label="Next page"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-200 text-ink-700 transition-colors hover:border-pink-400 hover:text-pink-500"
                  >
                    <ChevronRight size={16} />
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </section>

      <CtaBanner
        title="Ready to feel beautiful inside and out?"
        subtitle="Book your appointment today and let our experts take care of you."
      />
    </div>
  );
}
