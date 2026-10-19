"use client";

import { ExternalLink, Github, Lock, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import type { Featured } from "./projects-data";

type ProjectModalProps = {
  project: Featured;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useTranslation();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const title = t(project.titleKey);
  const host = project.projectUrl ? new URL(project.projectUrl).host : null;

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={t("PROJECTS.MODAL_CLOSE")}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/60 animate-modal-fade"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden border border-ink bg-surface text-ink animate-modal-pop"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("PROJECTS.MODAL_CLOSE")}
            className="inline-flex h-10 w-10 items-center justify-center border border-line bg-page text-ink focus-ring"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-5 sm:p-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0 border border-line bg-page">
            <div className="flex h-8 items-center gap-1.5 border-b border-line px-3">
              <span className="h-2 w-2 rounded-full bg-line-strong" aria-hidden />
              <span className="h-2 w-2 rounded-full bg-line-strong" aria-hidden />
              <span className="h-2 w-2 rounded-full bg-line-strong" aria-hidden />
              <span className="ml-3 truncate font-mono text-[0.68rem] text-muted">{host ?? "—"}</span>
            </div>
            {project.projectUrl ? (
              <iframe
                src={project.projectUrl}
                title={title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                referrerPolicy="no-referrer"
                className="h-[22rem] w-full bg-surface sm:h-[26rem]"
              />
            ) : (
              <div className="flex h-[22rem] items-center justify-center px-6 text-center text-sm leading-relaxed text-muted sm:h-[26rem]">
                {t("PROJECTS.MODAL_NO_DEPLOY")}
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <p className="text-sm leading-relaxed text-muted">{t(project.descKey)}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex border border-line bg-page px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.projectUrl && (
              <p className="text-xs leading-relaxed text-muted">{t("PROJECTS.MODAL_FALLBACK")}</p>
            )}
            <div className="mt-auto flex flex-wrap gap-3">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line bg-page px-4 py-2.5 text-sm font-semibold text-ink focus-ring"
                >
                  <Github className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {t("PROJECTS.VIEW_REPOSITORY")}
                </a>
              )}
              {project.privateRepo && (
                <span className="inline-flex items-center gap-2 border border-line bg-page px-4 py-2.5 text-sm font-medium text-muted">
                  <Lock className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {t("PROJECTS.PRIVATE_REPO")}
                </span>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 text-sm font-semibold text-page focus-ring"
                >
                  {t("PROJECTS.OPEN_SITE")}
                  <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
