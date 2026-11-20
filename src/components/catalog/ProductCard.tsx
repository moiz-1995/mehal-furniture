import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { categoryLabel, formatPKR } from "@/lib/site";

export function ArchPlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center bg-emerald pb-[18%]">
      <div className="jali-bg absolute inset-0 opacity-10" aria-hidden="true" />
      <span className="display relative text-xl text-gold">{label}</span>
    </div>
  );
}

export function ProductCard({
  product,
  priority,
  reveal,
}: {
  product: Product;
  priority?: boolean;
  reveal?: boolean;
}) {
  const img = product.images[0];
  return (
    <Link href={`/pieces/${product.slug}`} className="group block" data-cursor="View" data-reveal={reveal ? "" : undefined}>
      <div className="arch relative aspect-[4/5] overflow-hidden bg-linen">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <ArchPlaceholder label="Design it in 3D" />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-[1.7rem] text-emerald">{product.name}</h3>
        <span className="shrink-0 text-sm text-muted">{categoryLabel(product.category)}</span>
      </div>
      <p className="mt-1 text-[0.95rem] text-muted">{product.summary}</p>
      <p className="mt-2 flex flex-wrap gap-x-4 text-sm font-semibold text-bronze">
        <span>{product.priceFrom ? `From ${formatPKR(product.priceFrom)}` : "Price on request"}</span>
        {product.designBase && <span className="text-moss">Customise in 3D</span>}
      </p>
    </Link>
  );
}
