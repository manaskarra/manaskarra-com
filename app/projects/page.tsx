import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected AI, multi-agent, generative-music, and computer-vision projects by Manas Karra.",
  alternates: { canonical: `${site.url}/projects` },
  openGraph: {
    title: "Selected work by Manas Karra",
    description: "Agentic research tools, multi-model systems, generative music, and computer vision.",
    url: `${site.url}/projects`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "Selected work by Manas Karra" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected work by Manas Karra",
    description: "Agentic research tools, multi-model systems, generative music, and computer vision.",
    creator: site.twitter,
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "Selected work by Manas Karra" }],
  },
};

export default function ProjectsPage() {
  return (
    <Section marker="02 / projects" label={`${projects.length} selected`}>
      <PageHeader
        eyebrow="built, tested, shipped"
        title="Selected work."
        description="Projects that made it from a curious question to something working—from agents that compare ideas to models that make music."
      />

      <ol className="mt-14 border-t border-rule">
        {projects.map((project, index) => (
          <li key={project.title} className="editorial-row border-b border-rule py-7 sm:px-4 sm:py-9">
            <article className="grid gap-5 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:gap-7">
              <span className="font-mono text-[10px] tabular-nums text-fg-subtle">0{index + 1}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="font-serif text-[30px] leading-tight tracking-[-0.025em] text-fg">{project.title}</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.11em] text-accent">{project.category}</span>
                </div>
                <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.7] text-fg-subtle">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] text-fg-subtle" aria-label="technology stack">
                  {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <div className="mt-6 flex flex-wrap gap-5 font-mono text-[11px]">
                  {project.links.map((link) =>
                    link.href.startsWith("http") ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link text-accent"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link key={link.label} href={link.href} className="text-link text-accent">
                        {link.label} →
                      </Link>
                    )
                  )}
                </div>
              </div>
              <span className="font-mono text-[10px] text-fg-subtle sm:pt-2">{project.year}</span>
            </article>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col justify-between gap-5 border-b border-rule pb-6 sm:flex-row sm:items-end">
        <p className="max-w-[48ch] text-[14px] leading-relaxed text-fg-subtle">
          The useful experiments usually start as a rough script. The rest of them live on GitHub while they find their shape.
        </p>
        <a href="https://github.com/manaskarra" target="_blank" rel="noopener noreferrer" className="text-link shrink-0 font-mono text-[11px] text-accent">
          browse github ↗
        </a>
      </div>
    </Section>
  );
}
