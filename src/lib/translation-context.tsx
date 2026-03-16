"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import enUS from "@/i18n/en-US.json";
import ptBR from "@/i18n/pt-BR.json";

export type Locale = "en-US" | "pt-BR";

const translations: Record<Locale, Record<string, unknown>> = {
  "en-US": enUS as Record<string, unknown>,
  "pt-BR": ptBR as Record<string, unknown>,
};

function getNested(obj: Record<string, unknown>, key: string): string | undefined {
  const keys = key.split(".");
  let value: unknown = obj;
  for (const k of keys) {
    if (value !== null && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  return typeof value === "string" ? value : undefined;
}

type TranslationContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

const LOCALE_STORAGE_KEY = "portfolio-locale";

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "pt-BR";
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "en-US" || stored === "pt-BR") return stored;
  return "pt-BR";
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt-BR");

  React.useEffect(() => {
    setLocaleState(getStoredLocale());
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[locale];
      const value = getNested(dict, key);
      return value ?? key;
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextValue {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return ctx;
}

export function useTranslationHydrated() {
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
