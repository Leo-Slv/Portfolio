"use client";

import { ArrowUpRight, GitCommitHorizontal, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { useCountUp } from "@/lib/use-count-up";

const USERNAME = "Leo-Slv";
const CACHE_KEY = "portfolio-github-stats";
const CACHE_TTL_MS = 60 * 60 * 1000;
// Clearly separated tones (ink at decreasing strength) so adjacent languages never look alike.
const LANGUAGE_TONES = [1, 0.55, 0.32, 0.18, 0.1];

type GithubRepo = {
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

type GithubEvent = {
  type: string;
  created_at: string;
  payload?: { commits?: unknown[]; size?: number };
};

type Stats = {
  publicRepos: number;
  stars: number;
  recentCommits: number;
  languages: { name: string; count: number }[];
  recent: { name: string; url: string; pushedAt: string }[];
};

async function fetchStats(): Promise<Stats> {
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`),
    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=100`),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error("github request failed");

  const user = (await userRes.json()) as { public_repos: number };
  const repos = ((await reposRes.json()) as GithubRepo[]).filter((repo) => !repo.fork);
  const events = eventsRes.ok ? ((await eventsRes.json()) as GithubEvent[]) : [];

  const languageCount = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) languageCount.set(repo.language, (languageCount.get(repo.language) ?? 0) + 1);
  }

  return {
    publicRepos: user.public_repos,
    stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    recentCommits: events
      .filter((event) => event.type === "PushEvent")
      .reduce((sum, event) => sum + (event.payload?.size ?? event.payload?.commits?.length ?? 0), 0),
    languages: [...languageCount.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    recent: repos.slice(0, 4).map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    })),
  };
}

function loadCached(): Stats | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: Stats };
    return Date.now() - at < CACHE_TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function saveCache(data: Stats) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // storage unavailable: just skip caching
  }
}

function StatCard({ value, label }: { value: number; label: string }) {
  const [ref, display] = useCountUp<HTMLDivElement>(value);

  return (
    <div ref={ref} className="border border-line bg-surface p-6">
      <p className="text-3xl font-bold tracking-tight tabular-nums text-ink">{display}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</p>
    </div>
  );
}

function formatRelative(iso: string, locale: string) {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (Math.abs(days) < 1) return rtf.format(0, "day");
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}

export function GithubSection() {
  const { t, locale } = useTranslation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const cached = loadCached();
    if (cached) {
      setStats(cached);
      return;
    }

    let cancelled = false;
    fetchStats()
      .then((data) => {
        if (cancelled) return;
        saveCache(data);
        setStats(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // The rate limit or a network error should never leave a broken block on the page.
  if (failed) return null;

  const totalLanguages = stats?.languages.reduce((sum, lang) => sum + lang.count, 0) ?? 0;

  return (
    <section id="github-section" className="border-t border-line bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <Reveal className="section-title-row">
          <span className="section-title-text">{t("GITHUB.SECTION_LABEL")}</span>
          <span className="section-title-line" />
        </Reveal>

        <Reveal delay={100}>
          {stats ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
              <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
                <StatCard value={stats.publicRepos} label={t("GITHUB.REPOS")} />
                <StatCard value={stats.recentCommits} label={t("GITHUB.RECENT_COMMITS")} />
                <StatCard value={stats.stars} label={t("GITHUB.STARS")} />
              </div>

              <div className="flex flex-col gap-6">
                <div className="border border-line bg-surface p-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {t("GITHUB.LANGUAGES")}
                  </p>
                  <div className="flex h-3 w-full gap-0.5 overflow-hidden" role="img" aria-label={t("GITHUB.LANGUAGES")}>
                    {stats.languages.map((lang, index) => (
                      <span
                        key={lang.name}
                        className="block h-full bg-ink"
                        style={{
                          width: `${(lang.count / totalLanguages) * 100}%`,
                          opacity: LANGUAGE_TONES[index] ?? 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                    {stats.languages.map((lang, index) => (
                      <li key={lang.name} className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 border border-ink/30 bg-ink"
                          style={{ opacity: LANGUAGE_TONES[index] ?? 0.1 }}
                          aria-hidden
                        />
                        <span className="font-semibold text-ink">{lang.name}</span> · {lang.count}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-line bg-surface p-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {t("GITHUB.RECENT_ACTIVITY")}
                  </p>
                  <ul className="flex flex-col divide-y divide-line">
                    {stats.recent.map((repo) => (
                      <li key={repo.name}>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 py-3 text-sm focus-ring"
                        >
                          <span className="flex min-w-0 items-center gap-2 font-semibold text-ink">
                            <GitCommitHorizontal className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} aria-hidden />
                            <span className="truncate">{repo.name}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2 text-xs text-muted">
                            {formatRelative(repo.pushedAt, locale)}
                            <ArrowUpRight
                              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              strokeWidth={1.75}
                              aria-hidden
                            />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]" aria-hidden>
              <div className="h-64 animate-pulse border border-line bg-surface" />
              <div className="h-64 animate-pulse border border-line bg-surface" />
            </div>
          )}
        </Reveal>

        <p className="mt-6 flex items-center gap-1.5 text-xs text-muted">
          <Star className="h-3 w-3" strokeWidth={1.75} aria-hidden />
          {t("GITHUB.SOURCE_NOTE")}
        </p>
      </div>
    </section>
  );
}
