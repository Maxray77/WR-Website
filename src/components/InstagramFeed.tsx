import Image from "next/image";
import { Instagram, ExternalLink, Heart } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { INSTAGRAM_POSTS, CONTACT } from "@/lib/constants";

/**
 * Instagram feed — hand-curated posts.
 *
 * Posts live in `INSTAGRAM_POSTS` (src/lib/constants.ts). To feature new posts:
 * 1. Replace/add the image in /public
 * 2. Update the `image`, `caption`, and `permalink` in the constants file
 *
 * No API, no tokens, no rate limits. Swap manually whenever you want a refresh.
 */
export default function InstagramFeed() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Follow Us on Instagram"
          subtitle="Daily rescue updates, behind-the-scenes moments, and release celebrations."
        />

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-lg overflow-hidden relative group block"
              aria-label={`Instagram post: ${post.caption}`}
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center p-2">
                  <Heart size={18} className="text-white mx-auto mb-1" fill="white" />
                  <p className="text-white text-[11px] leading-tight line-clamp-3">
                    {post.caption}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow button */}
        <div className="mt-8 text-center">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            <Instagram size={18} />
            Follow @wildliferescueindia
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
