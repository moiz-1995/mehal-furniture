/** Shared SVG defs: the mehrab (pointed arch) clip path used by `.arch`. */
export const ARCH_PATH =
  "M0,1 L0,0.44 C0,0.22 0.3,0.12 0.5,0 C0.7,0.12 1,0.22 1,0.44 L1,1 Z";

export function ArchDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <clipPath id="mehrab" clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Mark: an "M" standing inside a mehrab, after the showroom sign. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 48 56" className="h-9 w-auto" fill="none" aria-hidden="true">
        <path
          d="M4 54 V24 C4 14 14 8 24 2 C34 8 44 14 44 24 V54"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M13 46 V26 L24 38 L35 26 V46"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="leading-none">
        <span className="display block text-[1.6rem] tracking-[0.04em]">Mehal</span>
        <span className="block text-[0.62rem] tracking-[0.32em] opacity-80">FURNITURE</span>
      </span>
    </span>
  );
}
