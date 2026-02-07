"use client";

import { useEffect, useState } from "react";

import PageHero from "../../../components/layout/PageHero";
import { apiFetch } from "../../../lib/api";
import { getDictionary } from "../../../lib/i18n";
import type { UserProfile } from "../../../lib/types";

export default function AdminDashboardPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const adminUrl = apiBaseUrl ? apiBaseUrl.replace(/\/api\/?$/, "") + "/admin/" : "/admin/";
  const docsUrl = apiBaseUrl ? apiBaseUrl.replace(/\/api\/?$/, "") + "/api/docs/" : "/api/docs/";
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apiFetch<UserProfile>("/accounts/profile/");
        setProfile(data);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const role = profile?.role || "";
  const canManage = ["editor", "moderator", "admin"].includes(role);

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
          {loading ? (
            <p className="mt-4 text-sm text-stone-500">Checking access...</p>
          ) : canManage ? (
            <div className="mt-6 grid gap-3 text-sm">
              <a className="text-orange-700 hover:underline" href={adminUrl}>
                Open admin panel
              </a>
              <a className="text-orange-700 hover:underline" href={docsUrl}>
                Open API docs
              </a>
            </div>
          ) : (
            <p className="mt-4 text-sm text-stone-500">Sign in with an editor role to access admin tools.</p>
          )}
        </div>
      </section>
    </div>
  );
}
