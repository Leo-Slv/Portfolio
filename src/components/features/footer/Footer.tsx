"use client";

import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted text-center md:text-left">{t("FOOTER.TEXT")}</p>
        <p className="text-xs text-muted flex items-center gap-1.5">
          {t("FOOTER.MADE_WITH")}
          <span aria-hidden>☕</span>
        </p>
      </div>
    </footer>
  );
}
