import PageHero from "../../../../components/layout/PageHero";
import { getDictionary } from "../../../../lib/i18n";

export default function ArticlePage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.article.hero.label}
        title={dict.article.hero.title}
        subtitle={dict.article.hero.subtitle}
        imageSrc={dict.article.hero.imageSrc}
        imageAlt={dict.article.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <article className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          <h2 className="text-3xl font-semibold text-stone-900">{dict.article.heading}</h2>
          <p className="mt-4 text-base text-stone-600">{dict.article.body}</p>
        </article>
      </section>
    </div>
  );
}
