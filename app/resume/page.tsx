import type { Metadata } from "next";
import { ResumeEmbed } from "@/components/ResumeEmbed";
import { WorkspaceIcon } from "@/components/WorkspaceIcon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé", description: "Manas Karra — AI Engineer. LLM systems and AI platforms.",
  alternates: { canonical: `${site.url}/resume` },
};

export default function ResumePage() {
  return <div className="resume-page">
    <span className="ws-eyebrow">Pinned document / 2026</span>
    <h1>Manas Karra</h1>
    <p>AI Engineer · LLM Systems &amp; AI Platforms<br />Dubai, UAE</p>
    <div className="resume-page-actions"><a className="ws-button ws-button-primary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Open PDF <WorkspaceIcon name="arrow" /></a><a className="ws-button" href="/resume.pdf" download="Manas-Karra-Resume-2026.pdf">Download <WorkspaceIcon name="download" /></a></div>
    <p>Experience at Deriv and Impiger Technologies, selected projects, technical skills, and education. The complete résumé is a one-page PDF.</p>
    <ResumeEmbed />
  </div>;
}
