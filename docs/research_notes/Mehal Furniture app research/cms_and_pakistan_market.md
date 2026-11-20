# Mehal Furniture: owner admin/CMS options and the Pakistani furniture market

Research date: 2026-11-20. Prices in USD unless noted. Pages were fetched on this date where marked "fetched".

## A1. Free/cheap CMS and backend options for a Next.js app

### Takeaway
Supabase (Postgres + Storage + Auth) with a small custom admin built into the Next.js app is the cheapest fit that handles both the catalogue and incoming design requests in one database. Its free tier pauses projects after a week of no activity, and image transforms need Pro ($25/mo). Sanity's free plan is the most generous managed CMS (100 GB assets, 100 GB bandwidth, built-in image CDN), but design requests would still need a separate store. Payload 3 is free, installs inside the Next.js app at /admin, and is reviewed as easy to use, but it needs its own database and file storage.

### Cited Findings
- Supabase Free (fetched): 500 MB database per project, 1 GB file storage, 5 GB egress plus 5 GB cached egress, 50,000 MAUs, **image transformations not included**, **projects pause after 1 week of inactivity**, 2 active projects — [Supabase pricing](https://supabase.com/pricing)
- Supabase Pro: from $25/month, includes 100 origin images for transformations, then $5 per 1,000 origin images — [Supabase pricing](https://supabase.com/pricing)
- Sanity Free (fetched): 20 seats, 2 datasets (public only), 10k documents, 100 GB assets, 100 GB bandwidth/month, 250k API requests/month, 1M API CDN requests/month. Growth is $15 per seat per month — [Sanity pricing](https://www.sanity.io/pricing)
- Sanity's image pipeline is the Sanity CDN plus a URL-based transformation API. Studio is open source and can be embedded in a Next.js app or hosted separately — [Lucky Media comparison](https://www.luckymedia.dev/compare/payload-cms-vs-sanity); [Sanity vs Payload (vendor page)](https://www.sanity.io/sanity-vs-payload)
- Payload 3.0 installs directly into any Next.js app, with a /admin route baked in and no separate deployment — [Payload 3.0 announcement](https://payloadcms.com/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app)
- Payload's image pipeline is "bring your own CDN", with S3 and Cloudflare R2 storage adapters. One neutral comparison calls its admin functional and customisable but "noticeably less polished" than Sanity Studio — [dev.to Payload vs Sanity 2026](https://dev.to/nayankyada/payload-cms-vs-sanity-for-nextjs-in-2026-an-honest-comparison-498); [Lucky Media](https://www.luckymedia.dev/compare/payload-cms-vs-sanity)
- On G2, reviewers rated Payload easier to use, set up and administer than Sanity. Capterra lists Payload at 4.9 (48 reviews) and Sanity at 4.7 (3 reviews, too small to rely on) — [G2](https://www.g2.com/compare/payload-cms-vs-sanity); [Capterra](https://www.capterra.com/compare/199501-218666/Sanity-vs-Payload-CMS)
- Payload v3 compared with Keystatic and Outstatic (both Git/file-based options) — [pkgpulse guide](https://www.pkgpulse.com/guides/payload-cms-v3-vs-keystatic-vs-outstatic-headless-cms-2026)
- Payload v3 vs Strapi v5 — [dev.to](https://dev.to/royce_fabbd83cb268312e928/payload-cms-v3-vs-strapi-v5-for-saas-boilerplates-2026-3g0c); Sanity vs Strapi vs Payload — [dev.to](https://dev.to/nayankyada/sanity-vs-strapi-vs-payload-cms-an-honest-comparison-for-2026-44li)
- Cloudinary Free (fetched): 25 monthly credits. One credit equals 1,000 transformations, or 1 GB managed storage, or 1 GB image CDN bandwidth. The cheapest paid plan (Plus) is $89/mo billed yearly or $99/mo billed monthly, with 225 credits — [Cloudinary pricing](https://cloudinary.com/pricing)
- Vercel Hobby image optimisation: first 5,000 transformations, 300K cache reads and 100K cache writes per month. Pro overage is $0.05 per 1K transformations. If you exceed a Hobby limit you usually wait 30 days before you can use that feature again — [Vercel Hobby docs](https://vercel.com/docs/plans/hobby); [Vercel fair use](https://vercel.com/docs/limits/fair-use-guidelines)

### Inferences
- For one owner and a catalogue of a few hundred items, every free tier is enough on storage. The real limits are Supabase's pause after a week of inactivity (mitigate with a scheduled ping, or pay for Pro) and the lack of free Supabase image transforms (serve images through Next/Image on the host, or use Cloudinary's 25 credits).
- Keep everything in one place: catalogue, materials, categories and design requests all as Supabase tables. A separate CMS such as Sanity would split the data across two systems.
- Payload 3 on Postgres (which can be Supabase) is the best "real CMS" if a ready-made admin is wanted, but it needs a host that runs the full Next.js server and an S3/R2 storage adapter.
- Strapi and Directus are separate Node apps that need their own server. They suit a VPS more than serverless hosting. TinaCMS and Keystatic are Git/Markdown-based and suit text content more than a photo-heavy catalogue that changes often.

### Gaps
- Not verified this session: free-tier details for Strapi Cloud, Directus Cloud, TinaCMS and Keystatic Cloud. Their pricing pages were not fetched.
- Cloudflare R2's free tier (commonly cited as 10 GB with zero egress) was not verified this session.

## A2. Mobile-friendly admin for phone uploads

### Takeaway
I found no head-to-head test of uploading from a phone. The safest route for a non-technical owner on an Android phone is a purpose-built, simple "Add product" page in the app (camera/gallery input, a few fields, client-side image compression) rather than a general CMS admin.

### Cited Findings
- The only mobile claim found for Payload is a 2022 reviewer comment that the admin "works seamlessly on desktop and mobile". It is anecdotal and dated. Sanity's mobile-editing claims are its own marketing — [WebSearch synthesis of comparisons incl. Lucky Media, wisp.blog](https://www.wisp.blog/compare/payload/sanity)
- Pakistan: about 117 million internet users (October 2025) and 94.1 million social media user identities (October 2026, 36.1% of the population) — [DataReportal Digital 2026 Pakistan](https://datareportal.com/reports/digital-2026-pakistan); [Digital 2027 Pakistan](https://datareportal.com/reports/digital-2027-pakistan)

### Inferences
- A custom form can include fields that general CMSs do not have by default: price range (min/max PKR), materials as multi-select chips (sheesham, deodar, MDF/lasani, velvet, foam), category, and "customisable options".
- Compress images in the browser before upload to save mobile data and stay within the 1 GB Supabase storage limit.

### Gaps
- No measured comparison of mobile upload across Supabase Studio, Sanity, Payload, Strapi or Directus. Test on a real mid-range Android phone.
- I found no source for Android's exact market share in Pakistan this session. It is widely reported as dominant, but that is not cited here.

## A3. Handling custom design requests and notifying the owner

### Takeaway
Store each request (design JSON, preview image, customer name and phone) in the database, then notify for free. Use wa.me links with a prefilled message so the customer sends the request to the owner's WhatsApp, and send an email to the owner. Since October 2026 the WhatsApp Cloud API charges per message in Pakistan at rates about 11 times India's, so it is not worth it at launch.

### Cited Findings
- Pakistan WhatsApp Business Platform rates (per ProPakistani, from 1 October 2026): Marketing $0.0473, Utility $0.0150, Authentication $0.0150, Authentication-international $0.0750, Service $0.0150 per message. The new pricing ends free service messages and free utility templates within the 24-hour window. Meta gives 1,000 free service messages per business phone number per month. The article also contains a conflicting "October 11" date in one table — [ProPakistani, 15 Sep 2026](https://propakistani.pk/2026/09/15/meta-charges-pakistan-11x-more-than-india-for-whatsapp-business-messages/); [TechJuice](https://techjuice.pk/meta-to-charge-pakistani-businesses-11-times-more-than-india-for-whatsapp-messages)
- Meta updates WhatsApp pricing only on the first day of a quarter (1 Jan, 1 Apr, 1 Jul, 1 Oct) — [Meta WhatsApp pricing docs](https://developers.facebook.com/docs/whatsapp/pricing)
- WhatsApp Pay is not available in Pakistan. Businesses share Easypaisa, JazzCash and bank transfer details by hand over WhatsApp — [DHL social commerce Pakistan](https://www.dhl.com/discover/en-pk/e-commerce-advice/e-commerce-trends/social-commerce-strategy-pakistan)
- Competitors put WhatsApp front and centre. Interwood has a "Chat with us on WhatsApp" button. Habitt shows WhatsApp on every page ("Available 24/7 via chat") with an order-support WhatsApp number — [interwood.pk](https://interwood.pk/); [habitt.com](https://habitt.com/)

### Inferences
- Flow: the customer finishes a design, the app saves the request and returns a reference number, then opens `https://wa.me/92XXXXXXXXXX?text=<encoded summary + link to request>`. The owner gets it in normal WhatsApp at zero cost, and the owner also gets an email (Resend/Brevo free tiers, not verified here).
- The link to the request should open a read-only page showing the design image, so the owner can see it on a phone.

### Gaps
- Meta's official rate card for Pakistan was not opened directly. The figures above come from Pakistani tech press.

## A4. Hosting costs and commercial-use terms

### Takeaway
Vercel Hobby is free but contractually limited to personal or non-commercial use, so a shop website should go on Vercel Pro ($20/user/month), Cloudflare, Netlify, or the cheap Contabo VPS the team already has.

### Cited Findings
- Vercel Terms, section 4: "You shall only use the Services under a Hobby plan for your personal or non-commercial use." Commercial use is not defined — [Vercel Terms](https://vercel.com/legal/terms)
- Vercel Pro developer seats cost $20 per user per month (Viewer seats free). Hobby includes 100 GB Fast Data Transfer, 1M function invocations, 4 CPU-hours and 5K image transformations — [Vercel Hobby docs](https://vercel.com/docs/plans/hobby)

### Inferences
- For a business site, $20/month Vercel Pro is the low-friction compliant option. A Contabo VPS (already owned for other projects) can run Next.js and Payload/Directus for about the cost of the server, but someone has to manage it (SSL, updates, backups).

### Gaps
- Cloudflare Pages/Workers and Netlify free-tier commercial-use terms and current limits were not verified this session.

## B1. Competitor websites

### Takeaway
The big players (Interwood, Habitt, ChenOne) run full e-commerce sites with PKR prices, carts and WhatsApp support. Interwood offers AR previews. None offers an on-screen design configurator. Customisation in Pakistan is handled through consultation or fixed fabric/size options, and smaller made-to-order brands (ROCO, Renome, Poshish, Kalamkaar) take advance payments of 40 to 60%. A visual "design your own piece" tool would be new in this market.

### Cited Findings
- **Interwood** (fetched): prices in PKR (for example, a Quest 2-door wardrobe at Rs 84,000 marked down from Rs 120,000), cart, cards and bank transfer, a WhatsApp chat button, AR viewing of 3D models on a phone, "FREE Nationwide Delivery", order tracking, assembly, colour and fabric variants, a "Wedding Package Builder", English only — [interwood.pk](https://interwood.pk/). Showrooms in Lahore, Islamabad, Rawalpindi and Karachi. 1-year warranty. No refund for a change of mind. Cooper 3-seater PKR 131,560 — [ROCO guide](https://roco.pk/guide/best-furniture-brands-in-pakistan/). Corner sofas can be customised with "materials and colors of your choice" — [interwood.pk sofas](https://interwood.pk/collections/sofas?page=2)
- **Habitt** (fetched): a broad home store (furniture, decor, kitchen, appliances), PKR prices with sale strike-throughs, cart and checkout, WhatsApp order support at 0300-0422488 (Mon–Sat, 10 am–7 pm), an installment plan page, a bank-account payment page, interior design services, a "Make Your Own Bundle" category, no AR — [habitt.com](https://habitt.com/). Lead time 15–25 working days, advance of 50% or 100%, 6-month warranty, upholstery excluded, 24-hour window to report damage, Billy 3-seater PKR 46,256 — [ROCO guide](https://roco.pk/guide/best-furniture-brands-in-pakistan/). Listed as "Custom Furniture: No" — [nmfurnisher](https://nmfurnisher.com/best-furniture-shops-in-pakistan/)
- **ChenOne**: 24 stores in 17 cities, installments, exchange only within 3 days, 2-year wood warranty, 3+2+1 sofa sets from PKR 363,999 — [ROCO guide](https://roco.pk/guide/best-furniture-brands-in-pakistan/). One reviewer says the website "is functional but photography and product detail lag behind Interwood and Habitt". WhatsApp ordering is described as "Limited" — [roco/solidwood/nmfurnisher listings](https://solidwood.pk/best-furniture-brands-in-pakistan/)
- **Local Islamabad/Rawalpindi made-to-order competitors**: Renome (I-11 Islamabad, all orders custom, 60% advance, free delivery in Islamabad/Rawalpindi above a minimum order, Velmont 3+2 PKR 204,000). Poshish (two Islamabad showrooms, 20–25 working days made to order, 60% deposit, 2-year wood warranty, sets from PKR 45,000). ROCO (Multan, custom orders 4–6 weeks, 40% advance, WhatsApp ordering, 3D room-planning service). Kalamkaar (about 3 months, made to order). Enza Home (imported items 90–150 days). Celeste (made to order, swatch library, installments) — [ROCO guide (written by competitor ROCO; treat as biased)](https://roco.pk/guide/best-furniture-brands-in-pakistan/)
- Many brands "focus primarily on standardized production, which means limited flexibility in sizing, fabric choices, or wood customization" — [solidwood.pk](https://solidwood.pk/best-furniture-brands-in-pakistan/)
- **No Pakistani furniture site with a confirmed 3D configurator was found.** The closest are Interwood's custom corner-sofa options and Zavia Homes' design consultation. Configurators exist abroad (for example, Sackit's 3D configurator) — [Sackit](https://sackit.eu/pages/3d-configurator); [Zolak 3D sofa configurator](https://zolak.tech/3d-sofa-configurator)
- Other online destinations: furniturehub.pk and daraz.pk — [blogpakistan list](https://blogpakistan.pk/online-furniture-brands-in-pakistan/)

### Inferences
- Gaps Mehal can fill: (1) a visual custom designer, since no local competitor has one; (2) transparent "price range" display for custom work, since others show fixed prices for stock items only; (3) WhatsApp handoff from a finished design; (4) local Adyala Road / Rawalpindi focus with showroom visits.
- Expect to publish clear policies (advance %, lead time, warranty on wood and foam, delivery area), because reviewers criticise competitors most for missing or weak policies.

### Gaps
- Dolce Living, Rehaish, Arts & Interiors and Molty/Diamond sites were not reviewed this session (the ROCO guide does not cover them). Diamond Group appears only as the distributor of Dolce Vita Home.
- ChenOne's website was not fetched directly.

## B2. How Pakistani customers buy furniture

### Takeaway
Pakistan is still a cash-first, WhatsApp-first market: about 60% of online shoppers prefer cash on delivery. Discovery happens on Facebook and Instagram, and payments for custom work are a manual advance by bank transfer or Raast/Easypaisa/JazzCash, with the rest paid on delivery.

### Cited Findings
- A nationally representative Gallup & Gilani survey: 6 in 10 online shoppers prefer cash on delivery — [Dawn, "Still a cash-first economy"](https://www.dawn.com/news/1962597). DHL says nearly 70% — [DHL COD returns Pakistan](https://www.dhl.com/discover/en-pk/e-commerce-advice/e-commerce-best-practice/subscription-marketing/how-pakistani-e-commerce-sellers-can-reduce-cod-returns). Blogs claiming 85–95% are marketing estimates — [Selligate](https://selligate.com/?p=3064)
- SBP Q3 FY26: 434.5 million online purchases worth Rs 0.47 trillion through bank accounts and wallets — [SBP payment data via Tribune](https://tribune.com.pk/story/2615321/electronic-payments-reach-37b-transactions); [SBP Annual Payment Systems Review FY26](https://www.sbp.org.pk/assets/document/publications/Annual-Payment-Systems-Review-FY26.pdf)
- Social audience: NapoleonCat counts about 69 million Facebook and 26.6 million Instagram users in Pakistan in 2026, mostly men — [NapoleonCat](https://stats.napoleoncat.com/social-media-users-in-pakistan/2026/)
- Social commerce is mostly manual: no WhatsApp Pay, and payment details are shared in chat — [DHL social commerce](https://www.dhl.com/discover/en-pk/e-commerce-advice/e-commerce-trends/social-commerce-strategy-pakistan). Bank Alfalah launched a WhatsApp storefront (AlfaMall) in 2025 — [ProPakistani](https://propakistani.pk/2025/03/27/bank-alfalah-introduces-pakistans-first-e-commerce-shopping-platform-alfamall-on-whatsapp/amp/)
- Advance payment is the norm for custom furniture: 40% (ROCO), 60% (Renome, Poshish), 50–100% (Habitt) — [ROCO guide](https://roco.pk/guide/best-furniture-brands-in-pakistan/)
- Competitor sites are English-only (Interwood shows only English content) — [interwood.pk](https://interwood.pk/)
- Wedding demand: families buy carved furniture as dowry for daughters — [Dawn, "Wood you believe it?"](https://www.dawn.com/news/1128848/wood-you-believe-it). Interwood runs a "Wedding Package Builder" — [interwood.pk](https://interwood.pk/)

### Inferences
- Default call to action: "Send design on WhatsApp", not "Checkout". Show a price range ("from Rs X") instead of hiding prices, and state the advance percentage and the balance due on delivery.
- English UI with short Urdu helper text (or an Urdu toggle) would help reach older buyers and families buying for weddings. This is an inference; no source measured it.
- Bridal/jahez packages (bedroom set + dining + sofa) are a natural bundle to promote.

### Gaps
- No reliable 2026 data on Android share or mobile data costs in Pakistan was gathered. TikTok's role in furniture discovery was not sourced.

## B3. Local payment options (later)

### Takeaway
At launch, take the advance by bank transfer, Raast or wallet with the details shared on WhatsApp. Later, add a gateway such as Safepay (about 2.5% inclusive of tax per its help centre) or PayFast, which supports Easypaisa wallets. SBP has required online stores to support Raast.

### Cited Findings
- Safepay charges 2.5% per transaction (Rs 250 on Rs 10,000), which includes sales tax it pays on the merchant's behalf, with no yearly or minimum fees — [Safepay help centre](https://safepay.helpscoutdocs.com/article/120-how-much-does-safepay-charge); a third-party profile instead lists 2.9% + Rs 30 — [extruct.ai](https://www.extruct.ai/hub/getsafepay-pk/) (conflict; check before signing)
- Safepay's list of supported banks and wallets — [Safepay](https://safepay.helpscoutdocs.com/article/89-new-banks-from-which-customers-can-pay-merchants)
- PayFast lets Easypaisa wallet users pay online (2020 partnership) — [ProPakistani](https://propakistani.pk/2020/09/09/easypaisa-and-payfast-collaborate-to-accelerate-online-payments-in-pakistan/)
- SBP ordered banks and fintechs to enable Raast payments in online stores — [ProPakistani, Nov 2024](https://propakistani.pk/2024/11/29/sbp-orders-to-enable-raast-payments-in-online-shopping-stores/); [SBP Raast](https://www.sbp.org.pk/raast)
- Gateway overviews — [Payoneer guide](https://www.payoneer.com/resources/business/guide-to-payment-gateways-in-pakistan/); [XStak](https://xstak.com/blog/payment-gateways-in-pakistan)

### Gaps
- Current PayFast, JazzCash and Easypaisa merchant fee rates were not found. Ask each provider for a written quote.

## B4. Custom furniture norms in Rawalpindi/Islamabad

### Takeaway
Sheesham (tali) and deodar (diyar) are the main solid woods, alongside MDF/lasani for budget and built-in work. Carved Chinioti sheesham sets are popular for dowries. Custom lead times locally run about 3 to 6 weeks (20–25 working days to 4–6 weeks), with imported or high-end craft work taking up to 3–5 months.

### Cited Findings
- Deodar (diyar) and sheesham (tali) are the popular woods. Carpentry labour runs about PKR 500–800/sq ft plus materials of PKR 300–600/sq ft (total about PKR 800–1,400+/sq ft). Quotes may leave out carcass, edging, polish, hardware and installation — [Avenir carpentry costs](https://avenirdevelopments.com/house-construction-cost/woodwork-and-carpentry-costs-in-pakistan)
- ROCO uses sheesham, kikar and jamun as frame woods, with a 12-month foam warranty. Poshish gives 5 years on foam through the foam maker — [ROCO guide](https://roco.pk/guide/best-furniture-brands-in-pakistan/)
- Lead times: Poshish 20–25 working days, ROCO custom 4–6 weeks, Habitt 15–25 working days, Kalamkaar about 3 months, Enza imported 90–150 days — [ROCO guide](https://roco.pk/guide/best-furniture-brands-in-pakistan/)
- Chiniot has about 3,000–4,000 units and about 40,000 workers, and its hand-carving relies on sheesham and walnut — [TDAP wooden furniture report 2023](https://tdap.gov.pk/wp-content/uploads/2023/10/Report-on-Wooden-Furniture-Updated-on-17-Oct-2023.pdf). Tribune says Chiniot meets over 80% of national furniture demand. Inflation and a sheesham shortage are hurting the industry — [Tribune](https://tribune.com.pk/story/2055213/inflation-eating-chiniots-exquisite-furniture)
- Carved furniture is bought for dowry — [Dawn](https://www.dawn.com/news/1128848/wood-you-believe-it)
- Rawalpindi OLX asking prices for sheesham dining sets run from about Rs 40,000 to Rs 1.7 lakh (used or ready-made, not custom) — [OLX Cantt sheesham](https://www.olx.com.pk/cantt_g1425/q-sheesham)
- Fabric options at competitors include velvet (for example, Interwood's "Ivory Velvet") — [interwood.pk](https://interwood.pk/)

### Inferences
- Configurator material options should start with: sheesham, deodar, kikar, MDF/lasani (with sheet finish), and upholstery in velvet, jute or leatherette, with foam density options. Prices should be shown as ranges with a "final quote on WhatsApp" note.

### Gaps
- No sourced data on Molty foam pricing, how popular Turkish-style sofas are, or "gold-leg luxury" trends. Lasani board per-sheet prices were not found. Ask local suppliers on Adyala Road or in Raja Bazaar directly.
