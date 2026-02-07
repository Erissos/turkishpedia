import ArticleCard from "../../../components/ArticleCard";
import PageHero from "../../../components/layout/PageHero";
import { apiFetch } from "../../../lib/api";
import { getDictionary } from "../../../lib/i18n";
import type { Article, PaginatedResponse } from "../../../lib/types";

export default async function ArticlesPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);
  let items: Article[] = [];

  try {
    const response = await apiFetch<PaginatedResponse<Article>>("/articles/articles/");
    items = response.results;
  } catch {
    items = [];
  }

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.article.hero.label}
        title={dict.article.hero.title}
        subtitle={dict.article.hero.subtitle}
        imageSrc={dict.article.hero.imageSrc}
        imageAlt={dict.article.hero.imageAlt}
      />
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                summary={item.content?.slice(0, 140) || ""}
                href={`/${params.locale}/articles/${item.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-500">No articles yet.</p>
        )}
      </section>
    </div>
  );
}
