"use client";

import Image from "next/image";
import { useState } from "react";
import { ArchPlaceholder } from "./ProductCard";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="arch relative aspect-[4/5] overflow-hidden bg-linen">
        {images.length === 0 && <ArchPlaceholder label="Design it in 3D" />}
        {images.map((src, n) => (
          <Image
            key={src}
            src={src}
            alt={`${name}, photo ${n + 1} of ${images.length}`}
            fill
            priority={n === 0}
            sizes="(min-width: 1024px) 45vw, 95vw"
            className={`object-cover transition-[opacity,transform] duration-700 ${n === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3" role="group" aria-label="Photos">
          {images.map((src, n) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show photo ${n + 1}`}
              aria-pressed={n === i}
              className={`arch-soft relative h-20 w-16 overflow-hidden transition-opacity ${n === i ? "opacity-100 ring-2 ring-gold ring-offset-2 ring-offset-ivory" : "opacity-60 hover:opacity-100"}`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
