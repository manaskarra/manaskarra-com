import type { ReactNode } from "react";

type SectionProps = {
  marker?: string;
  label?: string;
  sidebar?: ReactNode;
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "header" | "div";
};

/**
 * Two-column layout: margin note on the left (section marker like "§ 00 / home"
 * plus optional label), main content on the right. Collapses to a single
 * column on mobile with the marker appearing inline above the content.
 *
 * The marker is sticky within its section on desktop, so it stays visible
 * as you scroll through the content — magazine-style marginalia.
 *
 * Pass `sidebar` for additional margin content (e.g. a compact CV block);
 * it renders below the marker/label and is hidden on mobile to keep the
 * top of the page clean.
 */
export function Section({
  marker,
  label,
  sidebar,
  children,
  className,
  as: Tag = "section",
}: SectionProps) {
  const classes = [
    "grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr]",
    "gap-3 md:gap-10 lg:gap-16",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const hasAside = Boolean(marker || label || sidebar);

  return (
    <Tag className={classes}>
      {hasAside && (
        <aside className="md:sticky md:top-24 h-fit font-mono text-[11px] leading-relaxed text-fg-subtle select-none">
          {marker && (
            <p className="whitespace-nowrap">
              <span className="tabular-nums">{marker}</span>
            </p>
          )}
          {label && (
            <p className="mt-1 uppercase tracking-wider text-[10px] text-fg-subtle/70">
              {label}
            </p>
          )}
          {sidebar && <div className="hidden md:block mt-10">{sidebar}</div>}
        </aside>
      )}
      <div className={hasAside ? "" : "md:col-start-2"}>{children}</div>
    </Tag>
  );
}
