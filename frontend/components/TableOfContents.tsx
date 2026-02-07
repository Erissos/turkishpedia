"use client";

import { useEffect, useState } from "react";

type TableOfContentsProps = {
  content: string;
};

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const lines = content.split("\n");
    const found: Heading[] = [];
    
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
        const level = trimmed.startsWith("## ") ? 2 : 3;
        const text = trimmed.substring(level + 1).trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        found.push({ id, text, level });
      }
    });
    setHeadings(found);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden h-fit w-64 flex-shrink-0 lg:block">
      <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-500">İçindekiler</h4>
      <ul className="space-y-2 border-l border-stone-200">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
                setActiveId(heading.id);
              }}
              className={`block border-l-2 py-1 pl-4 text-sm transition-colors ${
                activeId === heading.id
                  ? "-ml-[2px] border-red-600 font-medium text-red-600"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              } ${heading.level === 3 ? "ml-4" : ""}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
