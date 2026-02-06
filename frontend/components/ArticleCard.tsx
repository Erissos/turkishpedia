export default function ArticleCard({ title, summary }: { title: string; summary: string }) {
  return (
    <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
      <p className="mt-3 text-sm text-stone-600">{summary}</p>
    </div>
  );
}
