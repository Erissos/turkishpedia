import PageHero from "../../../components/layout/PageHero";
import RouteCard from "../../../components/RouteCard";
import { apiFetch } from "../../../lib/api";
import { getDictionary } from "../../../lib/i18n";
import type { PaginatedResponse, TravelRoute } from "../../../lib/types";

export default async function RoutesPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);
  let items: TravelRoute[] = [];

  try {
    const response = await apiFetch<PaginatedResponse<TravelRoute>>("/routes/routes/");
    items = response.results;
  } catch {
    items = [];
  }

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.routes.hero.label}
        title={dict.routes.hero.title}
        subtitle={dict.routes.hero.subtitle}
        imageSrc={dict.routes.hero.imageSrc}
        imageAlt={dict.routes.hero.imageAlt}
      />
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((route) => (
              <RouteCard
                key={route.slug}
                title={route.title}
                summary={route.description}
                href={`/${params.locale}/routes/${route.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-500">No routes yet.</p>
        )}
      </section>
    </div>
  );
}
