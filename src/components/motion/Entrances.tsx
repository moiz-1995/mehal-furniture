"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { onCurtainLifted } from "./Curtain";

gsap.registerPlugin(SplitText);

/**
 * Page entrances for every route, played as the curtain lifts:
 * [data-split] headings set line by line, [data-rise] blocks follow.
 */
export function Entrances() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const heads = gsap.utils.toArray<HTMLElement>("main [data-split]");
    const rise = gsap.utils.toArray<HTMLElement>("main [data-rise]");
    if (!heads.length && !rise.length) return;
    const splits = heads.map((h) => SplitText.create(h, { type: "lines", mask: "lines" }));
    splits.forEach((s) => gsap.set(s.lines, { yPercent: 105 }));
    gsap.set(rise, { autoAlpha: 0, y: 30 });

    const off = onCurtainLifted(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      splits.forEach((s, i) => tl.to(s.lines, { yPercent: 0, duration: 1.2, stagger: 0.1 }, i * 0.1));
      tl.to(rise, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.25);
    });
    return () => {
      off();
      splits.forEach((s) => s.revert());
      gsap.set(rise, { clearProps: "all" });
    };
  }, [pathname]);

  return null;
}
