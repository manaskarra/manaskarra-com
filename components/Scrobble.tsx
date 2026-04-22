"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const LASTFM_PROFILE_URL = `https://www.last.fm/user/${site.lastfmUser}`;

type Track = {
  artist: string;
  title: string;
  album: string;
  url: string;
  image: string | null;
  nowPlaying: boolean;
  playedAt: string | null;
};

type WeekTrack = { artist: string; title: string; url: string; plays: number };
type WeekArtist = { name: string; url: string; plays: number };
type WeekAlbum = { artist: string; title: string; url: string; plays: number };

type Week = {
  track: WeekTrack | null;
  artist: WeekArtist | null;
  album: WeekAlbum | null;
};

type Payload = {
  available: boolean;
  current: Track | null;
  week: Week | null;
};

const POLL_INTERVAL_MS = 60_000;
const BAR_COUNT = 5;

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Math.max(0, Date.now() - then);
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatPlays(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "0 plays";
  return `${n} ${n === 1 ? "play" : "plays"}`;
}

function isTrack(value: unknown): value is Track {
  if (!value || typeof value !== "object") return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.artist === "string" &&
    typeof t.title === "string" &&
    typeof t.url === "string" &&
    typeof t.nowPlaying === "boolean"
  );
}

function isWeekTrack(v: unknown): v is WeekTrack {
  if (!v || typeof v !== "object") return false;
  const t = v as Record<string, unknown>;
  return (
    typeof t.artist === "string" &&
    typeof t.title === "string" &&
    typeof t.url === "string" &&
    typeof t.plays === "number"
  );
}

function isWeekArtist(v: unknown): v is WeekArtist {
  if (!v || typeof v !== "object") return false;
  const t = v as Record<string, unknown>;
  return (
    typeof t.name === "string" &&
    typeof t.url === "string" &&
    typeof t.plays === "number"
  );
}

function isWeekAlbum(v: unknown): v is WeekAlbum {
  if (!v || typeof v !== "object") return false;
  const t = v as Record<string, unknown>;
  return (
    typeof t.artist === "string" &&
    typeof t.title === "string" &&
    typeof t.url === "string" &&
    typeof t.plays === "number"
  );
}

function isPayload(value: unknown): value is Payload {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  if (typeof p.available !== "boolean") return false;
  if (p.current !== null && !isTrack(p.current)) return false;
  if (p.week !== null) {
    if (!p.week || typeof p.week !== "object") return false;
    const w = p.week as Record<string, unknown>;
    if (w.track !== null && !isWeekTrack(w.track)) return false;
    if (w.artist !== null && !isWeekArtist(w.artist)) return false;
    if (w.album !== null && !isWeekAlbum(w.album)) return false;
  }
  return true;
}

export function Scrobble() {
  const [data, setData] = useState<Payload | null>(null);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [tick, setTick] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const fetchNow = useCallback(async () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/now-playing", {
        signal: ctrl.signal,
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return;
      const json: unknown = await res.json();
      if (!isPayload(json)) return;
      setData(json);
    } catch {
      // swallow abort / network errors; we'll retry on next tick
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchNow();
    const poll = setInterval(fetchNow, POLL_INTERVAL_MS);
    const tickInterval = setInterval(() => setTick((n) => n + 1), 30_000);
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchNow();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(poll);
      clearInterval(tickInterval);
      document.removeEventListener("visibilitychange", onVisible);
      abortRef.current?.abort();
    };
  }, [fetchNow]);

  if (!mounted || !data || !data.available || !data.current) {
    return null;
  }

  const { current, week } = data;
  const hasWeek = !!(week && (week.track || week.artist || week.album));
  const timeLabel = current.playedAt ? timeAgo(current.playedAt) : "";

  return (
    <aside
      aria-label="now playing"
      className="border-b border-rule bg-bg-elevated"
      data-tick={tick}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <button
          type="button"
          onClick={() => hasWeek && setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="scrobble-week"
          className={`group w-full py-2.5 flex items-center gap-3 font-mono text-[11px] text-left transition-colors ${
            hasWeek ? "hover:bg-fg/[0.02]" : ""
          }`}
          style={{ cursor: hasWeek ? "pointer" : "default" }}
        >
          {hasWeek && (
            <span
              className={`shrink-0 inline-flex items-center justify-center w-4 h-4 leading-none transition-all duration-300 ease-out ${
                expanded
                  ? "text-accent rotate-0"
                  : "text-fg-subtle group-hover:text-accent -rotate-90"
              }`}
              aria-hidden="true"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3.5 L5 6.5 L8 3.5" />
              </svg>
            </span>
          )}
          <ScrobbleBars playing={current.nowPlaying} />
          <span className="text-fg-subtle shrink-0 hidden sm:inline">
            {current.nowPlaying ? "now playing" : "last played"}
          </span>
          <span className="text-fg-subtle hidden sm:inline" aria-hidden="true">
            ·
          </span>
          <span
            className="truncate min-w-0"
            title={`${current.artist} · ${current.title}`}
          >
            <span className="text-fg">{current.artist}</span>
            <span className="text-fg-subtle"> · </span>
            <span className="text-fg">{current.title}</span>
          </span>
          <span className="ml-auto flex items-center gap-3 shrink-0">
            {!current.nowPlaying && timeLabel && (
              <>
                <span
                  className="text-fg-subtle tabular-nums hidden md:inline"
                  aria-hidden="true"
                >
                  {timeLabel}
                </span>
                <span
                  className="text-fg-subtle/50 hidden md:inline"
                  aria-hidden="true"
                >
                  ·
                </span>
              </>
            )}
            <a
              href={LASTFM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-fg-subtle hover:text-accent transition-colors hidden md:inline"
              aria-label="last.fm profile"
            >
              last.fm ↗
            </a>
          </span>
        </button>

        <div
          id="scrobble-week"
          className="scrobble-panel overflow-hidden"
          data-open={expanded ? "true" : "false"}
        >
          {hasWeek && week && (
            <div className="pb-3 pt-1">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle/70 mb-2"
                aria-hidden="true"
              >
                past 7 days
              </p>
              <dl className="font-mono text-[11px] space-y-1.5">
                {week.track && (
                  <WeekRow
                    label="track"
                    primary={
                      <>
                        <span className="text-fg-subtle">{week.track.artist}</span>
                        <span className="text-fg-subtle"> · </span>
                        <span className="text-fg">{week.track.title}</span>
                      </>
                    }
                    plays={week.track.plays}
                  />
                )}
                {week.artist && (
                  <WeekRow
                    label="artist"
                    primary={<span className="text-fg">{week.artist.name}</span>}
                    plays={week.artist.plays}
                  />
                )}
                {week.album && (
                  <WeekRow
                    label="album"
                    primary={
                      <>
                        <span className="text-fg-subtle">{week.album.artist}</span>
                        <span className="text-fg-subtle"> · </span>
                        <span className="text-fg">{week.album.title}</span>
                      </>
                    }
                    plays={week.album.plays}
                  />
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function WeekRow({
  label,
  primary,
  plays,
}: {
  label: string;
  primary: React.ReactNode;
  plays: number;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="text-fg-subtle/70 w-14 shrink-0 uppercase tracking-wider text-[10px]">
        {label}
      </dt>
      <dd className="flex-1 min-w-0 flex items-baseline gap-3">
        <span className="truncate min-w-0">{primary}</span>
        <span className="text-fg-subtle/60 tabular-nums shrink-0 ml-auto">
          {formatPlays(plays)}
        </span>
      </dd>
    </div>
  );
}

function ScrobbleBars({ playing }: { playing: boolean }) {
  return (
    <span
      className="scrobble-bars inline-flex items-end gap-[2px] h-3 shrink-0"
      data-playing={playing ? "true" : "false"}
      aria-hidden="true"
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <span key={i} className="scrobble-bar" style={{ ["--i" as string]: i }} />
      ))}
    </span>
  );
}
