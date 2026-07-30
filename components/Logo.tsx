/**
 * MBC brand logo. Two lockups live in /public and are swappable on disk
 * without touching this component:
 *   wide   — logo-wide.png, the horizontal badge + wordmark + silhouette
 *   square — logo.png, the stacked original, for tight square slots
 */
export default function Logo({
  className = "",
  variant = "wide",
}: {
  className?: string;
  variant?: "wide" | "square";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === "wide" ? "/logo-wide.png" : "/logo.png"}
      alt="Maricel Beauty Center"
      className={`object-contain ${className}`}
    />
  );
}
