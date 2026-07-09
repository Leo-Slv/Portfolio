"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "@/lib/i18n";

type Featured = {
  slug: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  projectUrl?: string;
  repositoryUrl?: string;
};

const PROJECTS: Featured[] = [
  {
    slug: "archflow",
    titleKey: "PROJECTS.CARD_TITLE_5",
    descKey: "PROJECTS.DESCRIPTION_5",
    tags: ["ASP.NET", "Next.js", "PostgreSQL", "DDD"],
    projectUrl: "https://arch-front-refactor.vercel.app/",
    repositoryUrl: "https://github.com/orgs/ArchFlowPlatform/repositories",
  },
  {
    slug: "quantum-crm",
    titleKey: "PROJECTS.CARD_TITLE_9",
    descKey: "PROJECTS.DESCRIPTION_9",
    tags: ["Next.js", "NestJS", "PostgreSQL", "CRM"],
    repositoryUrl: "https://github.com/ErrorSquad-ABP/ABP3-Sistema-Gestao-Leads",
  },
  {
    slug: "inbox-iq",
    titleKey: "PROJECTS.CARD_TITLE_2",
    descKey: "PROJECTS.DESCRIPTION_2",
    tags: ["FastAPI", "OpenAI", "Next.js", "AWS"],
    projectUrl: "https://inbox-iq-mauve.vercel.app/",
    repositoryUrl: "https://github.com/Leo-Slv/InboxIQ",
  },
  {
    slug: "pdv-web",
    titleKey: "PROJECTS.CARD_TITLE_7",
    descKey: "PROJECTS.DESCRIPTION_7",
    tags: ["Web", "Dashboards", "Reports", "Performance"],
    repositoryUrl: "https://github.com/Leo-Slv",
  },
  {
    slug: "acti-case",
    titleKey: "PROJECTS.CARD_TITLE_1",
    descKey: "PROJECTS.DESCRIPTION_1",
    tags: ["ASP.NET", "SQL Server", "Angular", "EF Core"],
    repositoryUrl: "https://github.com/Leo-Slv/ACTi-case",
  },
  {
    slug: "portfolio-pessoal",
    titleKey: "PROJECTS.CARD_TITLE_3",
    descKey: "PROJECTS.DESCRIPTION_3",
    tags: ["Next.js", "TypeScript", "i18n", "UI"],
    repositoryUrl: "https://github.com/Leo-Slv/Portfolio",
  },
  {
    slug: "portal-limnologico",
    titleKey: "PROJECTS.CARD_TITLE_6",
    descKey: "PROJECTS.DESCRIPTION_6",
    tags: ["Data", "Charts", "Reports", "Web"],
    repositoryUrl: "https://github.com/ExceptionH4ndlers/ABP_2DSM",
  },
  {
    slug: "gerenciamento-pedagogico",
    titleKey: "PROJECTS.CARD_TITLE_4",
    descKey: "PROJECTS.DESCRIPTION_4",
    tags: ["Full stack", "Auth", "Admin", "Realtime"],
    projectUrl: "https://gerenciamento-pedagogico.vercel.app/",
    repositoryUrl: "https://github.com/ExceptionH4ndlers/ABP_2DSM",
  },
];

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

        <div className="relative mx-auto mt-10 w-[calc(100%-4rem)] max-w-6xl sm:w-[calc(100%-5.5rem)]">
          <div className="pointer-events-none absolute inset-y-0 -left-12 -right-12 z-10 flex items-center justify-between sm:-left-16 sm:-right-16">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center border border-line bg-page text-ink shadow-sm focus-ring"
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center border border-line bg-page text-ink shadow-sm focus-ring"
              aria-label="Next projects"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <div
            ref={trackRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] lg:gap-10 [&::-webkit-scrollbar]:hidden"
            aria-label="Projects carousel"
          >
            {PROJECTS.map((project) => {
              const projectTitle = t(project.titleKey);

              return (
                <article
                  key={project.slug}
                  data-carousel-card
                  className="flex flex-col border border-line bg-page snap-start shrink-0 basis-full md:basis-[calc(50%-1.25rem)] lg:basis-[calc(33.333%-1.666rem)]"
                >
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <h3 className="text-lg font-bold text-ink tracking-tight">{projectTitle}</h3>
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
                    {(project.repositoryUrl || project.projectUrl) && (
                      <div className="flex flex-wrap justify-end gap-x-5 gap-y-2 pt-2">
                        {project.repositoryUrl && (
                          <a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink focus-ring"
                          >
                            {t("PROJECTS.VIEW_REPOSITORY")}
                            <Github className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                          </a>
                        )}
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink focus-ring"
                          >
                            {t("PROJECTS.VIEW_PROJECT")}
                            <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
