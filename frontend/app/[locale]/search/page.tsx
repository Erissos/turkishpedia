import PageHero from "../../../components/layout/PageHero";
import SearchBar from "../../../components/SearchBar";
import { getDictionary } from "../../../lib/i18n";

export default function SearchPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

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
          <SearchBar placeholder={dict.search.placeholder} buttonLabel={dict.common.explore} />
        </div>
      </section>
    </div>
  );
}
