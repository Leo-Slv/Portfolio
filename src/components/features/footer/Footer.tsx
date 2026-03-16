"use client";

import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 mt-10 pt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="text-center md:text-left">
          <span className="text-sm font-semibold tracking-tight text-white">Leo</span>
          <span className="text-sm font-semibold tracking-tight text-white/60"> / Portfolio</span>
        </div>
        <p className="text-xs text-white/45 mt-6 md:mt-0">
          {t("FOOTER.TEXT")}
        </p>
      </div>
    </footer>
  );
}
