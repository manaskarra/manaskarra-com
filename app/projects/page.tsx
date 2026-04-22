import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "projects",
  description:
    "A selection of things I've built. AI products at work, tools on the side, and the occasional experiment.",
};

export default function ProjectsPage() {
  return (
    <Section marker="§ 04 / projects" label={`${projects.length} selected`}>
      <header>
        <h1 className="font-serif text-[48px] sm:text-[64px] leading-[1.02] tracking-[-0.025em] text-fg">
          Things I&rsquo;ve built.
        </h1>
        <p className="mt-6 text-fg-subtle text-[17px] leading-relaxed max-w-[52ch]">
          A running list of what&rsquo;s shipped so far. I&rsquo;m still
          researching and cooking on the next batch, so this page will grow.
        </p>
      </header>

      <ul className="mt-12">
        {projects.map((p, i) => (
          <li
            key={p.title}
            className="border-t border-rule py-5 sm:py-6 flex flex-col sm:flex-row sm:items-start sm:gap-8"
            style={
              i === projects.length - 1
                ? { borderBottom: "1px solid var(--rule)" }
                : undefined
            }
          >
            <span className="font-mono text-[11px] text-fg-subtle sm:w-20 shrink-0 mb-2 sm:mb-0 sm:mt-1.5 tabular-nums whitespace-nowrap">
              {p.year}
            </span>
            <div className="flex-1 max-w-[62ch]">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <h2 className="font-serif text-[22px] leading-snug tracking-tight text-fg">
                  {p.title}
                </h2>
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-mono text-[11px] text-accent hover:text-accent-hover underline underline-offset-[4px] decoration-[1px] transition-colors"
                  >
                    {l.label} →
                  </a>
                ))}
              </div>
              <p className="mt-1.5 text-fg-subtle text-[14.5px] leading-relaxed">
                {p.description}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-fg-subtle">
                {p.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
