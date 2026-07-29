import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { SplitHero, CtaBanner } from "@/components/ui";
import { images } from "@/lib/site";
import { createAdminClient } from "@/lib/supabase/admin";
import type { MbcBlogPost } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog — Maricel Beauty Center",
  description:
    "Expert beauty tips, wellness advice and self-care inspiration from Maricel Beauty Center.",
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

async function getPosts(page: number) {
  try {
    const supabase = createAdminClient();
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from("mbc_blog_posts")
      .select("id, slug, category, title, excerpt, content, image, published_at", {
        count: "exact",
      })
      .eq("is_active", true)
      .order("published_at", { ascending: false })
      .order("sort_order", { ascending: true })
      .range(from, to);

    // Before the migration runs the table is absent — the page renders a
    // "not set up yet" notice rather than breaking.
    if (error || !data) return { posts: [] as MbcBlogPost[], count: 0 };
    return { posts: data as MbcBlogPost[], count: count ?? 0 };
  } catch {
    return { posts: [] as MbcBlogPost[], count: 0 };
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { posts, count } = await getPosts(currentPage);
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <div>
      <SplitHero
        eyebrowLines={["Our Blog"]}
        title={
          <>
            Insights, Beauty Tips
            <br />& Self-Care
          </>
        }
        subtitle="Expert tips, wellness advice, and beauty inspiration to help you look and feel your best every day. Because self-care is the most beautiful kind of care."
        image={images.heroWoman}
        imageAlt="Woman enjoying a relaxing spa moment"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-pink-200 bg-white p-6 text-sm text-ink-700">
            <p className="font-medium text-ink-900">The blog isn&apos;t set up yet</p>
            <p className="mt-2 text-ink-500">
              No posts have been loaded into the database. Run{" "}
              <code className="rounded bg-pink-50 px-1.5 py-0.5 text-pink-600">
                supabase/migrations/0003_mbc_blog.sql
              </code>{" "}
              in Supabase to publish the sample posts.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-xl border border-pink-100 bg-white transition-shadow hover:shadow-md"
                >
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
                    <h3 className="mt-2 font-display text-lg leading-snug text-ink-900 sm:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-pink-50 pt-4 text-xs">
                      <span className="flex items-center gap-1.5 text-ink-500">
                        <Calendar size={13} className="text-pink-400" />
                        {formatDate(post.published_at)}
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
                    href={`/blog?page=${p}`}
                    aria-current={p === currentPage}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      p === currentPage
                        ? "bg-pink-500 text-white"
                        : "border border-pink-200 text-ink-700 hover:border-pink-400 hover:text-pink-500"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                <Link
                  href={`/blog?page=${Math.min(totalPages, currentPage + 1)}`}
                  aria-label="Next page"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-200 text-ink-700 transition-colors hover:border-pink-400 hover:text-pink-500"
                >
                  <ChevronRight size={16} />
                </Link>
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
