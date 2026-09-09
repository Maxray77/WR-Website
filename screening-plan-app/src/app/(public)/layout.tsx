import Link from "next/link";
import { Film } from "lucide-react";

/** Public-facing chrome. Admin routes deliberately don't use this. */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal text-white shadow-sm transition-transform group-hover:scale-105">
              <Film className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-bold text-charcoal">
                All That Breathes
              </span>
              <span className="block text-[11px] font-medium tracking-wide text-slate">
                Screenings · Wildlife Rescue
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-charcoal transition-colors hover:bg-teal-light hover:text-teal-dark"
            >
              Screenings
            </Link>
            <Link
              href="/booking"
              className="rounded-lg px-3 py-2 text-charcoal transition-colors hover:bg-teal-light hover:text-teal-dark"
            >
              My booking
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <p className="font-display text-sm font-bold text-charcoal">
                Wildlife Rescue
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">
                The world&apos;s largest raptor rescue facility, in Delhi, India — and the
                subject of the Oscar-nominated documentary <em>All That Breathes</em>.
              </p>
            </div>
            <div className="text-sm text-slate">
              <p>
                <a
                  href="https://www.raptorrescue.org"
                  className="font-medium text-teal hover:text-teal-dark"
                >
                  raptorrescue.org
                </a>
              </p>
              <p className="mt-1">nadeem@raptorrescue.org</p>
              <p className="mt-1">+91 98100 29698</p>
            </div>
          </div>
          <p className="mt-8 border-t border-line pt-6 text-xs text-slate">
            © {new Date().getFullYear()} Wildlife Rescue, Delhi. Screening seats are free;
            registration helps us plan the room.
          </p>
        </div>
      </footer>
    </div>
  );
}
