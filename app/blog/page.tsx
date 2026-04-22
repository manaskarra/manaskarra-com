import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "blog",
  description:
    "Notes on AI products, tooling, typography, beat making, and whatever I can't stop thinking about.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section
      marker="§ 03 / blog"
      label={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
    >
      <header>
        <h1 className="font-serif text-[48px] sm:text-[64px] leading-[1.02] tracking-[-0.025em] text-fg">
          Writing.
        </h1>
        <p className="mt-6 text-fg-subtle text-[17px] leading-relaxed max-w-[52ch]">
          Essays, teardowns, and short notes. Mostly about AI, sometimes about
          music, occasionally whatever else I can&rsquo;t stop thinking about.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="font-mono text-[12px] text-fg-subtle mt-14">
          nothing published yet. coming soon.
        </p>
      ) : (
        <ul className="border-t border-rule mt-14">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-rule">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline sm:gap-8 py-6 sm:py-7"
              >
                <time
                  dateTime={post.date}
                  className="font-mono text-[11px] text-fg-subtle sm:w-28 shrink-0 mb-1 sm:mb-0 tabular-nums"
                >
                  {formatPostDate(post.date)}
                </time>
                <div className="flex-1">
                  <h2 className="font-serif text-[22px] leading-snug tracking-tight text-fg group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-fg-subtle text-[14px] leading-relaxed max-w-[60ch]">
                    {post.excerpt}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-2 flex gap-3 font-mono text-[10px] text-fg-subtle">
                      {post.tags.map((t) => (
                        <span key={t}>#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
