import { notFound } from "next/navigation";

import PageHero from "../../../../components/layout/PageHero";
import { apiFetch } from "../../../../lib/api";
import { getDictionary } from "../../../../lib/i18n";
import type { PaginatedResponse, TravelRoute } from "../../../../lib/types";

export default async function RouteDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const dict = getDictionary(params.locale);
  const response = await apiFetch<PaginatedResponse<TravelRoute>>(
    `/routes/routes/?search=${encodeURIComponent(params.slug)}`
  );
  const route = response.results.find((item) => item.slug === params.slug);

  if (!route) {
    notFound();
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
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Route</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">{route.title}</h2>
          <p className="mt-4 text-base text-stone-600">{route.description}</p>
        </div>
      </section>
    </div>
  );
}
