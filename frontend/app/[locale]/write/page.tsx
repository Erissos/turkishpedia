"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import type { Category, Article } from "../../../lib/types";

export default function WritePage({ params }: { params: { locale: string } }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // Check auth
    const token = window.localStorage.getItem("tp_access_token");
    if (!token) {
        router.push(`/${params.locale}/login`);
        return;
    }

    // Fetch categories
    apiFetch<any>("/articles/categories/")
      .then((data) => {
         const results = Array.isArray(data) ? data : data.results || [];
         setCategories(results);
      })
      .catch((err) => console.error("Failed categories", err));
  }, [params.locale, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    // Auto-slug
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    setLoading(true);
    try {
        const res = await apiFetch<Article>("/articles/articles/", {
            method: "POST",
            body: JSON.stringify({
                title,
                slug,
                content,
                categories: selectedCategories,
                status: "draft" // Start as draft? Or published? Backend default is draft.
            })
        });
        alert("Makale başarıyla oluşturuldu! Editör onayından sonra yayınlanacaktır.");
        router.push(`/${params.locale}/profile`);
    } catch (err) {
        console.error("Create article failed", err);
        alert("Makale oluşturulamadı. Slug benzersiz olmayabilir.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="mb-8 text-3xl font-bold text-stone-900">Yeni Makale Yaz</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
                <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Başlık</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={handleTitleChange}
                        className="w-full rounded-lg border border-stone-300 p-3 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                        placeholder="Örn: Göbeklitepe'nin Keşfi"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">URL Yolu (Slug)</label>
                    <input 
                        type="text" 
                        value={slug} 
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full rounded-lg border border-stone-300 bg-stone-50 p-3 text-stone-600 focus:border-red-600 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Kategoriler</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                    if (selectedCategories.includes(cat.id)) {
                                        setSelectedCategories(prev => prev.filter(id => id !== cat.id));
                                    } else {
                                        setSelectedCategories(prev => [...prev, cat.id]);
                                    }
                                }}
                                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                                    selectedCategories.includes(cat.id) 
                                    ? "bg-red-600 text-white" 
                                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">İçerik (Markdown)</label>
                    <p className="mb-2 text-xs text-stone-500">
                        Başlıklar için # kullanın. Örn: # Giriş, ## Alt Başlık.
                        Kalın yazı için **metin**, link için [metin](url) kullanabilirsiniz.
                    </p>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        rows={15}
                        className="w-full rounded-lg border border-stone-300 p-4 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                        placeholder="# Giriş\n\nBuraya makale içeriğinizi yazın..."
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Gönderiliyor..." : "Makaleyi Gönder"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
