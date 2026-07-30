import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold tracking-[0.25em] text-pink-500 sm:text-xs ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  divider = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  divider?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : "text-left"}>
      {eyebrow && <Eyebrow>{eyebrow.toUpperCase()}</Eyebrow>}
      <h2 className="mt-3 font-display text-2xl leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {divider && (
        <div className={`divider-lotus mt-4 ${centered ? "" : "justify-start"}`}>
          <span>✦</span>
        </div>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-sm leading-relaxed text-ink-500 sm:text-base ${
            centered ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function BookButton({
  children = "Book Appointment",
  variant = "solid",
  href = "/appointment",
  className = "",
  chevron = true,
}: {
  children?: React.ReactNode;
  variant?: "solid" | "outline" | "white";
  href?: string;
  className?: string;
  chevron?: boolean;
}) {
  const styles = {
    solid: "bg-pink-500 text-white hover:bg-pink-600",
    outline:
      "border border-pink-400 text-pink-500 hover:bg-pink-500 hover:text-white",
    white: "bg-white text-pink-600 hover:bg-pink-50",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-6 py-3 text-sm font-medium transition-colors sm:px-7 ${styles} ${className}`}
    >
      {children}
      {chevron && <ChevronRight size={16} strokeWidth={2} />}
    </Link>
  );
}

/** Soft pink page banner used by every inner page. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-blush-100 to-pink-100">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/55 to-transparent" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow>{eyebrow.toUpperCase()}</Eyebrow>}
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="divider-lotus mt-5 justify-start">
            <span>✦</span>
          </div>
          {subtitle && (
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-700 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Split-column page banner — eyebrow/title/subtitle on the left, a rounded
 * photo on the right, on the same soft pink gradient as the homepage
 * carousel. Used by inner pages that need a lighter, non-full-bleed hero
 * than PageHero (Gallery, Appointment, Contact).
 */
export function SplitHero({
  eyebrowLines,
  title,
  subtitle,
  image,
  imageAlt = "",
  action,
}: {
  eyebrowLines: string[];
  title: React.ReactNode;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-blush-100 to-pink-100">
      {/* Photo bleeds to the right edge and fills the hero height on desktop;
          on narrow screens it sits above the copy as a banner. */}
      <div className="relative h-56 w-full sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[55%]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center"
          priority
        />
        {/* Soft fade so the photo melts into the pink panel instead of
            butting against it with a hard edge. */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-50/70 to-transparent lg:bg-gradient-to-r lg:from-pink-50 lg:via-pink-50/25 lg:to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
        <div className="max-w-xl lg:max-w-[46%]">
          {eyebrowLines.map((line, i) => (
            <p
              key={line}
              className={`text-[10px] font-semibold tracking-[0.25em] sm:text-xs ${
                i === eyebrowLines.length - 1
                  ? "text-pink-500"
                  : "text-ink-500"
              } ${i > 0 ? "mt-1.5" : ""}`}
            >
              {line.toUpperCase()}
            </p>
          ))}
          <h1 className="mt-4 font-display text-3xl leading-[1.15] text-ink-900 sm:text-5xl">
            {title}
          </h1>
          <div className="mt-5 h-px w-16 bg-pink-300" />
          {subtitle && (
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-700 sm:text-base">
              {subtitle}
            </p>
          )}
          {action && <div className="mt-7">{action}</div>}
        </div>
      </div>
    </section>
  );
}

/** Call-to-action band that closes most pages. Soft pink by default, with a
 *  deep magenta variant used by the services page. */
export function CtaBanner({
  title,
  subtitle,
  buttonLabel = "Book Appointment",
  buttonHref = "/appointment",
  variant = "soft",
}: {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
  variant?: "soft" | "deep";
}) {
  const deep = variant === "deep";
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
      <div
        className={`relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-12 ${
          deep
            ? "bg-gradient-to-r from-pink-600 to-pink-500"
            : "bg-gradient-to-r from-pink-100 via-blush-100 to-pink-50"
        }`}
      >
        <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2
              className={`font-display text-2xl sm:text-3xl ${
                deep ? "text-white" : "text-ink-900"
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`mt-2 max-w-lg text-sm sm:text-base ${
                  deep ? "text-pink-100" : "text-ink-500"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
          <BookButton
            variant={deep ? "white" : "solid"}
            href={buttonHref}
            className="shrink-0"
          >
            {buttonLabel}
          </BookButton>
        </div>
      </div>
    </section>
  );
}
