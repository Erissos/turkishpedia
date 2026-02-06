import PageHero from "../../../components/layout/PageHero";
import RouteCard from "../../../components/RouteCard";
import { getDictionary } from "../../../lib/i18n";

export default function RoutesPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.routes.hero.label}
        title={dict.routes.hero.title}
        subtitle={dict.routes.hero.subtitle}
        imageSrc={dict.routes.hero.imageSrc}
        imageAlt={dict.routes.hero.imageAlt}
      />
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {dict.routes.items.map((route) => (
            <RouteCard key={route.title} title={route.title} summary={route.summary} />
          ))}
        </div>
      </section>
    </div>
  );
}
