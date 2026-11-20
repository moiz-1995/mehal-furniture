"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** The name, edge to edge, rising letter by letter as the footer comes into view. */
export function FooterWordmark() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".fw-letter",
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: "expo.out",
            duration: 1.4,
            stagger: 0.07,
            scrollTrigger: { trigger: root.current, start: "top 95%", once: true },
          },
        );
      });
    },
    { scope: root },
  );
  return (
    <div ref={root} className="relative overflow-hidden px-3" aria-hidden="true">
      <p className="display flex justify-center text-[31vw] leading-[0.78] tracking-[-0.045em] text-gold">
        {"Mehal".split("").map((c, i) => (
          <span key={i} className="fw-letter inline-block pb-[0.06em]">{c}</span>
        ))}
      </p>
    </div>
  );
}
