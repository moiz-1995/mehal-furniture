"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll reveals for a section. Children opt in with data-reveal:
 *  - "arch": the image grows out of its arch from the bottom
 *  - anything else: a quiet rise
 */
export function Reveal({
  children,
  className,
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
        items.forEach((frame) => {
          const kind = frame.dataset.reveal;
          // The frame keeps its arch clip-path; the picture inside is what rises.
          const el = kind === "arch" ? ((frame.firstElementChild as HTMLElement) ?? frame) : frame;
          if (kind === "arch") gsap.set(frame, { opacity: 1 });
          const from =
            kind === "arch"
              ? { opacity: 1, clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 }
              : { opacity: 0, y: 28 };
          const to =
            kind === "arch"
              ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.3, ease: "expo.out" }
              : { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" };
          gsap.fromTo(el, from, {
            ...to,
            delay: Number(frame.dataset.delay ?? 0),
            scrollTrigger: { trigger: frame, start: "top 88%", once: true },
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { opacity: 1 });
      });
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} id={id}>
      {children}
    </Tag>
  );
}
