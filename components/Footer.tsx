import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule mt-auto">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-fg-subtle">
        <p>
          © {year} {site.name.toLowerCase()}
        </p>
        <a
          href={`mailto:${site.emails.primary}`}
          className="hover:text-accent transition-colors"
        >
          email
        </a>
      </div>
    </footer>
  );
}
