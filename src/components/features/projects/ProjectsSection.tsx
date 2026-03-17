"use client";

import { useTranslation } from "@/lib/i18n";
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
    titleKey: "PROJECTS.CARD_TITLE_8",
    miniKey: "PROJECTS.MINI_5",
    descKey: "PROJECTS.DESCRIPTION_8",
    tags: ["Next.js", "TypeScript", "Shadcn UI", "Axios"],
    github: "https://github.com/ArchFlowPlatform/ArchFlow-Front",
    demo: "https://arch-flow-front.vercel.app/",
    fade: "fade-in-left delay-300",
    float: "float-5",
  },
  {
    mark: "mark-purple",
    initials: "AT",
    titleKey: "PROJECTS.CARD_TITLE_5",
    miniKey: "PROJECTS.MINI_5",
    descKey: "PROJECTS.DESCRIPTION_5",
    tags: [".NET 9", "EF Core", "PostgreSQL", "JWT"],
    github: "https://github.com/ArchFlowPlatform/ArchFlow-Server",
    demo: "https://arch-flow-front.vercel.app/",
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
  "mark-purple": "bg-accent-soft-25",
  "mark-green": "bg-accent-soft-15",
  "mark-cyan": "bg-accent-soft-15",
  "mark-orange": "bg-accent-soft-15",
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
      <Card className={`${float} flex flex-col gap-4`}>
        <CardHeader className="gap-3 !mb-0">
          <div
            className={`w-11 h-11 rounded-af-sm flex items-center justify-center border border-white/10 surface-depth font-extrabold text-white shrink-0 ${markClasses[mark]}`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <CardTitle className="text-lg font-semibold">{t(titleKey)}</CardTitle>
            <CardDescription>{t(miniKey)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 !mt-0">
          <p className="text-sm leading-relaxed text-white/74">{t(descKey)}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-af-sm border border-white/10 surface-depth bg-white/5 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="!mt-0">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-4 rounded-af-sm text-sm font-semibold bg-accent-soft-15 border border-accent-soft-25 text-white hover:bg-accent-soft-25 transition-af focus-ring"
            >
              GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-4 rounded-af-sm text-sm font-semibold bg-white/5 border border-white/10 text-white/90 hover:bg-white/[0.08] hover:border-white/[0.14] transition-af focus-ring"
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
    <section id="projects-section" className="max-w-6xl mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white fade-in-up delay-300">
          {t("PROJECTS.MY")}
        </h2>
        <p className="mt-3 text-sm md:text-base leading-relaxed text-white/70">
          {t("PROJECTS.SUBTITLE")}
        </p>
      </div>

      <div className="mb-16">
        <div className="flex items-center justify-center gap-3 my-6">
          <h3 className="text-lg font-semibold text-white/95">{t("PROJECTS.MY")}</h3>
          <span className="inline-flex items-center justify-center h-6 min-w-6 px-2.5 rounded-af-sm bg-accent-soft-15 border border-accent-soft-25 text-white/90 text-xs font-semibold">
            5
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {PERSONAL_PROJECTS.map((p) => (
            <ProjectCard key={p.titleKey} t={t} {...p} />
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto text-center mb-10 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          {t("PROJECTS.STUDENT")}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {ACADEMIC_PROJECTS.map((p) => (
          <ProjectCard key={p.titleKey} t={t} {...p} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center mb-10 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          {t("PROJECTS.PROFESSIONAL")}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {PROFESSIONAL_PROJECTS.map((p) => (
          <ProjectCard key={p.titleKey} t={t} {...p} />
        ))}
      </div>
    </section>
  );
}
