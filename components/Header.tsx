"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on navigation so the menu never lingers over a new page
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-pink-200 bg-white p-1.5 sm:h-20 sm:w-20 sm:p-2">
            <Logo className="h-full w-full" />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  active
                    ? "text-pink-500"
                    : "text-ink-700 hover:text-pink-500"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-pink-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/appointment"
            className="hidden items-center gap-2 rounded-lg bg-pink-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pink-600 sm:flex"
          >
            <CalendarCheck size={16} strokeWidth={1.75} />
            Book Appointment
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-md p-2 text-ink-900 lg:hidden"
          >
            {open ? <Menu size={24} className="hidden" /> : null}
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      {open && (
        <div className="border-t border-pink-100 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-3 text-sm font-medium ${
                    active
                      ? "bg-pink-50 text-pink-500"
                      : "text-ink-700 hover:bg-pink-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/appointment"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-pink-500 px-5 py-3 text-sm font-medium text-white"
            >
              <CalendarCheck size={16} strokeWidth={1.75} />
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
