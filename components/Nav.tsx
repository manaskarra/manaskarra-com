"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <nav
        className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 py-5 flex items-center justify-between gap-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-mono text-[13px] tracking-tight text-fg hover:text-accent transition-colors inline-flex items-center gap-1.5"
          aria-label="Home"
        >
          <span>manas</span>
          <span className="text-fg-subtle/70">/</span>
          <span className="text-fg-subtle">sledg3r</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          <ul className="flex items-center gap-5 sm:gap-7 font-mono text-[12px] tracking-tight">
            {site.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
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
      </nav>
    </header>
  );
}
