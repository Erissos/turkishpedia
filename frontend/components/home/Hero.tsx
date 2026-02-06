"use client";

import { Globe, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type HeroStat = {
  value: string;
  label: string;
};

type HeroProps = {
  badge: string;
  title: string;
  titleEmphasis: string;
  subtitle: string;
  searchPlaceholder: string;
  ctaLabel: string;
  stats: HeroStat[];
  imageSrc: string;
  imageAlt: string;
};

export default function Hero({
  badge,
  title,
  titleEmphasis,
  subtitle,
  searchPlaceholder,
  ctaLabel,
  stats,
  imageSrc,
  imageAlt,
}: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#0A0A0A]" />
        <img src={imageSrc} alt={imageAlt} className="h-full w-full scale-105 object-cover" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <Sparkles size={16} className="text-amber-400" />
            {badge}
          </span>

          <h1 className="mb-8 text-5xl font-medium tracking-tight text-white md:text-8xl">
            {title}
            <br />
            <span className="text-4xl font-light italic text-stone-400 md:text-7xl">{titleEmphasis}</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-stone-200 md:text-xl">{subtitle}</p>

          <div className="group relative mx-auto max-w-3xl">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 blur opacity-25 transition duration-1000 group-hover:opacity-50" />
            <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-2xl">
              <div className="flex flex-1 items-center px-4">
                <Search className="mr-3 text-stone-400" size={24} />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="h-14 w-full bg-transparent text-lg text-stone-800 placeholder:text-stone-400 focus:outline-none"
                />
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-stone-900 px-8 py-4 font-semibold text-white transition-all hover:bg-orange-700">
                <Globe size={18} />
                {ctaLabel}
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm uppercase tracking-[0.2em] text-stone-400">
            {stats.map((stat) => (
              <span
                key={`${stat.value}-${stat.label}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <span className="font-bold tracking-normal text-white">{stat.value}</span>
                {stat.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
