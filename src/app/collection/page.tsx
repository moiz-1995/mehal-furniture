import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CollectionGrid } from "@/components/catalog/CollectionGrid";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "The collection" };

export default async function CollectionPage() {
  const products = await getProducts();
  return (
    <>
      <Header />
      <main id="main" className="mx-auto w-full max-w-7xl px-5 pb-28 pt-32 md:px-8 md:pt-40">
        <h1 className="text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.9] text-emerald" data-split>The collection</h1>
        <p className="mt-6 max-w-xl text-lg text-muted" data-rise>
          Every piece is made to order, so each one can change: size, fabric, colour, legs and finish.
        </p>
        <div className="mt-12" data-rise>
          <Suspense>
            <CollectionGrid products={products} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
