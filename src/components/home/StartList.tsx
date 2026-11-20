"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export interface StartRow {
  href: string;
  title: string;
  body: string;
  images: [string, string, string];
}

const SLOTS = [
  { x: "-62%", y: "-38%", r: -9 },
  { x: "-8%", y: "-52%", r: 4 },
  { x: "46%", y: "-30%", r: 11 },
];

/**
 * Big rows; hovering one dims the rest and fans out three arch-framed photos
 * around it. Adapted from 21st's "Disc Reveal List" (Aakash Mehra), with
 * mehrab polaroids in place of discs and GSAP in place of springs.
 */
export function StartList({ rows }: { rows: StartRow[] }) {
  const root = useRef<HTMLUListElement>(null);
  const [hot, setHot] = useState<number | null>(null);

  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".sl-row", root.current).forEach((row, i) => {
        const cards = row.querySelectorAll<HTMLElement>(".sl-card");
        const on = i === hot;
        cards.forEach((c, k) => {
          gsap.to(c, {
            autoAlpha: on ? 1 : 0,
            x: on ? SLOTS[k].x : "0%",
            y: on ? SLOTS[k].y : "10%",
            rotate: on ? SLOTS[k].r : 0,
            scale: on ? 1 : 0.6,
            duration: on ? 0.7 : 0.35,
            delay: on ? k * 0.05 : 0,
            ease: on ? "back.out(1.6)" : "power2.in",
            overwrite: true,
          });
        });
      });
    },
    { scope: root, dependencies: [hot] },
  );

  return (
    <ul ref={root} className="border-t border-emerald/15" onMouseLeave={() => setHot(null)}>
      {rows.map((r, i) => (
        <li key={r.href} className="sl-row relative border-b border-emerald/15">
          <Link
            href={r.href}
            onMouseEnter={() => setHot(i)}
            onFocus={() => setHot(i)}
            onBlur={() => setHot(null)}
            className={`group relative grid items-baseline gap-2 py-8 transition-opacity duration-500 md:grid-cols-[1.2fr_1fr] md:py-11 ${
              hot !== null && hot !== i ? "opacity-30" : "opacity-100"
            }`}
          >
            <span className="display relative z-10 text-[clamp(2.4rem,6vw,5.6rem)] leading-none text-emerald transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:translate-x-4">
              {r.title}
            </span>
            <span className="relative z-10 max-w-sm text-muted md:justify-self-end">{r.body}</span>
            <span className="pointer-events-none absolute left-[38%] top-1/2 z-0 hidden md:block" aria-hidden="true">
              {r.images.map((src, k) => (
                <span key={src + k} className="sl-card arch absolute h-48 w-36 -translate-x-1/2 overflow-hidden opacity-0 shadow-2xl" style={{ visibility: "hidden" }}>
                  <Image src={src} alt="" fill sizes="144px" className="object-cover" />
                </span>
              ))}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
