"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["home", "about-section", "projects-section", "experience-section", "contacts-section"] as const;

export function NavBar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  const navLinks = [
    { id: "home" as const, href: "#home", label: t("NAVBAR.HOME") },
    { id: "about-section" as const, href: "#about-section", label: t("NAVBAR.ABOUT") },
    { id: "projects-section" as const, href: "#projects-section", label: t("NAVBAR.PROJECTS") },
    { id: "experience-section" as const, href: "#experience-section", label: t("NAVBAR.EXPERIENCE") },
    { id: "contacts-section" as const, href: "#contacts-section", label: t("NAVBAR.CONTACTS") },
  ];

  const syncHash = useCallback(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])) {
      setActive(hash);
    }
  }, []);

  useEffect(() => {
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [syncHash]);

  useEffect(() => {
    const getScrollLine = () => {
      const header = document.querySelector("header");
      const h = header?.getBoundingClientRect().height ?? 72;
      return h + 40;
    };

    const updateActiveFromScroll = () => {
      const line = getScrollLine();
      let next: (typeof SECTION_IDS)[number] = "home";
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) {
          next = id;
          break;
        }
      }
      setActive((prev) => (prev === next ? prev : next));
    };

    let raf = 0;
    const onScrollOrResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateActiveFromScroll();
      });
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-page/95 border-nav">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] md:h-[5.25rem] items-center justify-between gap-4">
          <a
            href="https://github.com/Leo-Slv"
            className="flex items-center gap-3 shrink-0 min-w-0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("NAVBAR.FULL_NAME")}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink bg-surface text-ink font-bold text-xl leading-none tracking-tight font-sans">
              L
            </span>
            <span className="hidden sm:block text-[0.65rem] font-semibold tracking-[0.14em] text-ink uppercase truncate max-w-[200px] md:max-w-none">
              {t("NAVBAR.FULL_NAME")}
            </span>
          </a>

          <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-muted pb-1 border-b-[3px] border-transparent",
                    active === link.id && "text-ink border-ink"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={t("HOME.PATH")}
              download
              className="hidden md:inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white focus-ring"
            >
              {t("HOME.RESUME_BUTTON")}
              <Download className="h-4 w-4 shrink-0 text-white" strokeWidth={1.75} aria-hidden />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex lg:hidden items-center justify-center w-10 h-10 border border-line bg-surface text-ink focus-ring"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
              ) : (
                <Menu className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="lg:hidden border-t border-line py-4 flex flex-col gap-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-2 text-sm font-medium border-l-[3px] pl-3",
                      active === link.id ? "border-ink text-ink" : "border-transparent text-muted"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={t("HOME.PATH")}
              download
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white w-full"
            >
              {t("HOME.RESUME_BUTTON")}
              <Download className="h-4 w-4 shrink-0 text-white" strokeWidth={1.75} aria-hidden />
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
