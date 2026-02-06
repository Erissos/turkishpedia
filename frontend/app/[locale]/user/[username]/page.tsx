import { Calendar, GraduationCap, MapPin, Mail, Phone, User2 } from "lucide-react";
import { notFound } from "next/navigation";

import PageHero from "../../../../components/layout/PageHero";
import { apiFetch } from "../../../../lib/api";
import { getDictionary } from "../../../../lib/i18n";
import type { PublicUserProfile } from "../../../../lib/types";

type PageProps = {
  params: {
    locale: string;
    username: string;
  };
};

export default async function UserProfilePage({ params }: PageProps) {
  const dict = getDictionary(params.locale);

  let profile: PublicUserProfile | null = null;
  try {
    profile = await apiFetch<PublicUserProfile>(`/accounts/user/${params.username}/`);
  } catch {
    notFound();
  }

  if (!profile) {
    notFound();
  }

  const emptyLabel = dict.publicProfile.empty;
  const displayName = profile.display_name || profile.username;
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const basicInfo = [
    { label: dict.publicProfile.labels.username, value: profile.username },
    { label: dict.publicProfile.labels.displayName, value: profile.display_name || emptyLabel },
    { label: dict.publicProfile.labels.fullName, value: profile.full_name || emptyLabel },
  ];

  const contactInfo = [
    { label: dict.publicProfile.labels.email, value: profile.email || emptyLabel },
    { label: dict.publicProfile.labels.phoneNumber, value: profile.phone_number || emptyLabel },
  ];

  const detailsInfo = [
    { label: dict.publicProfile.labels.birthDate, value: profile.birth_date || emptyLabel },
    { label: dict.publicProfile.labels.age, value: profile.age ? profile.age.toString() : emptyLabel },
    { label: dict.publicProfile.labels.gender, value: profile.gender || emptyLabel },
    { label: dict.publicProfile.labels.currentLocation, value: profile.current_location || emptyLabel },
    { label: dict.publicProfile.labels.birthPlace, value: profile.birth_place || emptyLabel },
    { label: dict.publicProfile.labels.religion, value: profile.religion || emptyLabel },
    { label: dict.publicProfile.labels.educationLevel, value: profile.education_level || emptyLabel },
    { label: dict.publicProfile.labels.occupation, value: profile.occupation || emptyLabel },
    { label: dict.publicProfile.labels.jobTitle, value: profile.job_title || emptyLabel },
    { label: dict.publicProfile.labels.membershipDate, value: profile.membership_date || emptyLabel },
  ];

  return (
    <div className="bg-[#F3F4F6]">
      <PageHero
        label={dict.publicProfile.hero.label}
        title={displayName}
        subtitle={dict.publicProfile.hero.subtitle}
        imageSrc={dict.publicProfile.hero.imageSrc}
        imageAlt={dict.publicProfile.hero.imageAlt}
      />

      <section className="mx-auto -mt-16 grid max-w-6xl gap-6 px-6 pb-16 sm:px-10">
        <div className="grid gap-6 rounded-3xl border border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur md:grid-cols-[0.7fr_2fr]">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-stone-200 bg-stone-900 text-3xl font-semibold text-white">
              {profile.avatar ? (
                <img src={profile.avatar} alt={displayName} className="h-full w-full rounded-full object-cover" />
              ) : (
                <span className="display-font">{initials || "TP"}</span>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">{dict.publicProfile.labels.username}</p>
              <h2 className="text-2xl font-semibold text-stone-900">{displayName}</h2>
              <p className="text-sm text-stone-500">@{profile.username}</p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
                {dict.publicProfile.sections.stats}
              </span>
              <span className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
                {dict.publicProfile.sections.basics}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="rounded-2xl border border-stone-100 bg-white p-4">
                <p className="text-xs uppercase tracking-widest text-stone-400">{dict.publicProfile.labels.followers}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">{profile.followers_count}</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-white p-4">
                <p className="text-xs uppercase tracking-widest text-stone-400">{dict.publicProfile.labels.following}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">{profile.following_count}</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-white p-4">
                <p className="text-xs uppercase tracking-widest text-stone-400">{dict.publicProfile.labels.membershipDate}</p>
                <p className="mt-2 text-sm font-semibold text-stone-900">{profile.membership_date || emptyLabel}</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-white p-4">
                <p className="text-xs uppercase tracking-widest text-stone-400">{dict.publicProfile.labels.currentLocation}</p>
                <p className="mt-2 text-sm font-semibold text-stone-900">{profile.current_location || emptyLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 sm:px-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-stone-100 bg-white p-8 shadow-xl">
            <h3 className="text-xl font-semibold text-stone-900">{dict.publicProfile.sections.basics}</h3>
            <div className="mt-5 grid gap-4 text-sm text-stone-600">
              {basicInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <User2 className="mt-1 h-4 w-4 text-stone-400" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-stone-400">{item.label}</span>
                    <span className="text-base text-stone-800">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            {profile.bio ? (
              <div className="mt-6 rounded-2xl border border-stone-100 bg-stone-50 p-5 text-sm text-stone-600">
                {profile.bio}
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-stone-100 bg-white p-8 shadow-xl">
            <h3 className="text-xl font-semibold text-stone-900">{dict.publicProfile.sections.details}</h3>
            <div className="mt-5 grid gap-4 text-sm text-stone-600">
              {detailsInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  {item.label === dict.publicProfile.labels.birthDate ? (
                    <Calendar className="mt-1 h-4 w-4 text-stone-400" />
                  ) : item.label === dict.publicProfile.labels.educationLevel ? (
                    <GraduationCap className="mt-1 h-4 w-4 text-stone-400" />
                  ) : (
                    <MapPin className="mt-1 h-4 w-4 text-stone-400" />
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-stone-400">{item.label}</span>
                    <span className="text-base text-stone-800">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-stone-100 bg-white p-8 shadow-xl">
            <h3 className="text-xl font-semibold text-stone-900">{dict.publicProfile.sections.contact}</h3>
            <div className="mt-5 grid gap-4 text-sm text-stone-600">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  {item.label === dict.publicProfile.labels.email ? (
                    <Mail className="mt-1 h-4 w-4 text-stone-400" />
                  ) : (
                    <Phone className="mt-1 h-4 w-4 text-stone-400" />
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-stone-400">{item.label}</span>
                    <span className="text-base text-stone-800">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-stone-100 bg-gradient-to-br from-stone-900 via-stone-800 to-[#1A1A1A] p-8 text-white shadow-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">{dict.publicProfile.sections.stats}</p>
            <div className="mt-4 grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">{dict.publicProfile.labels.followers}</span>
                <span className="text-2xl font-semibold">{profile.followers_count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">{dict.publicProfile.labels.following}</span>
                <span className="text-2xl font-semibold">{profile.following_count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">{dict.publicProfile.labels.membershipDate}</span>
                <span className="text-sm font-semibold">{profile.membership_date || emptyLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
