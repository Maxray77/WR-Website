import Link from "next/link";
import { LayoutDashboard, LogOut, Plus, ExternalLink } from "lucide-react";
import { logoutAction } from "./actions";

export function AdminShell({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
}) {
  return (
    <>
      <div className="no-print border-b border-line bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/admin"
              className="flex shrink-0 items-center gap-2 font-display text-sm font-bold text-charcoal"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-charcoal text-white">
                <LayoutDashboard className="h-3.5 w-3.5" aria-hidden />
              </span>
              Screening admin
            </Link>
            {breadcrumb && (
              <div className="min-w-0 truncate border-l border-line pl-3 text-sm text-slate">
                {breadcrumb}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-slate transition-colors hover:bg-offwhite hover:text-charcoal sm:inline-flex"
            >
              Public site
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/admin/screenings/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              <Plus className="h-4 w-4" aria-hidden />
              New screening
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-slate transition-colors hover:bg-offwhite hover:text-charcoal"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
