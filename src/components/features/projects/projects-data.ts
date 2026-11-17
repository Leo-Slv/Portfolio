export type FilterId = "all" | "dotnet" | "nextjs" | "ai" | "live";

/** Engineering-practice badges; each one must be backed by the project's repository. */
export type BadgeId = "ci" | "cd" | "docker" | "security" | "tests" | "testsLayers";

/** Stack labels for the architecture diagram shown when a project has no preview image. */
export type Diagram = {
  client: string;
  api: string;
  db: string;
  /** Optional broker/external service hanging off the API. */
  side?: string;
};

export type Featured = {
  badges?: BadgeId[];
  diagram?: Diagram;
  slug: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  groups: Exclude<FilterId, "all" | "live">[];
  projectUrl?: string;
  repositoryUrl?: string;
  /** Source is private (e.g. company code): show a label instead of a repository link. */
  privateRepo?: boolean;
  /** Slug used for the problem/decision/result copy (PROJECTS.CASE_<SLUG>_*). */
  caseKey?: string;
};

export const FILTERS: { id: FilterId; labelKey: string }[] = [
  { id: "all", labelKey: "PROJECTS.FILTER_ALL" },
  { id: "dotnet", labelKey: "PROJECTS.FILTER_DOTNET" },
  { id: "nextjs", labelKey: "PROJECTS.FILTER_NEXTJS" },
  { id: "ai", labelKey: "PROJECTS.FILTER_AI" },
  { id: "live", labelKey: "PROJECTS.FILTER_LIVE" },
];

export const PROJECTS: Featured[] = [
  {
    slug: "archflow",
    caseKey: "ARCHFLOW",
    titleKey: "PROJECTS.CARD_TITLE_5",
    descKey: "PROJECTS.DESCRIPTION_5",
    tags: ["ASP.NET", "Next.js", "PostgreSQL", "DDD"],
    groups: ["dotnet", "nextjs"],
    projectUrl: "https://arch-front-refactor.vercel.app/",
    repositoryUrl: "https://github.com/orgs/ArchFlowPlatform/repositories",
  },
  {
    slug: "ordercore",
    caseKey: "ORDERCORE",
    titleKey: "PROJECTS.CARD_TITLE_13",
    descKey: "PROJECTS.DESCRIPTION_13",
    tags: [".NET 10", "PostgreSQL", "RabbitMQ", "Docker"],
    groups: ["dotnet"],
    badges: ["ci", "testsLayers", "docker"],
    diagram: { client: "SignalR", api: ".NET 10", db: "PostgreSQL", side: "RabbitMQ · Stripe" },
    repositoryUrl: "https://github.com/Leo-Slv/OrderCore",
  },
  {
    slug: "coursecore",
    caseKey: "COURSECORE",
    titleKey: "PROJECTS.CARD_TITLE_10",
    descKey: "PROJECTS.DESCRIPTION_10",
    tags: [".NET 10", "ASP.NET Core", "PostgreSQL", "DDD"],
    groups: ["dotnet"],
    badges: ["ci", "cd", "security"],
    diagram: { client: "Any front", api: "ASP.NET Core", db: "PostgreSQL", side: "JWT · RBAC" },
    repositoryUrl: "https://github.com/Leo-Slv/CourseCore",
  },
  {
    slug: "marfim",
    caseKey: "MARFIM",
    titleKey: "PROJECTS.CARD_TITLE_12",
    descKey: "PROJECTS.DESCRIPTION_12",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    groups: ["nextjs"],
    badges: ["tests"],
    projectUrl: "https://marfim-kappa.vercel.app/",
    repositoryUrl: "https://github.com/Leo-Slv/Marfim",
  },
  {
    slug: "plataforma-vdg",
    titleKey: "PROJECTS.CARD_TITLE_11",
    descKey: "PROJECTS.DESCRIPTION_11",
    tags: ["Next.js", "TypeScript", "Platform", "Web"],
    groups: ["nextjs"],
    badges: ["tests"],
    projectUrl: "https://plataforma-vdg.vercel.app/",
    repositoryUrl: "https://github.com/Leo-Slv/plataforma-vdg",
  },
  {
    slug: "quantum-crm",
    caseKey: "QUANTUM_CRM",
    titleKey: "PROJECTS.CARD_TITLE_9",
    descKey: "PROJECTS.DESCRIPTION_9",
    tags: ["Next.js", "NestJS", "PostgreSQL", "CRM"],
    groups: ["nextjs"],
    badges: ["ci", "tests"],
    projectUrl: "https://abp3-sistema-gestao-leads-front.vercel.app/login",
    repositoryUrl: "https://github.com/ErrorSquad-ABP/ABP3-Sistema-Gestao-Leads",
  },
  {
    slug: "inbox-iq",
    titleKey: "PROJECTS.CARD_TITLE_2",
    descKey: "PROJECTS.DESCRIPTION_2",
    tags: ["FastAPI", "OpenAI", "Next.js", "AWS"],
    groups: ["ai", "nextjs"],
    projectUrl: "https://inbox-iq-mauve.vercel.app/",
    repositoryUrl: "https://github.com/Leo-Slv/InboxIQ",
  },
  {
    slug: "pdv-web",
    caseKey: "PDV_WEB",
    titleKey: "PROJECTS.CARD_TITLE_7",
    descKey: "PROJECTS.DESCRIPTION_7",
    tags: ["Web", "Dashboards", "Reports", "Performance"],
    groups: [],
    projectUrl: "https://app-pdvhipermassas.actidesenvolvimento.com.br/login/",
    privateRepo: true,
  },
  {
    slug: "app-salvagnini",
    caseKey: "SALVAGNINI",
    titleKey: "PROJECTS.CARD_TITLE_14",
    descKey: "PROJECTS.DESCRIPTION_14",
    tags: ["Angular", "C#", "PWA", "ERP"],
    groups: ["dotnet"],
    badges: ["tests"],
    projectUrl: "https://app-salvagnini.actidesenvolvimento.com.br/auth/login",
    privateRepo: true,
  },
  {
    slug: "acti-case",
    titleKey: "PROJECTS.CARD_TITLE_1",
    descKey: "PROJECTS.DESCRIPTION_1",
    tags: ["ASP.NET", "SQL Server", "Angular", "EF Core"],
    groups: ["dotnet"],
    diagram: { client: "Angular", api: "ASP.NET", db: "SQL Server", side: "EF Core" },
    repositoryUrl: "https://github.com/Leo-Slv/ACTi-case",
  },
  {
    slug: "portfolio-pessoal",
    titleKey: "PROJECTS.CARD_TITLE_3",
    descKey: "PROJECTS.DESCRIPTION_3",
    tags: ["Next.js", "TypeScript", "i18n", "UI"],
    groups: ["nextjs"],
    projectUrl: "https://leonardo-irineu-dev.vercel.app/",
    repositoryUrl: "https://github.com/Leo-Slv/Portfolio",
  },
  {
    slug: "gerenciamento-pedagogico",
    titleKey: "PROJECTS.CARD_TITLE_4",
    descKey: "PROJECTS.DESCRIPTION_4",
    tags: ["Full stack", "Auth", "Admin", "Realtime"],
    groups: [],
    projectUrl: "https://gerenciamento-pedagogico.vercel.app/",
    repositoryUrl: "https://github.com/ExceptionH4ndlers/ABP_2DSM",
  },
];

export function matchesFilter(project: Featured, filter: FilterId) {
  if (filter === "all") return true;
  if (filter === "live") return Boolean(project.projectUrl);
  return project.groups.includes(filter);
}
