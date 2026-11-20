import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Restyler } from "@/components/restyle/Restyler";
import { getProduct } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Restyle a photo",
  description: "Upload a photo of a sofa or chair and try new fabrics, colours and patterns on it, then send it to Mehal Furniture.",
};

async function FromProduct({ searchParams }: { searchParams: PageProps<"/restyle">["searchParams"] }) {
  const from = (await searchParams).from;
  const product = typeof from === "string" ? await getProduct(from) : null;
  return (
    <Restyler
      initialSrc={product?.images[0]}
      productSlug={product?.slug}
      productName={product?.name}
    />
  );
}

export default function RestylePage({ searchParams }: PageProps<"/restyle">) {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto w-full max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
        <h1 className="text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.9] text-emerald" data-split>Restyle a photo</h1>
        <p className="mt-6 max-w-xl text-lg text-muted" data-rise>
          Tap the sofa or chair in your photo, then try it in a new fabric, colour or pattern. It all
          happens on your phone; your photo is only sent to us if you choose to.
        </p>
        <div className="mt-10">
          <Suspense fallback={<div className="arch aspect-[4/5] max-w-xl bg-linen" />}>
            <FromProduct searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
