import "server-only";
import { site } from "@/lib/site";

const LASTFM_BASE = "https://ws.audioscrobbler.com/2.0/";
const FETCH_TIMEOUT_MS = 4000;
const CACHE_REVALIDATE_SECONDS = 300;

export type RecentTrack = {
  artist: string;
  title: string;
  album: string;
  url: string;
  image: string | null;
  nowPlaying: boolean;
  playedAt: string | null;
};

export type TopArtist = {
  name: string;
  url: string;
  plays: number;
};

export type TopTrack = {
  artist: string;
  title: string;
  url: string;
  plays: number;
};

export type TopAlbum = {
  artist: string;
  title: string;
  url: string;
  plays: number;
};

export type LastfmPeriod =
  | "7day"
  | "1month"
  | "3month"
  | "6month"
  | "12month"
  | "overall";

export type UserInfo = {
  totalScrobbles: number;
  joinedIso: string | null;
};

function sanitizeUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" && u.protocol !== "http:") return "";
    if (!u.hostname.endsWith("last.fm")) return "";
    return u.toString();
  } catch {
    return "";
  }
}

function pickImage(images: unknown): string | null {
  if (!Array.isArray(images)) return null;
  for (let i = images.length - 1; i >= 0; i--) {
    const img = images[i];
    if (img && typeof img === "object" && "#text" in img) {
      const url = (img as { "#text": unknown })["#text"];
      if (typeof url === "string" && url.startsWith("https://")) return url;
    }
  }
  return null;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

async function lastfmCall<T>(
  params: Record<string, string>,
  opts: { revalidate?: number } = {}
): Promise<T | null> {
  const apiKey = process.env.LASTFM_API_KEY;
  if (!apiKey) return null;

  const url = new URL(LASTFM_BASE);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("user", site.lastfmUser);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      next: { revalidate: opts.revalidate ?? CACHE_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return data as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

type RecentTracksResponse = {
  recenttracks?: {
    track?: Array<Record<string, unknown>>;
  };
};

export async function getRecentTracks(limit = 8): Promise<RecentTrack[] | null> {
  const safeLimit = Math.min(Math.max(limit, 1), 20);
  const data = await lastfmCall<RecentTracksResponse>({
    method: "user.getRecentTracks",
    limit: String(safeLimit),
  });
  const items = data?.recenttracks?.track;
  if (!Array.isArray(items)) return null;

  return items.slice(0, safeLimit).map((raw): RecentTrack => {
    const artistValue = raw.artist;
    const artist =
      artistValue && typeof artistValue === "object" && "#text" in artistValue
        ? asString((artistValue as { "#text": unknown })["#text"])
        : asString(artistValue);

    const albumValue = raw.album;
    const album =
      albumValue && typeof albumValue === "object" && "#text" in albumValue
        ? asString((albumValue as { "#text": unknown })["#text"])
        : asString(albumValue);

    const attrs = raw["@attr"];
    const nowPlaying =
      attrs && typeof attrs === "object" && "nowplaying" in attrs
        ? (attrs as { nowplaying: unknown }).nowplaying === "true"
        : false;

    const dateValue = raw.date;
    const playedAt =
      dateValue && typeof dateValue === "object" && "uts" in dateValue
        ? asString((dateValue as { uts: unknown }).uts)
        : null;

    return {
      artist,
      title: asString(raw.name),
      album,
      url: sanitizeUrl(raw.url),
      image: pickImage(raw.image),
      nowPlaying,
      playedAt: playedAt && /^\d+$/.test(playedAt)
        ? new Date(Number(playedAt) * 1000).toISOString()
        : null,
    };
  });
}

type TopArtistsResponse = {
  topartists?: {
    artist?: Array<Record<string, unknown>>;
  };
};

export async function getTopArtists(
  period: LastfmPeriod = "1month",
  limit = 6
): Promise<TopArtist[] | null> {
  const safeLimit = Math.min(Math.max(limit, 1), 20);
  const data = await lastfmCall<TopArtistsResponse>(
    {
      method: "user.getTopArtists",
      period,
      limit: String(safeLimit),
    },
    { revalidate: 1800 }
  );
  const items = data?.topartists?.artist;
  if (!Array.isArray(items)) return null;

  return items.slice(0, safeLimit).map((raw): TopArtist => {
    const playsRaw = asString(raw.playcount);
    const plays = /^\d+$/.test(playsRaw) ? Number(playsRaw) : 0;
    return {
      name: asString(raw.name),
      url: sanitizeUrl(raw.url),
      plays,
    };
  });
}

type TopTracksResponse = {
  toptracks?: {
    track?: Array<Record<string, unknown>>;
  };
};

export async function getTopTracks(
  period: LastfmPeriod = "7day",
  limit = 5
): Promise<TopTrack[] | null> {
  const safeLimit = Math.min(Math.max(limit, 1), 20);
  const data = await lastfmCall<TopTracksResponse>(
    {
      method: "user.getTopTracks",
      period,
      limit: String(safeLimit),
    },
    { revalidate: 1800 }
  );
  const items = data?.toptracks?.track;
  if (!Array.isArray(items)) return null;

  return items.slice(0, safeLimit).map((raw): TopTrack => {
    const artistValue = raw.artist;
    const artist =
      artistValue && typeof artistValue === "object" && "name" in artistValue
        ? asString((artistValue as { name: unknown }).name)
        : asString(artistValue);
    const playsRaw = asString(raw.playcount);
    const plays = /^\d+$/.test(playsRaw) ? Number(playsRaw) : 0;
    return {
      artist,
      title: asString(raw.name),
      url: sanitizeUrl(raw.url),
      plays,
    };
  });
}

type TopAlbumsResponse = {
  topalbums?: {
    album?: Array<Record<string, unknown>>;
  };
};

export async function getTopAlbums(
  period: LastfmPeriod = "7day",
  limit = 5
): Promise<TopAlbum[] | null> {
  const safeLimit = Math.min(Math.max(limit, 1), 20);
  const data = await lastfmCall<TopAlbumsResponse>(
    {
      method: "user.getTopAlbums",
      period,
      limit: String(safeLimit),
    },
    { revalidate: 1800 }
  );
  const items = data?.topalbums?.album;
  if (!Array.isArray(items)) return null;

  return items.slice(0, safeLimit).map((raw): TopAlbum => {
    const artistValue = raw.artist;
    const artist =
      artistValue && typeof artistValue === "object" && "name" in artistValue
        ? asString((artistValue as { name: unknown }).name)
        : asString(artistValue);
    const playsRaw = asString(raw.playcount);
    const plays = /^\d+$/.test(playsRaw) ? Number(playsRaw) : 0;
    return {
      artist,
      title: asString(raw.name),
      url: sanitizeUrl(raw.url),
      plays,
    };
  });
}

type UserInfoResponse = {
  user?: {
    playcount?: string;
    registered?: { unixtime?: string } | string;
  };
};

export async function getUserInfo(): Promise<UserInfo | null> {
  const data = await lastfmCall<UserInfoResponse>({ method: "user.getInfo" });
  const user = data?.user;
  if (!user) return null;

  const playsRaw = asString(user.playcount);
  const totalScrobbles = /^\d+$/.test(playsRaw) ? Number(playsRaw) : 0;

  let joinedIso: string | null = null;
  const reg = user.registered;
  if (reg && typeof reg === "object" && "unixtime" in reg) {
    const uts = asString((reg as { unixtime: unknown }).unixtime);
    if (/^\d+$/.test(uts)) {
      joinedIso = new Date(Number(uts) * 1000).toISOString();
    }
  }

  return { totalScrobbles, joinedIso };
}

export function formatScrobbleTime(iso: string | null, nowPlaying: boolean): string {
  if (nowPlaying) return "now playing";
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}
