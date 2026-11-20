"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

declare global {
  interface Window {
    __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void; stop: () => void; start: () => void };
    __mehalReady?: boolean;
  }
}

const READY = "mehal:ready";

function announceReady() {
  window.__mehalReady = true;
  window.dispatchEvent(new Event(READY));
}

/** Runs fn once the curtain has lifted (immediately if it already has). */
export function onCurtainLifted(fn: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__mehalReady) {
    fn();
    return () => {};
  }
  window.addEventListener(READY, fn, { once: true });
  return () => window.removeEventListener(READY, fn);
}

/**
 * The site's doorway. A bottle-green panel with a mehrab edge rises over the
 * page when you follow a link, and lifts away once the next page is ready.
 * On the first visit it doubles as the intro: a counter runs to 100 while the
 * arch draws itself.
 */
export function Curtain() {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef<HTMLElement | null>(null);
  const intro = useRef<HTMLElement | null>(null);
  const pending = useRef<string | null>(null);

  // First visit intro (once per browser session).
  useEffect(() => {
    panel.current = document.querySelector<HTMLElement>("[data-curtain]");
    intro.current = document.querySelector<HTMLElement>("[data-curtain-intro]");
    const countEl = document.querySelector<HTMLElement>("[data-curtain-count]");
    const el = panel.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = document.documentElement.classList.contains("no-intro");
    try {
      sessionStorage.setItem("mehal-intro", "1");
    } catch {}

    if (seen || reduce) {
      gsap.set(el, { yPercent: -110, autoAlpha: 0 });
      gsap.set(intro.current, { autoAlpha: 0 });
      const t = setTimeout(announceReady, 0);
      return () => clearTimeout(t);
    }

    window.__lenis?.stop();
    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.fromTo(".intro-arch", { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", duration: 1.4, ease: "power2.inOut" }, 0)
      .to(counter, { v: 100, duration: 1.8, ease: "power2.inOut", onUpdate: () => {
        if (countEl) countEl.textContent = String(Math.round(counter.v));
      } }, 0)
      .to(".intro-bar", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0)
      .to(intro.current, { autoAlpha: 0, y: -30, duration: 0.5, ease: "power2.in" }, 1.95)
      .to(el, {
        yPercent: -110,
        duration: 1.1,
        ease: "expo.inOut",
        onStart: () => {
          window.__lenis?.start();
          setTimeout(announceReady, 350);
        },
      }, 2.1)
      .set(el, { autoAlpha: 0 });
    return () => {
      tl.kill();
    };
  }, []);

  function cover(href: string) {
    if (pending.current) return;
    pending.current = href;
    window.__mehalReady = false;
    window.__lenis?.stop();
    gsap.timeline()
      .set(panel.current, { yPercent: 110, autoAlpha: 1 })
      .to(panel.current, { yPercent: 0, duration: 0.8, ease: "expo.inOut" })
      .call(() => router.push(href));
  }

  // Intercept internal link clicks and play the curtain first.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname.startsWith("/api")) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // same page / hash links
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      cover(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // New page arrived: jump to top under the curtain, then lift it.
  useEffect(() => {
    if (!pending.current) return;
    const hash = pending.current.split("#")[1];
    pending.current = null;
    window.__lenis?.start();
    if (!hash) {
      window.__lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      gsap.timeline()
        .to(panel.current, { yPercent: -110, duration: 1, ease: "expo.inOut", onStart: () => setTimeout(announceReady, 300) })
        .set(panel.current, { autoAlpha: 0 });
    }, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

/** The curtain's markup, rendered on the server so it covers the first paint. */
export function CurtainShell() {
  return (
    <div
      aria-hidden="true"
      data-curtain
      className="pointer-events-none fixed inset-x-0 -top-[22vh] z-[100] h-[144vh] text-gold"
    >
      {/* Mehrab cap leading the panel up, flat body, inverted cap below. */}
      <svg viewBox="0 0 100 22" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[22vh] w-full">
        <path d="M0 22 V14 C0 8 30 5 50 0 C70 5 100 8 100 14 V22 Z" fill="var(--night)" />
      </svg>
      <div className="absolute inset-x-0 top-[22vh] h-[100vh] bg-night">
        <div className="jali-bg absolute inset-0 opacity-[0.05]" />
        <div data-curtain-intro className="absolute inset-0 flex flex-col items-center justify-center">
          <svg viewBox="0 0 120 150" className="h-36 w-auto md:h-44" fill="none">
            <path className="intro-arch" d="M6 146 V62 C6 34 34 20 60 4 C86 20 114 34 114 62 V146" stroke="currentColor" strokeWidth="2" />
            <path className="intro-arch" d="M32 120 V70 L60 102 L88 70 V120" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <p className="display mt-6 text-4xl text-ivory md:text-5xl">Mehal</p>
          <p className="mt-2 text-xs tracking-[0.4em] text-ivory/60">FURNITURE</p>
          <div className="absolute bottom-[12vh] left-6 right-6 flex items-end justify-between md:left-12 md:right-12">
            <p className="max-w-[14rem] text-sm text-ivory/60">Made to order on Adyala Road, Rawalpindi</p>
            <p data-curtain-count className="display text-[18vw] leading-none text-gold md:text-[9rem]">0</p>
          </div>
          <div className="intro-bar absolute bottom-[9vh] left-6 right-6 h-px origin-left scale-x-0 bg-gold/60 md:left-12 md:right-12" />
        </div>
      </div>
      <svg viewBox="0 0 100 22" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[22vh] w-full rotate-180">
        <path d="M0 22 V14 C0 8 30 5 50 0 C70 5 100 8 100 14 V22 Z" fill="var(--night)" />
      </svg>
    </div>
  );
}
