# Free animation, transition and UI component resources for Mehal Furniture (Next.js App Router)

Research date: 2026-11-20. About 20 tool calls. Everything below is free or open source unless a paid tier is called out.

## GSAP: is it fully free (incl. former Club plugins), licence terms, @gsap/react useGSAP?

### Takeaway
Yes. Since Webflow's backing, GSAP is 100% free for commercial use, and that includes every former Club plugin (SplitText, ScrollSmoother, MorphSVG, DrawSVG, Flip, Inertia and the rest). It is not OSI open source. Its custom "no charge" licence has one real restriction: you cannot use it to build a visual no-code animation tool that competes with Webflow. A furniture website or design app is nowhere near that. `useGSAP` from `@gsap/react` is the official React/App Router hook.

### Cited Findings
- "GSAP is now 100% free for all users, thanks to Webflow's support"; "the entire GSAP library for free." — [GSAP pricing](https://gsap.com/pricing/)
- The licence covers "GSAP Products", meaning any software on gsap.com, plugins and extensions included. The FAQ says formerly members-only plugins such as SplitText and MorphSVG can be used commercially at no charge. Plugins listed: ScrollTrigger, ScrollSmoother, ScrollTo; DrawSVG, MorphSVG, MotionPath; Flip, Draggable, Inertia, Observer; SplitText, ScrambleText, TextPlugin; Physics2D, PhysicsProps, GSDevTools. — [GSAP Standard License](https://gsap.com/community/standard-license/)
- Restrictions:
  - Without written consent, you cannot use GSAP in no-code visual animation tools that "compete with Webflow's visual animation building capabilities".
  - You cannot reverse-engineer it to build competing products or remove its notices.
  - Webflow can terminate the licence on breach, and can amend it. Versions released before an amendment stay usable.
  - AI tools that generate GSAP code are explicitly allowed. — [GSAP Standard License](https://gsap.com/community/standard-license/)
- useGSAP setup:
  - Install `npm i gsap @gsap/react`, then call `gsap.registerPlugin(useGSAP)`.
  - Add `"use client"` in the App Router.
  - Pass `{ scope: containerRef }` so selectors only match that container.
  - Everything created inside (tweens, ScrollTriggers, Draggables, SplitText) is reverted on unmount through `gsap.context()`. `revertOnUpdate` controls what happens when dependencies change.
  - Wrap handlers created later (clicks, timeouts) in `contextSafe()`. — [GSAP React guide](https://gsap.com/resources/React/)

### Inferences
- GSAP should be the core animation engine for Mehal, covering scroll storytelling, SplitText reveals, Flip gallery-to-detail, and DrawSVG for jali/arch line drawings. The licence risk is nil for a retail site or a customer design app.
- The design app should not become a "visual animation builder" product. A room or furniture configurator is fine.
- Use `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` to gate animations. This is from general GSAP knowledge; the React page did not mention it, so check the [gsap.matchMedia docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()).

### Gaps
- I did not find exact gzip sizes for GSAP core or ScrollTrigger in this session. They are commonly quoted as about 25 KB core and about 12 KB ScrollTrigger gzipped (unverified).

## Lenis, Motion (Framer Motion) free vs Motion+, View Transitions API + Next.js, Barba.js, Theatre.js, Anime.js v4, Rive, Lottie/dotLottie

### Takeaway
Recommended stack:
- **Lenis** for smooth scroll: MIT, a few KB, respects reduced motion by default.
- **GSAP** for scroll and timeline work.
- **Motion** for React component micro-interactions and layout animations. The library is MIT and free. Motion+ costs $399 one-time and is optional.
- **View Transitions** are now cross-browser for same-document transitions (Chrome/Edge 111+, Safari 18+, Firefox 144+, about 93% global). Next.js `experimental.viewTransition` is still flagged as not for production.
- **Barba.js** does not fit Next.js because it is PJAX for multi-page sites. **Theatre.js** is effectively stalled.
- **Rive** runtimes are MIT, but exporting needs a paid plan.
- **Free LottieFiles** animations can be used commercially under the Lottie Simple License.

### Cited Findings
**Lenis**
- MIT licence, "a few KB", zero dependencies. Install examples reference lenis@1.3.27.
- `lenis/react` provides the ReactLenis wrapper.
- Import `lenis/dist/lenis.css`.
- `autoRaf` defaults to false. When you drive Lenis from the GSAP ticker, leave it false.
- GSAP sync: call `lenis.on('scroll', ScrollTrigger.update)`, run `gsap.ticker.add(t => lenis.raf(t*1000))`, then `gsap.ticker.lagSmoothing(0)`.
- `respectReducedMotion` defaults to true: smoothing is disabled and programmatic scrolls jump instantly. Native `position: sticky` and anchors keep working. — [Lenis GitHub](https://github.com/darkroomengineering/lenis)

**Motion (formerly Framer Motion)**
- The open-source library, Motion Studio editor, basic examples and docs are free.
- Motion+ is "$399 USD" one-time, with per-seat yearly pricing for teams. It adds:
  - 520+ examples and 110+ tutorials
  - Motion UI components: Carousel, Ticker, Cursor, AnimateNumber, AnimateText, Typewriter, ScrambleText, AnimateView, Curtains, splitText, and 50 animated sections
  - AI Kit, and Performance Doctor
- The page says the Motion+ APIs and examples are MIT. — [Motion+](https://motion.dev/plus), [Motion pricing](https://motion.dev/pricing)
- Bundle sizes, from Rollup builds (Webpack builds come out slightly larger):
  - Full `motion` component: 43 KB
  - `m` + `LazyMotion`: just over 5 KB initial, plus `domAnimation` (+24 KB) or `domMax` (+38 KB, which adds layout/drag)
  - `useAnimate` mini: 3.3 KB — [Motion: reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size)

**View Transitions API**
- Same-document support:
  - Chrome/Edge: from 111
  - Safari: from 18.0
  - Firefox: from 144 (disabled by default in 143)
  - About 93.17% global usage — [caniuse](https://caniuse.com/view-transitions)
- Next.js: enable with `experimental.viewTransition: true` and `import { ViewTransition } from 'react'`.
  - Docs as of v16.2.x say the feature is "experimental and subject to change, not recommended for production".
  - Route navigations count as transitions, so `<ViewTransition>` animates during navigation.
  - In Next 15 the component was `unstable_ViewTransition`. — [Next.js viewTransition config](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition), [Next.js View Transitions guide](https://nextjs.org/docs/app/guides/view-transitions)
- React says `<ViewTransition>` is only in its Canary/Experimental channels. A Vercel agent-skills reference says the App Router bundles canary React internally, so you should not install react@canary yourself. That second claim is third-party, so treat it as unconfirmed. — [React ViewTransition ref](https://uk.react.dev/reference/react/ViewTransition), [React Labs post](https://react.dev/blog/2025/04/23/react-labs-view-transitions-activity-and-more), [vercel-labs skill](https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-view-transitions/references/nextjs.md)
- Motion's magazine has a write-up on React's experimental API. — [motion.dev magazine](https://motion.dev/magazine/reacts-experimental-view-transition-api)

**Page transitions in the App Router (non-View-Transition route)**
- A GSAP moderator says per-page animate-in/animate-out is "not possible with the app router" and suggests overlay (curtain) transitions instead. — [GSAP forum thread](https://gsap.com/community/forums/topic/39460-page-transition-with-gsap-in-nextjs-app-router/)
- `next-transition-router` is under 8 KB and built for animated transitions in the App Router. — [next-transition-router](https://docsearch.algolia.com/mcp/docs/repo/ismamz/next-transition-router)
- Example repo with a demo: [diarpu/nextjs-app-directory-page-transitions](https://www.github.com/diarpu/nextjs-app-directory-page-transitions)
- Codrops (Oct 2026), "Building Parallel Page Transitions with GSAP and React Router", notes that the App Router makes this "a bit tricky". — [Codrops](https://tympanus.net/codrops/2026/10/08/building-parallel-page-transitions-with-gsap-and-react-router/)

**Barba.js**
- The latest release found was @barba/core 2.10.3 (Aug 2024). v1 is unmaintained. — [Barba releases](https://github.com/barbajs/barba/releases/latest), [CSS Script](https://www.cssscript.com/smooth-page-transitions-javascript-pjax-barba-js/)
- A Codrops Feb 2026 tutorial uses Barba with Astro, not Next. — [Codrops WebGL gallery](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/)

**Theatre.js**
- The last official release found was v0.7.0 (Aug 2023). The README still says "1.0 is around the corner", and development moved to a private repo. — [Theatre GitHub](https://github.com/theatre-js/theatre), [Best of JS](https://bestofjs.org/projects/theatrejs), [Theatre releases](https://www.theatrejs.com/docs/0.5/releases)

**Anime.js v4**
- MIT, ES modules with named exports and sub-path imports (`animejs/timeline`, `animejs/timer`). — [GitHub](https://github.com/juliangarnier/anime), [npm](https://npmjs.com/package/animejs)
- Size figures conflict (about 10 KB vs 24.5 KB gzipped full bundle), so measure in your own build. — [skills.lc](https://skills.lc/bowtiedswan/animejs-skills/animejs)

**Rive**
- "the Editor is free to use, our runtimes are open-source under MIT". — [Rive blog: new pricing](https://rive.app/blog/new-pricing)
- A newer post says exports move to paid plans. — [Rive $9/mo plan](https://rive.app/blog/rive-s-new-9-mo-plan)
- Third-party sites say Cadet costs about $9/seat/month and unlocks .riv export, while the free plan is limited to 3 files. Not verified on rive.app. — [makerstack](https://makerstack.co/reviews/rive-review/), [Rive pricing docs](https://rive.app/docs/account-admin/pricing)

**Lottie**
- Free LottieFiles animations fall under the Lottie Simple License. You can use them commercially in websites, apps and products.
- Derivatives stay under the same licence, with no DRM or extra terms allowed.
- You cannot scrape animations to build a competing service. — [LottieFiles help: commercial use](https://help.lottiefiles.com/hc/en-us/articles/900002438343-Can-I-use-a-free-animation-on-Lottiefiles-for-commercial-business-use), [Licence page](https://lottiefiles.com/free-animations/licence)
- Sources conflict on attribution and on per-creator licences. One LottieFiles doc says the licence "varies by creator", so check each animation's page. — [LottieFiles premium docs](https://docs.lottiefiles.com/en/integrations/after-effects/02_explore/premium-animations)

### Inferences
- **Recommended wiring:**
  - Root `layout.tsx` has a client `<SmoothScroll>` provider: ReactLenis with autoRaf off, driven by the GSAP ticker.
  - Section components use `useGSAP` + ScrollTrigger.
  - Small UI states (menus, drawers, hover cards, cart) use Motion `m` + LazyMotion to keep bundles small.
  - Page transitions use either a GSAP curtain overlay (cream panel with a gold line, deep-green logo) through `next-transition-router`, or `<ViewTransition>` once it leaves experimental. The View Transition API is also fine for progressive enhancement, since unsupported browsers just swap instantly.
- **Pick one smooth scroller.** Lenis and GSAP ScrollSmoother both hijack scroll. Lenis is lighter and the de facto choice; ScrollSmoother adds built-in `data-speed` parallax.
- **Skip Barba.js and Theatre.js** for a Next.js App Router project.
- **Anime.js** duplicates GSAP, so there is no need to add it.
- **Use dotLottie (.lottie) files** with `@lottiefiles/dotlottie-react` for small icon animations: loader, add-to-cart tick, WhatsApp CTA. This is from general knowledge; dotLottie is a zipped and smaller format.
- **Rive** only if the free-plan export limits allow it. Otherwise use Lottie.

### Gaps
- I did not verify @lottiefiles/dotlottie-web's licence or size this session. It is believed to be MIT.
- I did not confirm Next.js 16's exact status on making viewTransition stable after 16.2.x.
- I did not find official Rive free-plan limits on rive.app itself.

## Free component libraries with animated effects: which suit a luxury furniture site

### Takeaway
Licences:
- Magic UI: MIT
- Motion Primitives: MIT, beta
- Cult UI: MIT
- shadcn/ui: MIT
- React Bits: MIT + Commons Clause. Free for commercial sites, but you cannot sell the components themselves.
- Aceternity: free core plus paid Pro, under a custom licence that allows end products for you or clients but not reselling or templates.
- Skiper UI and Animata: licences unconfirmed.

All of them are copy-paste, shadcn-registry style, so they drop into Next.js + Tailwind directly.

### Cited Findings
- Magic UI is MIT. It has Text Reveal (fades text in on scroll), Box Reveal, Marquee (infinite scroll) and Morphing Text. — [Magic UI text-reveal](https://magicui.design/docs/components/text-reveal), [box-reveal](https://magicui.design/docs/components/box-reveal), [components](https://magicui.design/components), [21st.dev Magic UI](https://21st.dev/@dillionverma/library/magic-ui.md)
- Aceternity:
  - The brand page claims 200+ free components, 100+ premium blocks and 30+ templates. — [brand facts](https://ui.aceternity.com/brand-facts)
  - Pro pricing per third parties: Annual about $169, Lifetime about $199, Team about $1,590. — [toolradar](https://toolradar.com/tools/aceternity-ui/pricing), [Aceternity Pro](https://ui.aceternity.com/pro)
  - Licence: "unlimited end products for yourself or your clients"; end products may be sold. You cannot resell the items or derivatives on marketplaces, build templates or themes for sale, or redistribute the source. The same terms apply to free and paid items. — [Aceternity licence](https://ui.aceternity.com/licence)
- React Bits is "MIT + Commons Clause", free for personal and commercial use. The Commons Clause bars selling the software itself. React Bits Pro is a separate paid product. — [React Bits README](https://raw.githubusercontent.com/DavidHDev/react-bits/main/README.md), [Pro vs free](https://pro.reactbits.dev/compare/react-bits-pro-vs-free-react-bits)
- Motion Primitives (ibelick) is MIT and still beta. — [ecosyste.ms](https://awesome.ecosyste.ms/projects/github.com%2Fibelick%2Fmotion-primitives), [21st.dev listing](https://21st.dev/@ibelick/library/motion-primitives.md)
- Cult UI is MIT, free for personal and commercial use, with no attribution required. — [ecosyste.ms](https://awesome.ecosyste.ms/projects/github.com%2Fnolly-studio%2Fcult-ui)
- Skiper UI is described as "copy and paste… open source", but no licence was found. — [shadcn.io listing](https://www.shadcn.io/template/skiper-ui-skiper-ui)
- 21st.dev hosts community components, including a "hero scrub" scroll-video hero, and open-source icons. — [21st.dev hero-scrub](https://21st.dev/@duthiljean/components/hero-scrub), [21st.dev icons](https://21st.dev/icons)

### Inferences
Component-to-need map. Names are from general knowledge of these libraries; check that each exists before installing.

| Effect | Where to get it |
|---|---|
| Text reveal (line or word split) | GSAP SplitText (best), or Magic UI Text Reveal / Box Reveal, or React Bits SplitText / BlurText |
| Image clip-path / mask reveal | Hand-written GSAP `clipPath: inset()` tween, or Codrops SVG-mask tutorial (below) |
| Marquee (brands, "Handcrafted in Rawalpindi") | Magic UI Marquee, or Motion+ Ticker (paid) |
| Parallax gallery | GSAP ScrollTrigger `yPercent` scrub, or Aceternity Parallax Scroll |
| Hover image trail (collection names) | React Bits ImageTrail, or Codrops image-trail demos |
| Magnetic buttons | Motion Primitives Magnetic, or a 20-line GSAP quickTo |
| Custom cursor | Motion Primitives Cursor, or React Bits; Motion+ Cursor is paid |
| Preloader | Custom GSAP counter + curtain (keep under about 1.5 s) |
| Horizontal scroll gallery | GSAP pinned ScrollTrigger with an `x` tween; disable on mobile |
| 3D card tilt | Aceternity 3D Card, or React Bits TiltedCard; Motion Primitives also has a Tilt |

- Avoid neon, glow and "AI-startup" effects (beams, sparkles, meteors, gradients). They clash with a luxury deep-green, mustard and cream palette. Restraint reads as premium: slow eases (`power3.out`, `expo.out`), 0.8–1.2 s durations, and cream curtains with thin gold rules.
- Magic UI's MCP and the shadcn MCP are available in this environment, so components can be pulled straight from the registries.

### Gaps
- Animata licence: no results found.
- Skiper UI licence: not confirmed. Check each repo's LICENSE file before commercial use.

## Signature techniques on award-winning furniture/interior sites, with tutorials

### Takeaway
The recurring award-site vocabulary is:
- SplitText line reveals
- clip-path or SVG-mask image reveals
- slow parallax
- curtain overlay page transitions
- pinned sticky storytelling
- scroll-scrubbed product rotation (canvas image sequence or video)
- subtle WebGL image distortion on hover

All of these have free GSAP/Codrops tutorials.

### Cited Findings
- "SVG Mask Transitions on Scroll with GSAP and ScrollTrigger" (Codrops, Mar 2026) covers four fullscreen image-reveal patterns (grid, blinds, shuffled cells). — [Codrops](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/)
- "Sticky Grid Scroll" (Codrops, Mar 2026) is a scroll-driven animated grid using GSAP, ScrollTrigger and Lenis. — [Codrops](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)
- "Infinite GSAP Scroll Gallery with Parallax and Flip Transitions" (Codrops, Jul 2026) uses Observer, Flip and SplitText. — [Codrops](https://tympanus.net/codrops/2026/07/30/building-an-infinite-gsap-scroll-gallery-with-parallax-and-flip-transitions/)
- "Layered Zoom Scroll Effect with ScrollSmoother and ScrollTrigger" (Codrops, Oct 2025). — [Codrops](https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger/)
- "Scroll-Revealed WebGL Gallery" (GSAP + Three.js shader reveal, Feb 2026). — [Codrops](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/)
- "How to Build Cinematic 3D Scroll Experiences with GSAP" (Nov 2025). — [Codrops](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/)
- "Exploring 3D Image Rotations on Scroll" uses an image atlas on a cylinder in WebGL. — [Codrops](https://tympanus.net/codrops/?p=116660)
- Scroll-driven product rotation (image sequence):
  - GSAP's official `imageSequence` helper takes image URLs, a canvas and a ScrollTrigger config (`scrub: true`, `end: "max"`). — [GSAP helper](https://gsap.com/docs/v3/HelperFunctions/helpers/imageSequenceScrub)
  - AirPods-style CodePen: tween a `frame` with `snap: "frame"` and `scrub: 0.5`. — [CodePen (osublake)](https://codepen.io/osublake/pen/2152a28cffe2c2c0cca8a3e47f7b21c6), [GSAP forum](https://gsap.com/community/forums/topic/25188-airpods-image-sequence-animation-using-scrolltrigger/)
  - Builder.io approach: a 300vh container with a sticky canvas, all frames preloaded, compressed JPEG/AVIF served from a CDN. — [Builder.io 3D GSAP](https://www.builder.io/blog/3d-gsap)
- curtains.js: "lightweight vanilla WebGL" library that turns DOM images into textured planes. MIT, with react-curtains and vue-curtains wrappers. Its successor is gpu-curtains (WebGPU). — [curtains.js](https://www.curtainsjs.com/), [npm gpu-curtains](https://npmjs.com/package/gpu-curtains), [Codrops WebGL video transitions with curtains.js](https://tympanus.net/codrops/?p=51333)
- Codrops publishes a "Interlude" starter for custom page transitions (Astro), useful as a pattern reference. — [Codrops](https://tympanus.net/codrops/2026/10/07/interlude-astro-page-transitions/)

### Inferences
Mehal homepage storyboard:
1. Cream preloader with a gold arch DrawSVG line.
2. Hero headline SplitText line reveal over a deep-green full-bleed sofa shot that unmasks through an arch-shaped `clip-path`. Arch masks tie to the Mughal/jali brand.
3. Marquee of craft words.
4. Pinned "From Rawalpindi workshop to your home" sticky story (wood, joinery, upholstery steps).
5. Scroll-scrubbed 360° rotation of a hero chair (36–72 AVIF frames on a canvas).
6. Horizontal collection gallery on desktop only.
7. Hover image trail on the collection list.
8. Curtain page transition into product pages, with a Flip shared-element image.

Other notes:
- WebGL distortion (OGL or curtains.js) is an optional desktop-only extra. It adds weight and GPU cost on mid-range Android.
- For the design app (room planner), React Three Fiber/Three.js is the 3D layer. That is outside this note's scope.

### Gaps
- I did not compile specific Awwwards-winning furniture sites (for example Awwwards "furniture" collections) this session.
- OGL's licence and size were not verified (believed MIT and about 8–13 KB).

## Performance and accessibility (reduced motion, mid-range Android, Core Web Vitals, bundle sizes)

### Takeaway
Keep the motion budget small:
- Motion through LazyMotion, about 5 KB plus 24 KB.
- Lenis is a few KB.
- GSAP is loaded only in client components.

Respect `prefers-reduced-motion` (Lenis does this by default; gate GSAP with matchMedia). Preload and compress image sequences, and drop WebGL and horizontal pinning on mobile.

### Cited Findings
- Lenis `respectReducedMotion` is on by default; its maintainers discourage opting out. — [Lenis](https://github.com/darkroomengineering/lenis)
- Motion sizes: full 43 KB vs `m` + LazyMotion about 5 KB, plus 24 or 38 KB features, vs `useAnimate` mini at 3.3 KB. — [Motion docs](https://motion.dev/docs/react-reduce-bundle-size)
- `useGSAP` reverts animations on unmount, which prevents leaks across App Router navigations. — [GSAP React](https://gsap.com/resources/React/)
- Image sequences: preload frames, compress to JPEG/AVIF, serve from a CDN, cache aggressively. — [Builder.io](https://www.builder.io/blog/3d-gsap)

### Inferences
- **LCP:** never hide the hero image or headline behind a preloader or an opacity-0 initial state that waits for JS. Render the hero visible on the server (`next/image priority`), then animate from a CSS state. A long preloader directly worsens LCP.
- **CLS:** reserve sizes for split-text lines and images. SplitText wraps lines, so run it after fonts load (`document.fonts.ready`) to avoid reflow.
- **INP:** animate only `transform`, `opacity` and `clip-path`. Avoid animating layout properties or `filter: blur` on large areas, which is heavy on mid-range Android.
- **Mobile:** use `gsap.matchMedia()` to disable pinning, horizontal scroll, image trails, cursors and WebGL below about 768px or on `(pointer: coarse)`. Lenis on touch defaults to native scroll, so keep it that way.
- **Code-splitting:** dynamic-import the heavy parts (`next/dynamic`, `ssr:false`): WebGL, the 3D configurator, Lottie players.
- **Accessibility:**
  - Keep focus visible on magnetic buttons.
  - Do not hide nav behind the cursor.
  - Make marquees pausable or `aria-hidden` with a static duplicate.
  - SplitText has an `aria` option that keeps screen-reader text intact (from general knowledge; verify in the SplitText docs).

### Gaps
- No measured Core Web Vitals data was found for GSAP/Lenis sites specifically.
- No benchmark numbers were found for mid-range Android devices.

## Free icon sets and decorative Islamic-geometric / arch / jali SVG resources

### Takeaway
Icons:
- **Lucide** (ISC, plus MIT for the Feather-derived parts) and **Phosphor** (MIT, six weights including thin and light, which suit luxury) are both free for commercial use.
- **Iconify** aggregates 200k+ icons, but each set keeps its own licence.

For patterns, I found no ready CC0 jali/arch SVG pack. Free marketplace items (Vecteezy, Creative Fabrica) come with their own licences or trial limits. Generators such as pattern.monster (MIT code) and Hero Patterns (CC BY 4.0) work, and the arches and jali are best drawn custom as SVG.

### Cited Findings
- Lucide: "totally free for commercial use and personal use… ISC License"; Feather-derived portions are MIT (© Cole Bemis). — [Lucide licence](https://lucide.dev/license), [discussion #4236](https://github.com/lucide-icons/lucide/discussions/4236)
- Phosphor is MIT. — [Phosphor LICENSE (CTAN mirror)](https://ctan.uib.no/fonts/phosphoricons/LICENSE)
- Phosphor has furniture-relevant icons such as "chair". — [composables Phosphor chair](https://composables.com/icons/icon-libraries/phosphor/chair)
- Iconify set index, licence per set. — [icon-sets.iconify.design](https://icon-sets.iconify.design/streamline/page-2.html)
- pattern.monster is a free generator with MIT code. Export terms for generated patterns are not spelled out. — [alternativeto](https://alternativeto.net/software/pattern-monster/about), [Creative Bloq pattern generators](https://www.creativebloq.com/design/design-software/the-best-free-pattern-generators)
- Hero Patterns is listed as CC BY 4.0, attribution required. Official site not checked. — [SVGRepo Hero Patterns](https://www.svgrepo.com/tool/hero-patterns/)
- Islamic arch and jali vectors on Creative Fabrica and Envato are subscription or trial gated. Vecteezy's are "Free with trial / No attribution required" under the Vecteezy licence, not CC0. — [Creative Fabrica arch pattern](https://www.creativefabrica.com/product/islamic-arch-window-pattern-vector/), [Vecteezy islamic geometric](https://www.vecteezy.com/vector-art/6058442-islamic-geometric-pattern), [Envato](https://elements.envato.com/crescent-islamic-geometric-pattern-ELQBK9J)

### Inferences
- Use Phosphor "light" or "thin" as the primary icon weight for an elegant line look, and Lucide for UI utility icons. Both tree-shake per icon.
- An Iconify MCP is available in this environment for searching sets, including Phosphor, Tabler and Material Symbols. Check each set's licence field.
- The safest route for brand patterns is to draw 3–4 custom SVGs:
  - a Mughal multifoil arch frame
  - an 8-point star (khatam) tile
  - a jali lattice tile
  - a thin gold border
  Use them as CSS `mask-image` or background tiles in mustard/gold on cream or deep green. They are fully owned, tiny, and animatable with DrawSVG. Classic geometric constructions such as the 8-fold rosette are public-domain mathematics.
- For CC0 sources, check Openverse or Wikimedia Commons with a CC0 filter, and SVG Repo (licence per item).

### Gaps
- I did not verify a specific CC0 Islamic-pattern SVG collection.
- I did not check pattern.monster's terms for exported patterns or the official Hero Patterns site.
- Iconify's per-set licences were not enumerated.
