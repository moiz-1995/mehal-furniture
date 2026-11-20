"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onCurtainLifted } from "@/components/motion/Curtain";
import { Roll } from "@/components/motion/Cursor";

gsap.registerPlugin(useGSAP, SplitText, DrawSVGPlugin, ScrollTrigger);

const ARCH_D = "M2 798 V352 C2 175 180 96 300 2 C420 96 598 175 598 352 V798";

/**
 * Walk through the doorway. The headline sets letter by letter around a
 * mehrab window; scrolling pins the scene and the window swells until the
 * room inside fills the screen.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-line", { type: "chars,lines", mask: "lines" });
        gsap.set(split.chars, { yPercent: 110 });
        gsap.set(".hero-reveal", { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(".hero-fade", { autoAlpha: 0, y: 18 });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .from(".hero-arch-line", { drawSVG: "50% 50%", duration: 1.8, ease: "power2.inOut" }, 0)
          .to(".hero-reveal", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7 }, 0.35)
          .from(".hero-photo img", { scale: 1.35, duration: 2.2 }, 0.35)
          .to(split.chars, { yPercent: 0, duration: 1.3, stagger: 0.028 }, 0.25)
          .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 1);
        const off = onCurtainLifted(() => intro.play());

        // Scroll: pin and grow the doorway until it fills the screen.
        const win = root.current!.querySelector<HTMLElement>(".hero-window")!;
        const grow = () => {
          const r = win.getBoundingClientRect();
          return Math.max(innerWidth / r.width, innerHeight / (r.height * 0.5)) * 1.12;
        };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=130%",
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        const toCentre = () => {
          const r = win.getBoundingClientRect();
          return innerWidth / 2 - (r.left + r.width / 2);
        };
        tl.to(win, { scale: grow, x: toCentre, ease: "power2.in" }, 0)
          .to(".hero-photo img", { scale: 1, ease: "none" }, 0)
          .to(".hero-arch-line", { opacity: 0, duration: 0.2 }, 0)
          .to(".hero-copy", { xPercent: -25, autoAlpha: 0, ease: "power1.in", duration: 0.6 }, 0)
          .fromTo(".hero-inside", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.65);

        return () => {
          off();
          split.revert();
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-emerald text-ivory">
      <div className="jali-bg pointer-events-none absolute inset-0 opacity-[0.045]" aria-hidden="true" />

      {/* The doorway */}
      <div className="absolute inset-0 flex items-start justify-center pt-[13svh] md:items-center md:justify-end md:pr-[8vw] md:pt-16">
        <div className="hero-window relative aspect-[600/800] h-[46svh] origin-[50%_62%] md:h-[76svh]">
          <div className="hero-photo arch absolute inset-[1.2%] overflow-hidden bg-night">
           <div className="hero-reveal absolute inset-0">
            <Image
              src="/seed/30380637.jpg"
              alt="A cream tufted sofa in a sunlit room"
              fill
              priority
              sizes="(min-width: 768px) 40vw, 80vw"
              className="scale-[1.25] object-cover"
            />
           </div>
          </div>
          <svg viewBox="0 0 600 800" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
            <path className="hero-arch-line" d={ARCH_D} stroke="var(--gold)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>

      <p className="hero-inside display pointer-events-none absolute inset-x-0 bottom-[12svh] z-10 text-center text-[clamp(2.6rem,6vw,5.5rem)] text-ivory opacity-0 drop-shadow-[0_2px_30px_rgba(0,0,0,.35)]">
        Crafted for life.
      </p>

      {/* Headline beside the doorway */}
      <div className="hero-copy absolute inset-x-5 bottom-8 z-10 md:inset-x-auto md:bottom-auto md:left-10 md:top-1/2 md:w-[50vw] md:-translate-y-[42%]">
        <h1 className="text-[clamp(3.2rem,8.2vw,9.5rem)] leading-[0.88]">
          <span className="hero-line block">Your home,</span>
          <span className="hero-line block text-gold">a masterpiece.</span>
        </h1>
        <p className="hero-fade mt-7 max-w-sm text-[0.98rem] text-ivory/75">
          Sofa sets, bedrooms and dining furniture, made to order in Rawalpindi. Shape it in 3D
          before we build it.
        </p>
        <div className="hero-fade mt-8 flex flex-wrap gap-3">
          <Link href="/studio" className="btn btn-gold"><Roll>Design in 3D</Roll></Link>
          <Link href="/collection" className="btn btn-line text-ivory"><Roll>The collection</Roll></Link>
        </div>
      </div>
    </section>
  );
}
