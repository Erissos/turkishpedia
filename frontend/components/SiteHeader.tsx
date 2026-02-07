"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Locale } from "../lib/i18n";
import LocaleSwitch from "./LocaleSwitch";
import logo from "../logo/logo.png";

type SiteHeaderLabels = {
  siteTitle: string;
  tagline: string;
  menu: {
    label: string;
    login: string;
    logout: string;
    becomeEditor: string;
    archive: string;
    profile: string;
    open: string;
    close: string;
  };
  nav: {
    articles: string;
    cities: string;
    routes: string;
    search: string;
    profile: string;
  };
  admin: string;
  cta: string;
};

export default function SiteHeader({ locale, labels }: { locale: Locale; labels: SiteHeaderLabels }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const navLinks = [
    { label: labels.nav.articles, href: `/${locale}/articles/featured` },
    { label: labels.nav.cities, href: `/${locale}/cities/featured` },
    { label: labels.nav.routes, href: `/${locale}/routes` },
    { label: labels.nav.search, href: `/${locale}/search` },
    { label: labels.nav.profile, href: `/${locale}/profile` },
  ];
  const accountLinks = [
    { label: labels.menu.login, href: `/${locale}/login` },
    { label: labels.menu.becomeEditor, href: `/${locale}/admin` },
    { label: "✍️ Yeni Yazı", href: `/${locale}/write` },
    { label: labels.menu.archive, href: `/${locale}/articles/featured` },
    { label: labels.menu.profile, href: `/${locale}/profile` },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeAll = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    window.localStorage.removeItem("tp_access_token");
    window.localStorage.removeItem("tp_refresh_token");
    closeAll();
    router.push(`/${locale}/login`);
  };
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src={logo} alt={labels.siteTitle} width={44} height={44} className="rounded-full" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-wide text-white">{labels.siteTitle}</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">{labels.tagline}</span>
            </div>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitch currentLocale={locale} />
          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:bg-white/10"
              aria-expanded={isDropdownOpen}
              aria-haspopup="menu"
            >
              {labels.menu.label}
            </button>
            {isDropdownOpen ? (
              <div
                className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#101010] p-2 shadow-2xl"
                role="menu"
              >
                {accountLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
                    onClick={closeAll}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
                >
                  {labels.menu.logout}
                </button>
              </div>
            ) : null}
          </div>
          <Link
            href={`/${locale}/admin`}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:bg-white/10"
          >
            {labels.admin}
          </Link>
          <Link
            href={`/${locale}/routes`}
            className="rounded-full bg-[#C05621] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#a84a1c]"
          >
            {labels.cta}
          </Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitch currentLocale={locale} />
          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:bg-white/10"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? labels.menu.close : labels.menu.open}
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <div className="border-t border-white/10 bg-[#0A0A0A] md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 text-white/80">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-base" onClick={closeAll}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">{labels.menu.label}</p>
              <div className="grid gap-2">
                {accountLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="text-base" onClick={closeAll}>
                    {link.label}
                  </Link>
                ))}
                <button type="button" className="text-left text-base" onClick={handleLogout}>
                  {labels.menu.logout}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
              <Link
                href={`/${locale}/admin`}
                className="rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white/70"
                onClick={closeAll}
              >
                {labels.admin}
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="rounded-full bg-[#C05621] px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white"
                onClick={closeAll}
              >
                {labels.cta}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
