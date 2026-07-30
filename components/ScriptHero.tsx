import Image from "next/image";

/** Layered pink wave that closes the hero, matching the brand sheet. */
export function WaveDivider() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0]">
      <svg
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        className="h-14 w-full sm:h-20 lg:h-28"
        aria-hidden="true"
      >
        <path
          d="M0 74c180-46 380-52 566-20 168 29 320 52 470 34 152-18 280-62 404-78v120H0z"
          className="fill-pink-200/70"
        />
        <path
          d="M0 92c190-42 392-44 574-14 166 27 314 46 460 30 140-15 268-52 406-66v88H0z"
          className="fill-pink-300/60"
        />
        <path
          d="M0 104c196-38 404-36 588-8 164 25 306 40 448 25 136-14 262-46 404-59v68H0z"
          className="fill-white"
        />
      </svg>
    </div>
  );
}

/** Thin champagne rule with a small diamond centre. */
export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-300 sm:w-20" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-300 sm:w-20" />
    </div>
  );
}

/**
 * Hero for the Our Team and Careers pages: a calligraphy line paired with a
 * heavy display line, over a soft pink field with a photo bleeding right and
 * a wave closing the bottom.
 */
export default function ScriptHero({
  scriptTop,
  title,
  scriptBottom,
  body,
  image,
  imageAlt = "",
  action,
}: {
  /** Calligraphy line above the big title (e.g. "Meet Our"). */
  scriptTop?: string;
  title: string;
  /** Calligraphy line below the big title (e.g. "Join Our Team"). */
  scriptBottom?: string;
  body: string;
  image: string;
  imageAlt?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-blush-100 to-pink-100">
      <div className="relative h-56 w-full sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[56%]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-50/80 to-transparent lg:bg-gradient-to-r lg:from-pink-50 lg:via-pink-50/30 lg:to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8 lg:py-32">
        <div className="max-w-xl lg:max-w-[44%]">
          {scriptTop && (
            <p className="font-script text-4xl leading-none text-pink-400 sm:text-5xl">
              {scriptTop}
            </p>
          )}

          <h1 className="mt-1 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-pink-500 sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          {scriptBottom && (
            <p className="mt-1 font-script text-4xl leading-tight text-pink-400 sm:text-5xl">
              {scriptBottom}
            </p>
          )}

          <GoldRule className="mt-5" />

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-700 sm:text-base">
            {body}
          </p>

          {action && <div className="mt-7">{action}</div>}
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}
