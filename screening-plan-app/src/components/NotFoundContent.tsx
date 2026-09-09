import Link from "next/link";
import { ButtonLink } from "@/components/ui";

export function NotFoundContent() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4 py-16 sm:px-6">
      <div className="w-full text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-charcoal">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          The screening may have finished, or the link may be incomplete. Have a look at
          what&apos;s coming up next.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">See all screenings</ButtonLink>
          <ButtonLink href="/booking" variant="outline">
            Find my booking
          </ButtonLink>
        </div>
        <p className="mt-8 text-xs text-slate">
          Still stuck?{" "}
          <Link
            href="mailto:nadeem@raptorrescue.org"
            className="font-medium text-teal hover:text-teal-dark"
          >
            nadeem@raptorrescue.org
          </Link>
        </p>
      </div>
    </div>
  );
}
