"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/lib/types";
import { categoryLabel } from "@/lib/site";
import { ArchPlaceholder } from "@/components/catalog/ProductCard";
import { Roll } from "@/components/motion/Cursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Pieces from the showroom on a rail that the page's vertical scroll drives
 * sideways (desktop). Cards tilt slightly with the rail's speed. On phones it
 * is a normal swipeable row.
 */
export function FeaturedRail({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".fr-track")!;
        const dist = () => track.scrollWidth - innerWidth + 80;
        const skew = gsap.quickTo(".fr-card", "skewX", { duration: 0.5, ease: "power3" });
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist()}`,
            scrub: 0.7,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -300)),
            onScrubComplete: () => skew(0),
          },
        });
        gsap.utils.toArray<HTMLElement>(".fr-card img").forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-linen/60 md:h-[100svh]">
      <div className="flex h-full flex-col justify-center py-20 md:py-0">
        <div className="flex items-end justify-between gap-6 px-5 md:px-10">
          <h2 className="text-[clamp(2.6rem,6vw,5.5rem)] text-emerald">From the showroom</h2>
          <Link href="/collection" className="btn btn-line hidden text-emerald md:inline-flex"><Roll>Every piece</Roll></Link>
        </div>
        <div className="mt-10 overflow-x-auto md:overflow-visible">
          <div className="fr-track flex w-max gap-6 px-5 md:gap-10 md:px-10">
            {products.map((p, i) => (
              <Link key={p.id} href={`/pieces/${p.slug}`} className="fr-card group block w-[72vw] shrink-0 sm:w-[44vw] md:w-[26vw]" data-cursor="View">
                <div className={`arch relative overflow-hidden bg-emerald ${i % 2 ? "aspect-[4/5] md:mt-16" : "aspect-[3/4]"}`}>
                  {p.images[0] ? (
                    <Image src={p.images[0]} alt={p.name} fill sizes="(min-width: 768px) 26vw, 72vw" className="scale-[1.18] object-cover transition-transform duration-[1.2s] group-hover:scale-[1.26]" />
                  ) : (
                    <ArchPlaceholder label="Design it in 3D" />
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="display text-2xl text-emerald md:text-3xl">{p.name}</h3>
                  <span className="text-sm text-muted">{categoryLabel(p.category)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
