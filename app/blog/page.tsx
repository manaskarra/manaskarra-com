import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { site } from "@/lib/site";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Field notes on AI products, agentic systems, tooling, music, and the things Manas Karra cannot stop thinking about.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: "Writing by Manas Karra",
    description: "Field notes on AI systems, tools, music, and building in public.",
    url: `${site.url}/blog`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "Writing by Manas Karra" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing by Manas Karra",
    description: "Field notes on AI systems, tools, music, and building in public.",
    creator: site.twitter,
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "Writing by Manas Karra" }],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section marker="03 / writing" label={`${posts.length} ${posts.length === 1 ? "note" : "notes"}`}>
      <PageHeader
        eyebrow="observations, not broadcasts"
        title="Field notes."
        description="Essays, teardowns, and shorter notes—mostly about AI, sometimes about music, always about something I wanted to understand better."
      />

      {posts.length === 0 ? (
        <div className="mt-14 rounded-[18px] border border-rule bg-bg-elevated p-8">
          <p className="font-serif text-[24px] text-fg">The notebook is open.</p>
          <p className="mt-2 text-[14px] text-fg-subtle">The first useful note will show up here soon.</p>
        </div>
      ) : (
        <ol className="mt-14 border-t border-rule">
          {posts.map((post, index) => (
            <li key={post.slug} className="border-b border-rule">
              <Link
                href={`/blog/${post.slug}`}
                className="editorial-row group grid gap-4 py-7 sm:grid-cols-[52px_128px_minmax(0,1fr)_auto] sm:gap-6 sm:px-4 sm:py-8"
              >
                <span className="font-mono text-[10px] tabular-nums text-fg-subtle">0{index + 1}</span>
                <time dateTime={post.date} className="font-mono text-[10px] tabular-nums text-fg-subtle sm:pt-1.5">
                  {formatPostDate(post.date)}
                </time>
                <div className="min-w-0">
                  <h2 className="font-serif text-[27px] leading-snug tracking-[-0.025em] text-fg transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <span className="mt-2 block max-w-[64ch] text-[14px] leading-relaxed text-fg-subtle">{post.excerpt}</span>
                  {post.tags.length > 0 && (
                    <span className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-fg-subtle">
                      {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                    </span>
                  )}
                </div>
                <span className="flex items-start gap-4 font-mono text-[10px] text-fg-subtle sm:pt-1.5">
                  {post.readingTime}
                  <span className="text-accent transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
