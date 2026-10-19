"use client";

import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

const EMAIL = "leonardo1692004@gmail.com";
const TIME_ZONE = "America/Sao_Paulo";
const BUSINESS_HOURS = { start: 9, end: 18 };

const SUBJECTS = [
  { id: "PROJECT", subjectKey: "CONTACTS.SUBJECT_PROJECT", bodyKey: "CONTACTS.BODY_PROJECT" },
  { id: "FREELANCE", subjectKey: "CONTACTS.SUBJECT_FREELANCE", bodyKey: "CONTACTS.BODY_FREELANCE" },
  { id: "CLT", subjectKey: "CONTACTS.SUBJECT_CLT", bodyKey: "CONTACTS.BODY_CLT" },
  { id: "HELLO", subjectKey: "CONTACTS.SUBJECT_HELLO", bodyKey: "CONTACTS.BODY_HELLO" },
] as const;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Leo-Slv", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/leonardo-irineu-dev/", Icon: Linkedin },
  { label: "E-mail", href: `mailto:${EMAIL}`, Icon: Mail },
];

type LocalTime = { clock: string; online: boolean };

function readLocalTime(locale: string): LocalTime {
  const now = new Date();
  const clock = new Intl.DateTimeFormat(locale, {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    hour12: false,
    weekday: "short",
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0) % 24;
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const isWeekday = !["Sat", "Sun"].includes(weekday);

  return { clock, online: isWeekday && hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end };
}

export function ContactSection() {
  const { t, locale } = useTranslation();
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<LocalTime | null>(null);

  // Live clock: only rendered after mount so server and client markup match.
  useEffect(() => {
    setTime(readLocalTime(locale));
    const interval = window.setInterval(() => setTime(readLocalTime(locale)), 1000);
    return () => window.clearInterval(interval);
  }, [locale]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const subject = SUBJECTS[subjectIndex];
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(t(subject.subjectKey))}&body=${encodeURIComponent(
    t(subject.bodyKey)
  )}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // clipboard blocked (insecure context / permissions): open the mail client instead
      window.location.href = mailto;
    }
  };

  const marquee = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center gap-6 pr-6">
      <span>{t("CONTACTS.MARQUEE")}</span>
      <span className="h-1.5 w-1.5 bg-ink" aria-hidden />
    </span>
  ));

  return (
    <section id="contacts-section" className="border-t border-line bg-page overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <Reveal className="section-title-row">
          <span className="section-title-text">{t("CONTACTS.SECTION_LABEL")}</span>
          <span className="section-title-line" />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-8">
            <Reveal className="inline-flex w-fit items-center gap-2.5 border border-ink bg-surface px-3 py-1.5">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping bg-ink opacity-60" />
                <span className="relative inline-flex h-2 w-2 bg-ink" />
              </span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">
                {t("CONTACTS.AVAILABLE_NOW")}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-ink text-balance [overflow-wrap:anywhere] sm:text-4xl lg:text-[2.75rem]">
                {t("CONTACTS.HEADLINE")}{" "}
                <span className="inline-block bg-ink px-3 pb-1.5 leading-[1.2] text-page">{t("CONTACTS.HEADLINE_ACCENT")}</span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="max-w-xl text-base leading-relaxed text-muted">{t("CONTACTS.CTA_LEAD")}</p>
            </Reveal>

            <Reveal delay={240} className="grid gap-px border border-line bg-line sm:grid-cols-2">
              <div className="bg-surface p-5">
                <p className="mb-3 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                  {t("CONTACTS.LOCATION_LABEL")}
                </p>
                <p className="text-sm font-semibold text-ink">{t("CONTACTS.LOCATION_VALUE")}</p>
                <p className="mt-3 font-mono text-2xl font-medium tabular-nums tracking-tight text-ink">
                  {time?.clock ?? "--:--:--"}
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full", time?.online ? "animate-pulse bg-ink" : "bg-line-strong")}
                    aria-hidden
                  />
                  {time?.online ? t("CONTACTS.ONLINE_NOW") : t("CONTACTS.OFFLINE_NOW")}
                </p>
              </div>
              <div className="bg-surface p-5">
                <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  {t("CONTACTS.AVAIL_LABEL")}
                </p>
                <ul className="flex flex-col gap-2 text-sm font-semibold text-ink">
                  {t("CONTACTS.AVAIL_VALUE")
                    .split("•")
                    .map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                        {item.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="flex min-w-0 flex-col gap-6 border border-line bg-surface p-6 sm:p-8">
            <div>
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
                {t("CONTACTS.SUBJECT_LABEL")}
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t("CONTACTS.SUBJECT_LABEL")}>
                {SUBJECTS.map((item, index) => {
                  const active = index === subjectIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSubjectIndex(index)}
                      aria-pressed={active}
                      className={cn(
                        "h-10 border px-4 text-xs font-semibold uppercase tracking-wide transition-colors focus-ring",
                        active ? "border-ink bg-ink text-page" : "border-line bg-page text-ink hover:border-ink"
                      )}
                    >
                      {t(item.subjectKey)}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? t("CONTACTS.COPIED") : t("CONTACTS.COPY_EMAIL")}
              className="group relative flex items-center justify-between gap-4 border border-ink bg-page px-5 py-4 text-left transition-colors hover:bg-ink hover:text-page focus-ring"
            >
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] opacity-60">
                  {copied ? t("CONTACTS.COPIED") : t("CONTACTS.COPY_EMAIL")}
                </span>
                <span className="block truncate text-base font-bold sm:text-lg">{EMAIL}</span>
              </span>
              <span className="relative h-5 w-5 shrink-0" aria-hidden>
                <Copy
                  className={cn(
                    "absolute inset-0 h-5 w-5 transition-all duration-300",
                    copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
                  )}
                  strokeWidth={1.75}
                />
                <Check
                  className={cn(
                    "absolute inset-0 h-5 w-5 transition-all duration-300",
                    copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  )}
                  strokeWidth={2.25}
                />
              </span>
            </button>

            <a
              href={mailto}
              className="group inline-flex items-center justify-between gap-3 border border-ink bg-ink px-5 py-4 text-sm font-semibold text-page focus-ring"
            >
              {t("CONTACTS.SEND_EMAIL")}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink focus-ring"
                >
                  <Icon
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-line bg-surface py-4" aria-hidden>
        <div className="flex w-max animate-marquee text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {marquee}
          {marquee}
        </div>
      </div>
    </section>
  );
}
