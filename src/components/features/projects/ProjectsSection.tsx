"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "@/lib/i18n";

type Featured = {
  titleKey: string;
  descKey: string;
  tags: string[];
  href: string;
};

const PROJECTS: Featured[] = [
  {
    titleKey: "PROJECTS.CARD_TITLE_5",
    descKey: "PROJECTS.DESCRIPTION_5",
    tags: ["ASP.NET", "Next.js", "PostgreSQL", "DDD"],
    href: "https://arch-front-refactor.vercel.app/",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_9",
    descKey: "PROJECTS.DESCRIPTION_9",
    tags: ["Next.js", "NestJS", "PostgreSQL", "CRM"],
    href: "https://github.com/ErrorSquad-ABP/ABP3-Sistema-Gestao-Leads",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_2",
    descKey: "PROJECTS.DESCRIPTION_2",
    tags: ["FastAPI", "OpenAI", "Next.js", "AWS"],
    href: "https://github.com/Leo-Slv/InboxIQ",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_7",
    descKey: "PROJECTS.DESCRIPTION_7",
    tags: ["Web", "Dashboards", "Reports", "Performance"],
    href: "https://github.com/Leo-Slv",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_1",
    descKey: "PROJECTS.DESCRIPTION_1",
    tags: ["ASP.NET", "SQL Server", "Angular", "EF Core"],
    href: "https://github.com/Leo-Slv/ACTi-case",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_3",
    descKey: "PROJECTS.DESCRIPTION_3",
    tags: ["Next.js", "TypeScript", "i18n", "UI"],
    href: "https://github.com/Leo-Slv/Portfolio",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_6",
    descKey: "PROJECTS.DESCRIPTION_6",
    tags: ["Data", "Charts", "Reports", "Web"],
    href: "https://github.com/ExceptionH4ndlers/ABP_2DSM",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_4",
    descKey: "PROJECTS.DESCRIPTION_4",
    tags: ["Full stack", "Auth", "Admin", "Realtime"],
    href: "https://github.com/ExceptionH4ndlers/ABP_2DSM",
  },
];

function LaptopFrame() {
  return (
    <div className="bg-[#d4d4d8] border border-line px-4 pt-4 pb-6">
      <div className="mx-auto max-w-[92%] border border-line bg-[#fafafa] shadow-none">
        <div className="h-2 bg-line/80 border-b border-line" />
        <div className="aspect-[16/10] bg-gradient-to-b from-page to-line/30" />
      </div>
      <div className="mx-auto mt-2 h-1 w-[28%] bg-line-strong" aria-hidden />
    </div>
  );
}

export function ProjectsSection() {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-carousel-card]");
    const cardWidth = firstCard?.offsetWidth ?? 360;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section id="projects-section" className="border-t border-line bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="section-title-row">
          <span className="section-title-text">{t("PROJECTS.FEATURED_LABEL")}</span>
          <span className="section-title-line" />
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="inline-flex h-10 w-10 items-center justify-center border border-line bg-page text-ink focus-ring"
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="inline-flex h-10 w-10 items-center justify-center border border-line bg-page text-ink focus-ring"
              aria-label="Next projects"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <div
            ref={trackRef}
            className="flex gap-8 lg:gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Projects carousel"
          >
            {PROJECTS.map((project) => (
              <article
                key={project.titleKey}
                data-carousel-card
                className="flex flex-col border border-line bg-page snap-start shrink-0 basis-full md:basis-[calc(50%-1.25rem)] lg:basis-[calc(33.333%-1.666rem)]"
              >
                <LaptopFrame />
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <h3 className="text-lg font-bold text-ink tracking-tight">{t(project.titleKey)}</h3>
                  <p className="text-sm leading-relaxed text-muted flex-1">{t(project.descKey)}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide border border-line bg-surface text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink focus-ring"
                    >
                      {t("PROJECTS.VIEW_PROJECT")}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
