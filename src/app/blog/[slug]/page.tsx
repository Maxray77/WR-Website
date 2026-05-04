import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, FileText, Download } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import AnnualReportCard from "@/components/AnnualReportCard";
import BlogBody from "@/components/BlogBody";
import {
  getBlogPosts,
  getBlogPostBySlug,
  getBlogPostSlugs,
} from "@/lib/blog";
import { ANNUAL_REPORTS } from "@/lib/annual-reports-data";

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "Annual Update": "bg-teal-light text-teal",
  Conference: "bg-amber-bg text-amber",
  Operations: "bg-blue-50 text-blue-600",
  Conservation: "bg-green-50 text-success",
  "Volunteer Stories": "bg-purple-50 text-purple-600",
  Milestone: "bg-amber-bg text-amber",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const annualReport = post.annualReportYear
    ? ANNUAL_REPORTS.find((r) => r.year === post.annualReportYear)
    : undefined;

  // Sibling posts for the "More Posts" rail
  const allPosts = await getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* ─── Header ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm"
          >
            <ArrowLeft size={16} /> All Posts
          </Link>

          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
              CATEGORY_COLORS[post.category] || "bg-white/10 text-white/80"
            }`}
          >
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-poppins)] leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* ─── Annual Report Card (infographic + detailed PDF cover) ─── */}
      {annualReport ? (
        <section className="bg-offwhite py-10 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 lg:-mt-8">
            <AnnualReportCard report={annualReport} />
          </div>
        </section>
      ) : (
        <>
          {post.imageUrl && (
            <section className="bg-offwhite">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt ?? post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </section>
          )}

          {post.pdfUrl && (
            <section className="py-8 bg-offwhite">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <a
                  href={post.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-teal/30 transition-all group"
                >
                  <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={32} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-charcoal font-[family-name:var(--font-poppins)] group-hover:text-teal transition-colors">
                      Download Full Report (PDF)
                    </p>
                    <p className="text-sm text-slate mt-0.5">
                      View or download the complete Wildlife Rescue Annual Report
                    </p>
                  </div>
                  <Download size={20} className="text-teal shrink-0" />
                </a>
              </div>
            </section>
          )}
        </>
      )}

      {/* ─── Content ─── */}
      <article className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <BlogBody body={post.body} />
          </div>
        </div>
      </article>

      {/* ─── CTA ─── */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Support Our Mission
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            Every donation helps us rescue, treat, and release more birds.
          </p>
          <div className="mt-4">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>

      {/* ─── More Posts ─── */}
      <section className="bg-offwhite py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-charcoal text-center mb-8 font-[family-name:var(--font-poppins)]">
            More Posts
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    CATEGORY_COLORS[rel.category] || "bg-gray-100 text-slate"
                  }`}
                >
                  {rel.category}
                </span>
                <h3 className="mt-2 text-sm font-bold text-charcoal leading-snug font-[family-name:var(--font-poppins)] group-hover:text-teal transition-colors">
                  {rel.title}
                </h3>
                <p className="text-xs text-slate mt-1.5">{rel.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
