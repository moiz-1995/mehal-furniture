import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/catalog/Gallery";
import { getProduct, getProducts } from "@/lib/catalog";
import { categoryLabel, formatPKR, whatsappLink } from "@/lib/site";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pieces/[slug]">) {
  const p = await getProduct((await params).slug);
  return p ? { title: p.name, description: p.summary } : {};
}

async function Piece({ params }: { params: PageProps<"/pieces/[slug]">["params"] }) {
  const p = await getProduct((await params).slug);
  if (!p) notFound();

  const ask = whatsappLink(
    `Assalam o alaikum Mehal Furniture, I'm interested in the ${p.name}. Could you tell me the price and options?`,
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <Gallery images={p.images} name={p.name} />

      <div className="lg:pt-6">
        <Link href="/collection" className="text-sm text-muted underline-offset-4 hover:underline">
          {categoryLabel(p.category)}
        </Link>
        <h1 className="mt-3 text-[clamp(3rem,6.5vw,6rem)] leading-[0.92] text-emerald" data-split>{p.name}</h1>
        <p className="mt-5 text-lg text-muted" data-rise>{p.summary}</p>

        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-3 border-y border-emerald/15 py-5" data-rise>
          <div>
            <p className="text-sm text-muted">Price</p>
            <p className="text-lg font-semibold text-bronze">
              {p.priceFrom ? `From ${formatPKR(p.priceFrom)}` : "On request"}
            </p>
          </div>
          {p.leadTimeWeeks && (
            <div>
              <p className="text-sm text-muted">Made in</p>
              <p className="text-lg font-semibold text-emerald">About {p.leadTimeWeeks} weeks</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3" data-rise>
          {p.designBase && (
            <Link href={`/studio?base=${p.designBase}&from=${p.slug}`} className="btn btn-emerald">
              Customise in 3D
            </Link>
          )}
          {p.images[0] && (
            <Link href={`/restyle?from=${p.slug}`} className="btn btn-line text-emerald">
              Try other fabrics on this photo
            </Link>
          )}
          <a href={ask} target="_blank" rel="noopener" className="btn btn-gold">
            Ask on WhatsApp
          </a>
        </div>

        <p className="mt-10 max-w-prose leading-relaxed text-ink/85">{p.description}</p>

        {p.materials.length > 0 && (
          <section className="mt-12" aria-labelledby="made-of">
            <h2 id="made-of" className="text-4xl text-emerald">What it&rsquo;s made of</h2>
            <dl className="mt-6 divide-y divide-emerald/10 border-y border-emerald/10">
              {p.materials.map((m) => (
                <div key={m.part + m.material} className="grid grid-cols-[8rem_1fr] gap-4 py-4">
                  <dt className="font-semibold text-emerald">{m.part}</dt>
                  <dd className="text-ink/85">{m.material}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>
    </div>
  );
}

export default function PiecePage({ params }: PageProps<"/pieces/[slug]">) {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto w-full max-w-7xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
        <Suspense fallback={<div className="arch aspect-[4/5] max-w-xl animate-pulse bg-linen" />}>
          <Piece params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
