# Mehal Furniture

Website and custom-furniture design app for Mehal Furniture, Adyala Road, Rawalpindi.
Everything runs on free tools: no paid APIs, no paid 3D models, no accounts needed.

## What's in it

| Page | What it does |
|---|---|
| `/` | Home: arch hero, ways to start, featured pieces, materials, how ordering works, showroom |
| `/collection` | Every piece, filterable by category |
| `/pieces/[slug]` | Photos, description, "what it's made of", customise / restyle / ask on WhatsApp |
| `/studio` | 3D designer for sofas, beds and tables: shape, legs, fabric, colour, pattern, "see it in your room" (AR) |
| `/restyle` | Upload a photo, tap the sofa, try new fabric/colour/pattern (AI runs on the customer's phone) |
| `/admin` | Owner: add/edit pieces from a phone, see customers' designs and mark their progress |

Every design ends with **"Send this design on WhatsApp"**: the design is saved for the owner and
WhatsApp opens with every choice written out, sent to 0335-5936102.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Owner login is at `/admin`. Set `ADMIN_PASSWORD` in `.env.local` (see `.env.example`); until then
the temporary password is `mehal-admin`.

## Where data lives

The catalogue and customer designs are in `data/db.json`, uploaded photos in `data/uploads/`
(both git-ignored, created on first run with ten sample pieces). Back up that folder. The sample
pieces use free Pexels photos and are marked "Sample" in the admin; replace them with real photos.

Because data is kept on disk, host it somewhere with a persistent disk (a VPS such as the
existing Contabo server: `npm run build && npm start` behind a reverse proxy). Serverless hosts
like Vercel would lose uploads; switching `src/lib/store.ts` to Supabase's free tier fixes that.

## Free tools used

- Next.js 16, React 19, Tailwind 4
- 3D: three.js, React Three Fiber, drei. All furniture and fabric textures are generated in code.
- AR: Google `<model-viewer>` (loaded from jsDelivr when the customer taps "See it in your room")
- Photo restyle: SlimSAM via transformers.js, downloaded from Hugging Face to the customer's browser
- Motion: GSAP (free, incl. SplitText, DrawSVG, Flip), Lenis smooth scroll; arch curtain page transitions; two pieces adapted from 21st.dev (Image Reveal, Disc Reveal List)
- Fonts: Gambarino + General Sans (Fontshare, ITF Free Font Licence), Gulzar for Urdu (Google Fonts, OFL)

Research behind these choices: `docs/reports/Mehal Furniture app research.md`.
