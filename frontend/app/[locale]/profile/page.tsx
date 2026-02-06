import PageHero from "../../../components/layout/PageHero";
import { getDictionary } from "../../../lib/i18n";

export default function ProfilePage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.profile.hero.label}
        title={dict.profile.hero.title}
        subtitle={dict.profile.hero.subtitle}
        imageSrc={dict.profile.hero.imageSrc}
        imageAlt={dict.profile.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          <p className="text-base text-stone-600">{dict.profile.body}</p>
        </div>
      </section>
    </div>
  );
}
