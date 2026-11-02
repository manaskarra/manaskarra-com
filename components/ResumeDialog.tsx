"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { WorkspaceIcon } from "./WorkspaceIcon";

const ResumeContext = createContext<(() => void) | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const showResume = useCallback(() => {
    dialog.current?.showModal();
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return <ResumeContext.Provider value={showResume}>
    {children}
    <dialog ref={dialog} className="resume-dialog" aria-labelledby="resume-title" onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="resume-dialog-inner">
        <header className="resume-toolbar">
          <div><span className="ws-eyebrow">Pinned document</span><h2 id="resume-title">Résumé <span className="ws-muted">/ 2026</span></h2></div>
          <button className="ws-icon-button" type="button" aria-label="Close résumé" onClick={() => dialog.current?.close()} autoFocus><WorkspaceIcon name="close" /></button>
        </header>
        <div className="resume-actions">
          <span className="ws-mono ws-muted">Manas Karra · AI Engineer</span>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Open PDF <WorkspaceIcon name="arrow" /></a>
          <a href="/resume.pdf" download="Manas-Karra-Resume-2026.pdf">Download <WorkspaceIcon name="download" /></a>
        </div>
        <div className="resume-mobile-summary">
          <h3>LLM systems &amp; AI platforms</h3>
          <p>AI Engineer at Deriv since February 2025. Building production agents, analytics tools, and the services that connect them.</p>
          <dl><div><dt>Selected projects</dt><dd>verd · RagaXonic</dd></div><div><dt>Education</dt><dd>B.E. Computer Science<br />BITS Pilani, 2025</dd></div></dl>
          <p className="ws-muted">Open the one-page PDF for the complete résumé.</p>
        </div>
        {open && <div className="resume-frame"><Image src="/resume-preview.png" alt="Preview of Manas Karra’s one-page résumé. Use Open PDF or Download for the original, selectable document." width={1391} height={1800} unoptimized /></div>}
      </div>
    </dialog>
  </ResumeContext.Provider>;
}

export function ResumeButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const showResume = useContext(ResumeContext);
  return <a href="/resume" className={className} onClick={event => { if (showResume && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); showResume(); } }}>{children}</a>;
}
