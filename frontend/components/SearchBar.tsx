"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Locale } from "../lib/i18n";

export default function SearchBar({
  placeholder,
  buttonLabel,
  locale,
  initialQuery = "",
}: {
  placeholder: string;
  buttonLabel: string;
  locale: Locale;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    const searchParams = trimmed ? `?query=${encodeURIComponent(trimmed)}` : "";
    router.push(`/${locale}/search${searchParams}`);
  };

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <input
        className="w-full flex-1 rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm shadow-sm focus:border-orange-500 focus:outline-none"
        placeholder={placeholder}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-2xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
