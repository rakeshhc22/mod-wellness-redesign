interface BottleMotifProps {
  className?: string;
}

/**
 * The site's signature graphic: a single-line botanical bottle
 * silhouette. It stands in for the MOD hair oil bottle across
 * every placeholder (hero, product cards, the future-experience
 * section) so the whole site points toward the same object that
 * the GSAP scroll animation will eventually bring to life.
 */
export default function BottleMotif({ className = "" }: BottleMotifProps) {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* dropper cap */}
      <path
        d="M85 20 H115 V50 H85 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M100 50 V72" stroke="currentColor" strokeWidth="1.5" />
      {/* bottle shoulder + body */}
      <path
        d="M78 72 H122 L138 108 V276 C138 288 128 296 116 296 H84 C72 296 62 288 62 276 V108 L78 72 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* fill line */}
      <path d="M62 190 H138" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
      {/* leaf motif */}
      <path
        d="M100 236 C88 224 88 204 100 190 C112 204 112 224 100 236 Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M100 190 V236" stroke="currentColor" strokeWidth="1" />
      {/* label band */}
      <path d="M62 150 H138" stroke="currentColor" strokeWidth="1" />
      <path d="M62 170 H138" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
