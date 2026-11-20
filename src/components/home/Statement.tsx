"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** A paragraph that lights up word by word as you read down the page. */
export function Statement({ text, note }: { text: string; note?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".st-text", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: ".st-text", start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mx-auto max-w-6xl px-5 py-28 md:px-10 md:py-44">
      <p className="st-text display text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[1.08] text-emerald">{text}</p>
      {note && <p className="mt-10 max-w-sm text-muted">{note}</p>}
    </section>
  );
}
