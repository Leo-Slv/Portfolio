"use client";

import { useTranslation } from "@/lib/i18n";
import { DefaultButton } from "./DefaultButton";
import { AnimatedTerminal } from "./AnimatedTerminal";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="min-h-[100svh] max-w-6xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 lg:gap-12 content-center"
    >
      <div className="flex flex-col gap-6 w-full max-w-full lg:max-w-2xl min-w-0 items-center lg:items-start justify-center lg:justify-center lg:pl-8">
        <div className="float-2 w-full min-w-0 overflow-hidden">
          <p className="headline text-sm md:text-base text-center lg:text-left text-white/74 font-medium tracking-wide fade-in-left delay-300 break-words whitespace-normal">
            {t("HOME.GREETING")}
          </p>
        </div>

        <h1 className="headline text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-center lg:text-left w-full min-w-0 max-w-full overflow-hidden break-words text-balance leading-tight whitespace-normal fade-in-up delay-300">
          <span className="block">{t("HOME.TITLE_1")}</span>
          <span className="block">Next.js</span>
        </h1>

        <div className="w-full min-w-0 overflow-hidden fade-in-up delay-400">
          <p className="text-sm md:text-base leading-relaxed text-white/75 text-center lg:text-left break-words whitespace-normal">
            {t("HOME.DESCRIPTION")}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start float-1">
          <div className="fade-in-up delay-300">
            <DefaultButton text={t("HOME.RESUME_BUTTON")} href={t("HOME.PATH")} />
          </div>
          <div className="fade-in-up delay-300">
            <DefaultButton text={t("HOME.GITHUB_BUTTON")} href="https://github.com/Leo-Slv" paddingX="10" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full min-w-0">
        <AnimatedTerminal />
      </div>
    </section>
  );
}
