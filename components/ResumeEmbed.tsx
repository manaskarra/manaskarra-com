"use client";

import { useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function ResumeEmbed() {
  const showEmbed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="mt-12 hidden h-[78vh] min-h-[680px] overflow-hidden rounded-[18px] border border-rule bg-bg-elevated shadow-[0_20px_60px_var(--shadow)] md:block">
      {showEmbed ? (
        <iframe
          src="/resume.pdf#view=FitH"
          className="h-full w-full"
          title="Manas Karra résumé PDF"
        />
      ) : (
        <div className="h-full w-full" aria-hidden="true" />
      )}
    </div>
  );
}
