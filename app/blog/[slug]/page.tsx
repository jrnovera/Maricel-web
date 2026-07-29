import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, ArrowLeft } from "lucide-react";
import { Eyebrow, CtaBanner } from "@/components/ui";
import { createAdminClient } from "@/lib/supabase/admin";
import type { MbcBlogPost } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getPost(slug: string): Promise<MbcBlogPost | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("mbc_blog_posts")
      .select("id, slug, category, title, excerpt, content, image, published_at")
      .eq("is_active", true)
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) return null;
    return data as MbcBlogPost;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog — Maricel Beauty Center" };
  return {
    title: `${post.title} — Maricel Beauty Center`,
    description: post.excerpt,
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

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-blush-100 to-pink-100">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-pink-500 hover:underline"
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>

          <Eyebrow className="mt-6">{post.category}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <span className="mt-5 flex items-center gap-1.5 text-xs text-ink-500">
            <Calendar size={13} className="text-pink-400" />
            {formatDate(post.published_at)}
          </span>
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
      </article>

      <CtaBanner
        title="Ready to feel beautiful inside and out?"
        subtitle="Book your appointment today and let our experts take care of you."
      />
    </div>
  );
}
