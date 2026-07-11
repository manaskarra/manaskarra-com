import Link from "next/link";
import { site } from "@/lib/site";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { Section } from "@/components/Section";
import { VinylScene } from "@/components/VinylScene";

const featuredSocials = site.social.filter((item) =>
  ["github", "linkedin", "x"].includes(item.label)
);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  alternateName: site.producerHandle,
  jobTitle: "Applied AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Deriv",
    url: "https://deriv.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "BITS Pilani",
    url: "https://www.bits-pilani.ac.in",
  },
  sameAs: site.social
    .map((item) => item.href)
    .filter((href) => href.startsWith("http")),
  knowsAbout: ["Applied AI", "multi-agent systems", "agentic tools", "music production"],
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 2);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Section marker="00 / home" label="dxb ↔ hyd" as="header">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              applied ai engineer · music producer
            </p>
            <h1 className="mt-5 font-serif text-[clamp(4rem,11vw,7.5rem)] leading-[0.84] tracking-[-0.055em] text-fg sm:leading-[0.9]">
              <span className="block sm:inline">Manas</span>{" "}
              <span className="block sm:inline">
                Karra<span className="text-accent">.</span>
              </span>
            </h1>
            <p className="mt-8 max-w-[54ch] text-[18px] leading-[1.72] text-fg-subtle sm:text-[20px]">
              I build agentic systems at{" "}
              <a className="text-link text-fg" href="https://deriv.com" target="_blank" rel="noopener noreferrer">
                Deriv
              </a>{" "}
              and release hip-hop production as <strong className="font-medium text-fg">sledg3r</strong>—two sides of the same curious brain.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="button-primary">
                view selected work <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://www.youtube.com/@sledg3r"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                listen to sledg3r <span aria-hidden="true">↗</span>
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] text-fg-subtle">
              {featuredSocials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    {item.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <Link href="/resume" className="text-link">résumé →</Link>
              </li>
            </ul>
          </div>

          <div className="hero-vinyl-shell h-[330px] sm:h-[390px] lg:h-[440px]">
            <span className="hero-vinyl-label left-5 top-5">side a / systems</span>
            <span className="hero-vinyl-label bottom-5 right-5">side b / sound</span>
            <VinylScene className="h-full w-full" />
          </div>
        </div>

        <dl className="mt-12 grid border-y border-rule sm:grid-cols-3">
          <div className="py-5 sm:pr-6">
            <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-fg-subtle">now</dt>
            <dd className="mt-2 text-[14px] leading-snug text-fg">Applied AI Engineer at Deriv</dd>
          </div>
          <div className="border-t border-rule py-5 sm:border-l sm:border-t-0 sm:px-6">
            <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-fg-subtle">focused on</dt>
            <dd className="mt-2 text-[14px] leading-snug text-fg">Multi-agent systems & useful tools</dd>
          </div>
          <div className="border-t border-rule py-5 sm:border-l sm:border-t-0 sm:pl-6">
            <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-fg-subtle">after hours</dt>
            <dd className="mt-2 text-[14px] leading-snug text-fg">sledg3r · 1M+ plays on YouTube</dd>
          </div>
        </dl>
      </Section>

      <Section
        marker="01 / selected work"
        label={`${projects.length} projects`}
        className="mt-24 border-t border-rule pt-16 sm:mt-32 sm:pt-20"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent">from idea to working</p>
            <h2 className="mt-3 font-serif text-[clamp(2.4rem,6vw,4rem)] leading-none tracking-[-0.035em] text-fg">
              Selected work.
            </h2>
          </div>
          <Link href="/projects" className="text-link w-fit font-mono text-[11px] text-fg-subtle">
            see all projects →
          </Link>
        </div>

        <ul className="mt-10 border-t border-rule">
          {featuredProjects.map((project, index) => {
            const primaryLink =
              project.links.find((link) => link.label === "case study") ??
              project.links[0];
            const isExternal = primaryLink?.href.startsWith("http") ?? false;
            const rowClass =
              "editorial-row group grid gap-4 py-6 sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:gap-6 sm:px-4 sm:py-7";
            const rowContent = (
              <>
                <span className="font-mono text-[10px] tabular-nums text-fg-subtle">0{index + 1}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-serif text-[25px] leading-tight tracking-[-0.02em] text-fg transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[64ch] text-[14px] leading-[1.65] text-fg-subtle">
                    {project.description}
                  </p>
                </div>
                <span className="flex items-start gap-4 font-mono text-[10px] text-fg-subtle sm:pt-2">
                  {project.year}{" "}
                  <span className="text-accent transition-transform group-hover:translate-x-1" aria-hidden="true">
                    {isExternal ? "↗" : "→"}
                  </span>
                </span>
              </>
            );
            return (
              <li key={project.title} className="border-b border-rule">
                {!primaryLink ? (
                  <div className="grid gap-4 py-6 sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:gap-6 sm:px-4 sm:py-7">
                    <span className="font-mono text-[10px] text-fg-subtle">0{index + 1}</span>
                    <h3 className="font-serif text-[25px] text-fg">{project.title}</h3>
                    <span className="font-mono text-[10px] text-fg-subtle">{project.year}</span>
                  </div>
                ) : isExternal ? (
                  <a
                    href={primaryLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClass}
                  >
                    {rowContent}
                  </a>
                ) : (
                  <Link href={primaryLink.href} className={rowClass}>
                    {rowContent}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section
        marker="02 / field notes"
        label="ai + music"
        className="mt-24 border-t border-rule pt-16 sm:mt-32 sm:pt-20"
      >
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <section aria-labelledby="latest-writing">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent">thinking in public</p>
                <h2 id="latest-writing" className="mt-3 font-serif text-[36px] leading-none tracking-[-0.03em] text-fg">Latest writing.</h2>
              </div>
              <Link href="/blog" className="text-link shrink-0 font-mono text-[11px] text-fg-subtle">all notes →</Link>
            </div>
            <ul className="mt-8 border-t border-rule">
              {latestPosts.map((post) => (
                <li key={post.slug} className="border-b border-rule">
                  <Link href={`/blog/${post.slug}`} className="group block py-6">
                    <div className="flex items-center justify-between gap-5 font-mono text-[10px] text-fg-subtle">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-[23px] leading-snug tracking-[-0.02em] text-fg transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-fg-subtle">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <aside className="relative overflow-hidden rounded-[20px] border border-rule bg-bg-elevated p-7 sm:p-9" aria-labelledby="music-heading">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[28px] border-accent/10" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent">side b / sledg3r</p>
            <h2 id="music-heading" className="mt-4 max-w-[12ch] font-serif text-[36px] leading-[1.02] tracking-[-0.03em] text-fg">
              Loops after hours.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.7] text-fg-subtle">
              A decade around keys, a few hundred beat licenses, and more than a million YouTube plays. Sampling and melody are the other half of how I think.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://www.youtube.com/@sledg3r" target="_blank" rel="noopener noreferrer" className="button-primary">
                youtube <span aria-hidden="true">↗</span>
              </a>
              <a href="https://www.beatstars.com/sledg3r" target="_blank" rel="noopener noreferrer" className="button-secondary">
                beatstars <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
