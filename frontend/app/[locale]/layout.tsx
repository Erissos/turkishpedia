import "../globals.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "../../components/Footer";
import SiteHeader from "../../components/SiteHeader";
import { getDictionary, locales, type Locale } from "../../lib/i18n";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const dict = getDictionary(params.locale);
  return {
    title: dict.site.title,
    description: dict.site.description,
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <SiteHeader locale={locale} labels={dict.header} />
        <main className="min-h-screen">{children}</main>
        <Footer locale={locale} footer={dict.footer} />
      </body>
    </html>
  );
}
