import type { Metadata, Viewport } from "next";
import { Gulzar } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ArchDefs } from "@/components/brand/ArchDefs";
import { Suspense } from "react";
import { Curtain, CurtainShell } from "@/components/motion/Curtain";
import { Cursor } from "@/components/motion/Cursor";
import { Entrances } from "@/components/motion/Entrances";

const gulzar = Gulzar({
  variable: "--font-gulzar",
  subsets: ["arabic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Mehal Furniture — made to order in Rawalpindi",
    template: "%s · Mehal Furniture",
  },
  description:
    "Sofa sets, bedroom and dining furniture made to order on Adyala Road, Rawalpindi. Design your piece in 3D, then send it to us on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#0f3d2e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${gulzar.variable} h-full antialiased`}
    >
      <head>
        {/* Skip the intro curtain for returning visitors before anything paints. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('mehal-intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-intro')}catch(e){document.documentElement.classList.add('no-intro')}",
          }}
        />
        {/* Gambarino (display) + General Sans (text), free from Fontshare under the ITF Free Font Licence. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&f[]=general-sans@300,400,500,600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ArchDefs />
        <SmoothScroll />
        {children}
        <CurtainShell />
        <Cursor />
        <Suspense fallback={null}>
          <Curtain />
          <Entrances />
        </Suspense>
      </body>
    </html>
  );
}
