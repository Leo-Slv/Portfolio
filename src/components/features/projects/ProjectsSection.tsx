"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Github, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { ProjectModal } from "./ProjectModal";
import { FILTERS, PROJECTS, matchesFilter, type Featured, type FilterId } from "./projects-data";

const AUTO_SCROLL_SPEED = 28; // px per second
const RESUME_DELAY_MS = 2500;
const MIN_CARDS_FOR_LOOP = 4;

function ProjectPreview({ project, title }: { project: Featured; title: string }) {
  const [failed, setFailed] = useState(false);
  const host = project.projectUrl ? new URL(project.projectUrl).host : null;

  if (project.projectUrl && !failed) {
    const previewSrc = `/previews/${project.slug}.png`;
    return (
      <div className="relative h-44 w-full overflow-hidden border-b border-line bg-page">
        <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center gap-1.5 border-b border-line bg-surface/90 px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" aria-hidden />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" aria-hidden />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" aria-hidden />
          <span className="ml-2 truncate font-mono text-[0.6rem] text-muted">{host}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewSrc}
          alt={title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top pt-6 transition-transform duration-700 ease-out group-hover/preview:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-44 w-full items-center justify-center gap-2 border-b border-line bg-page font-mono text-[0.65rem] text-muted"
      aria-hidden
    >
      {["client", "API", "DB"].map((node, index) => (
        <span key={node} className="flex items-center gap-2">
          {index > 0 && <ArrowRight className="h-3 w-3" strokeWidth={1.75} />}
          <span className="border border-ink bg-surface px-3 py-2 text-ink">{node}</span>
        </span>
      ))}
    </div>
  );
}

export function ProjectsSection() {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | undefined>(undefined);
  const [filter, setFilter] = useState<FilterId>("all");
  const [selected, setSelected] = useState<Featured | null>(null);

  const visible = PROJECTS.filter((project) => matchesFilter(project, filter));
  const loopEnabled = visible.length >= MIN_CARDS_FOR_LOOP;

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
    trackRef.current?.scrollTo({ left: 0 });
  }, [filter]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !loopEnabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = performance.now();
    let position = el.scrollLeft;
    let running = false;
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
        // browsers snap scrollLeft to device pixels, so keep our own sub-pixel position
        // and only re-read the real one when resuming after the user (or layout) moved it
        if (!running) position = el.scrollLeft;
        running = true;
        position += AUTO_SCROLL_SPEED * dt;
        if (loop > 0 && position >= loop) position -= loop;
        el.scrollLeft = position;
      } else {
        running = false;
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
  }, [loopEnabled]);

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
    const open = () => setSelected(project);

    return (
      <article
        key={clone ? `${project.slug}-clone` : project.slug}
        {...(clone ? { "data-carousel-clone": "", "aria-hidden": true, inert: true } : {})}
        data-carousel-card
        className="hover-lift flex flex-col border border-line bg-page shrink-0 basis-full md:basis-[calc(50%-1.25rem)] lg:basis-[calc(33.333%-1.666rem)]"
      >
        <button
          type="button"
          onClick={open}
          aria-label={`${t("PROJECTS.DETAILS")}: ${projectTitle}`}
          className="group/preview block w-full text-left focus-ring"
        >
          <ProjectPreview project={project} title={projectTitle} />
        </button>
        <div className="p-6 flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-ink tracking-tight">{projectTitle}</h3>
            {project.projectUrl && (
              <span className="inline-flex shrink-0 items-center gap-1.5 border border-ink px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-ink">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" aria-hidden />
                {t("PROJECTS.LIVE_BADGE")}
              </span>
            )}
          </div>
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
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 pt-2">
            <button
              type="button"
              onClick={open}
              className="text-sm font-semibold text-ink underline underline-offset-4 focus-ring"
            >
              {t("PROJECTS.DETAILS")}
            </button>
            <div className="flex flex-wrap justify-end gap-x-5 gap-y-2">
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
              {project.privateRepo && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted">
                  <Lock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                  {t("PROJECTS.PRIVATE_REPO")}
                </span>
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
          </div>
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

        <Reveal delay={100} className="-mt-4 mb-8 flex flex-wrap gap-2">
          {FILTERS.map(({ id, labelKey }) => {
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                aria-pressed={active}
                className={cn(
                  "h-10 border px-4 text-xs font-semibold uppercase tracking-wide transition-colors focus-ring",
                  active
                    ? "border-ink bg-ink text-page"
                    : "border-line bg-page text-ink hover:border-ink"
                )}
              >
                {t(labelKey)}
              </button>
            );
          })}
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
            {visible.map((project) => renderCard(project, false))}
            {loopEnabled && visible.map((project) => renderCard(project, true))}
          </div>
        </Reveal>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
