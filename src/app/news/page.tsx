import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/metadata";
import { formatDate, sortedPosts } from "@/lib/news";

export const metadata = pageMetadata({
  title: "News & Updates",
  description:
    "Milestones, research and financial reporting from Raptor Rescue and Research Inc. and our partner clinic in Delhi.",
  path: "/news",
});

export default function NewsPage() {
  const [lead, ...rest] = sortedPosts();

  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="What has actually been happening."
        intro="Milestones from the clinic, research presented to the field, and our own financial reporting."
      />

      <Section tone="bone">
        <Container size="wide">
          {/* ------------------------------------------------------- lead post */}
          <Link
            href={`/news/${lead.slug}`}
            className="group grid gap-8 lg:grid-cols-2 lg:items-center"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="eyebrow text-ember">
                {lead.category} · {formatDate(lead.date)} · {lead.readTime}
              </p>
              <h2 className="mt-4 text-3xl text-ink group-hover:text-ember sm:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ash">
                {lead.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ember">
                Read the update
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>

          {/* ----------------------------------------------------- other posts */}
          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                  {post.category} · {formatDate(post.date)}
                </p>
                <h3 className="mt-2 text-xl text-ink group-hover:text-ember">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
