"use client";

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";

const iconProps = { className: "h-4 w-4 shrink-0 text-ink", strokeWidth: 1.75 } as const;
const TYPE_SPEED_MS = 18;

type TerminalSegment = {
  text: string;
  className?: string;
};

type TerminalLine = {
  segments: TerminalSegment[];
  gapAfter?: boolean;
};

function getLineLength(line: TerminalLine) {
  return line.segments.reduce((sum, segment) => sum + segment.text.length, 0);
}

function renderTypedSegments(segments: TerminalSegment[], visibleChars: number) {
  let remaining = visibleChars;

  return segments.map((segment, index) => {
    const visibleText = segment.text.slice(0, Math.max(0, remaining));
    remaining -= segment.text.length;

    return (
      <span key={`${segment.text}-${index}`} className={segment.className}>
        {visibleText}
      </span>
    );
  });
}

export function HeroSection() {
  const { t } = useTranslation();
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const terminalLines = useMemo<TerminalLine[]>(
    () => [
      {
        segments: [
          { text: "leonardo@dev", className: "font-bold text-[#f6f6f3]" },
          { text: ":~$", className: "text-[#9d9d97]" },
          { text: " " },
          { text: "whoami", className: "text-[#f0f0ec]" },
        ],
      },
      {
        segments: [{ text: t("HOME.TERMINAL_WHOAMI"), className: "text-[#b7b7b1]" }],
        gapAfter: true,
      },
      {
        segments: [
          { text: "leonardo@dev", className: "font-bold text-[#f6f6f3]" },
          { text: ":~$", className: "text-[#9d9d97]" },
          { text: " " },
          { text: "stack --current", className: "text-[#f0f0ec]" },
        ],
      },
      {
        segments: [
          { text: t("HOME.TERMINAL_BACKEND_LABEL").padEnd(14, " "), className: "text-[#f0f0ec]" },
          { text: "ASP.NET Core ", className: "text-[#b7b7b1]" },
          { text: "/ ", className: "text-[#62625e]" },
          { text: "NestJS ", className: "text-[#b7b7b1]" },
          { text: "/ ", className: "text-[#62625e]" },
          { text: "FastAPI", className: "text-[#b7b7b1]" },
        ],
      },
      {
        segments: [
          { text: t("HOME.TERMINAL_FRONTEND_LABEL").padEnd(14, " "), className: "text-[#f0f0ec]" },
          { text: "Next.js ", className: "text-[#b7b7b1]" },
          { text: "/ ", className: "text-[#62625e]" },
          { text: "TypeScript", className: "text-[#b7b7b1]" },
        ],
      },
      {
        segments: [
          { text: t("HOME.TERMINAL_DATA_LABEL").padEnd(14, " "), className: "text-[#f0f0ec]" },
          { text: "PostgreSQL ", className: "text-[#b7b7b1]" },
          { text: "/ ", className: "text-[#62625e]" },
          { text: "SQL Server", className: "text-[#b7b7b1]" },
        ],
      },
      {
        segments: [
          { text: t("HOME.TERMINAL_ARCHITECTURE_LABEL").padEnd(14, " "), className: "text-[#f0f0ec]" },
          { text: "DDD ", className: "text-[#b7b7b1]" },
          { text: "/ ", className: "text-[#62625e]" },
          { text: "layered ", className: "text-[#b7b7b1]" },
          { text: "/ ", className: "text-[#62625e]" },
          { text: "clean code", className: "text-[#b7b7b1]" },
        ],
        gapAfter: true,
      },
      {
        segments: [
          { text: "leonardo@dev", className: "font-bold text-[#f6f6f3]" },
          { text: ":~$", className: "text-[#9d9d97]" },
          { text: " " },
          { text: "projects --featured", className: "text-[#f0f0ec]" },
        ],
      },
      {
        segments: [
          { text: "01  ArchFlow      ", className: "text-[#b7b7b1]" },
          { text: "# .NET · Next.js · DDD", className: "text-[#777772]" },
        ],
      },
      {
        segments: [
          { text: "02  Quantum CRM   ", className: "text-[#b7b7b1]" },
          { text: "# Next.js · NestJS", className: "text-[#777772]" },
        ],
      },
      {
        segments: [
          { text: "03  CourseCore    ", className: "text-[#b7b7b1]" },
          { text: "# ASP.NET · PostgreSQL", className: "text-[#777772]" },
        ],
        gapAfter: true,
      },
      {
        segments: [
          { text: "leonardo@dev", className: "font-bold text-[#f6f6f3]" },
          { text: ":~$", className: "text-[#9d9d97]" },
          { text: " " },
          { text: "status", className: "text-[#f0f0ec]" },
        ],
      },
      {
        segments: [{ text: t("HOME.TERMINAL_STATUS"), className: "text-[#b7b7b1]" }],
        gapAfter: true,
      },
      {
        segments: [
          { text: "leonardo@dev", className: "font-bold text-[#f6f6f3]" },
          { text: ":~$", className: "text-[#9d9d97]" },
          { text: " " },
        ],
      },
    ],
    [t]
  );
  const totalTerminalChars = useMemo(
    () => terminalLines.reduce((sum, line) => sum + getLineLength(line), 0),
    [terminalLines]
  );
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedChars(totalTerminalChars);
      return;
    }

    setTypedChars(0);
    const interval = window.setInterval(() => {
      setTypedChars((current) => {
        if (current >= totalTerminalChars) {
          window.clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, TYPE_SPEED_MS);

    return () => window.clearInterval(interval);
  }, [totalTerminalChars]);

  useEffect(() => {
    const terminalBody = terminalBodyRef.current;
    if (!terminalBody) return;

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }, [typedChars]);

  return (
    <section
      id="home"
      className="w-full bg-surface min-h-[100svh] box-border flex flex-col pt-[4.5rem] md:pt-[5.25rem]"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0 px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center justify-center min-h-0 py-6 md:py-8 overflow-y-auto [scrollbar-gutter:stable]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-center w-full max-w-full my-auto">
            <div className="flex flex-col gap-5 md:gap-6 min-w-0 order-1">
              <div className="flex items-center gap-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted whitespace-nowrap">
                  {t("HOME.ROLE_LABEL")}
                </p>
                <span className="h-px w-[30px] shrink-0 bg-ink/40" aria-hidden />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-ink leading-[1.15] text-balance">
                {t("HOME.HERO_HEADLINE")}
              </h1>

              <p className="text-base leading-relaxed text-muted max-w-xl">{t("HOME.HERO_LEAD")}</p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#projects-section"
                  className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-6 py-3 text-sm font-semibold text-white focus-ring"
                >
                  {t("HOME.VIEW_PROJECTS")}
                  <ArrowRight className="h-[18px] w-[18px] shrink-0 text-white" strokeWidth={1.75} />
                </a>
                <a
                  href="mailto:leonardo1692004@gmail.com"
                  className="inline-flex items-center gap-2 rounded-sm border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink focus-ring"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
                  {t("HOME.CONTACT_BUTTON")}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-5 md:gap-6">
                <a
                  href="https://github.com/Leo-Slv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted"
                >
                  <Github {...iconProps} />
                  {t("HOME.SOCIAL_GITHUB")}
                </a>
                <a
                  href="https://www.linkedin.com/in/leonardo-irineu-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted"
                >
                  <Linkedin {...iconProps} />
                  {t("HOME.SOCIAL_LINKEDIN")}
                </a>
                <a
                  href="mailto:leonardo1692004@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted"
                >
                  <Mail {...iconProps} />
                  {t("HOME.SOCIAL_EMAIL")}
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end items-center order-2 w-full min-w-0">
              <div className="relative w-full max-w-2xl aspect-[4/3] border border-line bg-page shrink-0 overflow-hidden">
                <div
                  className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.52),rgba(255,255,255,0.52)),repeating-linear-gradient(90deg,transparent_0,transparent_74px,rgba(20,20,20,0.028)_75px)] p-4 sm:p-6 lg:p-8"
                  aria-label={t("HOME.TERMINAL_ARIA_LABEL")}
                >
                  <span
                    className="pointer-events-none absolute right-[-18px] top-[47%] h-20 w-20 opacity-40 [background-image:radial-gradient(circle,#595959_1.45px,transparent_1.55px)] [background-size:16px_16px]"
                    aria-hidden
                  />
                  <div className="relative z-[1] flex h-[calc(100%-1.5rem)] w-full flex-col border border-[#1b1b1b] bg-[#111110] text-[#ecece8] shadow-[12px_12px_0_#e4e4e0] sm:shadow-[18px_18px_0_#e4e4e0]">
                    <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#3a3a37] bg-[#171716] px-3 sm:h-12 sm:px-4">
                      <span className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.08em] text-[#c8c8c4] sm:text-xs">
                        leonardo - portfolio
                      </span>
                      <div className="flex gap-1.5 sm:gap-2" aria-hidden>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span key={i} className="block h-2 w-2 rounded-full border border-[#777772]" />
                        ))}
                      </div>
                    </div>

                    <div
                      ref={terminalBodyRef}
                      className="min-h-0 flex-1 overflow-y-auto px-4 py-4 font-mono text-[0.62rem] font-medium leading-[1.65] tracking-normal [scrollbar-width:none] [-ms-overflow-style:none] sm:px-5 sm:py-5 sm:text-xs lg:px-6 lg:py-6 lg:text-[0.82rem] [&::-webkit-scrollbar]:hidden"
                    >
                      {terminalLines.map((line, index) => {
                        const previousChars = terminalLines
                          .slice(0, index)
                          .reduce((sum, previousLine) => sum + getLineLength(previousLine), 0);
                        const visibleChars = Math.max(0, Math.min(getLineLength(line), typedChars - previousChars));

                        if (visibleChars <= 0) return null;

                        return (
                          <span key={index} className="block whitespace-pre-wrap">
                            {renderTypedSegments(line.segments, visibleChars)}
                            {line.gapAfter ? <span className="block h-2 sm:h-3" aria-hidden /> : null}
                          </span>
                        );
                      })}
                      <span className="inline-block h-[0.95em] w-2 translate-y-0.5 animate-pulse bg-[#e9e9e5]" aria-hidden />
                    </div>

                    <div className="hidden shrink-0 justify-between gap-5 border-t border-[#30302e] px-4 py-2 font-mono text-[0.6rem] font-medium uppercase tracking-[0.08em] text-[#85857f] sm:flex">
                      <span>main*</span>
                      <span>utf-8</span>
                      <span>portfolio.tsx</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
