"use client";

import { useTranslation } from "@/lib/translation-context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type ProjectMark = "mark-purple" | "mark-green" | "mark-cyan" | "mark-orange";

const PERSONAL_PROJECTS: Array<{
  mark: ProjectMark;
  initials: string;
  titleKey: string;
  miniKey: string;
  descKey: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  fade: string;
  float: string;
}> = [
  {
    mark: "mark-purple",
    initials: "AT",
    titleKey: "PROJECTS.CARD_TITLE_5",
    miniKey: "PROJECTS.MINI_5",
    descKey: "PROJECTS.DESCRIPTION_5",
    tags: [".NET 9", "DDD", "PostgreSQL", "JWT"],
    github: "https://github.com/ArchFlowPlatform/ArchFlow-Server",
    demo: null,
    fade: "fade-in-left delay-300",
    float: "float-2",
  },
  {
    mark: "mark-green",
    initials: "AC",
    titleKey: "PROJECTS.CARD_TITLE_1",
    miniKey: "PROJECTS.MINI_1",
    descKey: "PROJECTS.DESCRIPTION_1",
    tags: ["ASP.NET", "Angular", "EF Core", "SQL Server"],
    github: "https://github.com/Leo-Slv/ACTi-case",
    demo: null,
    fade: "fade-in-up delay-400",
    float: "float-3",
  },
  {
    mark: "mark-cyan",
    initials: "IQ",
    titleKey: "PROJECTS.CARD_TITLE_2",
    miniKey: "PROJECTS.MINI_2",
    descKey: "PROJECTS.DESCRIPTION_2",
    tags: ["FastAPI", "OpenAI", "Next.js 15", "AWS"],
    github: "https://github.com/Leo-Slv/InboxIQ",
    demo: null,
    fade: "fade-in-right delay-500",
    float: "float-1",
  },
  {
    mark: "mark-orange",
    initials: "PF",
    titleKey: "PROJECTS.CARD_TITLE_3",
    miniKey: "PROJECTS.MINI_3",
    descKey: "PROJECTS.DESCRIPTION_3",
    tags: ["Angular", "TypeScript", "UI/UX", "Responsive"],
    github: "https://github.com/Leo-Slv/Portfolio",
    demo: "https://portfolio-git-master-leonardos-projects-ca06eb83.vercel.app/",
    fade: "fade-in-up delay-400",
    float: "float-4",
  },
];

const ACADEMIC_PROJECTS: Array<{
  mark: ProjectMark;
  initials: string;
  titleKey: string;
  miniKey: string;
  descKey: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  fade: string;
  float: string;
}> = [
  {
    mark: "mark-purple",
    initials: "ES",
    titleKey: "PROJECTS.CARD_TITLE_4",
    miniKey: "PROJECTS.MINI_4",
    descKey: "PROJECTS.DESCRIPTION_4",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "JWT"],
    github: "https://github.com/ErrorSquad-ABP/ErrorSquad-Server",
    demo: "https://gerenciamento-pedagogico.vercel.app/",
    fade: "fade-in-left delay-300",
    float: "float-2",
  },
  {
    mark: "mark-green",
    initials: "ABP",
    titleKey: "PROJECTS.CARD_TITLE_6",
    miniKey: "PROJECTS.MINI_6",
    descKey: "PROJECTS.DESCRIPTION_6",
    tags: ["Vue", "TypeScript", "PostgreSQL", "DataViz"],
    github: "https://github.com/ErrorSquad-ABP/ErrorSquad-Server",
    demo: "https://abp-2-dsm.vercel.app/",
    fade: "fade-in-right delay-300",
    float: "float-3",
  },
];

const PROFESSIONAL_PROJECTS: Array<{
  mark: ProjectMark;
  initials: string;
  titleKey: string;
  miniKey: string;
  descKey: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  fade: string;
  float: string;
}> = [
  {
    mark: "mark-orange",
    initials: "PDV",
    titleKey: "PROJECTS.CARD_TITLE_7",
    miniKey: "PROJECTS.MINI_7",
    descKey: "PROJECTS.DESCRIPTION_7",
    tags: ["Next.js", "ASP.NET", "MySQL", "Dashboard"],
    github: null,
    demo: null,
    fade: "fade-in-left delay-300",
    float: "float-2",
  },
];

const markClasses: Record<ProjectMark, string> = {
  "mark-purple": "bg-[rgba(127,90,240,0.25)]",
  "mark-green": "bg-[rgba(44,182,125,0.22)]",
  "mark-cyan": "bg-[rgba(59,130,246,0.2)]",
  "mark-orange": "bg-[rgba(249,115,22,0.18)]",
};

function ProjectCard({
  t,
  mark,
  initials,
  titleKey,
  miniKey,
  descKey,
  tags,
  github,
  demo,
  fade,
  float,
}: {
  t: (k: string) => string;
  mark: ProjectMark;
  initials: string;
  titleKey: string;
  miniKey: string;
  descKey: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  fade: string;
  float: string;
}) {
  return (
    <div className={fade}>
      <Card className={float}>
        <CardHeader>
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center border border-white/20 font-extrabold text-white/95 ${markClasses[mark]}`}
          >
            {initials}
          </div>
          <div>
            <CardTitle>{t(titleKey)}</CardTitle>
            <CardDescription>{t(miniKey)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-[rgba(225,225,230,0.88)]">{t(descKey)}</p>
          <div className="flex flex-wrap gap-2.5 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.85rem] font-semibold text-white/90 py-1.5 px-3 rounded-full bg-white/10 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-4 rounded-full text-sm font-semibold bg-[rgba(127,90,240,0.2)] border border-[rgba(127,90,240,0.35)] text-white hover:bg-[rgba(127,90,240,0.35)] hover:-translate-y-0.5 transition-all"
            >
              GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-4 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/90 hover:bg-white/20 hover:-translate-y-0.5 transition-all"
            >
              Demo
            </a>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section id="projects-section" className="main-font p-4 sm:p-10 max-w-[1200px] mx-auto">
      <div className="projects-header fade-in-up delay-300 pt-16 sm:pt-20 text-center mb-10">
        <h1 className="page-title float-1 text-[clamp(2.4rem,4vw,4rem)] font-extrabold tracking-tight mb-3.5 bg-white bg-clip-text text-transparent">
          {t("PROJECTS.MY")}
        </h1>
        <p className="page-subtitle max-w-[780px] mx-auto text-[rgba(225,225,230,0.72)] text-[1.05rem] leading-relaxed">
          {t("PROJECTS.SUBTITLE")}
        </p>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-center gap-3.5 my-6">
          <h2 className="text-[1.4rem] font-bold text-white/92">{t("PROJECTS.MY")}</h2>
          <span className="inline-flex items-center justify-center h-6 min-w-6 px-2.5 rounded-full bg-[rgba(127,90,240,0.18)] border border-[rgba(127,90,240,0.32)] text-white/90 text-sm font-semibold">
            4
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {PERSONAL_PROJECTS.map((p) => (
            <ProjectCard key={p.titleKey} t={t} {...p} />
          ))}
        </div>
      </div>

      <div className="projects-header fade-in-up delay-300 pt-16 sm:pt-20 text-center mb-10">
        <h1 className="page-title float-1 text-[clamp(2.4rem,4vw,4rem)] font-extrabold tracking-tight bg-white bg-clip-text text-transparent">
          {t("PROJECTS.STUDENT")}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ACADEMIC_PROJECTS.map((p) => (
          <ProjectCard key={p.titleKey} t={t} {...p} />
        ))}
      </div>

      <div className="projects-header fade-in-up delay-300 pt-16 sm:pt-20 text-center mb-10">
        <h1 className="page-title float-1 text-[clamp(2.4rem,4vw,4rem)] font-extrabold tracking-tight bg-white bg-clip-text text-transparent">
          {t("PROJECTS.PROFESSIONAL")}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {PROFESSIONAL_PROJECTS.map((p) => (
          <ProjectCard key={p.titleKey} t={t} {...p} />
        ))}
      </div>
    </section>
  );
}
