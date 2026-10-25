export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 170"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 18 59 39 90 30 121 39 162 18 151 82 128 128 90 156 52 128 29 82Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m18 18 40 63 32-12 32 12 40-63M29 82l34 13 12 31 15 13 15-13 12-31 34-13M59 39l16 16h30l16-16M63 95l27 10 27-10M75 126h30M90 105v34"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m45 77 29 6-12 7Zm90 0-29 6 12 7Z" fill="currentColor" />
    </svg>
  );
}
export function Arrow() {
  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
