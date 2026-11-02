"use client";

import { useEffect, useState } from "react";
import { WorkspaceIcon } from "./WorkspaceIcon";
import { site } from "@/lib/site";

type Track = { artist: string; title: string; url: string };
const profileUrl = `https://www.last.fm/user/${site.lastfmUser}`;

export function ListeningStrip() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      if (document.visibilityState === "hidden") return;
      try {
        const response = await fetch("/api/top-track", { signal: controller.signal });
        if (!response.ok) throw new Error("Weekly chart unavailable");
        const data = await response.json();
        const weekly = data?.track;
        setTrack(data?.available && weekly && typeof weekly.artist === "string" && typeof weekly.title === "string" && typeof weekly.url === "string" ? weekly : null);
      } catch {
        if (!controller.signal.aborted) setTrack(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void refresh();
    const interval = window.setInterval(refresh, 30 * 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => { controller.abort(); clearInterval(interval); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return <a className="listening-strip" href={profileUrl} title="View my Last.fm profile" target="_blank" rel="noopener noreferrer">
    <WorkspaceIcon name="music" />
    <span className="listening-copy" aria-live="polite" aria-busy={loading}>
      <span className="listening-label">Top track · Last 7 days</span>
      <span className="listening-track">{track?.title ?? (loading ? "Loading weekly chart…" : "View my Last.fm profile")}</span>
      {track && <span className="listening-artist">{track.artist}</span>}
    </span>
    <WorkspaceIcon name="arrow" />
  </a>;
}
