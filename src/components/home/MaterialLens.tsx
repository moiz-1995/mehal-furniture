"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export interface Material {
  name: string;
  note: string;
  image: string;
}

/**
 * "Look closer": a lens follows the pointer over the finished piece and shows
 * the material underneath, softened at the edge. Adapted from 21st's
 * "Image Reveal" (jatin-yadav05). Pick a material to change what the lens shows.
 */
export function MaterialLens({ base, materials }: { base: string; materials: Material[] }) {
  const box = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const [m, setM] = useState(0);
  const state = useRef({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    const el = box.current!;
    const target = { x: 0, y: 0, r: 0 };
    const s = state.current;
    const touch = matchMedia("(pointer: coarse)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      if (!lens.current) return;
      const soft = Math.max(1, s.r * 0.35);
      const g = `radial-gradient(circle ${s.r}px at ${s.x}px ${s.y}px, #000 ${Math.max(0, s.r - soft)}px, transparent ${s.r}px)`;
      lens.current!.style.webkitMaskImage = g;
      lens.current!.style.maskImage = g;
    };
    const tick = () => {
      const k = reduce ? 1 : 0.16;
      s.x += (target.x - s.x) * k;
      s.y += (target.y - s.y) * k;
      s.r += (target.r - s.r) * (reduce ? 1 : 0.12);
      paint();
    };
    gsap.ticker.add(tick);

    const R = () => Math.min(170, el.clientWidth * 0.26);
    const at = (cx: number, cy: number) => {
      const b = el.getBoundingClientRect();
      target.x = cx - b.left;
      target.y = cy - b.top;
      if (!s.r) {
        s.x = target.x;
        s.y = target.y;
      }
    };
    const move = (e: PointerEvent) => {
      at(e.clientX, e.clientY);
      target.r = R();
    };
    const leave = () => (target.r = touch ? R() * 0.8 : 0);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerleave", leave);

    // On touch screens, park a smaller lens in the middle so it's discoverable.
    if (touch) {
      const b = el.getBoundingClientRect();
      at(b.left + b.width * 0.5, b.top + b.height * 0.55);
      target.r = R() * 0.8;
    }
    return () => {
      gsap.ticker.remove(tick);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section className="relative bg-night text-ivory">
      <div className="mx-auto grid max-w-[96rem] items-center gap-12 px-5 py-24 md:grid-cols-[1.15fr_1fr] md:px-10 md:py-36">
        <div ref={box} className="arch relative aspect-[4/5] cursor-none touch-none overflow-hidden select-none md:aspect-[5/6]">
          <Image src={base} alt="A finished sofa from the showroom" fill sizes="(min-width: 768px) 55vw, 95vw" className="object-cover" />
          <div ref={lens} className="absolute inset-0" style={{ maskImage: "radial-gradient(circle 0px at 0 0, #000, transparent)" }}>
            {materials.map((mat, i) => (
              <Image key={mat.image} src={mat.image} alt="" fill sizes="(min-width: 768px) 55vw, 95vw"
                className={`scale-125 object-cover transition-opacity duration-500 ${i === m ? "opacity-100" : "opacity-0"}`} />
            ))}
          </div>
          <p className="pointer-events-none absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full bg-night/60 px-4 py-2 text-sm backdrop-blur">
            Move over the photo to look closer
          </p>
        </div>

        <div>
          <h2 className="text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95]">What it&rsquo;s made of, up close</h2>
          <p className="mt-5 max-w-md text-ivory/70">
            Every piece page lists its materials part by part. Here is what they look like when you
            put your face to them.
          </p>
          <ul className="mt-10 border-t border-ivory/10" role="list">
            {materials.map((mat, i) => (
              <li key={mat.name} className="border-b border-ivory/10">
                <button
                  type="button"
                  onClick={() => setM(i)}
                  onMouseEnter={() => setM(i)}
                  aria-pressed={i === m}
                  className="grid w-full gap-1 py-5 text-left sm:grid-cols-[12rem_1fr]"
                >
                  <span className={`display text-3xl transition-colors duration-300 ${i === m ? "text-gold" : "text-ivory/60"}`}>{mat.name}</span>
                  <span className="text-ivory/70">{mat.note}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
