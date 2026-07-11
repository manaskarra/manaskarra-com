import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Applied AI engineer, hip-hop producer, and BITS Pilani graduate based between Dubai and Hyderabad.",
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    title: "About Manas Karra",
    description:
      "Applied AI engineer by day, hip-hop producer as sledg3r after hours.",
    url: `${site.url}/about`,
    siteName: site.name,
    locale: "en_US",
    type: "profile",
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "Manas Karra — Applied AI engineer and music producer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Manas Karra",
    description:
      "Applied AI engineer by day, hip-hop producer as sledg3r after hours.",
    creator: site.twitter,
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "Manas Karra — Applied AI engineer and music producer" }],
  },
};

function CVBlock({ idPrefix }: { idPrefix: string }) {
  const workId = `${idPrefix}-cv-work`;
  const schoolId = `${idPrefix}-cv-school`;
  const notesId = `${idPrefix}-cv-notes`;

  return (
    <div className="space-y-8 font-mono text-[11px] leading-relaxed text-fg-subtle">
      <section aria-labelledby={workId}>
        <p id={workId} className="mb-4 text-[10px] uppercase tracking-[0.15em] text-accent">work</p>
        <div className="space-y-5">
          <div>
            <p className="text-fg">Deriv</p>
            <p>applied ai engineer</p>
            <p className="mt-0.5 tabular-nums">feb 2025 → now</p>
            <p className="mt-0.5">intern → full-time, aug 2025</p>
          </div>
          <div>
            <p className="text-fg">Impiger Technologies</p>
            <p>qa analyst</p>
            <p className="mt-0.5 tabular-nums">summer 2023</p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule pt-7" aria-labelledby={schoolId}>
        <p id={schoolId} className="mb-4 text-[10px] uppercase tracking-[0.15em] text-accent">school</p>
        <div className="space-y-5">
          <div>
            <p className="text-fg">BITS Pilani</p>
            <p className="mt-0.5 tabular-nums">2021 → 2025</p>
          </div>
          <div>
            <p className="text-fg">The Indian High School</p>
            <p>dubai · 2013 → 2021</p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule pt-7" aria-labelledby={notesId}>
        <p id={notesId} className="mb-4 text-[10px] uppercase tracking-[0.15em] text-accent">notes</p>
        <div className="space-y-5">
          <div>
            <p className="text-fg">UAE Golden Visa</p>
            <p>distinction student · 2022</p>
          </div>
          <div>
            <p className="text-fg">Trinity College London</p>
            <p>grade 6 keyboard · distinction</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Section marker="01 / about" label="two disciplines" as="article" sidebar={<CVBlock idPrefix="sidebar" />}>
      <PageHeader
        eyebrow="systems · sound · curiosity"
        title="A little about me."
        description="I like making complicated things feel useful—whether that means an AI system people can trust with real work, or a melody that sounds inevitable."
      />

      <dl className="mt-12 grid border-y border-rule sm:grid-cols-3">
        <div className="py-5 sm:pr-6">
          <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-fg-subtle">work</dt>
          <dd className="mt-2 text-[14px] text-fg">Applied AI at Deriv</dd>
        </div>
        <div className="border-t border-rule py-5 sm:border-l sm:border-t-0 sm:px-6">
          <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-fg-subtle">based</dt>
          <dd className="mt-2 text-[14px] text-fg">Dubai ↔ Hyderabad</dd>
        </div>
        <div className="border-t border-rule py-5 sm:border-l sm:border-t-0 sm:pl-6">
          <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-fg-subtle">off clock</dt>
          <dd className="mt-2 text-[14px] text-fg">Production as sledg3r</dd>
        </div>
      </dl>

      <div className="prose-post mt-12 text-fg">
        <h2>Now</h2>
        <p>
          I&rsquo;m an Applied AI Engineer at{" "}
          <a href="https://deriv.com" target="_blank" rel="noopener noreferrer">Deriv</a>,
          where my work revolves around multi-agent systems and agentic tools that do useful work beyond the demo. I joined as an intern in February 2025, graduated from{" "}
          <a href="https://www.bits-pilani.ac.in" target="_blank" rel="noopener noreferrer">BITS Pilani</a>{" "}
          that year, and came on full-time in August.
        </p>
        <p>
          I feel lucky to be building while the field is changing this quickly. Papers, experiments, and late-night demos tend to turn into a notes app full of ideas; the ones that make it out usually land on{" "}
          <a href="https://github.com/manaskarra" target="_blank" rel="noopener noreferrer">GitHub</a>. Markets and finance remain a parallel rabbit hole.
        </p>

        <h2>Music</h2>
        <p>
          I installed FL Studio in 2013, got serious about production at university in 2021, and had already spent more than a decade around an electronic keyboard. That mix made sampling and melody feel closer to instinct than guesswork.
        </p>
        <p>
          The beats have since crossed a million plays on{" "}
          <a href="https://www.youtube.com/@sledg3r" target="_blank" rel="noopener noreferrer">YouTube</a>,
          with a few hundred licensed through{" "}
          <a href="https://www.beatstars.com/sledg3r" target="_blank" rel="noopener noreferrer">BeatStars</a>{" "}
          and placements with upcoming artists I respect. It still feels slightly unreal.
        </p>
      </div>

      <section className="mt-14 rounded-[20px] border border-rule bg-bg-elevated p-7 sm:p-9" aria-labelledby="contact-heading">
        <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-accent">say hello</p>
        <h2 id="contact-heading" className="mt-3 font-serif text-[32px] leading-tight tracking-[-0.025em] text-fg">Two inboxes, one person.</h2>
        <p className="mt-4 max-w-[56ch] text-[15px] leading-relaxed text-fg-subtle">
          Work, AI, general ideas, or something musical—pick the lane that fits. Thoughtful notes are always welcome.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={`mailto:${site.emails.primary}`} className="button-primary">work / general <span aria-hidden="true">↗</span></a>
          <a href={`mailto:${site.emails.beats}`} className="button-secondary">beats / production <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <div className="mt-14 border-t border-rule pt-10 lg:hidden">
        <CVBlock idPrefix="mobile" />
      </div>
    </Section>
  );
}
