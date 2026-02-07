import { notFound } from "next/navigation";

import PageHero from "../../../../components/layout/PageHero";
import { apiFetch } from "../../../../lib/api";
import { getDictionary } from "../../../../lib/i18n";
import type { PaginatedResponse } from "../../../../lib/types";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export default async function CategoryPage({ params }: { params: { locale: string; slug: string } }) {
  const dict = getDictionary(params.locale);
  const response = await apiFetch<PaginatedResponse<Category>>(
    `/articles/categories/?search=${encodeURIComponent(params.slug)}`
  );
  const category = response.results.find((item) => item.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.category.hero.label}
        title={category.name}
        subtitle={dict.category.hero.subtitle}
        imageSrc={dict.category.hero.imageSrc}
        imageAlt={dict.category.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          <p className="text-base text-stone-600">{category.description}</p>
        </div>
      </section>
    </div>
  );
}
