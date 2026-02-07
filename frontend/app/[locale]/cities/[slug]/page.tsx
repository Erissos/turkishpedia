import { notFound } from "next/navigation";

import PageHero from "../../../../components/layout/PageHero";
import { apiFetch } from "../../../../lib/api";
import { getDictionary } from "../../../../lib/i18n";
import type { City, PaginatedResponse } from "../../../../lib/types";

export default async function CityPage({ params }: { params: { locale: string; slug: string } }) {
  const dict = getDictionary(params.locale);
  const response = await apiFetch<PaginatedResponse<City>>(
    `/tourism/cities/?search=${encodeURIComponent(params.slug)}`
  );
  const city = response.results.find((item) => item.slug === params.slug);

  if (!city) {
    notFound();
  }

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.city.hero.label}
        title={city.name}
        subtitle={dict.city.hero.subtitle}
        imageSrc={dict.city.hero.imageSrc}
        imageAlt={dict.city.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          <p className="text-base text-stone-600">{city.description}</p>
        </div>
      </section>
    </div>
  );
}
