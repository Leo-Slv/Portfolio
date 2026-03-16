"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/translation-context";
import type { Locale } from "@/lib/translation-context";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <path fill="#fff" d="M0 0h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0zm0 78.8h512v39.4H0z" />
    <path fill="#192f5d" d="M0 0h197.5v275H0z" />
  </svg>
);

export function NavBar() {
  const { t, locale, setLocale } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setDropdownOpen(false);
  };

  const navLinks = [
    { href: "#home", label: t("NAVBAR.HOME") },
    { href: "#about-section", label: t("NAVBAR.ABOUT") },
    { href: "#projects-section", label: t("NAVBAR.PROJECTS") },
    { href: "#contacts-section", label: t("NAVBAR.CONTACTS") },
  ];

  return (
    <nav className="bg-[#16161a] fixed w-full z-20 top-0 start-0 border-nav">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pr-4 sm:pr-10 pl-4">
        <a href="https://github.com/Leo-Slv" className="flex items-center space-x-3 rtl:space-x-reverse float-1" target="_blank" rel="noopener noreferrer">
          <img src="/assets/l-logo.png" className="h-12 sm:h-20" alt="Leo Logo" width={80} height={80} />
        </a>

        <div className="flex items-center gap-2 md:order-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-400 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white"
            >
              {locale === "pt-BR" ? FLAG_SVG_BR : FLAG_SVG_US}
              <span className="hidden sm:inline ml-2">{t("NAVBAR.MAIN-LANGUAGE")}</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-gray-900 shadow-lg border border-gray-700 py-1">
                <button
                  onClick={() => handleSetLocale("pt-BR")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {FLAG_SVG_BR}
                  <span className="ml-2">{t("NAVBAR.PORTUGUESE")}</span>
                </button>
                <button
                  onClick={() => handleSetLocale("en-US")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {FLAG_SVG_US}
                  <span className="ml-2">{t("NAVBAR.ENGLISH")}</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div
          className={cn(
            "items-center justify-between w-full md:flex md:w-auto md:order-1",
            mobileOpen ? "flex" : "hidden"
          )}
          id="navbar-sticky"
        >
          <ul className="font-medium flex flex-col p-4 gap-2 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="nav-title hover-effect block py-2 px-3 text-gray-400 text-xl main-font rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
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
