# 3D Furniture Assets and Web Configurator Technology (Mehal Furniture)

Research date: 2026-11-20. About 20 tool calls. Items under "Cited Findings" come from pages fetched or searched in this session. Items under "Inferences" use the cited material plus general engineering knowledge, and are marked as such.

## 1. Free, commercially usable 3D furniture models

### Takeaway
Poly Haven (85 CC0 furniture models, including 5 sofas, 3 armchairs, 3 beds, 8 coffee tables and a dining table and chairs) is the best free, high-quality, commercial-safe source. Kenney and Quaternius are CC0 but low-poly or cartoon style, which is fine for wireframes but not for a luxury store. Sketchfab sofas are mostly CC-BY, so attribution is required. No free source has Mehal's actual tufted, gold-legged or carved pieces, so production models should be custom made. Free models are useful for prototyping.

### Cited Findings
- Poly Haven: every asset (HDRIs, textures, models) is **CC0**. Commercial use is allowed, attribution is not required, and assets can go into products you sell. Site logos, renders and text are not CC0, and the Terms of Service forbid scraping. — [Poly Haven License](https://polyhaven.com/license)
- Poly Haven furniture category: **85 models**. Sofas: Sofa_01, sofa_02, sofa_03, chinese_sofa, painted_wooden_sofa. Armchairs: ArmChair_01, chinese_armchair, modern_arm_chair_01. Beds: GothicBed_01, old_bed_frame, vintage_day_bed. Coffee tables: CoffeeTable_01, coffee_table_round_01, gothic_coffee_table, industrial_coffee_table, modern_coffee_table_01/02, chinese_tea_table, WoodenTable_01. Dining: dining_table, dining_chair_02, WoodenChair_01, round_wooden_table_01/02. Also Ottoman_01, ClassicConsole_01, ClassicNightstand_01, ornate_mirror_01 and GothicCabinet_01. — [Poly Haven API, furniture models](https://api.polyhaven.com/assets?type=models&categories=furniture) (browse at [polyhaven.com/models/furniture](https://polyhaven.com/models/furniture))
- Kenney Furniture Kit: **CC0**, about 140 files, including chairs, sofas, tables, bookcases, kitchen and bathroom. Crediting "Kenney.nl" is optional. — [Kenney Furniture Kit](https://kenney.nl/assets/furniture-kit); [OpenGameArt listing](https://opengameart.org/content/furniture-kit)
- Quaternius low-poly furniture pack: **CC0**. — [OpenGameArt, furniture low poly](https://opengameart.org/content/furniture-low-poly)
- Sketchfab: the sofas found in search (for example "sofa made in blender, textured in substance painter" and "sofa on wheels") are **CC Attribution**, so credit to the creator is required. No CC0 sofa came up. — [Sketchfab sofa 1](https://sketchfab.com/3d-models/sofa-dfec02dbf6b44839aed663693e3f170a), [sofa 2](https://sketchfab.com/3d-models/sofa-e2062d76f5a9444db8b00dbfea600041), [Vintage Chesterfield sofa, game ready](https://sketchfab.com/3d-models/vintage-chesterfield-sofa-3d-model-game-ready-25c5b33b6cf343c89d8c46bc2acb9c6c) (license not checked; a Chesterfield is the closest style match to tufted sofas)
- Khronos glTF Sample Assets, furniture items: **SheenChair** (Wayfair, **CC0**, demonstrates material variants and sheen fabric); **SheenWoodLeatherSofa** (CC BY 4.0, sheen, specular and high-quality tiling textures); **SpecularSilkPouf** (Wayfair, CC BY 4.0); SheenCloth (CC0). — [Khronos glTF Sample Assets showcase](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Models-showcase.md); [SheenWoodLeatherSofa page](https://github.khronos.org/glTF-Assets/model/SheenWoodLeatherSofa)
- CGTrader and TurboSquid sofas often offer glTF downloads but use royalty-free or custom licenses, not CC0. — [TurboSquid glTF leather sofas](https://www.turbosquid.com/Search/3D-Models/leather-sofa/gltf); [CGTrader Victorian elegance sofa](https://www.cgtrader.com/3d-models/interior/living-room/victorian-elegance-sofa)

### Inferences
- **SheenChair (CC0) is the ideal test asset.** It already uses KHR_materials_variants and sheen, so it can prove the whole pipeline (variants, AR, compression) before custom models exist.
- For gold-legged coffee tables and carved dining sets, Poly Haven's gothic_coffee_table, ClassicConsole_01, GothicBed_01 and ornate_mirror_01 are the closest in style. They are useful as placeholders or room props, not as Mehal's catalogue.
- None of the free models are built as modular parts (separate arms, legs and seat). They would need cutting apart in Blender before they can be configured.
- From general knowledge (not checked in this session): Poly Haven models download as glTF, blend and fbx up to 4k–8k. Kenney and Quaternius ship glTF/GLB/FBX/OBJ. Poly Pizza hosts mixed CC0 and CC-BY low-poly models. BlenderKit's free assets use a royalty-free licence, but they are .blend only and need export. IKEA does not offer its 3D models for reuse.

### Gaps
- The Poly Pizza licence page returned 404, so its licence mix was not confirmed.
- The Sketchfab licences help page returned 404, so the full list (CC BY, BY-SA, BY-ND, BY-NC, CC0, Standard, Editorial) and its commercial terms were not checked against the live page. The general rule is that NC and ND are unsuitable for a store and BY needs on-site credit, but verify per model.
- BlenderKit free licence terms and IKEA asset terms were not checked.
- Poly Haven model polygon counts and file sizes were not retrieved.

## 2. Free PBR textures (fabric, wood, marble, gold, patterns)

### Takeaway
Poly Haven (CC0) and ambientCG (CC0) cover everything Mehal needs, with no licence risk. Poly Haven alone has 43 fabric textures, including velour velvet, wool boucle, rough linen, six leathers and two damask or jacquard patterns.

### Cited Findings
- ambientCG: all assets are **CC0 1.0 Universal**, including downloads and preview renders. Commercial use, modification and redistribution are allowed, and raw files can ship inside a product. Credit is optional; the suggested line is "Created using <asset> from ambientCG.com, licensed under CC0 1.0". — [ambientCG License](https://docs.ambientcg.com/license/)
- ambientCG categories include Fabric, Leather, Wood, Wood Floor, Painted Wood, Marble, Metal, Painted Metal and Sheet Metal. — [ambientCG fabric list](https://ambientcg.com/list?type=material&q=fabric)
- Poly Haven fabric textures (**43**, CC0): velour_velvet, ribbed_corduroy, wool_boucle, curly_teddy_natural, curly_teddy_checkered, rough_linen, hessian_230, hessian_380, poly_wool_herringbone, brown_leather, leather_white, leather_red_02/03, fabric_leather_01/02, scuba_suede, **quatrefoil_jacquard_fabric** (burgundy brocade, tagged damask and matelassé), **floral_jacquard**, fabric_pattern_05 (plaid), fabric_pattern_07 (check), gingham_check, crepe_satin and others. — [Poly Haven API, fabric textures](https://api.polyhaven.com/assets?type=textures&categories=fabric); [Poly Haven License](https://polyhaven.com/license)

### Inferences
- Plan the fabric library as about 6 base weaves (velvet, linen, boucle, leather, chenille, jacquard) × N colours. Keep a **greyscale or neutral base colour map and tint it in code** (`material.color`) so 30 colours do not need 30 texture sets. Use velvet with `sheen` (KHR_materials_sheen) for the luxury look.
- Patterns: use a tileable pattern image as `map` with `repeat` set from real-world size, so the pattern scale stays fixed as the sofa length changes (see Q3 on texture stretching).
- Sheesham or rosewood: there is probably no exact CC0 sheesham. A reddish-brown walnut or rosewood from ambientCG or Poly Haven, colour-shifted, will do. Mehal could also photograph its own wood and fabric swatches; photos of its own stock are free to use.
- Gold legs need no texture: `metalness: 1, roughness: 0.2–0.35, color #d4af37`-ish plus an HDRI environment. Poly Haven HDRIs (CC0) provide the reflections.
- From general knowledge (not checked this session): ShareTextures and 3dtextures.me are also CC0. Textures.com's free tier gives limited daily credits under a licence that forbids redistributing raw textures, so it is riskier for web apps where textures are downloadable.

### Gaps
- ShareTextures, 3dtextures.me and Textures.com licence pages were not fetched in this session.
- No CC0 source specifically for sheesham (Dalbergia sissoo) wood was found.

## 3. How configurators change shape: approaches and recommendation for sofas

### Takeaway
Use **modular part swapping plus segment repetition or scaling** for sofas: separate GLB nodes for each arm style, leg type, back height and seat module. Change length by repeating or scaling only the middle seat section while the arms move outward. Keep morph targets for small, soft changes such as cushion puffiness or back height. Avoid plain whole-mesh scaling, because it stretches textures and tufting.

### Cited Findings
- The Wawa Sensei R3F table configurator changes width by scaling **only the tabletop on x** (`tableWidth/100`) and **moving the legs** to the ends (x × factor). It swaps leg styles by conditionally rendering one of three leg-mesh pairs (Legs01/02/03) from the same glTF, and animates with `useFrame` + `lerp` (ANIM_SPEED = 12). The legs are separate meshes "to make it simple when we will expand the table width". Libraries used: Vite, R3F, `useGLTF`, gltfjsx and MUI. Repo: [wass08/table-configurator-three-js-r3F-tutorial-final](https://github.com/wass08/table-configurator-three-js-r3F-tutorial-final). — [DEV tutorial](https://dev.to/wawasensei/creating-a-3d-table-configurator-with-react-three-fiber-1dl2)
- Door-configurator pattern: split the model into parts, **scale only the middle section and move the outer pieces**, so edges and UVs do not stretch. — [three.js forum: Scaling and positioning in door configurator](https://discourse.threejs.org/t/scaling-and-positioning-in-door-configurator/52902); [Extend or shorten the model lengthwise](https://discourse.threejs.org/t/extend-or-shorten-the-model-lengthwise/41905)
- Morph targets **stretch textures**. Developers report that triplanar mapping did not fix the stretching from morphs, and that a blended morph's bounding box is hard to predict, which makes exact lengths (for example "84 inches") harder to guarantee. — [Cannot get rid of texture stretching with morphTarget](https://discourse.threejs.org/t/cannot-get-rid-of-texture-stretching-with-morphtarget/67598); [Tile texturing a morphed mesh](https://discourse.threejs.org/t/is-exist-way-to-tile-texturing-morphed-mesh-without-stretching/17248); [Predict size of mesh with morph targets](https://discourse.threejs.org/t/how-to-predict-the-size-of-a-mesh-with-morph-targets/23567)
- Character configurator (same part-swap pattern for heads and outfits): [wass08/r3f-ultimate-character-configurator](https://awesome.ecosyste.ms/projects/github.com%2Fwass08%2Fr3f-ultimate-character-configurator)

### Inferences (recommended architecture for Mehal)
- **One Blender master file per base piece**, exported as one GLB with named nodes:
  - `Arm_L_Rolled`, `Arm_L_Track`, `Arm_L_Shelter`, ... (and the R mirrors)
  - `Leg_Gold_Taper`, `Leg_Wood_Turned`, `Leg_Block`, `Plinth`
  - `Back_Low`, `Back_High`, `Back_Tufted`
  - `Seat_Module` (one seat width, repeated 2, 3 or 4 times) and `Corner_Module` (for the L-shape) plus `Chaise_Module`
  - Toggle `visible` per option, and position parts from a small layout function (`seatCount`, `isL`, `side`).
- **Length**: prefer repeating whole seat modules (2-, 3- or 4-seater), which suits made-to-order sizes and keeps tufting buttons correct. For continuous lengths, scale only the middle "filler" panel on x and set `texture.repeat.x` in proportion (or use world-space or triplanar UVs on that one mesh).
- **L-shape**: corner module plus a second run of seat modules rotated 90°. The same layout function decides left- or right-hand.
- **Back height or arm height**: either a separate back mesh per height, or a morph target on the back only. A small stretch is acceptable there.
- **Bone scaling**: rarely worth it for furniture. It behaves like morphs or scaling, with the same UV stretch and more complex export.
- **Fully parametric geometry** (procedural box-plus-bevel cushions in code): good for simple tables (top length, width, thickness are easy in code with ExtrudeGeometry or RoundedBox from drei). Poor for tufted or carved upholstery, which should be modelled.
- **Tables**: scaling the top plus moving the legs (the Wawa pattern) works directly for coffee and dining tables. Carved edges should be a separate edge mesh, or the scale limited to ±20%.
- Price and cutting list: the same configuration JSON (`{base, arms, legs, back, seats, lShape, fabricId, colour}`) drives price calculation and the workshop order. Store it with the order.

### Gaps
- No authoritative published write-up on how Threekit or Expivi model sofas internally was found.

## 4. Libraries: R3F + drei vs model-viewer vs Babylon.js for Next.js; mobile performance

### Takeaway
Use **React Three Fiber + drei** for the configurator, because it gives full control over part visibility, layout and materials and is native to React and Next.js. Add **`<model-viewer>`** (or a GLB export from the configured scene) just for the "View in your room" AR button. Compress every asset with **gltf-transform (Meshopt + KTX2)** for mid-range Android phones.

### Cited Findings
- model-viewer material variants: **KHR_materials_variants** lets one GLB carry several looks. `availableVariants` lists them; `variantName = "..."` selects one, and `null` returns to the default. — [modelviewer.dev scenegraph examples](https://modelviewer.dev/examples/scenegraph/)
- model-viewer scene graph API: `viewer.model.materials[i]` exposes the base colour factor (`[r,g,b,a]` linear, or a CSS colour string), metalness, roughness and texture swapping. **Colour and texture edits show in AR only in WebXR mode.** iOS Quick Look ignores colour multiplies on textures but reflects metalness, roughness and texture changes when the USDZ is auto-generated (no `ios-src`). — [modelviewer.dev scenegraph](https://modelviewer.dev/examples/scenegraph/)
- gltf-transform CLI: `optimize` (all methods together, e.g. `gltf-transform optimize in.glb out.glb --compress draco --texture-compress webp`), `draco`, `meshopt`, `simplify`, `etc1s` and `uastc` (KTX2 + Basis), `webp` and `resize`. — [gltf-transform CLI](https://gltf-transform.dev/cli)
- KTX2 textures stay compressed on the GPU. One guide claims **4–8× GPU memory savings** compared with JPEG, PNG or WebP, which helps avoid out-of-memory crashes on mobile. KTX2Loader needs `detectSupport(renderer)`, otherwise it falls back to uncompressed RGBA. Meshopt decodes faster and with less CPU than Draco, so the common advice is Meshopt for mobile with Draco as a fallback. Do not mix gltfpack Meshopt output with gltf-transform Draco. `useGLTF.clear()` does not free GPU memory. (These are community guides, not official docs.) — [jvinhit: glTF compression Draco/Meshopt/KTX2](https://jvinhit.github.io/blog/threejs-16-gltf-compression-draco-meshopt-ktx2/); [three.js forum: Draco + KTX2 example](https://discourse.threejs.org/t/compression-draco-ktx2-example/31382); [three.js forum: GLTF memory usage](https://discourse.threejs.org/t/gltf-model-memory-usage/42048); [Draco error on iPad devices](https://discourse.threejs.org/t/draco-compressed-glb-model-returns-run-time-error-in-ipad-devices/61852)
- Progressive loading of glTF (low-resolution first): [Needle gltf-progressive](https://engine.needle.tools/docs/gltf-progressive/)
- Sample repo with compression set up: [klich3/threejs-gltf-with-compressions-sample](https://github.com/klich3/threejs-gltf-with-compressions-sample)

### Inferences (stack recommendation, partly general knowledge)
- **R3F + drei pieces to use**: `useGLTF` (with Draco and Meshopt decoders, `useGLTF.preload`), `gltfjsx --transform` (generates a typed JSX component and runs gltf-transform compression in one step), `Environment` (Poly Haven HDRI, low-res 1k on mobile), `ContactShadows` (cheap, good for phones) or `AccumulativeShadows` (prettier and static, heavier; desktop only), `PresentationControls` or `OrbitControls` with clamped angles, `useTexture` for fabric swatches, `Bounds` or `Center`, and `PerformanceMonitor` plus `AdaptiveDpr` to lower DPR on slow phones. In Next.js, load the Canvas with `dynamic(() => import(...), { ssr: false })`.
- **three.js KHR_materials_variants**: GLTFLoader exposes `gltf.userData.variants` and a `functions.selectVariant`. This is useful if the modeller bakes the main fabric choices into the GLB. With 30 or more fabric × colour combinations it is simpler to swap textures in code from a fabric JSON catalogue.
- **model-viewer alone** is the quickest path for simple pieces (bed, coffee table) where only material changes: variants plus colour picking via the scene graph, with AR built in. It cannot easily do the multi-part arm, leg and L-shape logic.
- **Babylon.js** is capable (it has a built-in inspector and good PBR) but is less natural inside React and Next.js, and its ecosystem for this use case (drei, gltfjsx) is smaller. It is not recommended unless the team already knows it.
- Mobile budget for Pakistani mid-range Android (Snapdragon 6xx/7xx, Helio G-series): aim for each GLB under 3–5 MB after compression, under 150k triangles in the visible scene, 1k–2k KTX2 textures (ETC1S for colour, UASTC for normal maps), DPR capped at 1.5, and no real-time shadows from lights (use ContactShadows). Lazy-load fabric textures only when a swatch is tapped. Show a still render as the first paint, then load the 3D viewer.

### Gaps
- No official 2026 benchmark of R3F against model-viewer against Babylon on low-end Android was found.
- drei, three.js and modelviewer.dev docs pages for `selectVariant`, `ContactShadows` and similar were not fetched this session. The details above come from general knowledge, so check the current versions.

## 5. AR: "See it in your room"

### Takeaway
model-viewer gives AR on Android (WebXR in Chrome or Scene Viewer through ARCore) and iOS (Quick Look with a USDZ auto-generated from the GLB). For a configured sofa, export the current R3F scene to GLB in the browser and hand it to model-viewer, or pre-generate GLBs for the most popular configurations.

### Cited Findings
- `ar-modes`: `webxr`, `scene-viewer` and `quick-look`. WebXR is described as the default AR mode and needs HTTPS, plus the `xr-spatial-tracking` permission when inside an iframe. Android needs **Chrome 83+** for WebXR. ARCore detects the floor and the user is asked to move the phone. — [modelviewer.dev AR examples](https://modelviewer.dev/examples/augmentedreality/)
- `ios-src` points to a custom .usdz or .reality file. **If it is left out, a USDZ is auto-generated from the GLB** when the iOS user taps AR. — [modelviewer.dev AR](https://modelviewer.dev/examples/augmentedreality/)
- `ar-placement="floor"` is the default, and `"wall"` is supported. `ar-scale="fixed"` stops users resizing the object, so it stays true to scale, and applies in all three modes. `xr-environment` (estimated lighting) works in WebXR only. — [modelviewer.dev AR](https://modelviewer.dev/examples/augmentedreality/)
- DOM overlays and script-driven changes work in WebXR. Scene Viewer and Quick Look are native apps, so the page's DOM and scripts cannot reach them. Material edits show in AR only in WebXR mode. — [modelviewer.dev AR](https://modelviewer.dev/examples/augmentedreality/); [modelviewer.dev scenegraph](https://modelviewer.dev/examples/scenegraph/)

### Inferences
- **Use `ar-scale="fixed"`** so customers see the true size of an 84-inch sofa in their lounge. This is the main point of AR for made-to-order furniture.
- Configured-sofa AR flow: three.js `GLTFExporter` exports the current scene to a GLB Blob, then `URL.createObjectURL`, then set it as model-viewer `src` and call `activateAR()`. On Android, Scene Viewer may need a hosted HTTPS URL rather than a blob, so upload the GLB to storage (e.g. Supabase or R2) and pass that URL. On iOS, model-viewer generates the USDZ.
- Many budget Android phones in Pakistan are not on the ARCore supported-device list. Hide or grey out the AR button when `canActivateAR` is false and show a "measure your space" fallback.

### Gaps
- The ARCore supported-device list and its coverage of popular Pakistani models (Infinix, Tecno, low-end Samsung A-series) were not checked.
- Whether Scene Viewer accepts blob: URLs in 2026 was not confirmed.

## 6. Open-source examples, tutorials and commercial UX references

### Takeaway
Start from the Wawa Sensei table configurator repo (shape plus legs plus colour) and adapt it to sofas. Copy the step-by-step UX of Burrow, Interior Define and Flexsteel: base or size, then arms, then legs, then fabric, then colour.

### Cited Findings
- Wawa Sensei table configurator (R3F; width slider, leg swap, colour): [tutorial](https://dev.to/wawasensei/creating-a-3d-table-configurator-with-react-three-fiber-1dl2), [repo](https://github.com/wass08/table-configurator-three-js-r3F-tutorial-final)
- Wawa Sensei character configurator (part-swap pattern): [r3f-ultimate-character-configurator](https://awesome.ecosyste.ms/projects/github.com%2Fwass08%2Fr3f-ultimate-character-configurator)
- React + three.js room planner and product configurator (about 460 stars): [CodeHole7/threejs-3d-room-designer](https://github.com/CodeHole7/threejs-3d-room-designer)
- LogRocket guide on configuring 3D models with R3F: [blog.logrocket.com](https://blog.logrocket.com/configure-3d-models-react-three-fiber)
- three.js forum threads tagged configurator: [discourse #3d-configurator](https://discourse.threejs.org/tag/3d-configurator/1313.md)
- Udemy course on an R3F + Valtio + Framer Motion configurator: [Class Central listing](https://classcentral.com/course/udemy-react-three-fiber-configurator-403662)
- Crystallize article on a 3D/AR furniture configurator: [crystallize.com](https://crystallize.com/blog/3dar-furniture-product-configurator)
- **Burrow**: the Nomad configurator has Leg Finish (walnut, wood, metal) and an **Arm Style selector**, plus add-ons (chaise, ottoman, pillows). The Range flow is "Select base configuration", then fabric, then leg finish. — [Burrow Range Sleeper](https://burrow.com/range-fabric/sleeper); [Burrow Nomad](https://dev-pub.burrow.com/en-ca/nomad-fabric/sofa)
- **Interior Define**: about 20 sofa frames, customisable by dimensions, cushion firmness, configuration and fabric, with dozens of fabrics, leg style and cushion fill. It launched a 3D visualiser in 2015. — [TechCrunch 2015](https://techcrunch.com/2015/05/18/interior-define-maker-of-ultra-customizable-couches-launches-3d-visualizer/); [Apartment Therapy review](https://www.apartmenttherapy.com/best-interior-define-sofas-37472657)
- **Flexsteel Moxy**: sequential steps for arm and leg design (Mailbox, Roll, Sock, Track arms), then cushion type and support level. — [Flexsteel Moxy](https://www.flexsteel.com/collections/moxy)
- **BoConcept** customisation programme: [boconcept.com/customisation](https://www.boconcept.com/en-us/about-boconcept/customisation)

### Inferences (UX patterns to copy)
- Show a stepper (Size/Shape, then Arms, then Legs, then Fabric, then Colour) with **thumbnail images for each shape option** rather than text, and swatch circles for colours. Keep a live price on a sticky bar, and on mobile keep the 3D view in the top half with the options in a bottom sheet.
- Show measurements in inches and cm on the model (drei `Html` labels), since made-to-order buyers care about fit.
- "Order free fabric swatches" or "WhatsApp us this design" buttons fit the Pakistani market. Share the configuration as a URL (state in the query string).
- Threekit and Expivi are paid enterprise SaaS configurators, worth studying for UX but expensive.

### Gaps
- IKEA, Article, Threekit and Expivi configurator pages were not fetched this session, so their exact flows and prices are unverified.
- Wawa Sensei's paid course and Three.js Journey content were not reviewed.

## 7. Cost of custom models; AI image-to-3D tools

### Takeaway
Custom Blender furniture models on Fiverr or Freelancer cost roughly **$15–$200 per model**, depending on complexity. A modular, configurator-ready sofa (many arm, leg and back variants, clean UVs, GLB) would sit at the top of that range or above. AI image-to-3D (Meshy, Tripo, Hunyuan3D, TRELLIS.2) is good for quick placeholders or decor props. It is not good enough for modular, tufted, true-to-size hero products. Meshy and Tripo free outputs are CC BY 4.0 (credit required).

### Cited Findings
- Fiverr sofa gig price bands: **up to $50 (2-day delivery), $50–100 (2 days), $100–200 (8 days)**. One seller starts at **$15** for Blender furniture modelling. On Freelancer.com, one bidder quoted **$15 simple / $30 medium / $40 complex per model** with web and GLB optimisation included, and another quoted ₹1,500 / ₹3,500 / ₹6,500. No Upwork per-model rate was found. — [Fiverr: 3D sofa models](https://www.fiverr.com/morefx/create-3d-sofa-models); [Fiverr: furniture in Blender](https://fiverr.com/bobe32/3d-model-furniture-in-blender); [Fiverr: modular sofa configurator GLB](https://fiverr.com/higq_animation/furniture-product-design-modular-sofa-model-configurator); [Freelancer: photorealistic furniture modeling](https://www.freelancer.com.au/projects/blender/photorealistic-furniture-modeling); [Upwork: looking for 3D sofa models](https://www.upwork.com/freelance-jobs/apply/Looking-for-models-sofa_~022062544724122363461/)
- Fiverr also has R3F configurator developer gigs: [build a 3D product configurator in React](https://fiverr.com/guru_syntax/build-a-3d-product-configurator-in-react); a modular-sofa configurator portfolio example: [Contra](https://contra.com/p/mgbAERbQ-3-d-product-configurator-for-modular-sofas)
- **Meshy**: paid users own their outputs. **Free users get CC BY 4.0**, so commercial use is allowed with credit (e.g. "Model created with Meshy – CC BY 4.0 License"). — [Meshy Help: who owns the models](https://help.meshy.ai/en/articles/9992001-who-owns-the-models-generated-by-meshy). Third-party blogs disagree (one says free is personal or academic use only). — [3daistudio: is Meshy free](https://www.3daistudio.com/3d-generator-ai-comparison-alternatives-guide/is-meshy-ai-free). Meshy's own help page is the primary source.
- **Tripo**: secondary sources say free outputs are CC BY 4.0, commercial use allowed with attribution to Tripo. Tripo's own blog page returned 403, so this is not verified from the primary source. — [3daistudio best free AI 3D generators 2026](https://www.3daistudio.com/blog/best-free-ai-3d-model-generators-2026); [Tripo blog (403)](https://www.tripo3d.ai/blog/commercial-use-ai-3d-models)
- 2026 landscape (June 2026 report from 3D AI Studio, a vendor): Meshy 5/6 is closed and API-only, with the most complete pipeline (generation, texturing, rigging, plugins), about $0.10–0.30 per model by API. Tripo 3.0 is the fastest (under 30 s) with "clean topology, native PBR" at about $0.10–0.30. **Hunyuan3D 2.1/3.x** (Tencent) has open weights under a community licence that **excludes the EU, UK and South Korea** and has "best-in-class textures and PBR". **TRELLIS.2** (Microsoft, 4B) is **MIT licensed and fully commercial**, makes 1536-resolution assets in under 20 s on a 24 GB GPU, and costs about $0.02 per generation on fal.ai. — [3daistudio State of AI 3D Generation 2026](https://www.3daistudio.com/state-of-ai-3d-generation-2026)
- Hunyuan3D community licence: free commercial use under 1M monthly active users (secondary source). — [search summary, krea.ai blog](https://www.krea.ai/blog/best-ai-3d-model-generators-2026)

### Inferences
- Pakistan is outside the Hunyuan3D excluded territories, so Mehal can use it. TRELLIS.2 (MIT) is the cleanest licence for self-hosting.
- AI-generated meshes are a single fused, triangulated mesh with baked textures. You cannot swap arms or legs or re-fabric them cleanly, and tufting and gold carving come out blurry. They are fine for room decor (vases, lamps, rugs) or a quick first draft that a Blender artist then retopologises.
- Budget estimate (inference from the price bands above): 4–6 base pieces, each with 3–4 arm, 3–4 leg and 2 back variants modelled as separate, UV-unwrapped, real-scale parts in GLB, is roughly $80–250 per piece for a competent Pakistani or South Asian freelancer, so about $400–1,500 in total. A local Rawalpindi/Islamabad Blender artist could be cheaper. Brief the modeller with: real dimensions in cm, named nodes, origin at floor centre, 1 m = 1 unit, PBR materials, under 50k triangles per piece, separate tufting normal map, GLB plus .blend source delivered.
- Mehal can also photograph its own finished pieces for AI-to-3D placeholders while custom models are being made.

### Gaps
- Tripo and Hunyuan3D licence terms were not verified on their own primary pages (403 or not fetched).
- No head-to-head test of these AI tools on furniture specifically was found. Furniture quality is an inference.
- Current Meshy and Tripo free-tier credit amounts were not confirmed.
