import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { VelocityMarquee } from "@/components/home/VelocityMarquee";
import { Statement } from "@/components/home/Statement";
import { CollectionBlinds, type Blind } from "@/components/home/CollectionBlinds";
import { FeaturedRail } from "@/components/home/FeaturedRail";
import { StartList } from "@/components/home/StartList";
import { MaterialLens } from "@/components/home/MaterialLens";
import { Process } from "@/components/home/Process";
import { Reveal } from "@/components/motion/Reveal";
import { Roll } from "@/components/motion/Cursor";
import { getProducts } from "@/lib/catalog";
import { CATEGORIES, SITE, whatsappLink } from "@/lib/site";

const LINES: Record<string, string> = {
  sofa: "Tufted, channelled or plain. Any length, any arm, any fabric on our wall.",
  bedroom: "Tall headboards, storage bases and the mehrab bed, made to your mattress.",
  dining: "Marble or solid sheesham, for four or for twelve, with chairs to match.",
  chairs: "Wingbacks, accent chairs and dining chairs in jewel-toned velvet.",
  tables: "Coffee, side and nesting tables in marble, onyx and gold.",
};

export default async function Home() {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);

  const blinds: Blind[] = CATEGORIES.flatMap((c) => {
    const inCat = products.filter((p) => p.category === c.id);
    const image = inCat.find((p) => p.images[0])?.images[0];
    return image ? [{ id: c.id, label: c.label, count: inCat.length, image, line: LINES[c.id] }] : [];
  });

  return (
    <>
      <Header tone="dark" />
      <main id="main">
        <Hero />

        <VelocityMarquee words={["Sofa sets", "Bedrooms", "Dining", "Made to order", "Rawalpindi"]} />

        <Statement
          text="Every Mehal piece starts as a conversation and ends as an heirloom. You choose the shape, the fabric and the wood; our karigars build it by hand on Adyala Road."
          note="No two homes are the same size, so nothing here is one size fits all."
        />

        {blinds.length > 1 && <CollectionBlinds items={blinds} />}

        <section className="mx-auto max-w-[96rem] px-5 py-28 md:px-10 md:py-40">
          <h2 className="mb-12 max-w-2xl text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] text-emerald">Start your piece</h2>
          <StartList
            rows={[
              { href: "/studio", title: "Shape it in 3D", body: "Build a sofa, bed or table, change every part, then see it in your room.", images: ["/seed/20035998.jpg", "/seed/30380637.jpg", "/seed/37988079.jpg"] },
              { href: "/restyle", title: "Restyle a photo", body: "Upload a picture you love and try our fabrics and colours on it.", images: ["/seed/10567019.jpg", "/seed/6434621.jpg", "/seed/10410097.jpg"] },
              { href: "/collection", title: "Pick from the collection", body: "Start from a showroom piece and make it yours.", images: ["/seed/7195591.jpg", "/seed/6587894.jpg", "/seed/15253318.jpg"] },
              { href: "/#visit", title: "Visit the showroom", body: "Sit on it, touch the swatches, talk to the karigar.", images: ["/seed/27570262.jpg", "/seed/11011890.jpg", "/seed/6394545.jpg"] },
            ]}
          />
        </section>

        <FeaturedRail products={featured} />

        <MaterialLens
          base="/seed/37988079.jpg"
          materials={[
            { name: "Velvet", note: "Deep pile that catches the light. Over a hundred colours.", image: "/seed/10410097.jpg" },
            { name: "Marble", note: "Sealed slabs for dining and coffee tables, chosen with you.", image: "/seed/6587894.jpg" },
            { name: "Sheesham", note: "Dense, seasoned rosewood for frames and carved dining sets.", image: "/seed/11011890.jpg" },
            { name: "Brass and gold", note: "Legs, trims and handles, finished to stay bright.", image: "/seed/6394545.jpg" },
          ]}
        />

        <Process />

        <VelocityMarquee tone="night" words={["Comfort", "Class", "Luxury", "Crafted for life"]} />

        <Reveal id="visit" className="relative overflow-hidden bg-emerald text-ivory">
          <div className="jali-bg pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[96rem] items-center gap-12 px-5 py-24 md:grid-cols-[1fr_1fr] md:px-10 md:py-32">
            <div>
              <h2 className="text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]" data-reveal>Sit on it before you order it</h2>
              <p className="mt-6 max-w-md text-ivory/80" data-reveal>
                Our showroom on {SITE.address.split(",")[0]} has sofa sets, bedroom and dining
                collections on the floor and the full swatch wall. Bring your design and we will
                talk it through.
              </p>
              <div className="mt-9 flex flex-wrap gap-3" data-reveal>
                <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="btn btn-gold"><Roll>Get directions</Roll></a>
                <a href={whatsappLink("Assalam o alaikum, I'd like to visit the showroom.")} target="_blank" rel="noopener" className="btn btn-line">
                  <Roll>{`Message ${SITE.phoneDisplay}`}</Roll>
                </a>
              </div>
            </div>
            <div className="arch relative aspect-[4/3] overflow-hidden md:aspect-[5/4]" data-reveal="arch">
              <Image src="/seed/27570262.jpg" alt="A classic sitting room with gold walls and cream upholstered chairs" fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
