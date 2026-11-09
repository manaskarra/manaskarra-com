"use client";

import { useEffect, useState } from "react";
import { WorkspaceIcon } from "./WorkspaceIcon";
import { site } from "@/lib/site";

type Track = { artist: string; title: string; url: string };
const profileUrl = `https://www.last.fm/user/${site.lastfmUser}`;
const dismissalKey = "weekly-track-dismissed";

export function ListeningCard() {
  const [track, setTrack] = useState<Track | null>(null);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    try {
      if (sessionStorage.getItem(dismissalKey) === "true") return;
    } catch { /* The card still works when browser storage is unavailable. */ }

    const controller = new AbortController();
    const revealTimer = window.setTimeout(() => setReady(true), 4000);
    async function refresh() {
      if (document.visibilityState === "hidden") return;
      try {
        const response = await fetch("/api/top-track", { signal: controller.signal });
        if (!response.ok) throw new Error("Weekly chart unavailable");
        const data = await response.json();
        const weekly = data?.track;
        if (!controller.signal.aborted) {
          setTrack(
            data?.available && weekly &&
            typeof weekly.artist === "string" && weekly.artist.trim() &&
            typeof weekly.title === "string" && weekly.title.trim() &&
            typeof weekly.url === "string" ? weekly : null
          );
        }
      } catch {
        if (!controller.signal.aborted) setTrack(null);
      }
    }
    void refresh();
    const interval = window.setInterval(refresh, 30 * 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      clearTimeout(revealTimer);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [dismissed]);

  function dismiss() {
    setDismissed(true);
    try { sessionStorage.setItem(dismissalKey, "true"); } catch { /* Dismissal still lasts until this page is reloaded. */ }
  }

  if (!ready || !track || dismissed) return null;

  return <aside className="listening-card" aria-label="Weekly listening pick" onKeyDown={event => { if (event.key === "Escape") dismiss(); }}>
    <a className="listening-link" href={profileUrl} title={`${track.title} — ${track.artist}. View my Last.fm profile`} target="_blank" rel="noopener noreferrer">
      <span className="listening-record" aria-hidden="true"><span /></span>
      <span className="listening-copy">
        <span className="listening-label">On repeat this week</span>
        <span className="listening-title-row">
          <span className="listening-track">{track.title}</span>
          <span className="listening-separator" aria-hidden="true">·</span>
          <span className="listening-artist">{track.artist}</span>
        </span>
      </span>
    </a>
    <button className="ws-icon-button listening-close" type="button" aria-label="Dismiss weekly listening pick" onClick={dismiss}><WorkspaceIcon name="close" /></button>
  </aside>;
}
