import { notFound } from "next/navigation";

import CommentsSection from "../../../../components/CommentsSection";
import PageHero from "../../../../components/layout/PageHero";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";
import RelatedArticles from "../../../../components/RelatedArticles";
import TableOfContents from "../../../../components/TableOfContents";
import { apiFetch } from "../../../../lib/api";
import { getDictionary } from "../../../../lib/i18n";
import type { Article, PaginatedResponse } from "../../../../lib/types";

export default async function ArticlePage({ params }: { params: { locale: string; slug: string } }) {
  const dict = getDictionary(params.locale);
  const response = await apiFetch<PaginatedResponse<Article>>(
    `/articles/articles/?search=${encodeURIComponent(params.slug)}`
  );
  const article = response.results.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      <PageHero
        label={dict.article.hero.label}
        title={article.title}
        subtitle={dict.article.hero.subtitle}
        imageSrc={dict.article.hero.imageSrc}
        imageAlt={dict.article.hero.imageAlt}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-12">
            {/* Sidebar / TOC */}
            <aside className="hidden lg:block lg:w-1/4">
                <TableOfContents content={article.content} />
            </aside>

            {/* Main Content */}
            <div className="lg:w-3/4">
                <article className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm sm:p-10">
                    <div className="mb-6 flex items-center gap-2 text-sm text-stone-500">
                      <span>{new Date().toLocaleDateString(params.locale === "tr" ? "tr-TR" : "en-US")}</span>
                    </div>

                    <h1 className="mb-8 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl lg:text-5xl">
                        {article.title}
                    </h1>

                    <div className="prose prose-stone prose-lg max-w-none">
                        <MarkdownRenderer content={article.content} />
                    </div>
                </article>

                <RelatedArticles currentSlug={params.slug} locale={params.locale} />
            </div>
        </div>
      </section>
    </div>
  );
}
