import type { Metadata } from "next";
import Link from "next/link";
import { getPostedRepos, type GitBizRepo } from "@/lib/gitbiz";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "gitbiz",
  description:
    "A live feed of open-source repos with real business potential, surfaced and scored daily by GitBiz.",
};

export const revalidate = 3600;

const PAGE_SIZE = 10;

function scoreColor(score: number): string {
  if (score >= 8) return "text-emerald-500";
  if (score >= 6) return "text-amber-400";
  return "text-orange-400";
}

function trunc(text: string | undefined | null, len = 200): string {
  if (!text) return "";
  return text.length <= len ? text : text.slice(0, len - 1) + "…";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Pagination({
  page,
  totalPages,
  hasPrev,
  hasNext,
  className = "",
}: {
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  className?: string;
}) {
  return (
    <nav
      className={`flex items-center justify-between font-mono text-[12px] ${className}`}
      aria-label="pagination"
    >
      {hasPrev ? (
        <Link
          href={`/gitbiz?page=${page - 1}`}
          className="text-fg-subtle hover:text-accent transition-colors"
        >
          ← newer
        </Link>
      ) : (
        <span />
      )}
      <span className="text-fg-subtle/50 tabular-nums">
        {page} / {totalPages}
      </span>
      {hasNext ? (
        <Link
          href={`/gitbiz?page=${page + 1}`}
          className="text-fg-subtle hover:text-accent transition-colors"
        >
          older →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function RepoCard({ repo }: { repo: GitBizRepo }) {
  const output = repo.output_json ?? {};
  const scores = output.scores ?? {};
  const idea = output.product_idea ?? output.opportunity ?? "";
  const summary = output.summary ?? repo.description ?? "";
  const bp = scores.business_potential;
  const nov = scores.novelty;
  const ease = scores.ease_of_mvp;

  return (
    <li className="border-b border-rule">
      <div className="py-6 sm:py-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
          {/* Date + score column */}
          <div className="shrink-0 sm:w-28 mb-3 sm:mb-0 flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-2">
            <time
              dateTime={repo.created_at}
              className="font-mono text-[10px] text-fg-subtle/60 tabular-nums"
            >
              {formatDate(repo.created_at)}
            </time>
            <span
              className={`font-mono text-[18px] font-bold tabular-nums leading-none ${scoreColor(repo.score)}`}
            >
              {repo.score.toFixed(1)}
              <span className="text-[10px] font-normal text-fg-subtle/50 ml-0.5">
                /10
              </span>
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-[20px] leading-snug tracking-tight text-fg hover:text-accent transition-colors"
              >
                {repo.full_name}
              </a>
              <div className="flex items-center gap-3 font-mono text-[11px] text-fg-subtle shrink-0">
                {repo.language && <span>{repo.language}</span>}
                <span>★ {repo.stars.toLocaleString()}</span>
              </div>
            </div>

            {summary && (
              <p className="mt-2 text-fg-subtle text-[14px] leading-relaxed">
                {trunc(summary, 280)}
              </p>
            )}

            {idea && (
              <p className="mt-3 text-fg text-[14px] leading-relaxed border-l-2 border-accent/40 pl-3">
                {trunc(idea, 240)}
              </p>
            )}

            {(bp !== undefined || nov !== undefined || ease !== undefined) && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-fg-subtle">
                {bp !== undefined && <span>biz {bp}/10</span>}
                {nov !== undefined && <span>novelty {nov}/10</span>}
                {ease !== undefined && <span>mvp ease {ease}/10</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default async function GitBizPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  let repos: GitBizRepo[] = [];
  let total = 0;
  let fetchError = false;

  try {
    ({ repos, total } = await getPostedRepos(page, PAGE_SIZE));
  } catch {
    fetchError = true;
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <Section
      marker="§ 04 / gitbiz"
      label={fetchError ? undefined : `${total} repos`}
    >
      <header>
        <h1 className="font-serif text-[48px] sm:text-[64px] leading-[1.02] tracking-[-0.025em] text-fg">
          GitBiz.
        </h1>
        <p className="mt-4 text-fg-subtle text-[17px] leading-relaxed">
          Open-source repos with real business potential, scored and surfaced daily.
        </p>
        <p className="mt-3 font-mono text-[11px] text-fg-subtle/60 flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          streamed live from my running instance &mdash;{" "}
          <a
            href="https://github.com/manaskarra/gitbiz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:opacity-80 transition-opacity underline underline-offset-[3px]"
            style={{ color: "var(--accent)", textDecorationColor: "var(--accent)" }}
          >
            github.com/manaskarra/gitbiz ↗
          </a>
        </p>
      </header>

      {fetchError ? (
        <p className="font-mono text-[12px] text-fg-subtle mt-14">
          couldn&apos;t load the feed right now. try again soon.
        </p>
      ) : repos.length === 0 ? (
        <p className="font-mono text-[12px] text-fg-subtle mt-14">
          nothing posted yet. check back soon.
        </p>
      ) : (
        <>
          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} hasPrev={hasPrev} hasNext={hasNext} className="mt-14 mb-6" />
          )}

          <ul className="border-t border-rule">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} hasPrev={hasPrev} hasNext={hasNext} className="mt-10" />
          )}
        </>
      )}
    </Section>
  );
}
