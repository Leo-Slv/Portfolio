"use client";

import { useTranslation } from "@/lib/translation-context";
import { Linkedin, Github } from "lucide-react";

const CONTACTS = [
  {
    type: "linkedin",
    href: "https://www.linkedin.com/in/leonardo-irineu-dev/",
    titleKey: "CONTACTS.CARD_TITLE_3",
    info: "leonardo-irineu",
    descKey: "CONTACTS.DESCRIPTION_3",
    icon: Linkedin,
    cardClass: "linkedin-card",
  },
  {
    type: "github",
    href: "https://github.com/Leo-Slv",
    titleKey: "CONTACTS.CARD_TITLE_4",
    info: "Leo-Slv",
    descKey: "CONTACTS.DESCRIPTION_4",
    icon: Github,
    cardClass: "github-card",
  },
];

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contacts-section" className="max-w-[1400px] mx-auto p-4 sm:p-10">
      <div className="fade-in-up delay-300 pt-16 sm:pt-20">
        <h1 className="page-title text-center text-4xl font-bold mb-12 sm:mb-16 bg-white bg-clip-text text-transparent">
          {t("CONTACTS.TITLE")}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-[800px] mx-auto">
        {CONTACTS.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <div
              key={contact.type}
              className={i === 0 ? "fade-in-left delay-600" : "fade-in-right delay-600"}
            >
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-card ${contact.cardClass} float-4 block rounded-3xl p-8 sm:p-10 text-center transition-all hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden`}
              >
                <div
                  className={`contact-icon w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl text-white transition-all ${
                    contact.type === "linkedin"
                      ? "bg-gradient-to-br from-[#0077b5] to-[#005885]"
                      : "bg-gradient-to-br from-[#333] to-[#24292e]"
                  }`}
                >
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="contact-title text-xl font-semibold mb-4 text-white">{t(contact.titleKey)}</h3>
                <p className="contact-info text-[#e1e1e6] text-lg mb-5 break-all">{contact.info}</p>
                <p className="contact-description text-[#a8a8b3] text-sm leading-relaxed">{t(contact.descKey)}</p>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
