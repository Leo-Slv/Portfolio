"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";

const THEME_STORAGE_KEY = "portfolio-theme";

export function ThemeToggle() {
  const { t } = useTranslation();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // storage unavailable: theme still applies for this visit
    }
    setDark(next);
  };

  const Icon = dark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={t("THEME.TOGGLE")}
      title={t("THEME.TOGGLE")}
      className="inline-flex h-[1.9rem] w-[2.4rem] items-center justify-center border border-ink bg-surface text-ink focus-ring"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
    </button>
  );
}
