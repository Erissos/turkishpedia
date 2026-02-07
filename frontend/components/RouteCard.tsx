import Link from "next/link";

export default function RouteCard({ title, summary, href }: { title: string; summary: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-stone-100 bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
      <p className="mt-3 text-sm text-stone-600">{summary}</p>
    </Link>
  );
}
