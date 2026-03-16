/**
 * i18n entry point. Use useTranslation() in components for locale and t(key).
 * Locale is persisted in localStorage under "portfolio-locale".
 */
export {
  useTranslation,
  useTranslationHydrated,
  TranslationProvider,
  type Locale,
} from "@/lib/translation-context";
