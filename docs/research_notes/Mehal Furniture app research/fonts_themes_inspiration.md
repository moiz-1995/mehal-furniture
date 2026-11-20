# Mehal Furniture: fonts, colour, templates and design inspiration

Scope: free fonts, colour direction, free templates and UI kits, award-winning furniture sites, ways to present materials, and Mughal motifs on the web. Researched 2026-11-20.

Source note: fontshare.com font pages are rendered by JavaScript and could not be fetched, so the per-font details for Fontshare families come from prior knowledge and are marked **[verify]**. Google Fonts details are standard, well-known facts; they are also marked [verify] wherever the exact axis set matters.

## 1. Free fonts and pairings

### Takeaway
Two families of sources cover this. Google Fonts serifs (OFL, self-hostable, many variable) are the safest choice. Fontshare serifs (ITF Free Font License, free for commercial use, cannot be redistributed) look more distinctive. Best fit for "Mughal palace + modern luxury": a high-contrast display serif for headings plus a quiet geometric or grotesque sans for the UI.

### Cited Findings
- Fontshare is run by the Indian Type Foundry (ITF). Its fonts are free for personal and commercial use. Closed-source fonts fall under the ITF Free Font License (FFL); open-source ones fall under SIL OFL. — [ITF announcement](https://www.indiantypefoundry.com/news/introducing-fontshare); [licenseorg summary](https://licenseorg.com/guide/fonts/fontshare)
- Under FFL the font files cannot be redistributed; others must be sent to fontshare.com to download. Terms could change for future releases. — [licenseorg compare](https://licenseorg.com/compare/fontshare-vs-google-fonts)
- Sources disagree on scope. Some say FFL covers print, web, apps, ePub and broadcast; another says app embedding and ePub are excluded. The EULA on each font page should be checked. — [licenseorg](https://licenseorg.com/guide/fonts/fontshare); [madegooddesigns](https://madegooddesigns.com/fontshare/)
- Google Fonts families are released under SIL OFL 1.1 (example: Noto family). — [Fontsource Noto Nastaliq Urdu](https://fontsource.org/fonts/noto-nastaliq-urdu/about)

### Recommended pairings (licence and variable status from prior knowledge, [verify] on each specimen page)
| # | Display / headings | Body / UI | Licence | Why it fits Mehal |
|---|---|---|---|---|
| 1 | **Cormorant Garamond** or **Cormorant** (fonts.google.com/specimen/Cormorant) | **Manrope** (variable 200–800) | OFL / OFL | Calligraphic, high-contrast Garamond with a "palace" feel; Manrope's rounded geometry echoes the dome monogram. Fully self-hostable via next/font. Cormorant now ships as a variable font [verify]. **Safest default.** |
| 2 | **Gambetta** (fontshare.com/fonts/gambetta) | **Satoshi** (fontshare.com/fonts/satoshi) | ITF FFL / ITF FFL | Gambetta is a warm transitional serif with lively italics, good for "Crafted for Life" lines. Satoshi is a modern geometric sans that looks premium. Both are variable on Fontshare [verify]. Can be self-hosted, but the files must not be redistributed. |
| 3 | **Bodoni Moda** (variable, opsz axis) | **DM Sans** (variable, opsz) | OFL / OFL | Fashion-house Didone, closest to the Minotti and Poltrona Frau editorial look. The optical-size axis keeps hairlines intact at large hero sizes. Avoid Bodoni below about 18px. |
| 4 | **Fraunces** (variable: wght, opsz, SOFT, WONK) | **Inter** (variable) | OFL / OFL | The SOFT axis gives a softened, "upholstered" serif that suits tufted sofas. Set WONK=0 for luxury restraint. Inter is the most reliable UI sans for forms, prices and Urdu-adjacent layouts. |
| 5 | **Erode** or **Zodiak** (Fontshare) | **General Sans** (Fontshare) | ITF FFL | Zodiak is a sharp, high-contrast display serif; Erode is calmer and good for long product stories. General Sans is a neutral grotesque. A distinctive look that few Pakistani competitors would use. |
| 6 | **Instrument Serif** (Regular + Italic only, static) | **Instrument Sans** or **Inter** | OFL | Condensed editorial serif, very current on Awwwards-style sites (2024–26). Use only for large headings because there is no bold. |

Other options: **Boska** (Fontshare, display serif with strong italics), **Playfair Display** (OFL, variable; widely used and so less distinctive), and Velvetyne / Collletttivo (OFL experimental foundries). Velvetyne and Collletttivo faces are mostly too experimental for luxury furniture; reference only.

### Inferences
- Use pairing 1 or 3 if the site might be repackaged or sold later, or built into a mobile app, because OFL has no redistribution worries. Use pairing 2 or 5 for a more distinctive custom look on a single website.
- Self-host with `next/font/local` or `next/font/google`, subset to Latin, and use variable files to keep font payload under about 100 KB.
- The billboard line "Make your home a masterpiece" suits an italic display serif (Cormorant Italic or Gambetta Italic) in gold on deep green.

### Gaps
- Could not fetch fontshare.com specimen pages (JS-rendered), so exact weights, variable status and per-font FFL vs OFL for Gambetta, Zodiak, Erode, Boska, Satoshi and General Sans are unconfirmed.

## 2. Urdu / Arabic-script fonts for a bilingual site

### Takeaway
Use **Noto Nastaliq Urdu** or **Gulzar** (both OFL, both on Google Fonts) for Nastaliq headings and short copy. Use **Noto Naskh Arabic** for dense UI text if the Nastaliq line height becomes a problem. Do not ship **Jameel Noori Nastaleeq** on a commercial site: there is no clear commercial licence.

### Cited Findings
- Noto Nastaliq Urdu: © Noto Project Authors, SIL OFL 1.1. — [Fontsource](https://fontsource.org/fonts/noto-nastaliq-urdu/about); [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu/about)
- Google Fonts has two Urdu Nastaliq fonts: Noto Nastaliq Urdu (variable) and Gulzar. — [Google Fonts blog, 2023](https://fonts.googleblog.com/2023/03/why-are-there-so-few-digital-nastaliq.html)
- File size: one user report puts the Noto Nastaliq TTF under about 290 KB and the WOFF2 at about 117 KB. Many quality Urdu fonts are far larger (multi-MB). This is anecdotal, not an official figure. — [ProPakistani](https://propakistani.pk/?p=85730)
- Gulzar: added to Google Fonts July 2022, SIL OFL 1.1. Designers are Borna Izadpanah, Fiona Ross, Alice Savoie and Simon Cozens. It is described as Nastaliq "with a typographic rather than calligraphic feel". Fontsource v14 was updated Mar 2026. — [Fontsource Gulzar](https://fontsource.org/fonts/gulzar/about); [GitHub googlefonts/Gulzar](https://github.com/googlefonts/Gulzar)
- Jameel Noori Nastaleeq: its only notice reads "This Font Is Free Of Charge For Urdu Lovers". Ubuntu packagers questioned whether this covers commercial use. — [Ubuntu-pk list](https://lists.launchpad.net/ubuntu-pk/msg00007.html). Wikipedia notes Noori Nastaliq history with Monotype / Concept Software, so rights are held privately. — [Wikipedia: Noori Nastaliq](https://en.wikipedia.org/wiki/Noori_Nastaliq)
- Nafees Nastaleeq (CRULP) is listed under MIT/X11 on Font Library, an older but permissive alternative. — [Font Library](https://fontlibrary.org/en/font/nafees-nastaleeq)
- A Noto Nastaliq Urdu package exists on cdnjs/Fontsource for self-hosting. — [cdnjs](https://cdnjs.com/libraries/fontsource-noto-nastaliq-urdu)

### Inferences
- Nastaliq needs a much taller line height (about 1.8–2.2) and clips easily inside fixed-height buttons. Keep it for headings, taglines and hero copy ("آپ کے گھر کو شاہکار بنائیں") and use Naskh for forms and prices.
- Amiri (OFL, Naskh, classical book style) and Lateef (SIL, OFL) are reliable Naskh choices; Noto Naskh Arabic (OFL, variable) is the most UI-friendly. [verify licences on Google Fonts]
- Lazy-load the Urdu font only on `/ur` routes (`next/font` with `preload: false`) so English pages pay no cost.

### Gaps
- No reliable source found on Mehr Nastaliq's licence; treat it as unknown and do not use it commercially until confirmed.
- No official benchmark found of Gulzar vs Noto WOFF2 sizes.

## 3. Colour palette direction

### Takeaway
Deep bottle or emerald green as the base, antique gold as a sparing accent, ivory/cream as the paper colour. Gold text on cream fails WCAG, so gold must sit on green (or be darkened to bronze on light backgrounds).

### Cited Findings
- Emerald + gold + cream/ivory is the standard luxury pairing. A deeper "emerald / gold / parchment" set is #0C3C2D, #B8860B, #FAF0E6. — [Muffin Group](https://muffingroup.com/blog/luxury-color-palette/); [madegooddesigns](https://madegooddesigns.com/colors-that-go-with-emerald-green/)
- Bright emerald #50C878 scores about 2.13:1 as text, a fail. Use deep variants for text and bright emerald only for decoration. — [Figma colors](https://www.figma.com/colors/emerald-green/); [Visily](https://www.visily.ai/?p=90967)

### Proposed tokens with contrast ratios computed here (WCAG 2.x formula)
| Pair | Ratio | Use |
|---|---|---|
| Ivory `#F5EFE0` text on Bottle green `#0F3D2E` | **10.6:1** (AAA) | Hero, footer, nav on green |
| Gold `#D4AF37` on `#0F3D2E` | **5.78:1** (AA body) | Gold headings, prices, links on green |
| Mustard gold `#C9A227` on `#0F3D2E` | 5.03:1 (AA) | Matches the store's mustard |
| Light gold `#E6C66A` on near-black green `#0B2A20` | 9.26:1 | Dark-mode accents |
| `#0F3D2E` text on ivory `#F5EFE0` | 10.6:1 | Primary text on light pages |
| Forest `#14532D` on ivory | 7.94:1 | Buttons, secondary headings |
| Gold `#C9A227` on ivory | **2.11:1 FAIL** | Decorative lines only, never text |
| Bronze `#9A7B1C` on ivory | 3.5:1 | Large text (24px+) only |
| Deep bronze `#7A5E12` on ivory | 5.33:1 | Small "gold" text on light pages |
| Charcoal `#1C1A17` on ivory | 15.1:1 | Body copy |

### Inferences
- Rule: on light pages "gold" means deep bronze `#7A5E12` for text and real gold `#C9A227` only for 1px rules, arch outlines and icons.
- Brands using green and gold as a luxury cue that are worth looking at (not verified in this session): Rolex (green + gold), Harrods (green + gold), Fortnum & Mason (eau-de-nil + gold), Sabyasachi (deep tones + gold heritage).

### Gaps
- No live verification of the brand hex codes listed above.

## 4. Free templates, themes and UI kits

### Takeaway
Build on **Vercel Shop / Next.js Commerce (MIT)** if selling online with Shopify, or on the **Medusa DTC starter** (Medusa core is MIT) for a self-hosted catalogue. For a made-to-order store that takes orders over WhatsApp or by enquiry, a custom Next.js site with the patterns below is simpler. Use Framer and Figma templates for layout ideas only.

### Cited Findings
- Vercel's Shopify storefront is now "Vercel Shop" (repo `vercel/shop`), MIT licence, built with Next.js 16, React 19, Tailwind 4 and the Shopify Storefront API. Vercel only maintains the Shopify version of Next.js Commerce. — [Vercel Shop template](https://vercel.com/templates/ecommerce/vercel-shop); [Next.js Commerce](https://vercel.com/templates/next.js/nextjs-commerce)
- The older `vercel/commerce` repo is reported as MIT (secondary source). Shopify API terms apply separately. — [dev.co](https://dev.co/ecommerce/open-source/commerce)
- The official Medusa Next.js starter is deprecated; use `dtc-starter`. Medusa core is MIT. — [Medusa starter README](https://raw.githubusercontent.com/medusajs/nextjs-starter-medusa/main/README.md); [Vercel Medusa template](https://vercel.com/templates/next.js/medusa)
- Blazity Enterprise Commerce starter is also on Vercel templates. — [Vercel](https://examples.vercel.com/templates/next.js/blazity-enterprise-ecommerce-starter)
- Free Framer furniture/interior templates:
  - **Forma House**: free furniture e-commerce template with interactive room shopping. — [Framer](https://www.framer.com/marketplace/templates/forma-house/)
  - **NORDIQ**: minimal furniture studio template with catalogue and CMS, "Free". — [Framer](https://marketplace.framer.com/marketplace/templates/nordiq)
  - **Relox Interior**: for furniture brands and made-to-order workshops; price not stated. — [Framer](https://www.framer.com/marketplace/templates/relox-interior/)
  - **Interior Designer**: free, portfolio-style. — [Framer](https://www.framer.com/marketplace/templates/interior-designer/)
  - Furniqo and Muebles are premium (paid). — [Furniqo](https://www.framer.com/community/marketplace/templates/furniqo-furniture/)
- Free Figma furniture kits:
  - **Furnics** (TemplatesJungle, $0+) — [Gumroad](https://templatesjungle.gumroad.com/l/furnics-furniture-store-ecommerce-free-figma-web-design)
  - **UMAH** freebie app kit (pay what you want, Figma Community link) — [Gumroad](https://ydntkwia62.gumroad.com/l/freebie-umah-uikit)
  - Homeify and Infurnish are paid. — [TemplateMonster](https://www.templatemonster.com/ui-elements/homeify-customize-furniture-shop-ui-kit-figma-294032.html)
- Shopify "Urban" furniture theme is listed on Awwwards (paid theme, reference only). — [Shopify Themes](https://themes.shopify.com/themes/urban)

### Inferences
- For a Rawalpindi made-to-order shop, Vercel Shop plus Shopify adds monthly fees and payment friction. A lighter Next.js catalogue with an "Enquire on WhatsApp / Book showroom visit" call to action is probably the better fit, with Medusa added later if online checkout is needed.

### Gaps
- Could not search figma.com/community directly; no direct Community-file URLs confirmed. Webflow free furniture templates not checked.

## 5. Award-winning and reference furniture / interior sites

### Takeaway
The Awwwards furniture category shows recent winners (2024–26) mostly at Honorable Mention or Nominee level. The strongest patterns to borrow come from Scandinavian and Italian brand sites: editorial full-bleed photography, material libraries, configurators, and slow, smooth transitions.

### Cited Findings (awards)
| Site | URL | Award / date | What to borrow |
|---|---|---|---|
| Ekomia | https://ekomia.de/ | Awwwards Nominee, Feb 6 2026; Three.js | 3D product configurator, collection filters, materials and sustainability sections — [Awwwards](https://www.awwwards.com/sites/ekomia) |
| Woodwrights | https://woodwrights.co.nz/ | Awwwards HM, Oct 3 2026; Studio Almond; Shopify | Shopify furniture store "shaped by honesty and elegance": a craft-maker story, close to Mehal's made-to-order angle — [Awwwards](https://www.awwwards.com/sites/woodwrights) |
| ROOOF | https://www.shoprooof.com/ | HM Nov 4 2025 | Playful product storytelling — [Awwwards furniture](https://www.awwwards.com/websites/furniture/) |
| Rigas Furniture | https://www.rigas-furniture.gr/ | HM May 30 2025 | Greek maker site, carved/crafted wood presentation — same |
| Textura "Furniture Presence" | https://textura.works/ | HM Aug 19 2024 | Material/texture-led presentation — same |
| CODE Furniture | https://www.code-furniture.com/ | HM Feb 23 2024 | — same |
| Props Furniture (Studio Lumio) | https://props.studiolumio.com/ | **Site of the Day** + Developer Award, May 16 2023 | Motion and transitions benchmark — same |
| Format Furniture | https://format.furniture/ | HM Jul 2022 | — same |
| Case Furniture | https://casefurniture.com | HM Jul 2021 | — same |

### Brand reference sites (well-known brand domains, not award-verified this session)
- **Hem** (hem.com): material samples per product under "Technical details"; textile, leather, metal and wood-finish sample kits shipped in 2–5 days. — [Hem samples](https://us.hem.com/pages/order-samples); [Hem help](https://help.hem.com/en/articles/2728051-where-can-i-find-samples-and-swatches)
- **Audo Copenhagen** (audocph.com, formerly Menu) — editorial room scenes, hotel/residence stories.
- **Ferm Living** (fermliving.com) — warm lifestyle photography, shop-the-room.
- **Norm Architects** (normcph.com) — restraint, whitespace, large typography.
- **Stellar Works** (stellarworks.com) — East-meets-West luxury, a good model for "Mughal + modern".
- **Poltrona Frau** (poltronafrau.com) and **Minotti** (minotti.com) — Italian luxury: leather/material libraries, craftsmanship films, dealer locator.
- **Kave Home** (kavehome.com) — mass-market but strong PDP: fabric swatches, 3D/AR viewer.
- Henge (henge07.com), Garrison & Croft, Lusano: URLs and awards not verified in this session. [verify]
- Comparison: Crate & Barrel (up to 5 free swatches), Ethan Allen (up to 10 free), Blu Dot (unlimited free swatches). — [Crate & Barrel](https://www.crateandbarrel.com/free-swatches); [Blu Dot](https://www.bludot.com/free-swatches)

### Inferences
- Patterns to borrow: full-bleed hero video of a craftsman carving wood or tufting a sofa, then a split "Collections" grid (Sofas, Dining, Bedroom), then a "Made to order in 4–6 weeks" process strip, then the material library, then showroom/WhatsApp.

### Gaps
- Could not access godly.website, Land-book, SiteInspire or CSSDA listings (search gave nothing usable); no 2025–26 furniture Site of the Day confirmed.

## 6. Ways to present "what it's made of" on product pages

### Takeaway
The best practice combines: material swatches next to the variant picker; a "Technical details / Materials" accordion; macro close-ups of wood grain, fabric and gold legs; a short craftsmanship video; and a sample-request or showroom-visit call to action.

### Cited Findings
- Hem lists each product's samples in a Technical details section and runs a sample-kit programme (textiles, leathers, metal/wood finishes). — [Hem help](https://help.hem.com/en/articles/2728051-where-can-i-find-samples-and-swatches)
- Ekomia's highlighted sections include Product Configurator, Materials and Sustainability. — [Awwwards Ekomia](https://www.awwwards.com/sites/ekomia)
- Free swatch programmes are common at mid/luxury US retailers (Crate & Barrel 5, Ethan Allen 10, Blu Dot unlimited). — [Crate & Barrel](https://www.crateandbarrel.com/free-swatches); [Ethan Allen](https://www.ethanallen.com/en_US/linden-hemlock-fabric-swatch/71826_SW.html)

### Inferences
- For Mehal, a "Material Story" block on each PDP could show: Frame (e.g. sheesham/kikar/deodar wood, kiln-dried), Upholstery (velvet/chenille swatches, a cream default), Legs (brass or gold-finish metal), Foam (density), plus a 10–20s workshop clip. Add "Choose your fabric — visit showroom or WhatsApp for swatches".
- A "Made to order" timeline (Design, Frame, Carving, Upholstery, Delivery) tells the craft story and sets delivery expectations.

### Gaps
- No source measuring conversion lift from material sections was found.

## 7. Mughal / Islamic motifs in modern web design

### Takeaway
No award-winning website was found that uses Mughal arches or jali on the web. The opportunity is open but has no proven example, so use motifs sparingly: arch-shaped image masks (matching the "M" dome logo), thin gold line borders, and a low-opacity jali pattern as section dividers or backgrounds.

### Cited Findings
- Eris Home's Mughal collection brings "the elegance of Mughal architecture to the contemporary home" (product, not web). — [Design Essentia](https://designessentiamagazine.com/mughal-collection-eris-home/)
- A Hyderabad flagship store (Bottega Architecture) uses jali partitions for a modern Mughal feel; Studio Lotus wrapped stone lattices around a Jaipur jewellery store. — [Retail4Growth](https://www.retail4growth.com/projects/a-royal-throwback-with-a-contemporary-twist-6133); [Dezeen](https://www.dezeen.com/?p=2079358)
- India Circus (home decor) got a Mughal-royalty-inspired e-commerce redesign that stayed "minimalistic" with a mobile-first priority. — [Dreamscape case study](https://dreamscape.co.in/case-studies/india-circus)
- SUM built sabyasachi.com's digital identity around artisan storytelling. — [SUM](https://sumdesignbeta.squarespace.com/news/elevating-indian-luxury-to-the-global-stage)
- Luxury buyers expect speed: "slow websites will send them packing", so heavy ornament needs optimising. — [Wix luxury design](https://www.wix.com/studio/blog/luxury-website-design)
- A Mughal style-guide HTML demo exists as a reference for arches and patterns in CSS. — [ggprompts Mughal style](https://ggprompts.github.io/htmlstyleguides/styles/mughal.html)

### Inferences (implementation ideas)
- Arch image masks: CSS `clip-path` or an SVG `mask` with the logo's dome arch on hero and category images (`border-radius: 50% 50% 0 0 / 30% 30% 0 0` for a simple arch).
- Jali: a tileable SVG pattern at 4–8% opacity in gold on the green footer and section dividers. Keep it as SVG rather than PNG for weight.
- Gold line work: 1px `#C9A227` rules, corner ornaments on cards, an animated stroke-draw of the arch on page load.
- Avoid religious calligraphy and mosque imagery beyond the abstract arch, to stay tasteful and inclusive.

### Gaps
- No Awwwards/Godly-level site with Mughal web motifs found; Good Earth website not reviewed.
