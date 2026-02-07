import CityCard from "../../../components/CityCard";
import PageHero from "../../../components/layout/PageHero";
import { apiFetch } from "../../../lib/api";
import { getDictionary } from "../../../lib/i18n";
import type { City, PaginatedResponse } from "../../../lib/types";

export default async function CitiesPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);
  let items: City[] = [];

  try {
    const response = await apiFetch<PaginatedResponse<City>>("/tourism/cities/");
    items = response.results;
  } catch {
    items = [];
  }

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.city.hero.label}
        title={dict.city.hero.title}
        subtitle={dict.city.hero.subtitle}
        imageSrc={dict.city.hero.imageSrc}
        imageAlt={dict.city.hero.imageAlt}
      />
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <CityCard
                key={item.slug}
                name={item.name}
                summary={item.description || ""}
                href={`/${params.locale}/cities/${item.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-500">No cities yet.</p>
        )}
      </section>
    </div>
  );
}
