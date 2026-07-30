"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";

type Role = {
  title: string;
  icon: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
};

export default function RoleList({
  roles,
  email,
}: {
  roles: Role[];
  email: string;
}) {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <div className="mt-10 space-y-3">
      {roles.map((role) => {
        const open = openRole === role.title;
        const panelId = `role-${role.title.replace(/\W+/g, "-").toLowerCase()}`;

        return (
          <div
            key={role.title}
            className="overflow-hidden rounded-xl border border-pink-100 bg-white transition-shadow hover:shadow-[0_6px_20px_rgba(224,33,138,0.08)]"
          >
            <div className="flex items-center gap-4 p-4 sm:p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-pink-200 text-pink-500">
                <ServiceIcon name={role.icon} size={22} />
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-ink-900 sm:text-base">
                  {role.title}
                </h3>
                <p className="mt-0.5 text-xs text-pink-500">{role.type}</p>
              </div>

              <button
                onClick={() => setOpenRole(open ? null : role.title)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-pink-300 px-3 py-2 text-[11px] font-medium tracking-[0.08em] text-pink-500 transition-colors hover:bg-pink-500 hover:text-white sm:px-5 sm:text-xs"
              >
                <span className="hidden sm:inline">
                  {open ? "HIDE DETAILS" : "VIEW DETAILS"}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {open && (
              <div
                id={panelId}
                className="border-t border-pink-50 bg-pink-50/40 px-4 py-5 sm:px-5"
              >
                <p className="text-sm leading-relaxed text-ink-700">
                  {role.summary}
                </p>

                <p className="mt-4 text-[11px] font-semibold tracking-[0.12em] text-pink-500">
                  WHAT YOU&apos;LL DO
                </p>
                <ul className="mt-2 space-y-1.5">
                  {role.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-ink-500 sm:text-sm"
                    >
                      <Check size={14} className="mt-0.5 shrink-0 text-pink-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent(
                      `Application: ${role.title}`
                    )}`}
                    className="inline-flex rounded-lg bg-pink-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pink-600"
                  >
                    Apply for this role
                  </a>
                  <span className="text-xs text-ink-500">
                    Experience: {role.experience}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
