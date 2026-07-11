import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ResumeEmbed } from "@/components/ResumeEmbed";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Experience, education, and selected work from Manas Karra.",
  alternates: { canonical: `${site.url}/resume` },
  openGraph: {
    title: "Résumé — Manas Karra",
    description: "Experience, education, and selected work from Manas Karra.",
    url: `${site.url}/resume`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "Résumé — Manas Karra" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Résumé — Manas Karra",
    description: "Experience, education, and selected work from Manas Karra.",
    creator: site.twitter,
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "Résumé — Manas Karra" }],
  },
};

export default function ResumePage() {
  return (
    <Section marker="cv / 2026" label="pdf · 1 page">
      <PageHeader
        eyebrow="experience & education"
        title="Résumé."
        description="The compact version of what I have worked on, where I have studied, and the tools I use to make things."
      />

      <div className="mt-9 flex flex-wrap gap-3">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="button-primary">
          open pdf <span aria-hidden="true">↗</span>
        </a>
        <a href="/resume.pdf" download className="button-secondary">
          download <span aria-hidden="true">↓</span>
        </a>
      </div>

      <ResumeEmbed />

      <p className="sr-only">
        If the embedded PDF is unavailable, <a href="/resume.pdf">open the résumé directly</a>.
      </p>

      <div className="mt-12 rounded-[18px] border border-rule bg-bg-elevated p-7 md:hidden">
        <p className="font-serif text-[24px] leading-tight text-fg">Made for a larger page.</p>
        <p className="mt-3 text-[14px] leading-relaxed text-fg-subtle">
          Mobile PDF viewers vary, so the cleanest route is to open the one-page résumé directly.
        </p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex font-mono text-[11px] text-accent text-link">
          open résumé ↗
        </a>
      </div>
    </Section>
  );
}
