import Link from "next/link";

import PageHero from "../../../components/layout/PageHero";
import { getDictionary } from "../../../lib/i18n";

const items = [
  { title: "Tarih", slug: "tarih" },
  { title: "Kultur", slug: "kultur" },
  { title: "Dil", slug: "dil" },
];

export default function CategoriesPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.category.hero.label}
        title={dict.category.hero.title}
        subtitle={dict.category.hero.subtitle}
        imageSrc={dict.category.hero.imageSrc}
        imageAlt={dict.category.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="grid gap-4 rounded-3xl border border-stone-100 bg-white p-8 shadow-xl">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${params.locale}/categories/${item.slug}`}
              className="rounded-2xl border border-stone-100 px-5 py-4 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
