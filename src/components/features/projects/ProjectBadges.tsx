import { CircleCheck, Container, FlaskConical, Layers, Rocket, ShieldCheck, type LucideIcon } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import type { BadgeId } from "./projects-data";

const BADGE_ICONS: Record<BadgeId, LucideIcon> = {
  ci: CircleCheck,
  cd: Rocket,
  docker: Container,
  security: ShieldCheck,
  tests: FlaskConical,
  testsLayers: Layers,
};

const badgeKey = (id: BadgeId) => `PROJECTS.BADGE_${id.replace(/[A-Z]/g, (c) => `_${c}`).toUpperCase()}`;

/** Compact chips for the card. */
export function ProjectBadges({ badges }: { badges: BadgeId[] }) {
  const { t } = useTranslation();
  return (
    <ul className="flex flex-wrap gap-2" aria-label={t("PROJECTS.BADGES_LABEL")}>
      {badges.map((id) => {
        const Icon = BADGE_ICONS[id];
        return (
          <li
            key={id}
            title={t(`${badgeKey(id)}_DESC`)}
            className="inline-flex items-center gap-1.5 border border-ink px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-ink"
          >
            <Icon className="h-3 w-3" strokeWidth={2} aria-hidden />
            {t(badgeKey(id))}
          </li>
        );
      })}
    </ul>
  );
}

/** Badges with the evidence behind each one, for the modal. */
export function ProjectBadgeDetails({ badges }: { badges: BadgeId[] }) {
  const { t } = useTranslation();
  return (
    <ul className="flex flex-col gap-3" aria-label={t("PROJECTS.BADGES_LABEL")}>
      {badges.map((id) => {
        const Icon = BADGE_ICONS[id];
        return (
          <li key={id} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-ink text-ink">
              <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </span>
            <span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-wide text-ink">
                {t(badgeKey(id))}
              </span>
              <span className="text-muted">{t(`${badgeKey(id)}_DESC`)}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
