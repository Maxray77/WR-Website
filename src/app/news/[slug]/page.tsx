import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonLink, Container, PullQuote, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { NEWS_POSTS, formatDate, getPost, sortedPosts } from "@/lib/news";

export function generateStaticParams() {
  return NEWS_POSTS.map((post) => ({ slug: post.slug }));
}

/** Unknown slugs should 404, not render an empty shell. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
  });
}

export default async function NewsPostPage({
  params,
}: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <article>
        {/* ============================================================ header */}
        <header className="bg-ink pb-16 pt-28 sm:pt-36">
          <Container size="narrow">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-bone/60 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All updates
            </Link>
            <p className="eyebrow mt-8 text-gold">
              {post.category} · {formatDate(post.date)} · {post.readTime}
            </p>
            <h1 className="mt-4 text-4xl leading-[1.12] text-bone sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-bone/70">
              {post.excerpt}
            </p>
          </Container>
        </header>

        {/* ============================================================= image */}
        <div className="bg-ink">
          <Container size="narrow">
            <div className="relative aspect-[16/9] translate-y-12 overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </Container>
        </div>

        {/* ============================================================= body */}
        <Section tone="bone" className="pt-28">
          <Container size="narrow">
            <div className="prose-r3 text-lg text-ash">
              {post.body.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      className="mb-4 mt-12 text-2xl text-ink sm:text-3xl"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <div key={i} className="my-10">
                      <PullQuote
                        quote={block.text}
                        attribution={block.attribution}
                      />
                    </div>
                  );
                }
                return <p key={i}>{block.text}</p>;
              })}
            </div>

            <div className="mt-14 rounded-2xl bg-ink p-8 text-center sm:p-10">
              <h2 className="font-display text-2xl text-bone">
                This work runs on donations.
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-bone/70">
                Every gift is tax-deductible in the United States and goes out
                with almost nothing taken off the top.
              </p>
              <ButtonLink href="/donate" tone="ember" className="mt-7">
                Donate now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Container>
        </Section>
      </article>

      {/* =========================================================== more posts */}
      <Section tone="sand" className="py-16">
        <Container size="wide">
          <h2 className="font-display text-2xl text-ink">Keep reading</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/news/${other.slug}`}
                className="group flex gap-5"
              >
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl sm:w-32">
                  <Image
                    src={other.image}
                    alt={other.imageAlt}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                    {other.category}
                  </p>
                  <h3 className="mt-1.5 text-lg leading-snug text-ink group-hover:text-ember">
                    {other.title}
                  </h3>
                  <p className="mt-1 text-sm text-ash">
                    {formatDate(other.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
