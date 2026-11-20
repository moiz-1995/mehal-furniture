"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import type { Product } from "@/lib/types";
import { CATEGORIES } from "@/lib/site";
import { ProductCard } from "./ProductCard";

gsap.registerPlugin(Flip, useGSAP);

/** Category filter; cards glide to their new places with GSAP Flip. */
export function CollectionGrid({ products }: { products: Product[] }) {
  const initial = useSearchParams().get("c");
  const [active, setActive] = useState<string>(
    initial && products.some((p) => p.category === initial) ? initial : "all",
  );
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const present = CATEGORIES.filter((c) => products.some((p) => p.category === c.id));
  const shown = active === "all" ? products : products.filter((p) => p.category === active);

  function choose(id: string) {
    if (id === active) return;
    if (grid.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flipState.current = Flip.getState(grid.current.querySelectorAll("[data-card]"));
    }
    setActive(id);
  }

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 0.7,
        ease: "power3.inOut",
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.3 }),
      });
      flipState.current = null;
    },
    { dependencies: [active], scope: grid },
  );

  const tabs = [{ id: "all", label: "Everything" }, ...present];

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => choose(t.id)}
            aria-pressed={active === t.id}
            className={`rounded-full border px-5 py-2 text-[0.95rem] transition-colors ${
              active === t.id
                ? "border-emerald bg-emerald text-ivory"
                : "border-emerald/25 text-emerald hover:border-emerald"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div ref={grid} className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <div key={p.id} data-card data-flip-id={p.id}>
            <ProductCard product={p} priority={i < 3} />
          </div>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="mt-12 text-muted">Nothing in this category yet. Design one in 3D instead.</p>
      )}
    </>
  );
}
