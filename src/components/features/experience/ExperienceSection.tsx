"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";

const WORK_KEYS = [
  {
    periodKey: "EXPERIENCE_SECTION.WORK_1_PERIOD",
    titleKey: "EXPERIENCE_SECTION.WORK_1_TITLE",
    descKey: "EXPERIENCE_SECTION.WORK_1_DESC",
  },
  {
    periodKey: "EXPERIENCE_SECTION.WORK_3_PERIOD",
    titleKey: "EXPERIENCE_SECTION.WORK_3_TITLE",
    descKey: "EXPERIENCE_SECTION.WORK_3_DESC",
  },
  {
    periodKey: "EXPERIENCE_SECTION.WORK_2_PERIOD",
    titleKey: "EXPERIENCE_SECTION.WORK_2_TITLE",
    descKey: "EXPERIENCE_SECTION.WORK_2_DESC",
  },
] as const;

const EDUCATION_KEYS = [
  {
    degreeKey: "EDUCATION.DEGREE_1",
    schoolKey: "EDUCATION.SCHOOL_1",
    period: "2025 - 2027",
    descKey: "EDUCATION.DESCRIPTION_1",
  },
  {
    degreeKey: "EDUCATION.DEGREE_2",
    schoolKey: "EDUCATION.SCHOOL_2",
    period: "2023 - 2024",
    descKey: "EDUCATION.DESCRIPTION_2",
  },
  {
    degreeKey: "EDUCATION.DEGREE_3",
    schoolKey: "EDUCATION.SCHOOL_3",
    period: "2017 - 2020",
    descKey: "EDUCATION.DESCRIPTION_3",
  },
] as const;

export function ExperienceSection() {
  const { t } = useTranslation();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  // The center line "draws" itself as the section crosses the middle of the viewport.
  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = Array.from(timeline.querySelectorAll<HTMLElement>("[data-timeline-dot]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = timeline.getBoundingClientRect();
      const reach = reduced ? rect.height : window.innerHeight * 0.55 - rect.top;
      const drawn = Math.max(0, Math.min(rect.height, reach));
      fill.style.height = `${drawn}px`;
      for (const dot of dots) {
        const dotY = dot.getBoundingClientRect().top - rect.top + dot.offsetHeight / 2;
        dot.dataset.lit = dotY <= drawn ? "true" : "false";
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="experience-section" className="border-t border-line bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <Reveal className="section-title-row">
          <span className="section-title-text">{t("EXPERIENCE_SECTION.LABEL")}</span>
          <span className="section-title-line" />
        </Reveal>

        <div ref={timelineRef} className="relative max-w-3xl mx-auto mt-16">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-line -translate-x-1/2 hidden sm:block" aria-hidden />
          <div
            ref={fillRef}
            className="absolute left-1/2 top-0 w-px bg-ink -translate-x-1/2 hidden sm:block"
            style={{ height: 0 }}
            aria-hidden
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {WORK_KEYS.map((work, idx) => (
              <Reveal key={work.titleKey} delay={idx * 80} className="relative sm:grid sm:grid-cols-2 sm:gap-8 items-start">
                {idx % 2 === 0 ? (
                  <>
                    <div className="sm:text-right sm:pr-10">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">{t(work.periodKey)}</p>
                      <h3 className="text-base font-bold text-ink mb-2">{t(work.titleKey)}</h3>
                      <p className="text-sm leading-relaxed text-muted">{t(work.descKey)}</p>
                    </div>
                    <div className="hidden sm:block sm:pl-10" />
                  </>
                ) : (
                  <>
                    <div className="hidden sm:block sm:pr-10" />
                    <div className="sm:pl-10 sm:border-none border-l-2 border-ink sm:border-l-0 pl-6 sm:pl-10">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">{t(work.periodKey)}</p>
                      <h3 className="text-base font-bold text-ink mb-2">{t(work.titleKey)}</h3>
                      <p className="text-sm leading-relaxed text-muted">{t(work.descKey)}</p>
                    </div>
                  </>
                )}

                <div className="hidden sm:flex justify-center absolute left-1/2 top-2 -translate-x-1/2">
                  <span data-timeline-dot className="h-2.5 w-2.5 border-2 border-ink bg-surface z-10 transition-colors duration-500 data-[lit=true]:bg-ink" />
                </div>
              </Reveal>
            ))}

            {EDUCATION_KEYS.map((edu) => (
              <Reveal key={edu.degreeKey} className="relative sm:grid sm:grid-cols-2 sm:gap-8 items-start">
                <div className="hidden sm:block sm:pr-10" />
                <div className="hidden sm:flex justify-center absolute left-1/2 top-2 -translate-x-1/2">
                  <span data-timeline-dot className="h-2.5 w-2.5 border-2 border-ink bg-surface z-10 transition-colors duration-500 data-[lit=true]:bg-ink" />
                </div>
                <div className="sm:pl-10 sm:border-none border-l-2 border-ink sm:border-l-0 pl-6 sm:pl-10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">{edu.period}</p>
                  <h3 className="text-base font-bold text-ink mb-1">{t(edu.degreeKey)}</h3>
                  <p className="text-sm font-medium text-ink/80 mb-2">{t(edu.schoolKey)}</p>
                  <p className="text-sm leading-relaxed text-muted">{t(edu.descKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
