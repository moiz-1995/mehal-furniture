"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Star() {
  return (
    <svg viewBox="0 0 40 40" className="mx-[0.35em] inline-block h-[0.5em] w-[0.5em] align-middle text-gold" aria-hidden="true">
      <path d="M20 0 L24 14 L38 10 L28 20 L38 30 L24 26 L20 40 L16 26 L2 30 L12 20 L2 10 L16 14 Z" fill="currentColor" />
    </svg>
  );
}

/**
 * A band of words that drifts sideways and speeds up, or reverses, with the
 * reader's scroll. Inspired by 21st's "Scroll Velocity Text"; built on GSAP.
 */
export function VelocityMarquee({ words, tone = "ivory" }: { words: string[]; tone?: "ivory" | "night" }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const track = root.current!.querySelector<HTMLElement>(".mq-track")!;
      const half = track.scrollWidth / 2;
      let x = 0;
      let dir = 1;
      let boost = 0;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (Math.abs(v) > 20) dir = v > 0 ? 1 : -1;
          boost = Math.min(Math.abs(v) / 120, 14);
        },
      });
      const tick = () => {
        x -= dir * (1 + boost) * 0.6;
        boost *= 0.92;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        gsap.set(track, { x });
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root },
  );

  const row = (
    <>
      {words.map((w) => (
        <span key={w} className="inline-flex items-center whitespace-nowrap">
          {w}
          <Star />
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={root}
      aria-label={words.join(", ")}
      className={`overflow-hidden py-8 md:py-12 ${tone === "night" ? "bg-night text-ivory" : "bg-ivory text-emerald"}`}
    >
      <div className="mq-track display flex w-max text-[clamp(3rem,9vw,8.5rem)] leading-none" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}
