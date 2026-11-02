import Link from "next/link";
import { site } from "@/lib/site";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { ResumeButton } from "@/components/ResumeDialog";
import { WorkspaceIcon } from "@/components/WorkspaceIcon";
import { ListeningStrip } from "@/components/ListeningStrip";

const personJsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: site.name,
  url: site.url, alternateName: site.producerHandle, jobTitle: "AI Engineer",
  worksFor: { "@type": "Organization", name: "Deriv", url: "https://deriv.com" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "BITS Pilani" },
  sameAs: site.social.map(item => item.href).filter(href => href.startsWith("http")),
  knowsAbout: ["LLM systems", "multi-agent systems", "AI platforms", "music production"],
};

export default function HomePage() {
  const posts = getAllPosts();
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
    <section id="overview" className="workspace-overview" aria-labelledby="overview-title">
      <p className="ws-eyebrow intro-label"><span />AI engineer · Dubai</p>
      <h1 id="overview-title">Hi, I’m Manas<span className="accent-punctuation">.</span></h1>
      <p className="workspace-intro">I build agents, analytics tools, and the services that keep them running. Currently at <a href="https://deriv.com" target="_blank" rel="noopener noreferrer">Deriv</a>. I also make hip-hop as <a href="#music">sledg3r</a>.</p>
      <div className="workspace-hero-actions"><ResumeButton className="ws-button ws-button-primary">Read my résumé <WorkspaceIcon name="arrow" /></ResumeButton><a className="ws-text-action" href={`mailto:${site.emails.primary}`}>Get in touch <WorkspaceIcon name="arrow" /></a></div>
    </section>

    <section id="work" className="workspace-work" aria-labelledby="work-title">
      <div className="ws-section-heading"><h2 id="work-title">Selected work</h2><span className="ws-mono ws-muted">2024 — now</span></div>
      <div className="workspace-projects">
        <details className="workspace-project">
          <summary><span className="project-number">01</span><div><h3>Production AI at Deriv</h3><p>Multi-agent outreach &amp; analytics</p></div><span className="project-type">At work</span><WorkspaceIcon name="chevron" className="project-chevron" /></summary>
          <div className="project-content"><p>I build and scale JARVIS’s multi-agent outreach, retrieval-augmented analytics, and the services that coordinate long-running tasks.</p><dl className="project-evidence"><div><dt>228K+</dt><dd>mapped partner accounts</dd></div><div><dt>20K+</dt><dd>monthly investigations</dd></div></dl><p>The platform combines knowledge-grounded SQL, sandboxed Python, persistent task context, and scheduled execution. Behind it: authenticated agent-to-agent APIs, idempotent requests, signed callbacks, and PostgreSQL-backed retries.</p><p className="project-stack">Google ADK · Weaviate · Python · PostgreSQL</p><a className="ws-text-action" href="#experience">More about my role <span aria-hidden="true">↓</span></a></div>
        </details>
        <details className="workspace-project">
          <summary><span className="project-number">02</span><div><h3>verd</h3><p>Code review through model cross-examination</p></div><span className="project-type">Open source</span><WorkspaceIcon name="chevron" className="project-chevron" /></summary>
          <div className="project-content"><p>Up to five independent LLM reviewers inspect a change, cross-examine one another’s findings, and pass the evidence to a judge. The final review preserves evidence-backed disagreement.</p><p>Published as a Python package with a CLI, MCP server, and Slack integrations.</p><div className="project-result"><strong>40.0% F1 vs. 29.2%</strong><p>Compared with Claude Opus 4.6 in my self-run evaluation on 50 real pull requests from the Martian Code Review Benchmark. Methodology and results are in the write-up.</p></div><p className="project-stack">Python · Multi-model review · MCP · Evaluation</p><div className="project-links"><a href="https://github.com/manaskarra/verd" target="_blank" rel="noopener noreferrer">GitHub <WorkspaceIcon name="arrow" /></a><Link href="/blog/verd">Read the write-up <WorkspaceIcon name="arrow" /></Link></div></div>
        </details>
        <details className="workspace-project">
          <summary><span className="project-number">03</span><div><h3>RagaXonic</h3><p>Hindustani ragas meet neural music generation</p></div><span className="project-type">Music × ML</span><WorkspaceIcon name="chevron" className="project-chevron" /></summary>
          <div className="project-content"><p>A three-layer LSTM trained to generate polyphonic MIDI, blending Hindustani ragas with Western chord progressions. A Gradio interface lets you change temperature and note count, then hear the result.</p><p className="project-stack">Python · TensorFlow · LSTM · Gradio</p><div className="project-links"><a href="https://github.com/manaskarra/RagaXonic-DL" target="_blank" rel="noopener noreferrer">Explore the project <WorkspaceIcon name="arrow" /></a></div></div>
        </details>
      </div>
      <a className="workspace-music-shortcut" href="#music"><span className="mini-meter" aria-hidden="true"><i /><i /><i /><i /></span><span>Outside work<small>FL Studio, keys, and hip-hop production.</small></span><span className="music-shortcut-link">Meet sledg3r <WorkspaceIcon name="arrow" /></span></a>
    </section>

    <section id="experience" className="workspace-section" aria-labelledby="experience-title">
      <div className="ws-section-heading"><h2 id="experience-title">Experience</h2><ResumeButton className="ws-small-link">Full résumé <WorkspaceIcon name="arrow" /></ResumeButton></div>
      <div className="experience-list">
        <article className="experience-entry"><div className="experience-date"><span>Feb 2025 — now</span><span className="experience-location">Dubai, UAE</span></div><div><h3>AI Engineer <span>· Deriv</span></h3><p>Building production agents and AI platforms for partner operations, from investigation and outreach to analytics and follow-up.</p><p>Owned a full-stack analytics platform over <strong>13M+ rows</strong>, used by <strong>100+ people</strong> internally. Built cohort analysis, commission reporting, and churn and growth models into one place.</p></div></article>
        <article className="experience-entry"><div className="experience-date"><span>Jun — Aug 2023</span><span className="experience-location">Dubai, UAE</span></div><div><h3>QA Analyst &amp; Tester <span>· Impiger Technologies</span></h3><p>Functional, performance, and exploratory testing for a streaming application. Reproduced defects and worked with engineers to verify fixes.</p></div></article>
        <article className="experience-entry education-entry"><div className="experience-date"><span>2021 — 2025</span><span className="experience-location">Education</span></div><div><h3>B.E. Computer Science <span>· BITS Pilani</span></h3><p>CGPA 8.0/10. Also led Verilog and FPGA labs as a Professional Assistant in the Digital Design Lab.</p></div></article>
      </div>
      <div className="workspace-toolkit"><p className="ws-eyebrow">Tools I work with</p><dl><div><dt>Languages</dt><dd>Python, SQL, TypeScript / JavaScript</dd></div><div><dt>AI &amp; data</dt><dd>Google ADK, LangGraph, Weaviate, TensorFlow, XGBoost</dd></div><div><dt>Applications</dt><dd>FastAPI, Flask, React, PostgreSQL, BigQuery</dd></div><div><dt>Infrastructure</dt><dd>AWS, GCP, Docker, Kubernetes, Terraform</dd></div></dl></div>
    </section>

    <section id="writing" className="workspace-section" aria-labelledby="writing-title">
      <div className="ws-section-heading"><h2 id="writing-title">Writing</h2><span className="ws-mono ws-muted">Notes from building</span></div>
      <div className="workspace-notes">{posts.map(post => <Link href={`/blog/${post.slug}`} key={post.slug} className="workspace-note"><WorkspaceIcon name="note" /><div><h3>{post.title}</h3><p>{post.excerpt}</p><span><time dateTime={post.date}>{formatPostDate(post.date)}</time><span aria-hidden="true">·</span>{post.readingTime}</span></div><WorkspaceIcon name="arrow" /></Link>)}</div>
    </section>

    <section id="music" className="workspace-section workspace-music" aria-labelledby="music-title">
      <div className="ws-section-heading"><h2 id="music-title">Outside work</h2><span className="ws-mono ws-muted">Music / sledg3r</span></div>
      <div className="music-session">
        <div className="music-session-heading"><span className="session-file"><WorkspaceIcon name="music" /> sledg3r.flp</span><span className="ws-mono ws-muted">FL Studio</span></div>
        <div className="music-session-body"><div><h3>I make hip-hop.</h3><p>FL Studio is where I work on beats, melodies, and ideas that don’t belong in a code editor. Keys and sampling are a big part of it.</p><div className="project-links"><a href="https://www.youtube.com/@sledg3r" target="_blank" rel="noopener noreferrer">YouTube <WorkspaceIcon name="arrow" /></a><a href="https://www.beatstars.com/sledg3r" target="_blank" rel="noopener noreferrer">BeatStars <WorkspaceIcon name="arrow" /></a></div></div><div className="step-sequencer" aria-hidden="true">{["Kick", "Snare", "Hi-hat"].map((label,row) => <div className="sequencer-lane" key={label}><span>{label}</span><div>{Array.from({length:16},(_,step) => <i key={step} className={(row===0 ? [0,6,10] : row===1 ? [4,12] : [0,2,4,6,8,10,12,14]).includes(step) ? "step-lit" : ""} />)}</div></div>)}</div></div>
        <ListeningStrip />
      </div>
    </section>

    <section className="workspace-contact" aria-labelledby="contact-title"><div><p className="ws-eyebrow">Have something in mind?</p><h2 id="contact-title">Say hello.</h2></div><a href={`mailto:${site.emails.primary}`}>{site.emails.primary} <WorkspaceIcon name="arrow" /></a></section>
  </>;
}
