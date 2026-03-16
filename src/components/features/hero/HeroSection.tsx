"use client";

import { useTranslation } from "@/lib/translation-context";
import { DefaultButton } from "./DefaultButton";

const TECH_LINKS = [
  { href: "https://github.com/ArchFlowPlatform/ArchFlow-Server", img: "/assets/ASPNET.png", label: "ASP NET" },
  { href: "https://github.com/Leo-Slv/InboxIQ", img: "/assets/nextjs.png", label: "Next.JS" },
  { href: "https://github.com/Leo-Slv/InboxIQ", img: "/assets/FastAPI.png", label: "FastApi" },
  { href: "https://github.com/Leo-Slv/Portfolio", img: "/assets/icon4.png", label: "Angular" },
];

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className="grid grid-cols-1 p-6 sm:p-10 pt-24 sm:pt-30 gap-4 lg:grid-cols-2 lg:gap-8">
      <div>
        <div className="flex flex-col h-full main-font items-center justify-center lg:pl-24 lg:items-start lg:justify-start">
          <div className="float-2">
            <div className="headline pt-12 sm:pt-18 pb-10 sm:pb-15 text-base sm:text-xl text-center lg:text-left fade-in-left delay-300">
              <span>{t("HOME.GREETING")}</span>
            </div>
          </div>

          <div className="headline text-4xl sm:text-6xl lg:text-5xl xl:text-6xl text-center lg:text-left mb-4 float-5">
            <div className="typewriter-line1">
              <span>{t("HOME.TITLE_1")}</span>
            </div>
            <div className="typewriter-line2">
              <span>ASP.NET and Next.js</span>
            </div>
          </div>

          <div className="float-3">
            <div className="text-sm lg:max-h-25 pt-4 paragraph text-center md:text-lg lg:text-left mb-8 xl:mb-6 typewriter-description">
              <span>{t("HOME.DESCRIPTION")}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-10 pt-6 sm:pt-9 items-center justify-center lg:items-start lg:justify-start float-1">
            <div className="fade-in-up delay-300">
              <DefaultButton text={t("HOME.RESUME_BUTTON")} href={t("HOME.PATH")} />
            </div>
            <div className="fade-in-up delay-300">
              <DefaultButton text={t("HOME.GITHUB_BUTTON")} href="https://github.com/Leo-Slv" paddingX="10" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col h-full main-font align-center justify-center">
          <div className="flex items-center justify-center headline pt-12 sm:pt-18 text-6xl fade-in-right delay-300">
            <img
              className="h-52 w-40 sm:h-80 sm:w-96 rounded-xl float-5"
              src="/assets/code-vetor (2).png"
              alt="Code Vector"
              width={384}
              height={320}
            />
          </div>

          <div className="flex pt-8 sm:pt-10 items-center justify-center">
            <div className="grid grid-cols-4 pb-5 gap-6 sm:gap-10">
              {TECH_LINKS.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-12 sm:w-16 sm:h-23 icon-hover text-center nav-title hover-effect ${
                    i === 0 ? "float-2" : i === 1 ? "float-5" : i === 2 ? "float-1" : "float-4"
                  }`}
                >
                  <img
                    src={item.img}
                    className="fade-in-up delay-200 h-8 w-8 sm:h-10 sm:w-10 object-contain mx-auto"
                    alt={item.label}
                    width={40}
                    height={40}
                  />
                  <span className="headline text-xs sm:text-base main-font block fade-in-up delay-700 mt-1">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
