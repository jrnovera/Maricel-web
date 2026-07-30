import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import { nav, contact } from "@/lib/site";

// lucide dropped its brand glyphs, so the social marks are inlined here
type IconProps = { size?: number };

function Facebook({ size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33v7A9.99 9.99 0 0 0 22 12.06z" />
    </svg>
  );
}

function Instagram({ size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.81 3.81 0 0 1-1.38-.9 3.81 3.81 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.44c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07zm0 2.45a5.95 5.95 0 1 1 0 11.9 5.95 5.95 0 0 1 0-11.9zm0 9.81a3.86 3.86 0 1 0 0-7.72 3.86 3.86 0 0 0 0 7.72zm7.58-10.05a1.39 1.39 0 1 1-2.78 0 1.39 1.39 0 0 1 2.78 0z" />
    </svg>
  );
}

function TikTok({ size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.66 5.66 0 0 0-.77-.05A5.67 5.67 0 1 0 15.54 15V8.9a7.35 7.35 0 0 0 4.3 1.38V7.19a4.29 4.29 0 0 1-3.24-1.37z" />
    </svg>
  );
}

function WhatsApp({ size = 16 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.5 1.34 5.02L2 22l5.12-1.34a9.96 9.96 0 0 0 4.92 1.3h.01c5.52 0 10-4.48 10-10s-4.48-10-10.01-10zm0 18.15a8.1 8.1 0 0 1-4.14-1.13l-.3-.18-3.04.8.81-2.96-.2-.31a8.13 8.13 0 1 1 6.87 3.78zm4.47-6.08c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "TikTok", href: "#", Icon: TikTok },
  { label: "WhatsApp", href: "#", Icon: WhatsApp },
];

export default function Footer() {
  // Dropdown groups collapse into a flat list here so Gallery and Blog stay
  // one click away — and crawlable.
  const links = nav.flatMap((n) => n.children ?? [n]);

  return (
    <footer className="border-t border-pink-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        {/* Brand mark sits inline on small screens so it costs one short row
            instead of a full-width block. */}
        <div className="lg:hidden">
          <Logo className="h-11 w-auto" />
        </div>

        <div className="mt-5 grid gap-y-6 sm:mt-6 sm:grid-cols-3 sm:gap-6 lg:mt-0 lg:grid-cols-4 lg:gap-8">
          <div className="hidden lg:block">
            <Logo className="h-14 w-auto" />
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-pink-500">
              QUICK LINKS
            </h3>
            {/* Two short columns on phones keeps this block from running the
                whole height of the screen. */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
              {links.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-ink-500 hover:text-pink-500">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-pink-500">
              CONTACT US
            </h3>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li>
                <a
                  href={contact.phoneHref}
                  className="flex items-start gap-2 hover:text-pink-500"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-pink-400" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-2 break-all hover:text-pink-500"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-pink-400" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-pink-400" />
                {contact.address}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-pink-500">
              FOLLOW US
            </h3>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-white transition-colors hover:bg-pink-600"
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-pink-100">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-[11px] text-ink-500 sm:px-6 sm:text-xs lg:px-8">
          © {new Date().getFullYear()} Maricel Beauty Center. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
