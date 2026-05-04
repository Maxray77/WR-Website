import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User, FileText } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnnualReportCard from "@/components/AnnualReportCard";
import { getBlogPosts } from "@/lib/blog";
import { ANNUAL_REPORTS } from "@/lib/annual-reports-data";

export const metadata: Metadata = {
  title: "Blog & News",
  description:
    "Updates from Wildlife Rescue — rescue stories, conservation news, volunteer spotlights, and annual reports from Delhi's largest raptor rescue.",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Annual Update": "bg-teal-light text-teal",
  Conference: "bg-amber-bg text-amber",
  Operations: "bg-blue-50 text-blue-600",
  Conservation: "bg-green-50 text-success",
  "Volunteer Stories": "bg-purple-50 text-purple-600",
  Milestone: "bg-amber-bg text-amber",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <section className="py-24 text-center">
        <p className="text-slate">No blog posts yet. Add one in the Studio.</p>
      </section>
    );
  }

  const featuredReport = featured.annualReportYear
    ? ANNUAL_REPORTS.find((r) => r.year === featured.annualReportYear)
    : undefined;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Blog & News
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            Updates from the field — rescue stories, conservation insights, and
            team news.
          </p>
        </div>
      </section>

      {/* ─── Featured Post ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredReport ? (
            <>
              <div className="mb-6 flex items-center gap-3">
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    CATEGORY_COLORS[featured.category] || "bg-gray-100 text-slate"
                  }`}
                >
                  {featured.category}
                </span>
                <span className="text-xs text-slate flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(featured.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[family-name:var(--font-poppins)] mb-8">
                {featured.title}
              </h2>
              <AnnualReportCard report={featuredReport} />
              <div className="mt-6 text-center">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-teal font-semibold hover:gap-3 transition-all"
                >
                  Read the blog post <ArrowRight size={16} />
                </Link>
              </div>
            </>
          ) : (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-2">
                {featured.imageUrl ? (
                  <div className="aspect-[4/3] md:aspect-auto relative">
                    <Image
                      src={featured.imageUrl}
                      alt={featured.imageAlt ?? featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : featured.pdfUrl ? (
                  <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-red-50 to-red-100 flex flex-col items-center justify-center gap-3 p-8">
                    <FileText size={64} className="text-red-400" />
                    <span className="text-red-500 font-bold text-lg font-[family-name:var(--font-poppins)]">PDF Report</span>
                    <span className="text-red-400/70 text-sm">Click to view &amp; download</span>
                  </div>
                ) : (
                  <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-teal-light to-teal/10 flex items-center justify-center">
                    <p className="text-slate/40 text-sm">Featured Photo</p>
                  </div>
                )}

                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <span
                    className={`inline-block w-fit text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${
                      CATEGORY_COLORS[featured.category] || "bg-gray-100 text-slate"
                    }`}
                  >
                    {featured.category}
                  </span>

                  <h2 className="text-2xl lg:text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)] group-hover:text-teal transition-colors">
                    {featured.title}
                  </h2>

                  <p className="mt-3 text-slate leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(featured.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {featured.readTime}
                    </span>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ─── All Posts ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="All Posts" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
              >
                {post.imageUrl ? (
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt ?? post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : post.pdfUrl ? (
                  <div className="aspect-[16/9] bg-gradient-to-br from-red-50 to-red-100 flex flex-col items-center justify-center gap-2">
                    <FileText size={36} className="text-red-400" />
                    <span className="text-red-500 font-semibold text-xs">PDF Report</span>
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center">
                    <p className="text-slate/30 text-xs">Photo</p>
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        CATEGORY_COLORS[post.category] || "bg-gray-100 text-slate"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-slate">{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-charcoal leading-snug font-[family-name:var(--font-poppins)] group-hover:text-teal transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate mt-2 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
