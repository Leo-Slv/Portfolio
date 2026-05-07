"use client";

import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const iconProps = { className: "h-4 w-4 shrink-0 text-ink", strokeWidth: 1.75 } as const;

export function HeroSection() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <section
      id="home"
      className="w-full bg-surface min-h-[100svh] box-border flex flex-col pt-[4.5rem] md:pt-[5.25rem]"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex justify-end shrink-0 pt-2">
          <div className="flex border border-ink bg-surface" role="group">
            <button
              type="button"
              onClick={() => setLocale("pt-BR")}
              aria-pressed={locale === "pt-BR"}
              className={cn(
                "px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide min-w-[3.25rem]",
                locale === "pt-BR" ? "bg-ink text-white" : "bg-surface text-ink"
              )}
            >
              {t("NAVBAR.LABEL_PT")}
            </button>
            <button
              type="button"
              onClick={() => setLocale("en-US")}
              aria-pressed={locale === "en-US"}
              className={cn(
                "px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide min-w-[3.25rem] border-l border-ink",
                locale === "en-US" ? "bg-ink text-white" : "bg-surface text-ink"
              )}
            >
              {t("NAVBAR.LABEL_EN")}
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-0 py-6 md:py-8 overflow-y-auto [scrollbar-gutter:stable]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-center w-full max-w-full my-auto">
            <div className="flex flex-col gap-5 md:gap-6 min-w-0 order-2 lg:order-1">
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
                  href="https://www.linkedin.com/in/leonardo-irineu-8418b0288/"
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

            <div className="flex justify-center lg:justify-end items-center gap-5 lg:gap-6 order-1 lg:order-2 w-full min-w-0">
              <div className="relative w-full max-w-2xl aspect-[4/3] border border-line bg-page shrink-0 overflow-hidden">
                <Image
                  src="/assets/hero-geometry.png"
                  alt=""
                  fill
                  className="object-contain object-center grayscale contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 672px"
                  priority
                />
              </div>
              <div
                className="hidden sm:grid grid-cols-4 grid-rows-5 gap-y-2 gap-x-2 self-center shrink-0"
                aria-hidden
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 bg-muted/45" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
