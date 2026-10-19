import { NextResponse } from "next/server";

const USERNAME = "Leo-Slv";
const REVALIDATE_SECONDS = 60 * 60;

type Day = { date: string; count: number };

/**
 * GitHub's REST API has no contribution calendar (only GraphQL, which needs a token),
 * so read the public calendar fragment github.com serves for each year and sum it up.
 */
async function fetchYear(year: number): Promise<Day[]> {
  const res = await fetch(
    `https://github.com/users/${USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`,
    { headers: { Accept: "text/html" }, next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!res.ok) throw new Error(`contributions ${year}: ${res.status}`);
  const html = await res.text();

  const dateById = new Map<string, string>();
  for (const match of html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*?id="(contribution-day-component-[\d-]+)"/g)) {
    dateById.set(match[2], match[1]);
  }

  const days: Day[] = [];
  for (const match of html.matchAll(/<tool-tip[^>]*?for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)</g)) {
    const date = dateById.get(match[1]);
    if (!date || !date.startsWith(String(year))) continue;
    const count = match[2].match(/^(\d+) contribution/)?.[1];
    days.push({ date, count: count ? Number(count) : 0 });
  }
  return days;
}

function dayDiff(a: string, b: string) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

export async function GET() {
  try {
    const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!userRes.ok) throw new Error(`user: ${userRes.status}`);
    const { created_at: createdAt } = (await userRes.json()) as { created_at: string };

    const firstYear = new Date(createdAt).getUTCFullYear();
    const lastYear = new Date().getUTCFullYear();
    const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);

    const days = (await Promise.all(years.map(fetchYear)))
      .flat()
      .filter((day) => day.date >= createdAt.slice(0, 10))
      .sort((a, b) => a.date.localeCompare(b.date));
    if (days.length === 0) throw new Error("empty calendar");

    const total = days.reduce((sum, day) => sum + day.count, 0);

    let best = { days: 0, start: "", end: "" };
    let run = { days: 0, start: "", end: "" };
    for (const day of days) {
      if (day.count > 0) {
        run =
          run.days > 0 && dayDiff(run.end, day.date) === 1
            ? { days: run.days + 1, start: run.start, end: day.date }
            : { days: 1, start: day.date, end: day.date };
        if (run.days > best.days) best = run;
      } else if (run.days > 0 && dayDiff(run.end, day.date) >= 1) {
        run = { days: 0, start: "", end: "" };
      }
    }

    return NextResponse.json(
      { total, since: createdAt.slice(0, 10), longestStreak: best },
      { headers: { "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate` } }
    );
  } catch {
    return NextResponse.json({ error: "github unavailable" }, { status: 502 });
  }
}
