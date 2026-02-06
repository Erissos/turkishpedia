"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "../lib/i18n";

type LocaleSwitchProps = {
  currentLocale: Locale;
  className?: string;
};

export default function LocaleSwitch({ currentLocale, className }: LocaleSwitchProps) {
  const pathname = usePathname() || "/";
  const targetLocale: Locale = currentLocale === "tr" ? "en" : "tr";

  const parts = pathname.split("/");
  let href = `/${targetLocale}`;

  if (parts.length > 1 && locales.includes(parts[1] as Locale)) {
    parts[1] = targetLocale;
    const joined = parts.join("/");
    href = joined.startsWith("/") ? joined : `/${joined}`;
  } else if (pathname !== "/") {
    href = `/${targetLocale}${pathname}`;
  }

  const label = currentLocale === "tr" ? "EN" : "TR";

  const classes = className
    ? className
    : "rounded-full border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:bg-white/10";

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
