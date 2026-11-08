import Link from "next/link";
import Image from "next/image";
import { HologramPortrait } from "@/components/HologramPortrait";
import { site } from "@/lib/site";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { ResumeButton } from "@/components/ResumeDialog";
import { WorkspaceIcon } from "@/components/WorkspaceIcon";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  alternateName: site.producerHandle,
  jobTitle: "AI Engineer",
  worksFor: { "@type": "Organization", name: "Deriv", url: "https://deriv.com" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "BITS Pilani" },
  sameAs: site.social.map(item => item.href).filter(href => href.startsWith("http")),
};

export default function HomePage() {
  const posts = getAllPosts();
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />

    <section id="overview" className="workspace-overview" aria-labelledby="overview-title">
      <HologramPortrait />
      <h1 id="overview-title">Hi, I’m Manas.</h1>
      <p className="workspace-intro">
        I love AI and music. Based in Dubai, making hip-hop{" "}
        <span className="ws-music-reference">as <a className="ws-music-link" href="#music">sledg3r</a>.</span>
      </p>
      <div className="workspace-hero-actions">
        <ResumeButton className="ws-button ws-button-primary">Résumé <WorkspaceIcon name="note" /></ResumeButton>
        <a className="ws-text-action" href="https://github.com/manaskarra" target="_blank" rel="noopener noreferrer">GitHub <WorkspaceIcon name="arrow" /></a>
        <a className="ws-text-action" href="https://www.linkedin.com/in/manas-karra/" target="_blank" rel="noopener noreferrer">LinkedIn <WorkspaceIcon name="arrow" /></a>
        <a className="ws-text-action" href="https://x.com/manaskarra" target="_blank" rel="noopener noreferrer">X <WorkspaceIcon name="arrow" /></a>
      </div>
    </section>

    <section id="experience" className="workspace-section" aria-labelledby="experience-title">
      <div className="ws-section-heading"><h2 id="experience-title">Experience</h2></div>
      <div className="experience-list">
        <article className="experience-entry">
          <span className="experience-logo experience-logo-deriv"><Image src="/logos/deriv.svg" alt="" width={44} height={44} unoptimized /></span>
          <div className="experience-role"><h3>Deriv</h3><p>AI Engineer</p></div>
          <span className="experience-date">Feb 2025 — present</span>
        </article>
        <article className="experience-entry">
          <span className="experience-logo experience-logo-impiger"><Image src="/logos/impiger.svg" alt="" width={22} height={36} unoptimized /></span>
          <div className="experience-role"><h3>Impiger Technologies</h3><p>QA Analyst &amp; Tester</p></div>
          <span className="experience-date">Jun — Aug 2023</span>
        </article>
        <article className="experience-entry">
          <span className="experience-logo experience-logo-bits"><Image src="/logos/bits-pilani.svg" alt="" width={36} height={36} unoptimized /></span>
          <div className="experience-role"><h3>BITS Pilani</h3><p>B.E. Computer Science</p></div>
          <span className="experience-date">2021 — 2025</span>
        </article>
      </div>
    </section>

    <section id="work" className="workspace-section" aria-labelledby="work-title">
      <div className="ws-section-heading"><h2 id="work-title">Projects</h2></div>
      <div className="workspace-projects">
        <article className="project-row">
          <WorkspaceIcon name="music" />
          <div>
            <a className="project-title" href="/projects/magenta-wsp">magenta-wsp <WorkspaceIcon name="arrow" /></a>
            <p>Piano to flute through one permanent weight edit. Listen and explore the changed weights.</p>
            <Link className="project-note-link" href="/blog/magenta-wsp">Read the write-up</Link>
          </div>
        </article>
        <article className="project-row">
          <WorkspaceIcon name="folder" />
          <div>
            <a className="project-title" href="https://github.com/manaskarra/verd" target="_blank" rel="noopener noreferrer">verd <WorkspaceIcon name="arrow" /></a>
            <p>A code-review tool that gets AI models to challenge each other’s findings.</p>
            <Link className="project-note-link" href="/blog/verd">How I built it</Link>
          </div>
        </article>
        <article className="project-row">
          <WorkspaceIcon name="folder" />
          <div>
            <a className="project-title" href="https://github.com/manaskarra/gitbiz" target="_blank" rel="noopener noreferrer">gitbiz <WorkspaceIcon name="arrow" /></a>
            <p>Finds GitHub projects with potential to become a business.</p>
          </div>
        </article>
      </div>
    </section>

    <section id="writing" className="workspace-section" aria-labelledby="writing-title">
      <div className="ws-section-heading"><h2 id="writing-title">Writing</h2></div>
      <div className="workspace-notes">
        {posts.map(post => <Link href={`/blog/${post.slug}`} key={post.slug} className="workspace-note">
          <WorkspaceIcon name="note" />
          <div><h3>{post.title}</h3><time dateTime={post.date}>{formatPostDate(post.date)}</time></div>
          <WorkspaceIcon name="arrow" />
        </Link>)}
      </div>
    </section>

    <section id="music" className="workspace-section" aria-labelledby="music-title">
      <div className="ws-section-heading"><h2 id="music-title">Music</h2></div>
      <div className="music-profile">
        <WorkspaceIcon name="music" className="music-symbol" />
        <div>
          <h3>sledg3r</h3>
          <p>Making hip-hop beats in FL Studio. I love listening to music as much as making it.</p>
          <div className="music-links">
            <a href="https://www.youtube.com/@sledg3r" target="_blank" rel="noopener noreferrer">YouTube <WorkspaceIcon name="arrow" /></a>
            <a href="https://www.beatstars.com/sledg3r" target="_blank" rel="noopener noreferrer">BeatStars <WorkspaceIcon name="arrow" /></a>
            <a href="https://www.instagram.com/sledg3r/" target="_blank" rel="noopener noreferrer">Instagram <WorkspaceIcon name="arrow" /></a>
          </div>
        </div>
      </div>
    </section>

  </>;
}
