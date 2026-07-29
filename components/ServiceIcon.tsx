/**
 * Thin pink line-art icons for the service categories. Hand-drawn as SVG
 * rather than pulled from an icon set so the stroke weight and silhouette
 * match the brand sheet (hair strands, polish bottle, facial profile…).
 */
const paths: Record<string, React.ReactNode> = {
  hair: (
    <>
      <path d="M12 4c-4 0-7 3-7 7 0 2 .5 3.5 1 5" />
      <path d="M12 4c4 0 7 3 7 7 0 2-.5 3.5-1 5" />
      <path d="M9 8c-1.2 2.5-1.5 5.5-.8 8.5" />
      <path d="M12 7c-.6 3-.6 6.5.2 9.8" />
      <path d="M15 8c1.2 2.5 1.5 5.5.8 8.5" />
      <path d="M6 19c1.8-1 3.8-1.5 6-1.5s4.2.5 6 1.5" />
    </>
  ),
  skin: (
    <>
      <circle cx="12" cy="10" r="6" />
      <path d="M9.5 9.5h.01M14.5 9.5h.01" />
      <path d="M10 13c1.2.9 2.8.9 4 0" />
      <path d="M6 6.5C7.5 4.5 9.6 3.5 12 3.5s4.5 1 6 3" />
      <path d="M7 19.5c1.5-1.2 3.2-1.8 5-1.8s3.5.6 5 1.8" />
    </>
  ),
  nails: (
    <>
      <path d="M9 4.5h6v3.2c0 .6-.3 1.1-.7 1.5l-.6.5v9.1a1.7 1.7 0 0 1-1.7 1.7h-.1a1.7 1.7 0 0 1-1.7-1.7V9.7l-.6-.5a2 2 0 0 1-.6-1.5V4.5z" />
      <path d="M9 7.7h6" />
      <path d="M10.5 2.5h3v2h-3z" />
      <path d="M10.2 13h3.6" />
    </>
  ),
  lashes: (
    <>
      <path d="M2.5 13c3-4.5 6.3-6.8 9.5-6.8S18.5 8.5 21.5 13" />
      <path d="M5 14.5 3.5 17" />
      <path d="M8 16l-.8 2.6" />
      <path d="M12 16.6V19.5" />
      <path d="M16 16l.8 2.6" />
      <path d="M19 14.5 20.5 17" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  waxing: (
    <>
      <path d="M7.5 3.5h9l-1 4.2H8.5z" />
      <path d="M8.5 7.7h7c1.4 0 2.5 1.1 2.5 2.5v8.3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8.3c0-1.4 1.1-2.5 2.5-2.5z" />
      <path d="M6 12.5h12" />
      <path d="M9.5 16h5" />
    </>
  ),
  makeup: (
    <>
      <path d="M6 3.5c1.2 1.5 1.8 3.4 1.8 5.4H4.2c0-2 .6-3.9 1.8-5.4z" />
      <path d="M4.4 8.9h3.2v9.6a1.6 1.6 0 0 1-3.2 0z" />
      <path d="M14.5 3.5 17 4.6l-3.4 8-2.5-1.1z" />
      <path d="M11.1 11.5 9.9 15l3.2-1.4z" />
      <path d="M18.5 12.5c1 1.6 1.5 3.3 1.5 5a1.9 1.9 0 0 1-3.8 0c0-1.7.5-3.4 1.5-5z" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 5c1.8 2 2.7 4.2 2.7 6.6S13.8 16.3 12 18c-1.8-1.7-2.7-4-2.7-6.4S10.2 7 12 5z" />
      <path d="M12 18c-2.4.6-4.7.1-6.8-1.5-1.4-1.1-2.3-2.5-2.7-4.2 2.2-.6 4.2-.2 6 1.2 1.5 1.1 2.6 2.6 3.5 4.5z" />
      <path d="M12 18c2.4.6 4.7.1 6.8-1.5 1.4-1.1 2.3-2.5 2.7-4.2-2.2-.6-4.2-.2-6 1.2-1.5 1.1-2.6 2.6-3.5 4.5z" />
      <path d="M4 18.8c2.4 1.4 5 2.2 8 2.2s5.6-.8 8-2.2" />
    </>
  ),
  quality: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 6.2l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" />
      <path d="M8.6 13.8 7 21l5-2.4 5 2.4-1.6-7.2" />
    </>
  ),
  care: (
    <>
      <path d="M12 20.5c-2-1.6-6.5-4.6-6.5-8.4A3.6 3.6 0 0 1 12 10a3.6 3.6 0 0 1 6.5 2.1c0 3.8-4.5 6.8-6.5 8.4z" />
      <path d="M5 12.5c-1-.4-2-1.4-2-2.8 0-1.5 1.1-2.4 2.4-2.4" />
      <path d="M19 12.5c1-.4 2-1.4 2-2.8 0-1.5-1.1-2.4-2.4-2.4" />
    </>
  ),
  expertise: (
    <>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="M4 10.5l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6L1.7 12l1.6-.2z" />
      <path d="M20 10.5l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z" />
    </>
  ),
  hygiene: (
    <>
      <path d="M12 3l7 3v5.5c0 4.4-2.9 8.2-7 9.5-4.1-1.3-7-5.1-7-9.5V6z" />
      <path d="M12 8.5v5" />
      <path d="M9.5 11h5" />
    </>
  ),
  personal: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="M17.5 5.5 19 4M19 8h2M17.5 10.5 19 12" />
    </>
  ),
  crown: (
    <>
      <path d="M4 8.5 6.5 14h11L20 8.5l-4 3-4-5.5-4 5.5z" />
      <path d="M6.5 17h11" />
      <circle cx="4" cy="7" r="1.2" />
      <circle cx="20" cy="7" r="1.2" />
      <circle cx="12" cy="4.5" r="1.2" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20.5C9.5 18.5 3.5 14.6 3.5 10a4.6 4.6 0 0 1 8.5-2.5A4.6 4.6 0 0 1 20.5 10c0 4.6-6 8.5-8.5 10.5z" />
    </>
  ),
  hands: (
    <>
      <circle cx="8" cy="7" r="2.6" />
      <circle cx="16" cy="7" r="2.6" />
      <path d="M3 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M11 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z" />
      <path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  bottle: (
    <>
      <path d="M10 2.5h4v3h-4z" />
      <path d="M9 5.5h6c1.1 0 2 .9 2 2v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-11c0-1.1.9-2 2-2z" />
      <path d="M7 11h10" />
      <path d="M10 14.5h4" />
    </>
  ),
};

export default function ServiceIcon({
  name,
  size = 28,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.sparkle}
    </svg>
  );
}
