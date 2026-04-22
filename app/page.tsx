import Link from "next/link";
import { site } from "@/lib/site";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { Section } from "@/components/Section";

export default function HomePage() {
  const latestPost = getAllPosts()[0];
  const latestProject = projects[0];
  const latestProjectLink = latestProject.links.find(
    (l) => l.label === "github"
  )?.href;

  return (
    <div>
      <Section marker="§ 01 / home" as="header">
        <h1 className="font-serif text-[56px] sm:text-[80px] lg:text-[96px] leading-[0.98] tracking-[-0.03em] text-fg">
          Manas<br className="sm:hidden" /> Karra
        </h1>
        <p
          className="mt-4 font-mono text-[11px] tracking-[0.12em] text-fg-subtle/70"
          aria-label="Based between Dubai, UAE and Hyderabad, India"
        >
          dxb/uae
          <span className="text-fg-subtle/40 mx-2" aria-hidden="true">
            ·
          </span>
          hyd/ind
        </p>
        <p className="mt-6 text-fg-subtle text-[17px] sm:text-[19px] leading-relaxed max-w-[56ch]">
          I build AI products, poke at research, and make hip-hop beats as{" "}
          <span className="text-fg">sledg3r</span>. This site is where all of it
          lives.
        </p>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px]">
          {site.social.map((s) => {
            const opensNewTab =
              s.href.startsWith("http") || s.href.endsWith(".pdf");
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={opensNewTab ? "_blank" : undefined}
                  rel={opensNewTab ? "noopener noreferrer" : undefined}
                  className="text-fg-subtle hover:text-accent transition-colors underline underline-offset-[5px] decoration-[1px] decoration-rule hover:decoration-accent"
                >
                  {s.label} ↗
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section
        marker="§ 01 / latest"
        className="mt-20 pt-14 border-t border-rule"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8">
          {latestPost && (
            <article>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle hover:text-accent transition-colors mb-3 group/label"
              >
                post
                <span className="transition-transform group-hover/label:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href={`/blog/${latestPost.slug}`}
                className="group block"
              >
                <h3 className="font-serif text-[20px] leading-snug tracking-tight text-fg group-hover:text-accent transition-colors">
                  {latestPost.title}
                </h3>
                <p className="font-mono text-[11px] text-fg-subtle mt-2">
                  {formatPostDate(latestPost.date)}
                </p>
              </Link>
            </article>
          )}

          <article>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle hover:text-accent transition-colors mb-3 group/label"
            >
              shipped
              <span className="transition-transform group-hover/label:translate-x-0.5">
                →
              </span>
            </Link>
            {latestProjectLink ? (
              <a
                href={latestProjectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <h3 className="font-serif text-[20px] leading-snug tracking-tight text-fg group-hover:text-accent transition-colors">
                  {latestProject.title}
                </h3>
                <p className="font-mono text-[11px] text-fg-subtle mt-2">
                  {latestProject.year}
                </p>
              </a>
            ) : (
              <div>
                <h3 className="font-serif text-[20px] leading-snug tracking-tight text-fg">
                  {latestProject.title}
                </h3>
                <p className="font-mono text-[11px] text-fg-subtle mt-2">
                  {latestProject.year}
                </p>
              </div>
            )}
          </article>
        </div>
      </Section>
    </div>
  );
}
