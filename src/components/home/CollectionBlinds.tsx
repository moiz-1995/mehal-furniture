"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Roll } from "@/components/motion/Cursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface Blind {
  id: string;
  label: string;
  count: number;
  image: string;
  line: string;
}

/**
 * Collections that pull down over each other like blinds as you scroll
 * (after Floema, Awwwards SOTD May 2026). One pinned stage; each collection's
 * photo rises from below with clip-path while the one beneath drifts up.
 */
export function CollectionBlinds({ items }: { items: Blind[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panes = gsap.utils.toArray<HTMLElement>(".bl-pane", root.current);
        const n = panes.length;
        gsap.set(panes.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${(n - 1) * innerHeight * 1.1}`,
            scrub: 0.6,
            pin: ".bl-stage",
            onUpdate: (self) => setActive(Math.min(n - 1, Math.round(self.progress * (n - 1)))),
          },
        });
        panes.forEach((p, i) => {
          if (i === 0) return;
          tl.to(p, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, i - 1)
            .fromTo(p.querySelector("img"), { yPercent: 12, scale: 1.12 }, { yPercent: 0, scale: 1, duration: 1 }, i - 1)
            .to(panes[i - 1].querySelector("img"), { yPercent: -8, scale: 1.04, duration: 1 }, i - 1);
        });
      });
    },
    { scope: root },
  );

  // Text swap on change of collection.
  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".bl-title > span", { yPercent: 105 }, { yPercent: 0, duration: 0.9, ease: "expo.out" });
      gsap.fromTo(".bl-meta", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.15, ease: "power3.out" });
    },
    { scope: root, dependencies: [active] },
  );

  const cur = items[active];

  return (
    <section ref={root} className="relative bg-night text-ivory" aria-label="Collections">
      <div className="bl-stage relative grid h-[100svh] md:grid-cols-[minmax(18rem,0.8fr)_1.6fr]">
        <div className="relative z-10 flex flex-col justify-between px-5 pb-8 pt-24 md:px-10 md:pb-12">
          <ol className="space-y-1 text-[0.95rem]">
            {items.map((it, i) => (
              <li key={it.id} className="flex items-center gap-3">
                <span className={`h-px bg-gold transition-[width] duration-700 ${i === active ? "w-10" : "w-3 opacity-40"}`} />
                <span className={`transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-45"}`}>{it.label}</span>
              </li>
            ))}
          </ol>
          <div>
            <h2 className="bl-title overflow-hidden text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">
              <span className="block">{cur.label}</span>
            </h2>
            <p className="bl-meta mt-5 max-w-xs text-ivory/70">{cur.line}</p>
            <div className="bl-meta mt-7 flex items-center gap-5">
              <Link href={`/collection?c=${cur.id}`} className="btn btn-gold"><Roll>{`See ${cur.label.toLowerCase()}`}</Roll></Link>
              <span className="text-sm text-ivory/55">{cur.count} {cur.count === 1 ? "piece" : "pieces"}</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 md:relative">
          {items.map((it, i) => (
            <div key={it.id} className="bl-pane absolute inset-0 overflow-hidden" style={{ zIndex: i }} data-cursor="View">
              <Image src={it.image} alt="" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/10 to-transparent md:from-night/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
