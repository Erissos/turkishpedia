import { CategoryGrid } from "../../components/home/CuratedSections";
import Hero from "../../components/home/Hero";
import { getDictionary } from "../../lib/i18n";

export default function HomePage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Hero
        badge={dict.landing.hero.badge}
        title={dict.landing.hero.title}
        titleEmphasis={dict.landing.hero.titleEmphasis}
        subtitle={dict.landing.hero.subtitle}
        searchPlaceholder={dict.landing.hero.searchPlaceholder}
        ctaLabel={dict.landing.hero.cta}
        stats={dict.landing.hero.stats}
        imageSrc={dict.landing.hero.imageSrc}
        imageAlt={dict.landing.hero.imageAlt}
      />

      <CategoryGrid
        label={dict.landing.categories.label}
        headline={dict.landing.categories.headline}
        actionLabel={dict.landing.categories.actionLabel}
        categories={dict.landing.categories.items}
      />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <h2 className="border-b-2 border-stone-200 pb-2 text-3xl font-bold">{dict.landing.featured.title}</h2>
          <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-2xl font-bold italic text-stone-800">"{dict.landing.featured.heading}"</h3>
            <p className="mb-6 leading-relaxed text-stone-600">{dict.landing.featured.body}</p>
            <button className="font-semibold text-red-700 hover:underline">{dict.landing.featured.cta} &rarr;</button>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="border-b-2 border-stone-200 pb-2 text-3xl font-bold">{dict.landing.weeklyRoute.title}</h2>
          <div className="overflow-hidden rounded-2xl bg-stone-800 text-white shadow-xl">
            <div
              className="h-48 bg-cover"
              style={{ backgroundImage: `url('${dict.landing.weeklyRoute.imageSrc}')` }}
              aria-label={dict.landing.weeklyRoute.imageAlt}
            />
            <div className="p-6">
              <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold uppercase">
                {dict.landing.weeklyRoute.badge}
              </span>
              <h3 className="mt-3 text-xl font-bold">{dict.landing.weeklyRoute.heading}</h3>
              <p className="mt-2 text-sm text-stone-400">{dict.landing.weeklyRoute.body}</p>
              <button className="mt-6 w-full rounded-lg bg-white py-3 font-bold text-stone-900 transition-colors hover:bg-stone-200">
                {dict.landing.weeklyRoute.cta}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
