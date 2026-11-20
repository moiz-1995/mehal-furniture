import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/site/Header";
import { Studio } from "@/components/studio/Studio";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Design in 3D",
  description: "Shape your own sofa, bed or table in 3D, choose any fabric and colour, and send it to Mehal Furniture on WhatsApp.",
};

export default async function StudioPage() {
  const products = (await getProducts()).map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <>
      <Header />
      <main id="main" className="pt-20">
        <h1 className="sr-only">Design your piece in 3D</h1>
        <Suspense fallback={<div className="h-[calc(100svh-5rem)] bg-[#efe8d8]" />}>
          <Studio products={products} />
        </Suspense>
      </main>
    </>
  );
}
