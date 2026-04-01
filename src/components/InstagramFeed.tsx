"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram, ExternalLink, Heart } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

// Shown while loading or if token is not configured
const PLACEHOLDER_POSTS = Array.from({ length: 6 }, (_, i) => ({
  id: String(i),
  placeholder: true,
}));

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (data.posts?.length) {
          setPosts(data.posts);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  const showPlaceholder = !posts || error;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Follow Us on Instagram"
          subtitle="Daily rescue updates, behind-the-scenes moments, and release celebrations."
        />

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {showPlaceholder
            ? PLACEHOLDER_POSTS.map((p) => (
                <div
                  key={p.id}
                  className="aspect-square bg-gradient-to-br from-teal-light to-teal/10 rounded-lg overflow-hidden animate-pulse"
                />
              ))
            : posts!.map((post) => {
                const imgSrc = post.thumbnail_url ?? post.media_url;
                const caption = post.caption
                  ? post.caption.split("\n")[0].slice(0, 80)
                  : "";
                return (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square rounded-lg overflow-hidden relative group block"
                  >
                    <Image
                      src={imgSrc}
                      alt={caption || "Wildlife Rescue Instagram post"}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center p-2">
                        <Heart size={18} className="text-white mx-auto mb-1" fill="white" />
                        {caption && (
                          <p className="text-white text-[11px] leading-tight line-clamp-3">
                            {caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
        </div>

        {/* Follow button */}
        <div className="mt-8 text-center">
          <a
            href="https://www.instagram.com/wildliferescueindia"
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
