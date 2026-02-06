import Link from "next/link";

import type { Locale } from "../lib/i18n";

type FooterSection = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

type FooterData = {
  headline: string;
  description: string;
  sections: FooterSection[];
  legal: string;
};

export default function Footer({ locale, footer }: { locale: Locale; footer: FooterData }) {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-14 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Turkishpedia</p>
            <h2 className="text-2xl font-semibold text-white">{footer.headline}</h2>
            <p className="text-sm leading-relaxed text-white/70">{footer.description}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footer.sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">{section.title}</p>
                <ul className="space-y-2 text-sm text-white/70">
                  {section.links.map((link) => {
                    const href = link.href.startsWith("/") ? `/${locale}${link.href}` : link.href;
                    return (
                      <li key={`${section.title}-${link.label}`}>
                        <Link href={href} className="transition hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <span>{footer.legal}</span>
          <span>© 2026 Turkishpedia</span>
        </div>
      </div>
    </footer>
  );
}
