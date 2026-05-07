"use client";

import { Mail, MapPin, Send } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const cardIconClass = "h-6 w-6 text-ink shrink-0";

export function ContactSection() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: <Mail className={cardIconClass} strokeWidth={1.75} aria-hidden />,
      title: t("CONTACTS.CARD_TITLE_1"),
      body: "leonardo1692004@gmail.com",
      href: "mailto:leonardo1692004@gmail.com",
    },
    {
      icon: <MapPin className={cardIconClass} strokeWidth={1.75} aria-hidden />,
      title: t("CONTACTS.LOCATION_LABEL"),
      body: t("CONTACTS.LOCATION_VALUE"),
      href: null as string | null,
    },
    {
      icon: <Send className={cardIconClass} strokeWidth={1.75} aria-hidden />,
      title: t("CONTACTS.AVAIL_LABEL"),
      body: t("CONTACTS.AVAIL_VALUE"),
      href: null as string | null,
    },
  ];

  return (
    <section id="contacts-section" className="border-t border-line bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="section-title-row">
          <span className="section-title-text">{t("CONTACTS.SECTION_LABEL")}</span>
          <span className="section-title-line" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col justify-center lg:pr-4">
            <p className="text-sm leading-relaxed text-muted">{t("CONTACTS.CTA_LEAD")}</p>
          </div>

          {cards.map((card) => {
            const inner = (
              <>
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink mb-2">{card.title}</h3>
                <p className="text-sm text-muted leading-relaxed break-words">{card.body}</p>
              </>
            );
            const className =
              "border border-line bg-surface p-6 flex flex-col h-full min-h-[160px] focus-ring";

            if (card.href) {
              return (
                <a key={card.title} href={card.href} className={className}>
                  {inner}
                </a>
              );
            }
            return (
              <div key={card.title} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
