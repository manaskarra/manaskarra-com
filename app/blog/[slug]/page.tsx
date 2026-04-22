import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  formatPostDate,
  getAllPostSlugs,
  getPostBySlug,
} from "@/lib/posts";
import { mdxOptions } from "@/lib/mdx";
import { Section } from "@/components/Section";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export const dynamicParams = false;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const marker = `${formatPostDate(post.date)}`;
  const label = post.readingTime;

  return (
    <Section marker={marker} label={label} as="article">
      <nav className="font-mono text-[11px] mb-10">
        <Link
          href="/blog"
          className="text-fg-subtle hover:text-accent transition-colors"
        >
          ← all posts
        </Link>
      </nav>

      <header className="space-y-6 mb-10">
        <h1 className="font-serif text-[40px] sm:text-[52px] leading-[1.05] tracking-[-0.02em] text-fg">
          {post.title}
        </h1>
        <p className="text-fg-subtle text-[18px] leading-relaxed max-w-[58ch]">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <div className="font-mono text-[11px] text-fg-subtle flex flex-wrap gap-3">
            {post.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
        )}
      </header>

      <hr />

      <div className="prose-post mt-10">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>
    </Section>
  );
}
