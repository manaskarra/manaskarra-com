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
import { site } from "@/lib/site";

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
  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: site.name, url: site.url }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: site.twitter,
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
  const showLabels = post.slug !== "magenta-wsp";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    url: `${site.url}/blog/${post.slug}`,
    image: `${site.url}/blog/${post.slug}/opengraph-image`,
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <Section marker={marker} label={label} as="article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="mb-10 font-mono text-[11px]">
        <Link
          href="/blog"
          className="text-link text-fg-subtle"
        >
          ← all writing
        </Link>
      </nav>

      <header className="mb-12 max-w-[920px]">
        {showLabels && <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">field note</p>}
        <h1 className={`${showLabels ? "mt-5 " : ""}font-serif text-[clamp(3rem,8vw,5.5rem)] leading-[0.98] tracking-[-0.04em] text-fg`}>
          {post.title}
        </h1>
        <p className="mt-7 max-w-[60ch] text-[18px] leading-[1.7] text-fg-subtle sm:text-[20px]">
          {post.excerpt}
        </p>
        {showLabels && post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-[10px] text-fg-subtle">
            {post.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
        )}
      </header>

      <div className="prose-post border-t border-rule pt-10">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>

      <footer className="mt-16 flex flex-col justify-between gap-5 border-t border-rule pt-8 sm:flex-row sm:items-center">
        <p className="font-serif text-[24px] text-fg">Keep following the thread.</p>
        <div className="flex flex-wrap gap-5 font-mono text-[11px]">
          <Link href="/blog" className="text-link text-fg-subtle">more writing →</Link>
          <a href={`mailto:${site.emails.primary}`} className="text-link text-accent">send a thought ↗</a>
        </div>
      </footer>
    </Section>
  );
}
