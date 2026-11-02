"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeButton, ResumeProvider } from "./ResumeDialog";
import { WorkspaceIcon, type WorkspaceIconName } from "./WorkspaceIcon";

const sections: { id: string; label: string; icon: WorkspaceIconName }[] = [
  { id: "overview", label: "Overview", icon: "home" },
  { id: "work", label: "Selected work", icon: "folder" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "writing", label: "Writing", icon: "note" },
  { id: "music", label: "Music", icon: "music" },
];

function WorkspaceFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const home = pathname === "/";
  const activeSection = home ? active : pathname.startsWith("/blog") ? "writing" : "";
  const currentLabel = home ? sections.find(section => section.id === active)?.label ?? "Overview" : pathname.startsWith("/blog/") ? "Writing / Article" : pathname === "/resume" ? "Résumé" : "Workspace";

  useEffect(() => {
    if (!home) return;
    let scheduled = false;
    const update = () => {
      scheduled = false;
      let current = "overview";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= 180) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = "music";
      setActive(current);
    };
    const scroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, [home]);

  useEffect(() => {
    if (!menuOpen) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const dismiss = (event: PointerEvent) => {
      if (!sidebar.current?.contains(event.target as Node) && !menuButton.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", dismiss);
    return () => { document.removeEventListener("keydown", keydown); document.removeEventListener("pointerdown", dismiss); };
  }, [menuOpen]);

  return <div className="workspace-shell">
    <header className="workspace-mobile-header">
      <Link href="/#overview" className="workspace-brand" onClick={() => setMenuOpen(false)}><Image src="/icon.svg" width={27} height={27} alt="" /> <span>Manas Karra</span></Link>
      <div className="mobile-controls"><ThemeToggle /><button ref={menuButton} className="ws-icon-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="workspace-sidebar" onClick={() => setMenuOpen(!menuOpen)}><WorkspaceIcon name={menuOpen ? "close" : "menu"} /></button></div>
    </header>
    <aside ref={sidebar} className={`workspace-sidebar${menuOpen ? " is-open" : ""}`} id="workspace-sidebar">
      <Link href="/#overview" className="workspace-brand desktop-brand" onClick={() => setMenuOpen(false)}><Image src="/icon.svg" width={31} height={31} alt="" /><span>Manas Karra<small>Personal workspace</small></span></Link>
      <nav className="workspace-navigation" aria-label="Main navigation">
        <p className="ws-eyebrow">Workspace</p>
        {sections.map(section => <Link key={section.id} href={`/#${section.id}`} className={`workspace-nav-item${activeSection === section.id ? " is-active" : ""}`} aria-current={activeSection === section.id ? "location" : undefined} onClick={() => setMenuOpen(false)}><WorkspaceIcon name={section.icon} /><span>{section.label}</span>{activeSection === section.id && <span className="nav-active-dot" />}</Link>)}
      </nav>
      <div className="workspace-pinned">
        <p className="ws-eyebrow">Pinned</p>
        <ResumeButton className="workspace-nav-item"><WorkspaceIcon name="note" /><span>Résumé <small>2026</small></span></ResumeButton>
        <a className="workspace-nav-item" href="https://github.com/manaskarra" target="_blank" rel="noopener noreferrer"><WorkspaceIcon name="code" /><span>GitHub</span><WorkspaceIcon name="arrow" className="nav-external" /></a>
        <a className="workspace-nav-item" href="mailto:manas.karra@gmail.com"><WorkspaceIcon name="mail" /><span>Say hello</span><WorkspaceIcon name="arrow" className="nav-external" /></a>
      </div>
      <div className="workspace-sidebar-bottom">
        <a href="/#music" className="sidebar-music-link" onClick={() => setMenuOpen(false)}><span className="mini-meter" aria-hidden="true"><i /><i /><i /><i /></span><span>Also making music<small>sledg3r ↗</small></span></a>
        <div className="sidebar-location"><span className="ws-mono">Dubai, UAE</span><ThemeToggle /></div>
      </div>
    </aside>
    <div className="workspace-body">
      <div className="workspace-topbar"><div className="workspace-breadcrumb"><WorkspaceIcon name="panel" /><Link href="/#overview">manas</Link><span>/</span><span className="breadcrumb-current">{currentLabel}</span></div><span className="workspace-address">manaskarra.com</span></div>
      <main id="main-content" className={home ? "workspace-document" : "workspace-document workspace-article"}>{children}</main>
      <footer className="workspace-footer"><span>© {new Date().getFullYear()} Manas Karra</span><div><a href="https://www.linkedin.com/in/manas-karra/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://x.com/manaskarra" target="_blank" rel="noopener noreferrer">X ↗</a><a href="/#overview">Back to top ↑</a></div></footer>
    </div>
  </div>;
}

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return <ResumeProvider><WorkspaceFrame>{children}</WorkspaceFrame></ResumeProvider>;
}
