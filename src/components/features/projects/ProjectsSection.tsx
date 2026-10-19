"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";

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
    slug: "ordercore",
    titleKey: "PROJECTS.CARD_TITLE_13",
    descKey: "PROJECTS.DESCRIPTION_13",
    tags: [".NET 10", "PostgreSQL", "RabbitMQ", "Docker"],
    repositoryUrl: "https://github.com/Leo-Slv/OrderCore",
  },
  {
    slug: "coursecore",
    titleKey: "PROJECTS.CARD_TITLE_10",
    descKey: "PROJECTS.DESCRIPTION_10",
    tags: [".NET 10", "ASP.NET Core", "PostgreSQL", "DDD"],
    repositoryUrl: "https://github.com/Leo-Slv/CourseCore",
  },
  {
    slug: "marfim",
    titleKey: "PROJECTS.CARD_TITLE_12",
    descKey: "PROJECTS.DESCRIPTION_12",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    projectUrl: "https://marfim-kappa.vercel.app/",
    repositoryUrl: "https://github.com/Leo-Slv/Marfim",
  },
  {
    slug: "plataforma-vdg",
    titleKey: "PROJECTS.CARD_TITLE_11",
    descKey: "PROJECTS.DESCRIPTION_11",
    tags: ["Next.js", "TypeScript", "Platform", "Web"],
    repositoryUrl: "https://github.com/Leo-Slv/plataforma-vdg",
  },
  {
    slug: "quantum-crm",
    titleKey: "PROJECTS.CARD_TITLE_9",
    descKey: "PROJECTS.DESCRIPTION_9",
    tags: ["Next.js", "NestJS", "PostgreSQL", "CRM"],
    projectUrl: "https://abp3-sistema-gestao-leads-front.vercel.app/login",
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

const AUTO_SCROLL_SPEED = 28; // px per second
const RESUME_DELAY_MS = 2500;

export function ProjectsSection() {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | undefined>(undefined);

  const getLoopWidth = (el: HTMLElement) => {
    const first = el.querySelector<HTMLElement>("[data-carousel-card]");
    const clone = el.querySelector<HTMLElement>("[data-carousel-clone]");
    return first && clone ? clone.offsetLeft - first.offsetLeft : 0;
  };

  const pauseTemporarily = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = performance.now();
    let position = el.scrollLeft;
    let inView = true;
    let hovering = false;

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(el);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      if (inView && !pausedRef.current && !hovering) {
        const loop = getLoopWidth(el);
        // resync in case the user scrolled or the layout changed
        if (Math.abs(el.scrollLeft - position) > 2) position = el.scrollLeft;
        position += AUTO_SCROLL_SPEED * dt;
        if (loop > 0 && position >= loop) position -= loop;
        el.scrollLeft = position;
      } else {
        position = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = false;
    };
    const onFocusIn = () => {
      hovering = true;
    };
    const onFocusOut = () => {
      hovering = false;
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", pauseTemporarily);
    el.addEventListener("touchstart", pauseTemporarily, { passive: true });
    el.addEventListener("wheel", pauseTemporarily, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.clearTimeout(resumeTimerRef.current);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", pauseTemporarily);
      el.removeEventListener("touchstart", pauseTemporarily);
      el.removeEventListener("wheel", pauseTemporarily);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;

    pauseTemporarily();
    const firstCard = el.querySelector<HTMLElement>("[data-carousel-card]");
    const cardWidth = firstCard?.offsetWidth ?? 360;
    const step = cardWidth + 24;
    const loop = getLoopWidth(el);

    // going back from the start: jump to the equivalent spot in the cloned set first
    if (dir === -1 && loop > 0 && el.scrollLeft < step) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft += loop;
      el.style.scrollBehavior = "";
    }
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const renderCard = (project: Featured, clone: boolean) => {
    const projectTitle = t(project.titleKey);

    return (
      <article
        key={clone ? `${project.slug}-clone` : project.slug}
        {...(clone ? { "data-carousel-clone": "", "aria-hidden": true, inert: true } : {})}
        data-carousel-card
        className="hover-lift flex flex-col border border-line bg-page shrink-0 basis-full md:basis-[calc(50%-1.25rem)] lg:basis-[calc(33.333%-1.666rem)]"
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
  };

  return (
    <section id="projects-section" className="border-t border-line bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <Reveal className="section-title-row">
          <span className="section-title-text">{t("PROJECTS.FEATURED_LABEL")}</span>
          <span className="section-title-line" />
        </Reveal>

        <Reveal delay={150} className="relative mx-auto mt-10 w-[calc(100%-4rem)] max-w-6xl sm:w-[calc(100%-5.5rem)]">
          <div className="pointer-events-none absolute inset-y-0 -left-12 -right-12 z-10 flex items-center justify-between sm:-left-16 sm:-right-16">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center border border-line bg-page text-ink shadow-sm focus-ring transition-colors hover:bg-ink hover:text-page"
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center border border-line bg-page text-ink shadow-sm focus-ring transition-colors hover:bg-ink hover:text-page"
              aria-label="Next projects"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <div
            ref={trackRef}
            className="flex gap-8 overflow-x-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none] lg:gap-10 [&::-webkit-scrollbar]:hidden"
            aria-label="Projects carousel"
          >
            {PROJECTS.map((project) => renderCard(project, false))}
            {PROJECTS.map((project) => renderCard(project, true))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
