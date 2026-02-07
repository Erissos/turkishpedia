"use client";

import { useEffect, useState } from "react";

import PageHero from "../../../components/layout/PageHero";
import { apiFetch } from "../../../lib/api";
import { getDictionary } from "../../../lib/i18n";
import type { UserProfile } from "../../../lib/types";

export default function ProfilePage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);
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

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.profile.hero.label}
        title={dict.profile.hero.title}
        subtitle={dict.profile.hero.subtitle}
        imageSrc={dict.profile.hero.imageSrc}
        imageAlt={dict.profile.hero.imageAlt}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="rounded-3xl border border-stone-100 bg-white p-10 shadow-xl">
          {loading ? (
            <p className="text-base text-stone-600">Loading profile...</p>
          ) : profile ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Account</p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900">
                  {profile.display_name || profile.username}
                </h2>
                <p className="text-sm text-stone-500">@{profile.username}</p>
              </div>
              <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400">Email</span>
                  <p className="text-base text-stone-800">{profile.email || "-"}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400">Role</span>
                  <p className="text-base text-stone-800">{profile.role}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400">Followers</span>
                  <p className="text-base text-stone-800">{profile.followers_count}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400">Following</span>
                  <p className="text-base text-stone-800">{profile.following_count}</p>
                </div>
              </div>
              {profile.bio ? <p className="text-base text-stone-600">{profile.bio}</p> : null}
            </div>
          ) : (
            <p className="text-base text-stone-600">
              {dict.profile.body} Sign in is required to load your profile.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
