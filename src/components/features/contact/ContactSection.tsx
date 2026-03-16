"use client";

import { useTranslation } from "@/lib/i18n";

const CONTACTS = [
  {
    type: "linkedin",
    href: "https://www.linkedin.com/in/leonardo-irineu-dev/",
    titleKey: "CONTACTS.CARD_TITLE_3",
    info: "leonardo-irineu",
    descKey: "CONTACTS.DESCRIPTION_3",
    svg: "/assets/svg/linkedin.svg",
    cardClass: "linkedin-card",
  },
  {
    type: "github",
    href: "https://github.com/Leo-Slv",
    titleKey: "CONTACTS.CARD_TITLE_4",
    info: "Leo-Slv",
    descKey: "CONTACTS.DESCRIPTION_4",
    svg: "/assets/svg/github.svg",
    cardClass: "github-card",
  },
];

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contacts-section" className="max-w-6xl mx-auto px-4 py-24 pb-24">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white fade-in-up delay-300">
          {t("CONTACTS.TITLE")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[800px] mx-auto">
        {CONTACTS.map((contact, i) => (
          <div
            key={contact.type}
            className={i === 0 ? "fade-in-left delay-600" : "fade-in-right delay-600"}
          >
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-card ${contact.cardClass} float-4 flex flex-col items-center min-h-[280px] rounded-af-sm border border-white/10 bg-surface surface-depth p-6 md:p-8 text-center transition-af hover:border-white/[0.14] shadow-card-drop relative overflow-hidden`}
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full mb-6 transition-af ${
                  contact.type === "linkedin"
                    ? "bg-gradient-to-br from-[#0077b5] to-[#005885] text-white"
                    : "bg-gradient-to-br from-[#333] to-[#24292e] text-white"
                }`}
              >
                <img src={contact.svg} alt="" className="w-8 h-8 md:w-10 md:h-10 opacity-95 invert" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold mb-4 text-white">{t(contact.titleKey)}</h3>
              <p className="text-white/74 text-sm mb-5 break-all">{contact.info}</p>
              <p className="text-white/58 text-sm leading-relaxed">{t(contact.descKey)}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
