interface SparkleProps {
  className?: string;
  /** "asterisk" is the soft six-armed snowflake; "star" is the thin four-point glint. */
  variant?: "asterisk" | "star";
}

export default function Sparkle({
  className,
  variant = "asterisk",
}: SparkleProps) {
  return (
    <svg viewBox="0 0 100 100" className={`sparkle ${className ?? ""}`}>
      {variant === "asterisk" ? (
        <g stroke="white" strokeWidth="9" strokeLinecap="round">
          <line x1="50" y1="8" x2="50" y2="92" />
          <line x1="14" y1="29" x2="86" y2="71" />
          <line x1="14" y1="71" x2="86" y2="29" />
        </g>
      ) : (
        <path
          d="M50 0 C 52 38, 62 48, 100 50 C 62 52, 52 62, 50 100 C 48 62, 38 52, 0 50 C 38 48, 48 38, 50 0 Z"
          fill="white"
        />
      )}
    </svg>
  );
}
