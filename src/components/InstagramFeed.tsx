import { Instagram, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

// Placeholder posts — will be replaced with live Instagram API feed
const PLACEHOLDER_POSTS = [
  { id: 1, caption: "Black Kite release at Yamuna floodplains 🦅", likes: 234 },
  { id: 2, caption: "Surgery day — repairing a manja-injured wing", likes: 456 },
  { id: 3, caption: "Baby Barn Owl feeding time 🦉", likes: 678 },
  { id: 4, caption: "Our new rescue vehicle on its first run!", likes: 321 },
  { id: 5, caption: "Shikra recovery — from glue trap to freedom", likes: 567 },
  { id: 6, caption: "Team photo after releasing 20 birds in one day", likes: 890 },
];

export default function InstagramFeed() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Follow Us on Instagram"
          subtitle="Daily rescue updates, behind-the-scenes moments, and release celebrations."
        />

        {/* Grid of posts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PLACEHOLDER_POSTS.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-gradient-to-br from-teal-light to-teal/10 rounded-lg overflow-hidden relative group cursor-pointer"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center p-2">
                  <Instagram size={20} className="text-white mx-auto mb-1" />
                  <p className="text-white text-xs leading-tight">
                    {post.caption}
                  </p>
                </div>
              </div>

              {/* Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-slate/30 text-xs">Photo</span>
              </div>
            </div>
          ))}
        </div>

        {/* Follow button */}
        <div className="mt-8 text-center">
          <a
            href="https://www.instagram.com/wildliferescue_wr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            <Instagram size={18} />
            Follow @wildliferescue_wr
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
