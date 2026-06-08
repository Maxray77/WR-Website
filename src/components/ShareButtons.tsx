"use client";

import { useState } from "react";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Share2, Check } from "lucide-react";

interface ShareButtonsProps {
  /** Path of the post, e.g. "/blog/record-breaking-2025" */
  path: string;
  title: string;
  /** Short text used for WhatsApp / native share / tweet body */
  excerpt?: string;
}

const BASE_URL = "https://www.raptorrescue.org";

// Inline WhatsApp glyph (not in lucide-react)
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.728-.979a9.823 9.823 0 002.45.272zm5.831-6.298c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

export default function ShareButtons({ path, title, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url = `${BASE_URL}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedShare = encodeURIComponent(
    excerpt ? `${title} — ${excerpt}` : title
  );

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedShare}%20${encodedUrl}`,
  };

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: excerpt, url });
      } catch {
        // user cancelled — ignore
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  const btn =
    "flex items-center justify-center w-11 h-11 rounded-full transition-colors text-white";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-charcoal flex items-center gap-1.5">
        <Share2 size={16} className="text-teal" />
        Share this story
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => openShare(links.facebook)}
          aria-label="Share on Facebook"
          title="Share on Facebook"
          className={`${btn} bg-[#1877F2] hover:bg-[#0d6ae0]`}
        >
          <Facebook size={18} />
        </button>

        <button
          type="button"
          onClick={() => openShare(links.twitter)}
          aria-label="Share on X (Twitter)"
          title="Share on X (Twitter)"
          className={`${btn} bg-black hover:bg-charcoal`}
        >
          <Twitter size={18} />
        </button>

        <button
          type="button"
          onClick={() => openShare(links.whatsapp)}
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
          className={`${btn} bg-[#25D366] hover:bg-[#1ebe5a]`}
        >
          <WhatsAppIcon size={18} />
        </button>

        <button
          type="button"
          onClick={() => openShare(links.linkedin)}
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
          className={`${btn} bg-[#0A66C2] hover:bg-[#08529c]`}
        >
          <Linkedin size={18} />
        </button>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy link"
          title={copied ? "Link copied!" : "Copy link"}
          className={`${btn} ${
            copied ? "bg-success" : "bg-slate hover:bg-charcoal"
          }`}
        >
          {copied ? <Check size={18} /> : <LinkIcon size={18} />}
        </button>

        {/* Native share sheet — only useful on devices that support it (mostly mobile) */}
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="Share via your device"
          title="More sharing options"
          className={`${btn} bg-teal hover:bg-teal-dark sm:hidden`}
        >
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}
