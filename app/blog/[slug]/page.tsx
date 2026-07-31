import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, ArrowLeft, User, Tag } from "lucide-react";
import { Eyebrow, CtaBanner } from "@/components/ui";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteUrl, siteName } from "@/lib/site";
import type { MbcBlogPost } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getPost(slug: string): Promise<MbcBlogPost | null> {
  try {
    // `*` rather than a column list so the page still renders before the SEO
    // migration adds meta_title/tags/updated_at.
    const { data, error } = await createAdminClient()
      .from("mbc_blog_posts")
      .select("*")
      .eq("is_active", true)
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) return null;
    return data as MbcBlogPost;
  } catch {
    return null;
  }
}

/** Three more posts to keep readers on the site — internal links help SEO. */
async function getRelated(post: MbcBlogPost) {
  try {
    const { data } = await createAdminClient()
      .from("mbc_blog_posts")
      .select("id, slug, title, excerpt, image")
      .eq("is_active", true)
      .eq("category", post.category)
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(3);

    return (data ?? []) as Pick<
      MbcBlogPost,
      "id" | "slug" | "title" | "excerpt" | "image"
    >[];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const url = `/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.tags ?? undefined,
    authors: [{ name: post.author || siteName }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at ?? post.published_at,
      authors: [post.author || siteName],
      tags: post.tags ?? undefined,
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.image],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelated(post);
  const paragraphs = post.content.split("\n\n").filter(Boolean);
  const author = post.author || siteName;
  const url = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": url,
        headline: post.title,
        description: post.meta_description || post.excerpt,
        image: post.image,
        datePublished: post.published_at,
        dateModified: post.updated_at ?? post.published_at,
        articleSection: post.category,
        keywords: post.tags ?? [],
        author: { "@type": "Organization", name: author },
        publisher: {
          "@type": "Organization",
          name: siteName,
          logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-blush-100 to-pink-100">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-500">
            <Link href="/" className="hover:text-pink-500">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/blog" className="hover:text-pink-500">
              Blog
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink-700">{post.category}</span>
          </nav>

          <Eyebrow className="mt-6">{post.category}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-700 sm:text-base">
            {post.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-pink-400" />
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-pink-400" />
              {author}
            </span>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-8 space-y-5 text-sm leading-relaxed text-ink-700 sm:text-base">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-pink-100 pt-6">
            <Tag size={14} className="text-pink-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-pink-500 hover:underline"
        >
          <ArrowLeft size={15} />
          Back to Blog
        </Link>
      </article>

      {related.length > 0 && (
        <section className="bg-blush-50 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl text-ink-900 sm:text-3xl">
              More on {post.category}
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group overflow-hidden rounded-xl border border-pink-100 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base leading-snug text-ink-900">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-500">
                      {r.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title="Ready to feel beautiful inside and out?"
        subtitle="Send us an enquiry today and let our experts take care of you."
      />
    </div>
  );
}
