"use client";

import { useTranslation } from "@/lib/translation-context";
import { Mail, MapPin, Link2 } from "lucide-react";

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
  { label: "Angular", href: "https://github.com/Leo-Slv/Portfolio" },
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
    <section id="about-section" className="main-font p-4 sm:p-5 max-w-[1400px] mx-auto">
      <div className="fade-in-up delay-300">
        <h1 className="page-title float-1 pt-16 sm:pt-20 text-center text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 bg-white bg-clip-text text-transparent">
          {t("ABOUT.TITLE")}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 lg:gap-16 mb-16 lg:mb-20 items-start">
        <div className="fade-in-left delay-300">
          <div className={`profile-card float-2 rounded-3xl p-8 sm:p-10 text-center sticky top-5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10`}>
            <div className="profile-image w-[180px] h-[180px] rounded-full mx-auto mb-8 border-4 border-transparent bg-gradient-to-br from-[#7f5af0] to-[#2cb67d] p-[4px] overflow-hidden hover:scale-105 transition-transform">
              <img
                src="/assets/eu.jpeg"
                alt="Foto de perfil"
                className="w-full h-full object-cover rounded-full"
                width={180}
                height={180}
              />
            </div>
            <h2 className="profile-name text-2xl font-semibold mb-2 bg-white bg-clip-text text-transparent">Leonardo</h2>
            <p className="profile-title text-[#a8a8b3] text-lg mb-8">{t("ABOUT.SUBTITLE")}</p>
            <div className="contact-info flex flex-col gap-4">
              <div className="contact-item flex items-center gap-4 p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5 shrink-0 opacity-80" />
                <span className="break-all">leonardo1692004&#64;gmail.com</span>
              </div>
              <div className="contact-item flex items-center gap-4 p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors">
                <MapPin className="w-5 h-5 shrink-0 opacity-80" />
                <span>São José dos Campos, SP</span>
              </div>
              <a href="https://www.linkedin.com/in/leonardo-irineu-8418b0288/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="contact-item flex items-center gap-4 p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors">
                  <Link2 className="w-5 h-5 shrink-0 opacity-80" />
                  <span>linkedin.com/leonardo-irineu</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="fade-in-right delay-300">
          <div className={`about-content float-3 rounded-3xl p-8 sm:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10`}>
            <p className="about-text text-[1.1rem] leading-relaxed text-[#e1e1e6] mb-8">
              {t("ABOUT.DESCRIPTION_1")}
            </p>
            <p className="about-text text-[1.1rem] leading-relaxed text-[#e1e1e6] mb-8">
              {t("ABOUT.DESCRIPTION_2")}
            </p>
            <p className="about-text text-[1.1rem] leading-relaxed text-[#e1e1e6] mb-8">
              {t("ABOUT.DESCRIPTION_3")}
            </p>
            <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
              {SKILLS.map((skill) => (
                <a
                  key={skill.label}
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-tag text-center py-2.5 px-4 rounded-full text-sm font-medium bg-[#7f5af0] border border-[rgba(127,90,240,0.3)] text-white hover:bg-gradient-to-br hover:from-[rgba(127,90,240,0.3)] hover:to-[rgba(44,182,125,0.3)] hover:-translate-y-0.5 transition-all"
                >
                  {skill.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="education-section" className="mt-10">
        <div className="fade-in-up delay-300">
          <h2 className="section-title float-2 text-center text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10 bg-white bg-clip-text text-transparent">
            {t("EDUCATION.TITLE")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EDUCATION.map((edu, i) => (
            <div
              key={edu.degreeKey}
              className={i === 0 ? "fade-in-left delay-300" : i === 1 ? "fade-in-up delay-300" : "fade-in-right delay-300"}
            >
              <div
                className={`education-card ${edu.float} rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#7f5af0] before:to-[#2cb67d]`}
              >
                <h3 className="education-degree text-xl font-semibold mb-2 text-white">{t(edu.degreeKey)}</h3>
                <p className="education-school text-[#7f5af0] text-lg font-medium mb-4">{t(edu.schoolKey)}</p>
                <p className="education-period text-[#a8a8b3] text-sm mb-4">{edu.period}</p>
                <p className="education-description text-[0.95rem] leading-relaxed text-[#e1e1e6]">
                  {t(edu.descKey)}
                </p>
                <span className="inline-block mt-4 py-1.5 px-3 rounded-full text-xs font-medium bg-[#7f5af0] border border-[rgba(127,90,240,0.3)] text-white">
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
