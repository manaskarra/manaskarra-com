"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onDesktop);
    };
  }, [open]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <header className="site-nav sticky top-0 z-40 border-b border-rule bg-bg/92 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/78">
      <nav
        className="mx-auto flex min-h-[68px] w-full max-w-[1320px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group inline-flex shrink-0 items-center gap-2.5 font-mono text-[13px] tracking-tight text-fg transition-colors hover:text-accent"
          aria-label="manas / sledg3r — home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/icon.svg"
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            loading="eager"
            className="h-6 w-6 rounded-[6px] transition-transform duration-300 group-hover:-rotate-3"
          />
          <span className="font-medium">manas</span>
          <span className="hidden text-fg-subtle sm:inline" aria-hidden="true">/</span>
          <span className="hidden text-fg-subtle sm:inline">sledg3r</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 font-mono text-[12px] tracking-tight">
            {site.nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link ${
                      active ? "nav-link-active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls={open ? "mobile-nav" : undefined}
            aria-label={open ? "close navigation" : "open navigation"}
            onClick={() => setOpen((value) => !value)}
            className="nav-menu-button inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-rule text-fg-subtle transition-colors hover:border-accent/50 hover:text-accent"
          >
            <span className="relative h-3.5 w-4" aria-hidden="true">
              <span className={`absolute left-0 top-0.5 h-px w-4 bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute bottom-0.5 left-0 h-px w-4 bg-current transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="mobile-nav-enter border-t border-rule bg-bg md:hidden">
          <ul className="mx-auto grid w-full max-w-[1320px] grid-cols-2 gap-px bg-rule px-5 py-px font-mono text-[12px] sm:px-8">
            <li className="bg-bg">
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`mobile-nav-link ${pathname === "/" ? "text-accent" : "text-fg-subtle"}`}
              >
                home <span aria-hidden="true">→</span>
              </Link>
            </li>
            {site.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href} className="bg-bg">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`mobile-nav-link ${active ? "text-accent" : "text-fg-subtle"}`}
                  >
                    {item.label} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
