import PageHero from "../../../../components/layout/PageHero";
import { getDictionary } from "../../../../lib/i18n";

export default function CityPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.city.hero.label}
        title={dict.city.hero.title}
        subtitle={dict.city.hero.subtitle}
        imageSrc={dict.city.hero.imageSrc}
        imageAlt={dict.city.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          <p className="text-base text-stone-600">{dict.city.body}</p>
        </div>
      </section>
    </div>
  );
}
