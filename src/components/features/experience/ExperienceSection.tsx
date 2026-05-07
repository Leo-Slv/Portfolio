"use client";

import { useTranslation } from "@/lib/i18n";

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

  return (
    <section id="experience-section" className="border-t border-line bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="section-title-row">
          <span className="section-title-text">{t("EXPERIENCE_SECTION.LABEL")}</span>
          <span className="section-title-line" />
        </div>

        <div className="relative max-w-3xl mx-auto mt-16">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-line -translate-x-1/2 hidden sm:block" aria-hidden />

          <div className="flex flex-col gap-12 sm:gap-16">
            <div className="relative sm:grid sm:grid-cols-2 sm:gap-8 items-start">
              <div className="sm:text-right sm:pr-10">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">
                  {t("EXPERIENCE_SECTION.WORK_PERIOD")}
                </p>
                <h3 className="text-base font-bold text-ink mb-2">{t("EXPERIENCE_SECTION.WORK_TITLE")}</h3>
                <p className="text-sm leading-relaxed text-muted">{t("EXPERIENCE_SECTION.WORK_DESC")}</p>
              </div>
              <div className="hidden sm:flex justify-center absolute left-1/2 top-2 -translate-x-1/2">
                <span className="h-2.5 w-2.5 border-2 border-ink bg-surface z-10" />
              </div>
              <div className="hidden sm:block sm:pl-10" />
            </div>

            {EDUCATION_KEYS.map((edu) => (
              <div key={edu.degreeKey} className="relative sm:grid sm:grid-cols-2 sm:gap-8 items-start">
                <div className="hidden sm:block sm:pr-10" />
                <div className="hidden sm:flex justify-center absolute left-1/2 top-2 -translate-x-1/2">
                  <span className="h-2.5 w-2.5 border-2 border-ink bg-surface z-10" />
                </div>
                <div className="sm:pl-10 sm:border-none border-l-2 border-ink sm:border-l-0 pl-6 sm:pl-10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">{edu.period}</p>
                  <h3 className="text-base font-bold text-ink mb-1">{t(edu.degreeKey)}</h3>
                  <p className="text-sm font-medium text-ink/80 mb-2">{t(edu.schoolKey)}</p>
                  <p className="text-sm leading-relaxed text-muted">{t(edu.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
