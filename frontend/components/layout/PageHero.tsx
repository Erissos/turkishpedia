type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
};

export default function PageHero({ label, title, subtitle, imageSrc, imageAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#0A0A0A]" />
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-6 py-16 sm:px-10">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{label}</span>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="max-w-2xl text-base text-white/70 md:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
