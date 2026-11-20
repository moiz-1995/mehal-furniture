"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  { title: "Design it", body: "In 3D, on a photo, or by sending us a picture of what you want." },
  { title: "Send it on WhatsApp", body: "Your design arrives with every choice listed." },
  { title: "We confirm the price", body: "We check sizes and fabric with you. A part advance starts the work." },
  { title: "We build it", body: "Made in our workshop, usually in three to six weeks." },
  { title: "Delivered and placed", body: "Brought to your home and set up where it belongs." },
];

/** The order journey: a gold thread draws across as you scroll, lighting each step. */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".pr-step", root.current);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".pr-list", start: "top 75%", end: "bottom 55%", scrub: 0.5 },
        });
        tl.fromTo(".pr-line", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: steps.length }, 0);
        steps.forEach((s, i) => {
          tl.fromTo(s, { opacity: 0.25, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, i * 0.9)
            .fromTo(s.querySelector(".pr-dot"), { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, i * 0.9);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mx-auto max-w-[96rem] px-5 py-28 md:px-10 md:py-40">
      <h2 className="max-w-3xl text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] text-emerald">
        How a made-to-order piece reaches you
      </h2>
      <div className="pr-list relative mt-16">
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-emerald/15 md:block" />
        <div className="pr-line absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gold md:block" />
        <ol className="grid gap-10 md:grid-cols-5 md:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title} className="pr-step relative">
              <span className="pr-dot relative z-10 block h-[15px] w-[15px] rounded-full border-2 border-gold bg-ivory" />
              <span className="display mt-6 block text-5xl text-bronze">{i + 1}</span>
              <h3 className="mt-3 text-lg font-medium text-emerald">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
