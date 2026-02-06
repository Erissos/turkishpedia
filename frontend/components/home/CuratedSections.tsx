type CategoryItem = {
  title: string;
  desc: string;
  icon: string;
};

type CategoryGridProps = {
  label: string;
  headline: string;
  actionLabel: string;
  categories: CategoryItem[];
};

export function CategoryGrid({ label, headline, actionLabel, categories }: CategoryGridProps) {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-600">{label}</h2>
            <p className="text-4xl text-stone-900">{headline}</p>
          </div>
          <button className="border-b-2 border-stone-900 pb-1 font-bold text-stone-900 transition-all hover:border-orange-600 hover:text-orange-600">
            {actionLabel}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group cursor-pointer rounded-3xl border border-stone-100 p-8 transition-all duration-300 hover:bg-stone-50"
            >
              <div className="mb-6 text-4xl grayscale transition-all group-hover:grayscale-0">{cat.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-stone-900">{cat.title}</h3>
              <p className="text-sm text-stone-500">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
