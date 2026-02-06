export default function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="section-title text-xs text-aqua-700">{title}</p>
      <h2 className="text-2xl font-semibold text-clay-900 sm:text-3xl">{subtitle}</h2>
    </div>
  );
}
