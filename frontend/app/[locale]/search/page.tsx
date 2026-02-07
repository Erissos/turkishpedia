import PageHero from "../../../components/layout/PageHero";
import SearchBar from "../../../components/SearchBar";
import ArticleCard from "../../../components/ArticleCard";
import CityCard from "../../../components/CityCard";
import RouteCard from "../../../components/RouteCard";
import { apiFetch } from "../../../lib/api";
import { getDictionary } from "../../../lib/i18n";
import type { Article, City, PaginatedResponse, TravelRoute } from "../../../lib/types";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { query?: string };
}) {
  const dict = getDictionary(params.locale);
  const query = searchParams?.query || "";
  let articleResults: Article[] = [];
  let cityResults: City[] = [];
  let routeResults: TravelRoute[] = [];

  if (query) {
    try {
      const [articlesResponse, citiesResponse, routesResponse] = await Promise.all([
        apiFetch<PaginatedResponse<Article>>(`/articles/articles/?search=${encodeURIComponent(query)}`),
        apiFetch<PaginatedResponse<City>>(`/tourism/cities/?search=${encodeURIComponent(query)}`),
        apiFetch<PaginatedResponse<TravelRoute>>(`/routes/routes/?search=${encodeURIComponent(query)}`),
      ]);
      articleResults = articlesResponse.results;
      cityResults = citiesResponse.results;
      routeResults = routesResponse.results;
    } catch {
      articleResults = [];
      cityResults = [];
      routeResults = [];
    }
  }

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.search.hero.label}
        title={dict.search.hero.title}
        subtitle={dict.search.hero.subtitle}
        imageSrc={dict.search.hero.imageSrc}
        imageAlt={dict.search.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-8 shadow-xl">
          <SearchBar
            placeholder={dict.search.placeholder}
            buttonLabel={dict.common.explore}
            locale={params.locale}
            initialQuery={query}
          />
          {query ? (
            <div className="mt-6 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Articles</p>
                {articleResults.length ? (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {articleResults.map((item) => (
                      <ArticleCard
                        key={item.slug}
                        title={item.title}
                        summary={item.content?.slice(0, 120) || ""}
                        href={`/${params.locale}/articles/${item.slug}`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-stone-500">No articles found.</p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Cities</p>
                {cityResults.length ? (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {cityResults.map((item) => (
                      <CityCard
                        key={item.slug}
                        name={item.name}
                        summary={item.description || ""}
                        href={`/${params.locale}/cities/${item.slug}`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-stone-500">No cities found.</p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Routes</p>
                {routeResults.length ? (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {routeResults.map((item) => (
                      <RouteCard
                        key={item.slug}
                        title={item.title}
                        summary={item.description}
                        href={`/${params.locale}/routes/${item.slug}`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-stone-500">No routes found.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-stone-500">Enter a keyword to start searching.</p>
          )}
        </div>
      </section>
    </div>
  );
}
