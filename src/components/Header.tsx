"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Heart, Menu, X } from "lucide-react";
import { NAV } from "@/lib/constants";
import { Logo } from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything on navigation. The header does not unmount between route
  // changes, so we adjust state during render when the path changes rather
  // than firing an effect (see "You Might Not Need an Effect").
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes whichever layer is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href?: string) =>
    href ? pathname === href || pathname.startsWith(`${href}/`) : false;

  /** Small delay on close so the pointer can travel into the panel. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bone/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Logo />

        {/* ---------------------------------------------- desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-ember"
                      : "text-graphite hover:text-ember"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            const open = openMenu === item.label;
            const childActive = item.children.some((c) => isActive(c.href));

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(item.label);
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(open ? null : item.label)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                    childActive || open
                      ? "text-ember"
                      : "text-graphite hover:text-ember"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {open ? (
                  <div className="absolute left-0 top-full w-80 pt-3">
                    <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-xl shadow-ink/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-sand"
                        >
                          <span
                            className={`block font-semibold ${
                              isActive(child.href) ? "text-ember" : "text-ink"
                            }`}
                          >
                            {child.label}
                          </span>
                          {child.blurb ? (
                            <span className="mt-0.5 block text-sm text-ash">
                              {child.blurb}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

          <Link
            href="/donate"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-2.5 text-[0.95rem] font-semibold text-white shadow-sm transition-colors hover:bg-ember-dark"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Donate
          </Link>
        </nav>

        {/* ------------------------------------------------- mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white"
          >
            <Heart className="h-3.5 w-3.5" aria-hidden="true" />
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-ink transition-colors hover:bg-sand"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* --------------------------------------------------- mobile drawer */}
      {mobileOpen ? (
        <div className="border-t border-line bg-bone lg:hidden">
          <nav
            className="max-h-[calc(100vh-4.5rem)] space-y-1 overflow-y-auto px-5 py-5"
            aria-label="Mobile"
          >
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="py-1">
                  <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ash">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block rounded-xl px-3 py-2.5 text-base ${
                        isActive(child.href)
                          ? "bg-ember-light font-semibold text-ember"
                          : "text-graphite"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`block rounded-xl px-3 py-2.5 text-base font-medium ${
                    isActive(item.href)
                      ? "bg-ember-light text-ember"
                      : "text-graphite"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
