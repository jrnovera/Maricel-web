"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, CalendarCheck, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Close the drawer on navigation so the menu never lingers over a new page
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
            if (item.children) {
              const active = item.children.some((c) => isActive(c.href));
              return (
                <div key={item.label} className="group relative">
                  <button
                    className={`relative flex items-center gap-1 text-sm font-medium transition-colors ${
                      active
                        ? "text-pink-500"
                        : "text-ink-700 hover:text-pink-500"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                    {active && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-pink-500" />
                    )}
                  </button>

                  <div className="invisible absolute left-1/2 top-full z-10 w-48 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="overflow-hidden rounded-xl border border-pink-100 bg-white py-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive(child.href)
                              ? "bg-pink-50 text-pink-500"
                              : "text-ink-700 hover:bg-pink-50 hover:text-pink-500"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const active = isActive(item.href);
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
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      {open && (
        <div className="border-t border-pink-100 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {nav.map((item) => {
              if (item.children) {
                const active = item.children.some((c) => isActive(c.href));
                const expanded = openGroup === item.label;
                return (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setOpenGroup(expanded ? null : item.label)
                      }
                      aria-expanded={expanded}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium ${
                        active
                          ? "bg-pink-50 text-pink-500"
                          : "text-ink-700 hover:bg-pink-50"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expanded && (
                      <div className="ml-3 border-l border-pink-100 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                              isActive(child.href)
                                ? "bg-pink-50 text-pink-500"
                                : "text-ink-700 hover:bg-pink-50"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const active = isActive(item.href);
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
