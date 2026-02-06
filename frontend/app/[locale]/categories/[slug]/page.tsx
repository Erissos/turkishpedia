import PageHero from "../../../../components/layout/PageHero";
import { getDictionary } from "../../../../lib/i18n";

export default function CategoryPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.category.hero.label}
        title={dict.category.hero.title}
        subtitle={dict.category.hero.subtitle}
        imageSrc={dict.category.hero.imageSrc}
        imageAlt={dict.category.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          <p className="text-base text-stone-600">{dict.category.body}</p>
        </div>
      </section>
    </div>
  );
}
