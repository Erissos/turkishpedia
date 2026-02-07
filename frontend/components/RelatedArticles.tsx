"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Article } from "../lib/types";

export default function RelatedArticles({ currentSlug, locale }: { currentSlug: string; locale: string }) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Fetch latest articles as "related" for now
    apiFetch<any>("/articles/articles/")
      .then((data) => {
        const result = Array.isArray(data) ? data : data.results || [];
        const filtered = result.filter((a: Article) => a.slug !== currentSlug).slice(0, 3);
        setArticles(filtered);
      })
      .catch((err) => console.error("Failed to fetch related", err));
  }, [currentSlug]);

  if (articles.length === 0) return null;

  return (
    <div className="mt-16 border-t border-stone-200 pt-10">
      <h3 className="mb-6 text-xl font-bold text-stone-900">İlginizi Çekebilir</h3>
      <div className="grid gap-6 sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/${locale}/articles/${article.slug}`}
            className="group block rounded-xl border border-stone-100 bg-white p-6 shadow-sm transition hover:border-stone-200 hover:shadow-md"
          >
            <h4 className="mb-2 text-lg font-bold text-stone-900 group-hover:text-red-700">{article.title}</h4>
            <p className="line-clamp-3 text-sm text-stone-600">
              {article.content.substring(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
