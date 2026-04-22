import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "about",
  description:
    "Manas Karra, Applied AI Engineer at Deriv, hip-hop producer as sledg3r, based in Dubai.",
};

// Compact CV block. Rendered in the desktop sidebar (Section's `sidebar` slot)
// and again at the bottom of the page for mobile, where the sidebar slot is
// hidden to keep the top of the article clean.
function CVBlock() {
  return (
    <div className="space-y-8 font-mono text-[11px] leading-relaxed text-fg-subtle">
      <div>
        <p className="uppercase tracking-[0.15em] text-[10px] text-fg-subtle/70 mb-3">
          work
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-fg">Deriv</p>
            <p className="text-fg-subtle/90">applied ai engineer</p>
            <p className="tabular-nums text-fg-subtle/60 mt-0.5">
              feb 2025 → now
            </p>
          </div>
          <div>
            <p className="text-fg">Impiger Technologies</p>
            <p className="text-fg-subtle/90">qa analyst</p>
            <p className="tabular-nums text-fg-subtle/60 mt-0.5">
              summer 2023
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-rule pt-6">
        <p className="uppercase tracking-[0.15em] text-[10px] text-fg-subtle/70 mb-3">
          school
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-fg">BITS Pilani</p>
            <p className="tabular-nums text-fg-subtle/60 mt-0.5">
              2021 → 2025
            </p>
          </div>
          <div>
            <p className="text-fg">The Indian High School</p>
            <p className="text-fg-subtle/90">dubai</p>
            <p className="tabular-nums text-fg-subtle/60 mt-0.5">
              2013 → 2021
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-rule pt-6">
        <p className="uppercase tracking-[0.15em] text-[10px] text-fg-subtle/70 mb-3">
          honors
        </p>
        <div>
          <p className="text-fg">UAE Golden Visa</p>
          <p className="text-fg-subtle/90">distinction student</p>
          <p className="tabular-nums text-fg-subtle/60 mt-0.5">2022</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Section
      marker="§ 02 / about"
      label="dubai"
      as="article"
      sidebar={<CVBlock />}
    >
      <header>
        <h1 className="font-serif text-[48px] sm:text-[64px] leading-[1.02] tracking-[-0.025em] text-fg">
          A little about me.
        </h1>
      </header>

      <div className="prose-post text-fg mt-10">
        <p>
          I&rsquo;m Manas. I work at{" "}
          <a href="https://deriv.com" target="_blank" rel="noopener noreferrer">
            Deriv
          </a>{" "}
          as an Applied AI Engineer, and I sometimes make hip-hop beats on
          the side as <strong>sledg3r</strong>. This site is where those two
          live side by side.
        </p>

        <p>
          I graduated from{" "}
          <a
            href="https://www.bits-pilani.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            BITS Pilani
          </a>{" "}
          in 2025, joined Deriv as an Applied AI Engineer intern, and came on
          full-time that August. My work these days revolves around
          multi-agent systems and agentic tools that actually do work,
          and it&rsquo;s also where I love experimenting on my own time. I
          enjoy getting hands-on with ML algorithms and the kind of big, messy
          datasets that force you to think. And markets and finance are a bit
          of an obsession, honestly. I&rsquo;m usually a few tabs deep into
          whatever&rsquo;s moving in the world that week.
        </p>

        <p>
          I feel lucky to be building through whatever we end up calling this
          "AI revolution". I&rsquo;d rather contribute to it than
          narrate it from the sidelines, and I try to stay close to where
          things are going: papers, threads, the late-night demos people post
          at 2am.{" "}
          <a
            href="https://x.com/manaskarra"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>{" "}
          is basically my front page for all of it: researchers, builders, AI
          companies shipping in real time. The pace means my notes app always
          has more ideas than I can get to, and that&rsquo;s part of the fun.
          Most of what I&rsquo;m currently cooking lands on{" "}
          <a
            href="https://github.com/manaskarra"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <h2>What I&rsquo;m into</h2>
        <p>
          Specifically hip-hop and rap. I installed FL Studio back in 2013,
          got nowhere for years, and only started taking it seriously at uni
          in 2021. Helped that I&rsquo;d already spent over a decade on the
          electronic keyboard and grown up on way too much rap, so sampling
          and melody feel closer to instinct than guesswork. Since then the
          beats have pulled past a million plays on{" "}
          <a
            href="https://www.youtube.com/@sledg3r"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          , a few hundred have sold on{" "}
          <a
            href="https://www.beatstars.com/sledg3r"
            target="_blank"
            rel="noopener noreferrer"
          >
            BeatStars
          </a>
          , and a bunch have landed with upcoming artists I respect a lot.
          Still feels slightly unreal.
        </p>

        <p>
          Outside of all that: playing and watching cricket and chess
          religiously, anything at the intersection of AI and the wider tech
          world, and music on in the background most of the day.
        </p>

        <h2>How to reach me</h2>
        <p>Two inboxes, because the work is split:</p>
        <ul>
          <li>
            <strong>Work / AI / general:</strong>{" "}
            <a href={`mailto:${site.emails.primary}`}>{site.emails.primary}</a>
          </li>
          <li>
            <strong>Beats / custom production:</strong>{" "}
            <a href={`mailto:${site.emails.beats}`}>{site.emails.beats}</a>
          </li>
        </ul>
        <p>
          DMs are open on{" "}
          <a
            href="https://www.instagram.com/sledg3r"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          . I try to reply to anything thoughtful and ignore the rest.
        </p>
      </div>

      {/* Mobile-only CV. The sidebar slot is hidden under md, so we surface
          the same content here, anchored to the bottom of the article. */}
      <div className="md:hidden mt-14 pt-10 border-t border-rule">
        <CVBlock />
      </div>
    </Section>
  );
}
