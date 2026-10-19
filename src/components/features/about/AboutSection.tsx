"use client";

import type { ComponentType } from "react";
import {
  BookOpen,
  Boxes,
  Code2,
  Puzzle,
} from "lucide-react";
import { DiMsqlServer } from "react-icons/di";
import { FaAws } from "react-icons/fa6";
import {
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
} from "react-icons/si";
import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";
import { ViteLogo } from "@/components/ui/vite-logo";

type SkillIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

// `brand` colors the icon on hover; icons whose brand color is black/white stay theme-colored.
export const SKILLS: Array<{ label: string; href: string; Icon: SkillIcon; brand?: string; iconClass?: string }> = [
  { label: "React", href: "https://github.com/ExceptionH4ndlers/ABP_2DSM", Icon: SiReact, brand: "#61DAFB" },
  { label: "Vite", href: "https://github.com/Leo-Slv/Portfolio", Icon: ViteLogo, brand: "#646CFF" },
  { label: "Next.js", href: "https://github.com/Leo-Slv", Icon: SiNextdotjs },
  { label: "NestJS", href: "https://github.com/Leo-Slv", Icon: SiNestjs, brand: "#E0234E" },
  { label: "ASP.NET", href: "https://github.com/Leo-Slv/ACTi-case", Icon: SiDotnet, brand: "#512BD4" },
  { label: "FastAPI", href: "https://github.com/Leo-Slv/InboxIQ", Icon: SiFastapi, brand: "#009688" },
  { label: "PostgreSQL", href: "https://github.com/ExceptionH4ndlers/ABP_2DSM", Icon: SiPostgresql, brand: "#4169E1" },
  { label: "SQL Server", href: "https://github.com/Leo-Slv/ACTi-case", Icon: DiMsqlServer, brand: "#CC2927", iconClass: "scale-[1.4]" },
  { label: "MySQL", href: "https://github.com/Leo-Slv", Icon: SiMysql, brand: "#4479A1", iconClass: "scale-[1.25]" },
  { label: "Docker", href: "https://github.com/Leo-Slv", Icon: SiDocker, brand: "#2496ED" },
  { label: "AWS", href: "https://github.com/Leo-Slv/InboxIQ", Icon: FaAws, brand: "#FF9900" },
  { label: "DDD", href: "https://github.com/Leo-Slv", Icon: Boxes },
];

const skillIconClass =
  "h-7 w-7 text-ink shrink-0 transition-colors duration-300 group-hover:text-[var(--brand,rgb(var(--c-ink)))]";

export function AboutSection() {
  const { t } = useTranslation();

  const features = [
    { Icon: Code2, title: t("ABOUT.FEATURE_QUALITY") },
    { Icon: Puzzle, title: t("ABOUT.FEATURE_PROBLEM") },
    { Icon: BookOpen, title: t("ABOUT.FEATURE_LEARN") },
  ];

  return (
    <section id="about-section" className="border-t border-line bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          <div className="lg:pr-12 lg:border-r lg:border-line">
            <Reveal className="section-title-row">
              <span className="section-title-text">{t("ABOUT.SECTION_LABEL")}</span>
              <span className="section-title-line" />
            </Reveal>
            <Reveal delay={100}>
            <p className="text-base leading-relaxed text-muted mb-10 max-w-xl">
              {t("ABOUT.DESCRIPTION_1")} {t("ABOUT.DESCRIPTION_2")}
            </p>
            </Reveal>
            <ul className="flex flex-col gap-8">
              {features.map(({ Icon, title }, idx) => (
                <li key={title}>
                  <Reveal delay={150 + idx * 90} className="flex gap-4 items-start">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-page text-ink">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-ink pt-2">{title}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-12 pt-12 lg:pt-0">
            <Reveal className="section-title-row">
              <span className="section-title-text">{t("TECH.SECTION_LABEL")}</span>
              <span className="section-title-line" />
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SKILLS.map(({ label, href, Icon, brand, iconClass }, idx) => (
                <Reveal key={label} delay={idx * 50}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={brand ? ({ "--brand": brand } as React.CSSProperties) : undefined}
                  className="group flex flex-col items-center justify-center gap-2 border border-line bg-page px-3 py-4 text-center min-h-[5.5rem] focus-ring hover-lift"
                >
                  <Icon className={`${skillIconClass} ${iconClass ?? ""}`} aria-hidden />
                  <span className="text-xs font-medium text-ink leading-tight">{label}</span>
                </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
