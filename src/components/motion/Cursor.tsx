"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/** Text that rolls up to a copy of itself on hover (pure CSS, see .roll). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span data-text={children}>{children}</span>
    </span>
  );
}

/**
 * A small gold dot that trails the pointer. Over anything marked
 * data-cursor="View" (or Drag, Open…) it swells into a disc with that word.
 * Mouse and trackpad only; touch screens keep their normal behaviour.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const el = dot.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        setOn(true);
        gsap.set(el, { x: e.clientX, y: e.clientY });
      }
      x(e.clientX);
      y(e.clientY);
      const t = (e.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(t?.dataset.cursor ?? "");
    };
    const leave = () => {
      shown = false;
      setOn(false);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[90] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-gold text-night transition-[width,height] duration-500 ease-[cubic-bezier(.19,1,.22,1)] ${
          label ? "h-24 w-24" : "h-2.5 w-2.5"
        }`}
      >
        <span className={`text-sm font-medium transition-opacity duration-300 ${label ? "opacity-100 delay-150" : "opacity-0"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
