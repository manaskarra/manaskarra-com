"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ListeningCard } from "./ListeningCard";
import { PersonalDialog } from "./PersonalDialog";
import { ResumeButton, ResumeProvider } from "./ResumeDialog";
import { WorkspaceIcon, type WorkspaceIconName } from "./WorkspaceIcon";

const sections = ["overview", "experience", "work", "writing", "music"];
const navigation: { id: string; anchor: string; label: string; icon: WorkspaceIconName }[] = [
  { id: "overview", anchor: "overview", label: "Overview", icon: "home" },
  { id: "work", anchor: "experience", label: "Work", icon: "briefcase" },
  { id: "writing", anchor: "writing", label: "Writing", icon: "note" },
  { id: "music", anchor: "music", label: "Music", icon: "music" },
];

function WorkspaceFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const home = pathname === "/";
  const SectionLink = home ? "a" : Link;
  const sectionHref = (id: string) => `${home ? "" : "/"}#${id}`;
  const activeSection = home ? (active === "experience" ? "work" : active) : pathname.startsWith("/blog") ? "writing" : "";
  const currentLabel = home ? navigation.find(section => section.id === activeSection)?.label ?? "Overview" : pathname.startsWith("/blog/") ? "Writing / Article" : pathname === "/resume" ? "Résumé" : "Workspace";

  useEffect(() => {
    if (!home) return;
    let scheduled = false;
    const update = () => {
      scheduled = false;
      let current = "overview";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 180) current = section;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
      setActive(current);
    };
    const scroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    window.addEventListener("hashchange", scroll);
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); window.removeEventListener("hashchange", scroll); };
  }, [home]);

  useEffect(() => {
    if (!menuOpen) return;
    const keydown = (event: KeyboardEvent) => {
      if (document.querySelector("dialog[open]")) return;
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
      <a href="#about" className="workspace-brand workspace-profile" aria-label="About Manas Karra" aria-haspopup="dialog" title="About me" onClick={() => setMenuOpen(false)}><Image src="/icon.svg" width={27} height={27} alt="" /><span className="workspace-brand-copy"><span>Manas Karra</span><small>sledg3r</small></span><WorkspaceIcon name="person" className="profile-person" /></a>
      <button ref={menuButton} className="ws-icon-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="workspace-sidebar" onClick={() => setMenuOpen(!menuOpen)}><WorkspaceIcon name={menuOpen ? "close" : "menu"} /></button>
    </header>
    <aside ref={sidebar} className={`workspace-sidebar${menuOpen ? " is-open" : ""}`} id="workspace-sidebar">
      <a href="#about" className="workspace-brand workspace-profile desktop-brand" aria-label="About Manas Karra" aria-haspopup="dialog" title="About me"><Image src="/icon.svg" width={31} height={31} alt="" /><span className="workspace-brand-copy"><span>Manas Karra</span><small>sledg3r</small></span><WorkspaceIcon name="person" className="profile-person" /></a>
      <nav className="workspace-navigation" aria-label="Main navigation">
        {navigation.map(section => <SectionLink key={section.id} href={sectionHref(section.anchor)} className={`workspace-nav-item${activeSection === section.id ? " is-active" : ""}`} aria-current={activeSection === section.id ? "location" : undefined} onClick={() => setMenuOpen(false)}><WorkspaceIcon name={section.icon} /><span>{section.label}</span></SectionLink>)}
      </nav>
      <div className="workspace-pinned">
        <p className="ws-eyebrow">Pinned</p>
        <ResumeButton className="workspace-nav-item"><WorkspaceIcon name="note" /><span>Résumé</span></ResumeButton>
        <a className="workspace-nav-item" href="https://github.com/manaskarra" target="_blank" rel="noopener noreferrer"><WorkspaceIcon name="code" /><span>GitHub</span><WorkspaceIcon name="arrow" className="nav-external" /></a>
        <a className="workspace-nav-item" href="https://www.linkedin.com/in/manas-karra/" target="_blank" rel="noopener noreferrer"><WorkspaceIcon name="linkedin" /><span>LinkedIn</span><WorkspaceIcon name="arrow" className="nav-external" /></a>
        <a className="workspace-nav-item" href="https://www.youtube.com/@sledg3r" target="_blank" rel="noopener noreferrer"><WorkspaceIcon name="youtube" /><span>YouTube</span><WorkspaceIcon name="arrow" className="nav-external" /></a>
      </div>
    </aside>
    <div className="workspace-body">
      <div className="workspace-topbar"><span>{currentLabel}</span><ListeningCard /></div>
      <main id="main-content" className={home ? "workspace-document" : "workspace-document workspace-article"}>{children}</main>
      <footer className="workspace-footer"><span>© {new Date().getFullYear()} Manas Karra</span><div><SectionLink href={sectionHref("overview")}>Back to top ↑</SectionLink></div></footer>
    </div>
    <PersonalDialog />
  </div>;
}

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return <ResumeProvider><WorkspaceFrame>{children}</WorkspaceFrame></ResumeProvider>;
}
