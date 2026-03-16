"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FLAG_SVG_BR = (
  <svg className="h-3.5 w-3.5 rounded-full shrink-0" viewBox="0 0 512 512" aria-hidden>
    <path fill="#229e45" fillRule="evenodd" d="M0 0h512v512H0z" />
    <path fill="#f8e509" fillRule="evenodd" d="m261.4 405.4 229.8-149.2L260 106.6l-230.7 150z" />
    <path fill="#2b49a3" fillRule="evenodd" d="M361.5 256a97.2 97.2 0 1 1-194.3-.2 97.2 97.2 0 0 1 194.3.2" />
  </svg>
);

const FLAG_SVG_US = (
  <svg className="h-3.5 w-3.5 rounded-full shrink-0" viewBox="0 0 512 512" aria-hidden>
    <path fill="#bd3d44" d="M0 0h512v512H0z" />
    <path fill="#fff" d="M0 0h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0z" />
    <path fill="#192f5d" d="M0 0h197.5v275H0z" />
  </svg>
);

export function NavBar() {
  const { t, locale, setLocale } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: t("NAVBAR.HOME") },
    { href: "#about-section", label: t("NAVBAR.ABOUT") },
    { href: "#projects-section", label: t("NAVBAR.PROJECTS") },
    { href: "#contacts-section", label: t("NAVBAR.CONTACTS") },
  ];

  return (
    <nav className="bg-page/80 backdrop-blur-xl fixed w-full z-50 top-0 start-0 border-nav transition-af">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <a
          href="https://github.com/Leo-Slv"
          className="flex items-center gap-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/l-logo.png" className="h-9 w-9 sm:h-10 sm:w-10" alt="Leo Logo" width={40} height={40} />
          <span className="text-sm font-semibold tracking-tight text-white hidden sm:inline">Leo</span>
          <span className="text-sm font-semibold tracking-tight text-white/60 hidden sm:inline">/ Portfolio</span>
        </a>

        <div className="flex items-center gap-2 md:order-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-white/74 rounded-af-sm border border-white/10 surface-depth bg-white/5 hover:border-white/[0.14] hover:bg-white/[0.08] transition-af cursor-pointer"
              >
                {locale === "pt-BR" ? FLAG_SVG_BR : FLAG_SVG_US}
                <span className="hidden sm:inline ml-2">{t("NAVBAR.MAIN-LANGUAGE")}</span>
                <img src="/assets/svg/chevron-down.svg" alt="" className="ml-1 w-4 h-4 opacity-70 invert" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setLocale("pt-BR")}>
                {FLAG_SVG_BR}
                <span className="ml-2">{t("NAVBAR.LABEL_PT")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale("en-US")}>
                {FLAG_SVG_US}
                <span className="ml-2">{t("NAVBAR.LABEL_EN")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-white/74 rounded-af-sm md:hidden hover:bg-white/5 focus-ring"
            aria-label="Toggle menu"
          >
            <img
              src={mobileOpen ? "/assets/svg/x.svg" : "/assets/svg/menu.svg"}
              alt=""
              className="w-5 h-5 invert opacity-90"
              aria-hidden
            />
          </button>
        </div>

        <div
          className={cn(
            "w-full md:w-auto md:order-1",
            mobileOpen ? "flex" : "hidden md:block"
          )}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 gap-2 md:flex-row md:p-0 md:mt-0 md:gap-6 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="nav-title nav-link-underline block py-2 px-3 text-sm text-white/70 hover:text-white rounded-af-sm md:py-0 md:px-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
