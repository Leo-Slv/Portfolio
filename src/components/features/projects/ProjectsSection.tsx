"use client";

import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

type Featured = {
  titleKey: string;
  descKey: string;
  tags: string[];
  href: string;
};

const FEATURED: Featured[] = [
  {
    titleKey: "PROJECTS.CARD_TITLE_8",
    descKey: "PROJECTS.DESCRIPTION_8",
    tags: ["Next.js", "TypeScript", "Shadcn UI", "Axios"],
    href: "https://arch-front-refactor.vercel.app/",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_2",
    descKey: "PROJECTS.DESCRIPTION_2",
    tags: ["FastAPI", "OpenAI", "Next.js", "AWS"],
    href: "https://github.com/Leo-Slv/InboxIQ",
  },
  {
    titleKey: "PROJECTS.CARD_TITLE_1",
    descKey: "PROJECTS.DESCRIPTION_1",
    tags: ["ASP.NET", "Angular", "EF Core", "SQL Server"],
    href: "https://github.com/Leo-Slv/ACTi-case",
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

  return (
    <section id="projects-section" className="border-t border-line bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="section-title-row">
          <span className="section-title-text">{t("PROJECTS.FEATURED_LABEL")}</span>
          <span className="section-title-line" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {FEATURED.map((project) => (
            <article key={project.titleKey} className="flex flex-col border border-line bg-page">
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
    </section>
  );
}
