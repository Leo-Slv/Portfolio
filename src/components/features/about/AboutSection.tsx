"use client";

import { useTranslation } from "@/lib/i18n";

const SKILLS = [
  { label: "ASP.NET", href: "https://github.com/Leo-Slv/ACTi-case" },
  { label: "Next.js", href: "https://github.com/Leo-Slv" },
  { label: "FastAPI", href: "https://github.com/Leo-Slv/InboxIQ" },
  { label: "React", href: "https://github.com/ExceptionH4ndlers/ABP_2DSM" },
  { label: "Node.js", href: "https://github.com/ExceptionH4ndlers/ABP_2DSM" },
  { label: "PostgreSQL", href: "https://github.com/ExceptionH4ndlers/ABP_2DSM" },
  { label: "Docker", href: "https://github.com/Leo-Slv" },
  { label: "DDD", href: "https://github.com/Leo-Slv" },
  { label: "AWS", href: "https://github.com/Leo-Slv/InboxIQ" },
  { label: "Vite", href: "https://github.com/Leo-Slv/Portfolio" },
  { label: "Git", href: "https://github.com/Leo-Slv" },
];

const EDUCATION = [
  {
    degreeKey: "EDUCATION.DEGREE_1",
    schoolKey: "EDUCATION.SCHOOL_1",
    period: "2025 - 2027",
    descKey: "EDUCATION.DESCRIPTION_1",
    statusKey: "EDUCATION.STATUS_1",
    float: "float-1",
  },
  {
    degreeKey: "EDUCATION.DEGREE_2",
    schoolKey: "EDUCATION.SCHOOL_2",
    period: "2023 - 2024",
    descKey: "EDUCATION.DESCRIPTION_2",
    statusKey: "EDUCATION.STATUS_2",
    float: "float-3",
  },
  {
    degreeKey: "EDUCATION.DEGREE_3",
    schoolKey: "EDUCATION.SCHOOL_3",
    period: "2017-2020",
    descKey: "EDUCATION.DESCRIPTION_3",
    statusKey: "EDUCATION.STATUS_3",
    float: "float-2",
  },
];

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about-section" className="max-w-6xl mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white fade-in-up delay-300">
          {t("ABOUT.TITLE")}
        </h2>
        <p className="mt-3 text-sm md:text-base leading-relaxed text-white/70">
          {t("ABOUT.SUBTITLE")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-8 mb-16 items-stretch">
        <div className="fade-in-left delay-300 flex h-full min-h-0">
          <div className="float-2 w-full h-full min-h-0 rounded-af-sm border border-white/10 bg-surface surface-depth p-6 shadow-card-drop sticky top-5 transition-af hover:border-white/[0.14] flex flex-col">
            <div className="w-[180px] h-[180px] rounded-full mx-auto mb-8 border-2 border-accent-soft-35 overflow-hidden bg-surface">
              <img
                src="/assets/eu.jpeg"
                alt="Foto de perfil"
                className="w-full h-full object-cover"
                width={180}
                height={180}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Leonardo</h3>
            <p className="text-white/74 text-sm mb-8">{t("ABOUT.SUBTITLE")}</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-af-sm bg-white/[0.03] border border-white/10 text-white/95 transition-af hover:bg-white/5">
                <img src="/assets/svg/mail.svg" alt="" className="w-5 h-5 shrink-0 opacity-60 invert" aria-hidden />
                <span className="break-all text-sm">leonardo1692004&#64;gmail.com</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-af-sm bg-white/[0.03] border border-white/10 text-white/95 transition-af hover:bg-white/5">
                <img src="/assets/svg/map-pin.svg" alt="" className="w-5 h-5 shrink-0 opacity-60 invert" aria-hidden />
                <span className="text-sm">São José dos Campos, SP</span>
              </div>
              <a href="https://www.linkedin.com/in/leonardo-irineu-8418b0288/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex items-center gap-3 p-3 rounded-af-sm bg-white/[0.03] border border-white/10 text-white/95 transition-af hover:bg-white/5">
                  <img src="/assets/svg/link.svg" alt="" className="w-5 h-5 shrink-0 opacity-60 invert" aria-hidden />
                  <span className="text-sm">linkedin.com/leonardo-irineu</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="fade-in-right delay-300 flex h-full min-h-0">
          <div className="float-3 w-full h-full min-h-0 rounded-af-sm border border-white/10 bg-surface surface-depth p-6 md:p-8 shadow-card-drop transition-af hover:border-white/[0.14] flex flex-col">
            <p className="text-sm md:text-base leading-relaxed text-white/74 mb-6">
              {t("ABOUT.DESCRIPTION_1")}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-white/74 mb-6">
              {t("ABOUT.DESCRIPTION_2")}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-white/74 mb-8">
              {t("ABOUT.DESCRIPTION_3")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SKILLS.map((skill) => (
                <a
                  key={skill.label}
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-af-sm border border-white/10 surface-depth bg-white/5 text-white/80 hover:border-accent-soft-25 hover:text-accent transition-af"
                >
                  {skill.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="education-section" className="mt-24">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white fade-in-up delay-300">
            {t("EDUCATION.TITLE")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION.map((edu, i) => (
            <div
              key={edu.degreeKey}
              className={`flex flex-col min-h-[320px] ${i === 0 ? "fade-in-left delay-300" : i === 1 ? "fade-in-up delay-300" : "fade-in-right delay-300"}`}
            >
              <div
                className={`${edu.float} flex flex-col justify-between h-full rounded-af-sm border border-white/10 bg-surface surface-depth p-6 relative overflow-hidden transition-af hover:border-white/[0.14] shadow-card-drop before:absolute before:top-0 before:left-0 before:bottom-0 before:w-0.5 before:bg-accent-soft-35`}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{t(edu.degreeKey)}</h3>
                  <p className="text-accent text-sm font-medium mb-3">{t(edu.schoolKey)}</p>
                  <p className="text-white/58 text-xs mb-3">{edu.period}</p>
                  <p className="text-sm leading-relaxed text-white/74">
                    {t(edu.descKey)}
                  </p>
                </div>
                <span className="inline-block mt-4 px-3 py-1 text-xs font-medium rounded-af-sm bg-accent-soft-15 border border-accent-soft-25 text-white w-fit">
                  {t(edu.statusKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
