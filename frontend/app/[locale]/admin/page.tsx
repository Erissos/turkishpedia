import PageHero from "../../../components/layout/PageHero";
import { getDictionary } from "../../../lib/i18n";

export default function AdminDashboardPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.admin.hero.label}
        title={dict.admin.hero.title}
        subtitle={dict.admin.hero.subtitle}
        imageSrc={dict.admin.hero.imageSrc}
        imageAlt={dict.admin.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          <p className="text-base text-stone-600">{dict.admin.body}</p>
        </div>
      </section>
    </div>
  );
}
