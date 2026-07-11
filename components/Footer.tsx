import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule mt-auto">
      <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end lg:px-10">
        <div>
          <p className="font-serif text-[24px] leading-tight tracking-[-0.02em] text-fg">
            Good problems are worth a conversation.
          </p>
          <a
            href={`mailto:${site.emails.primary}`}
            className="mt-3 inline-flex items-center gap-2 font-mono text-[12px] text-accent transition-colors hover:text-accent-hover"
          >
            {site.emails.primary} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="flex flex-col gap-3 font-mono text-[11px] text-fg-subtle md:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="footer-link" href="https://github.com/manaskarra" target="_blank" rel="noopener noreferrer">github</a>
            <a className="footer-link" href="https://www.linkedin.com/in/manas-karra/" target="_blank" rel="noopener noreferrer">linkedin</a>
            <a className="footer-link" href="https://www.youtube.com/@sledg3r" target="_blank" rel="noopener noreferrer">youtube</a>
          </div>
          <p>© {year} {site.name.toLowerCase()} · dxb ↔ hyd</p>
        </div>
      </div>
    </footer>
  );
}
