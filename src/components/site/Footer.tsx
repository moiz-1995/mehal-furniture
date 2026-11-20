import Link from "next/link";
import { Logo } from "@/components/brand/ArchDefs";
import { SITE, whatsappLink } from "@/lib/site";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-night text-ivory">
      <div className="jali-bg pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <div className="text-gold">
            <Logo />
          </div>
          <p className="mt-5 max-w-sm text-ivory/75">
            Sofa sets, bedrooms and dining furniture, made to order in our Rawalpindi workshop.
          </p>
          <p className="font-urdu mt-6 text-2xl leading-[2.2] text-gold" lang="ur" dir="rtl">
            آپ کا گھر، ایک شاہکار
          </p>
        </div>
        <div>
          <h2 className="display text-2xl text-gold">Visit the showroom</h2>
          <address className="mt-4 space-y-1 not-italic text-ivory/80">
            <p>{SITE.address}</p>
            <p>
              <a href={`tel:+${SITE.whatsapp}`} className="underline-offset-4 hover:underline">
                {SITE.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
                Open in Google Maps
              </a>
            </p>
          </address>
        </div>
        <div>
          <h2 className="display text-2xl text-gold">Start a piece</h2>
          <ul className="mt-4 space-y-1 text-ivory/80">
            <li><Link href="/studio" className="underline-offset-4 hover:underline">Design in 3D</Link></li>
            <li><Link href="/restyle" className="underline-offset-4 hover:underline">Restyle a photo</Link></li>
            <li><Link href="/collection" className="underline-offset-4 hover:underline">Browse the collection</Link></li>
            <li>
              <a href={whatsappLink("Assalam o alaikum, I have a design in mind.")} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
                Send us a picture on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <FooterWordmark />
      <div className="relative border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-5 py-5 text-sm text-ivory/50 md:px-8">
          <p>© {2026} Mehal Furniture</p>
          <Link href="/admin" className="hover:text-ivory">Owner login</Link>
        </div>
      </div>
    </footer>
  );
}
