"use client";

import { useEffect, useState } from "react";
import { WorkspaceIcon } from "./WorkspaceIcon";

type Track = { artist: string; title: string; nowPlaying: boolean };

export function ListeningStrip() {
  const [track, setTrack] = useState<Track | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      if (document.visibilityState === "hidden") return;
      try {
        const response = await fetch("/api/now-playing", { signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        const current = data?.current;
        if (data?.available && current && typeof current.artist === "string" && typeof current.title === "string" && typeof current.nowPlaying === "boolean") setTrack(current);
        else setTrack(null);
      } catch { /* The profile link remains useful without a live feed. */ }
    }
    void refresh();
    const interval = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => { controller.abort(); clearInterval(interval); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return <a className="listening-strip" href="https://www.last.fm/user/manask_" target="_blank" rel="noopener noreferrer">
    <span className="mini-meter" data-playing={track?.nowPlaying ?? false} aria-hidden="true"><i /><i /><i /><i /></span>
    <span className="listening-label">{track ? track.nowPlaying ? "Listening to" : "Last played" : "On my headphones"}</span>
    <span className="listening-track">{track ? `${track.artist} · ${track.title}` : "My listening history on Last.fm"}</span>
    <WorkspaceIcon name="arrow" />
  </a>;
}
