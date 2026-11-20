"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/ArchDefs";
import { SITE, whatsappLink } from "@/lib/site";
import { Roll } from "@/components/motion/Cursor";

const NAV = [
  { href: "/collection", label: "Collection" },
  { href: "/studio", label: "Design in 3D" },
  { href: "/restyle", label: "Restyle a photo" },
  { href: "/#visit", label: "Visit us" },
];

/** tone="dark" sits on emerald (home hero); "light" on ivory pages. */
export function Header({ tone = "light" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > last + 2 ? true : y < last - 2 ? false : (h) => h);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const solid = scrolled || open;
  const onDark = tone === "dark" && !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(.19,1,.22,1)] ${hidden && !open ? "-translate-y-full" : ""} ${
        solid ? "bg-night/95 text-ivory backdrop-blur" : onDark ? "text-ivory" : "text-emerald"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Mehal Furniture, home" className={solid || onDark ? "text-gold" : ""}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-[0.95rem] lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="py-1">
              <Roll>{n.label}</Roll>
            </Link>
          ))}
          <a
            href={whatsappLink("Assalam o alaikum Mehal Furniture, I'd like to ask about a piece.")}
            target="_blank"
            rel="noopener"
            className="btn btn-gold !py-2.5"
          >
            <Roll>{`WhatsApp ${SITE.phoneDisplay}`}</Roll>
          </a>
        </nav>

        <button
          type="button"
          className="relative h-10 w-10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute left-2 right-2 top-[15px] h-px bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
          />
          <span
            className={`absolute left-2 right-2 top-[25px] h-px bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <nav className="min-h-0" aria-label="Mobile">
          <ul className="space-y-1 px-5 pb-8 pt-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="display block py-2 text-3xl">
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a href={whatsappLink("Assalam o alaikum Mehal Furniture, I'd like to ask about a piece.")} target="_blank" rel="noopener" className="btn btn-gold">
                WhatsApp {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
