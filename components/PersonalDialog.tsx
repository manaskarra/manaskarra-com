"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { WorkspaceIcon } from "./WorkspaceIcon";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getHash() { return window.location.hash; }
function getServerHash() { return ""; }
function isPersonalHash(hash: string) { return hash === "#about"; }

export function PersonalDialog() {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const open = isPersonalHash(hash);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousHash = useRef("");

  useEffect(() => {
    if (!open) {
      previousHash.current = hash;
      dialog.current?.close();
      return;
    }
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.current?.open) dialog.current?.showModal();
    return () => { document.body.style.overflow = overflow; };
  }, [hash, open]);

  function onClose() {
    if (!isPersonalHash(window.location.hash)) return;
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}${previousHash.current}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return <dialog
    ref={dialog}
    className="personal-dialog"
    aria-labelledby="personal-dialog-title"
    onClose={onClose}
    onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
  >
    <div className="personal-dialog-inner">
      <header className="personal-dialog-header">
        <h2 id="personal-dialog-title">About me</h2>
        <button className="ws-icon-button" type="button" aria-label="Close personal details" onClick={() => dialog.current?.close()} autoFocus><WorkspaceIcon name="close" /></button>
      </header>
      {open && <div className="personal-dialog-body">
        <div className="personal-notes">
          <p>I love getting lost in nature, especially in the mountains. I want to visit 100 countries.</p>
          <p>I play cricket as a fast bowler and watch a lot of it too. I also play table tennis - I competed at nationals in high school.</p>
        </div>
        <p className="personal-footnote">UAE Golden Visa holder since 2021, for academic distinction.</p>
        <div className="personal-links">
          <a className="personal-contact" href="mailto:manas.karra@gmail.com"><WorkspaceIcon name="mail" />Say hello <WorkspaceIcon name="arrow" /></a>
          <a className="personal-contact" href="https://open.spotify.com/user/5l1espye2lzv5rs8jsfxyzsic" target="_blank" rel="noopener noreferrer"><WorkspaceIcon name="music" />My Spotify <WorkspaceIcon name="arrow" /></a>
        </div>
      </div>}
    </div>
  </dialog>;
}
