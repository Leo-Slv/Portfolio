"use client";

import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div className="fixed z-[60] top-[calc(4.5rem+0.5rem)] md:top-[calc(5.25rem+0.5rem)] right-4 sm:right-6 lg:right-8">
      <div className="flex border border-ink bg-surface" role="group" aria-label="Language toggle">
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
  );
}

