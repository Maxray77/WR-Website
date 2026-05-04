/**
 * Renders a blog post body — either markdown (static fallback) or
 * Portable Text (Sanity). Identical visual output for both sources.
 */
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { NormalizedPost } from "@/lib/blog";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-slate leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-charcoal mt-8 mb-4 font-[family-name:var(--font-poppins)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-charcoal mt-6 mb-3 font-[family-name:var(--font-poppins)]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-charcoal mt-5 mb-2 font-[family-name:var(--font-poppins)]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-teal pl-4 italic text-slate mb-5">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 text-slate mb-5 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 text-slate mb-5 space-y-1">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-charcoal font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const isExternal = /^https?:\/\//i.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal underline hover:text-teal-dark"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="text-teal underline hover:text-teal-dark">
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1400).url();
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={url}
              alt={value.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-slate text-center mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

function MarkdownBody({ content }: { content: string }) {
  const paragraphs = content.split("\n\n").filter(Boolean);
  return (
    <>
      {paragraphs.map((para, i) => {
        // Heading-2 style line: "## something"
        if (/^##\s+/.test(para)) {
          const text = para.replace(/^##\s+/, "");
          return (
            <h2
              key={i}
              className="text-2xl font-bold text-charcoal mt-8 mb-4 font-[family-name:var(--font-poppins)]"
            >
              {text}
            </h2>
          );
        }
        // Inline bold via **...**
        const parts = para.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-slate leading-relaxed mb-5">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="text-charcoal font-semibold">
                  {part}
                </strong>
              ) : (
                renderMarkdownLinks(part, j)
              )
            )}
          </p>
        );
      })}
    </>
  );
}

function renderMarkdownLinks(text: string, key: number) {
  // Simple [label](url) parser — matches the existing static content style
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isExternal = /^https?:\/\//i.test(href);
    parts.push(
      isExternal ? (
        <a
          key={`${key}-${i++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal underline hover:text-teal-dark"
        >
          {label}
        </a>
      ) : (
        <Link
          key={`${key}-${i++}`}
          href={href}
          className="text-teal underline hover:text-teal-dark"
        >
          {label}
        </Link>
      )
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

export default function BlogBody({ body }: { body: NormalizedPost["body"] }) {
  if (body.kind === "portableText") {
    return (
      <PortableText value={body.blocks} components={portableTextComponents} />
    );
  }
  return <MarkdownBody content={body.content} />;
}
