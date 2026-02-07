import React from "react";
import Link from "next/link";

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listBuffer: React.ReactNode[] = [];
  let inList = false;

  const flushList = (key: number) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="mb-6 list-disc space-y-2 pl-6 text-stone-700">
          {...listBuffer}
        </ul>
      );
      listBuffer = [];
      inList = false;
    }
  };

  const parseInline = (text: string) => {
    // Simple link parser: [text](url)
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, index) => {
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
            return (
                <Link key={index} href={linkMatch[2]} className="text-red-700 hover:underline">
                    {linkMatch[1]}
                </Link>
            );
        }
        // Bold parser: **text**
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        if (boldParts.length > 1) {
             return (
                 <span key={index}>
                     {boldParts.map((bp, i) => {
                         if (bp.startsWith("**") && bp.endsWith("**")) {
                             return <strong key={i} className="font-bold text-stone-900">{bp.slice(2, -2)}</strong>;
                         }
                         return bp;
                     })}
                 </span>
             );
        }
        return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      listBuffer.push(
        <li key={`li-${index}`} className="pl-2">
          {parseInline(trimmed.substring(2))}
        </li>
      );
      return;
    } else {
      flushList(index);
    }

    if (trimmed === "") return; // Skip empty lines between paragraphs (handled by margin)

    if (trimmed.startsWith("### ")) {
      const text = trimmed.substring(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      elements.push(
        <h3 key={index} id={id} className="mb-3 mt-8 text-xl font-bold text-stone-800">
          {text}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      const text = trimmed.substring(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      elements.push(
        <h2 key={index} id={id} className="mb-4 mt-10 border-b border-stone-100 pb-2 text-2xl font-bold text-stone-900">
          {text}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
       // Typically h1 is title, but if used in content
      const text = trimmed.substring(2);
      elements.push(
        <h1 key={index} className="mb-6 text-3xl font-bold text-stone-900">
          {text}
        </h1>
      );
    } else {
      elements.push(
        <p key={index} className="mb-6 leading-relaxed text-stone-700">
          {parseInline(trimmed)}
        </p>
      );
    }
  });

  flushList(lines.length);

  return <div>{elements}</div>;
}
