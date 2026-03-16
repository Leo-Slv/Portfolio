"use client";

import { useTranslation } from "@/lib/translation-context";

export function Footer() {
  const { t } = useTranslation();

  return (
    <nav className="bg-[#16161a] w-full z-20 top-0 start-0 border-nav">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pr-4 pl-4">
        <div className="items-center text-white justify-center p-4 text-xs sm:text-base sm:p-8 w-full md:flex md:w-auto md:order-1">
          {t("FOOTER.TEXT")}
        </div>
      </div>
    </nav>
  );
}
