# AI Image Redesign of Furniture Photos (Mehal Furniture)

Research date: 2026-11-20. About 18 tool calls. Official pricing pages were fetched for Google (aistudio.google.com/docs/pricing), OpenAI (developers.openai.com/api/docs/pricing), BFL (bfl.ai/pricing) and fal (fal.ai/pricing), plus the arena.ai image-edit leaderboard (snapshot 16 Nov 2026). Where a figure comes only from third-party blogs, it is marked "(3rd-party)".

## 1. Best current instruction-based image-edit models, prices, availability, licences

### Takeaway
As of mid-November 2026, OpenAI's GPT-Image-2.5/2.6 family leads the single-image-edit arena. Microsoft MAI-Image, xAI Grok Imagine, Google Nano Banana 2.1 and Seedream 5.0 Pro follow closely. For cost, the best options are **Nano Banana 2.1 (Gemini API, $0.034 per 1K image, $0.017 in batch)**, **FLUX.2 [klein]/FLUX 3 Klein (about $0.009–0.015)**, **Qwen-Image-Edit (about $0.02–0.03, open weights)** and **gpt-image-2 at low/medium quality ($0.006–0.053)**. None of the first-party image APIs has a free tier.

### Cited Findings
**Leaderboard (arena.ai Image Edit, single-image, snapshot 16 Nov 2026; 32.0M total votes)** — [arena.ai](https://arena.ai/leaderboard/image-edit)
- 1. GPT-Image-2.5 Sunburst, 1519 (P50 cost $0.05). 2. GPT-Image-2.5 Flare, 1484. 3. GPT-Image-2.6 Sunburst (Medium), 1481. 4. MAI-Image-2.7, 1475 ($0.03). 5. GPT-Image-2 (Medium), 1462 ($0.06). 6. GPT-Image-2.6 Flare (Medium), 1461 ($0.03). 7. Grok Imagine Image 2.0, 1437. 8. MAI-Image-2.6, 1427. **9. Gemini Nano Banana 2.1, 1427 ($0.05)**. 11. Krea 3 Ultra, 1412. 13. Meta Muse Image, 1400 ($0.01). **14. Seedream 5.0 Pro (ByteDance), 1392 ($0.07)**. Gemini 3 Pro Image Preview (Nano Banana Pro) sits around rank 19. — [arena.ai](https://arena.ai/leaderboard/image-edit)
- A separate Multi-Image Edit board exists, but its rankings were not readable in the fetch. — [arena.ai multi-image](https://arena.ai/leaderboard/image-edit/multi-image-edit)

**Google Gemini API ("Nano Banana"), official pricing page** — [Google AI Studio pricing](https://aistudio.google.com/docs/pricing)
- Nano Banana 2.1 `gemini-nano-banana-2.1`: 1K $0.0336, 2K $0.0504, 4K $0.113. Batch: 1K $0.0168, 2K $0.0252, 4K $0.0567.
- Nano Banana 2 `gemini-3.1-flash-image`: 0.5K $0.045, 1K $0.067, 2K $0.101, 4K $0.151.
- Nano Banana 2 Lite `gemini-3.1-flash-lite-image`: 1K $0.0336 (batch $0.0168).
- Nano Banana Pro `gemini-3-pro-image`: 1K/2K $0.134, 4K $0.24.
- The original Nano Banana `gemini-2.5-flash-image` costs $0.039 (batch/Flex $0.0195). It is **deprecated and shuts down 15 Mar 2027**.
- The pricing page lists **no free tier for any image model**. A 3rd-party source agrees for Nano Banana Pro. — [Google AI Studio pricing](https://aistudio.google.com/docs/pricing); [activepieces (3rd-party)](https://www.activepieces.com/blog/nano-banana-api-pricing-cost-per-image-in-2026.md)

**OpenAI gpt-image (token-billed), official pricing page** — [OpenAI pricing](https://developers.openai.com/api/docs/pricing)
- gpt-image-2, 2.5-sunburst, 2.5-flare, 2.6-sunburst and 2.6-flare all cost the same: image input $8/M tokens, image output $30/M, cached image input $2/M, text input $5/M. gpt-image-1.5: $8 in / $32 out. **gpt-image-1-mini: $2.50 in / $8 out (cheapest)**. Batch is about half price. Regional data-residency endpoints add 10%.
- Per-image estimates for gpt-image-2 at 1024×1024 (3rd-party, derived from OpenAI's calculator): low about $0.006, medium about $0.053, high about $0.211. One source gives $0.011 for low. — [ImagineArt](https://www.imagine.art/blogs/gpt-image-2-pricing); [WaveSpeed](https://wavespeed.ai/blog/posts/gpt-image-2-pricing-2026/); [Tech Insider](https://tech-insider.org/?p=21744)
- Edits cost more than generations because the input-image tokens are billed. One guide estimates 2–3× the base cost for edit-heavy workflows (3rd-party). — [CometAPI](https://www.cometapi.com/gpt-image-2-5-price-api-cost-per-image/); [OpenAI community](https://community.openai.com/t/openai-must-document-the-input-image-pricing-of-gpt-image-2-so-i-did/1382940)
- Edits accept masks, but masking is "prompt-based": the model "may not follow its exact shape with complete precision". The mask needs an alpha channel and must match the first image's size. The docs show examples with 4 input images, and there is a "markup" edit mode. The complexity setting defaults to high, and lower settings reduce latency. Streaming returns 0–3 partial images. — [OpenAI image guide](https://developers.openai.com/api/docs/guides/image-generation)
- A 3rd-party source reports that gpt-image-1 and gpt-image-1.5 are being retired around Oct–Dec 2026. — [invideo (3rd-party)](https://invideo.io/blog/ai-image-model-pricing/)

**Black Forest Labs (FLUX), official pricing page** — [bfl.ai/pricing](https://bfl.ai/pricing)
- FLUX 3 Image: 1K $0.048, 2K $0.10. **FLUX 3 Image Klein: 1K $0.009, 2K $0.014**. Reference images and prompts carry no extra charge (inputs up to 16 MP). Klein is a 5.6B model that runs on a consumer GPU.
- FLUX.2 (per MP): [max] $0.07 first MP; [pro] $0.03 + $0.015 per reference MP; [flex] $0.05; [klein] 9B $0.015; [klein] 4B $0.014. Each reference is charged as 1 MP, and references are downscaled to 1 MP when several are supplied. Maximum output is 4 MP.
- FLUX.1 Kontext [pro] $0.04, [max] $0.08. FLUX.1 Fill [pro] (mask inpainting) $0.05. Erase from $0.03.
- Open-weights commercial self-hosting needs a paid licence tier: Builder (10K images/month, klein models) or Platform/Professional (100K images/month, FLUX.2 [dev]). Non-commercial terms apply otherwise.

**ByteDance Seedream** — [fal pricing](https://fal.ai/pricing); [fal Seedream 5 Lite guide](https://fal.ai/learn/tools/how-to-use-seedream-5-lite)
- On fal: Seedream 5.0 Pro edit $0.0675 per unit (3rd-party sources say $0.0675 up to 1536², $0.135 up to 2048², plus about $0.0045 per input image). Seedream 4.5 edit $0.04. **Seedream 5.0 Lite is a flat $0.035 per image (3rd-party) and accepts up to 10 reference images on edit**. — [fal pricing](https://fal.ai/pricing); [muapi (3rd-party)](https://muapi.ai/comparison/bytedance-seedream-5.0-pro-edit)

**Qwen-Image-Edit (Alibaba, open weights)**
- About $0.021 per image (base), $0.031 (Plus), $0.037 (2511) normalised to 1024², according to aggregator figures (3rd-party). fal's general page quotes $0.02/MP. Runpod charges $0.02 per edit for 2511. On Replicate it costs $0.03–0.05 (conflicting). — [pricepertoken](https://pricepertoken.com/image/model/qwen-qwen-image-edit-plus); [Runpod docs](https://docs.runpod.io/public-endpoints/models/qwen-image-edit-2511); [llm-stats](https://llm-stats.com/models/qwen-image-edit)
- It is listed as Apache 2.0 (commercial use allowed) by an aggregator. I did not verify this in Qwen's own docs. — [llm-stats](https://llm-stats.com/models/qwen-image-edit)

**Pakistan availability**
- The Gemini API / Google AI Studio available-regions list includes Pakistan. — [Google available regions](https://ai.google.dev/gemini-api/docs/available-regions.md.txt)
- OpenAI's API supported-countries list includes Pakistan. Using the API from an unsupported location can get the account blocked. — [OpenAI help](https://help.openai.com/articles/5347006)

### Inferences
- **Cheapest quality-per-dollar default:** Nano Banana 2.1 at 1K costs $0.034, or $0.017 through the Batch API for non-interactive jobs. It ranks #9 on edits, about 90 Elo below the leader, at roughly two-thirds of the leader's P50 price. Upgrade path: gpt-image-2.6 Flare (Medium), arena P50 about $0.03, ranked #6.
- **Bulk or budget tier:** FLUX 3 Klein or FLUX.2 [klein] costs $0.009–0.015 per image. They are good for previews, quick variants, or self-hosting later, but self-hosting for commercial use needs a BFL licence.
- With no free tier on any first-party API, "free" in practice means aggregator signup credits or self-hosted open weights (Qwen-Image-Edit Apache 2.0 or FLUX Klein under licence) on a GPU. A GPU server costs more than API calls at low volume.
- At about $0.03–0.05 per edit, 1,000 customer edits a month costs about $30–50. Cost is not the main risk if rate limits are in place (see section 8).

### Gaps
- I could not confirm official latency figures for any model. Expect seconds to tens of seconds, but this is unmeasured. Benchmark it in the app.
- Ideogram edit pricing and current models were not researched. The OpenRouter and Together image-model price lists were not fetched. OpenRouter does list `google/gemini-3-pro-image` variants ([OpenRouter](https://openrouter.ai/models/google/gemini-3-pro-image-20260528)).
- MAI-Image-2.7 and Grok Imagine API availability and pricing outside fal were not checked.
- The Stable Diffusion inpainting/ControlNet status in 2026 was not researched. It is likely superseded by Kontext/Qwen/FLUX Fill for this use case, but that is unverified.

## 2. Reference images and multi-image input (apply THIS swatch to THIS sofa)

### Takeaway
Every current major family accepts multiple input images. These include Gemini Nano Banana, gpt-image (4+ inputs shown in docs), FLUX.2/FLUX 3 (references billed per MP, or free on FLUX 3), and Seedream 5 Lite (up to 10 references). Arena runs a dedicated multi-image-edit board, but I could not read its current rankings.

### Cited Findings
- gpt-image edit examples use 4 input images. In markup edits the first image is the one being edited and the others are references. — [OpenAI image guide](https://developers.openai.com/api/docs/guides/image-generation)
- FLUX 3 Image: references cost nothing extra and the price doesn't change with reference count. FLUX.2: each reference is charged as 1 MP and downscaled to 1 MP when several are used. — [bfl.ai/pricing](https://bfl.ai/pricing)
- Seedream 5.0 Lite edit takes up to 10 reference images. — [fal Seedream 5 Lite](https://fal.ai/learn/tools/how-to-use-seedream-5-lite)
- BFL sells a dedicated VTO (virtual try-on) tool at $0.0375 for the first MP. — [bfl.ai/pricing](https://bfl.ai/pricing)

### Inferences
- Pattern for fabric swatches: send [catalogue sofa photo, swatch photo] and say "replace the upholstery of the sofa in image 1 with the fabric in image 2; keep shape, legs, background, camera angle". Because FLUX.2 downscales references to 1 MP, very fine damask detail may soften. Crop swatches tight.
- Store real fabric swatches (the workshop's actual stock) as reference images. The model then copies a fabric Mehal can buy, rather than inventing a pattern from text.

### Gaps
- No head-to-head benchmark of swatch-to-furniture texture fidelity was found. Run an internal test of 10 sofas × 5 swatches across 3–4 models.

## 3. Consistency techniques (masking, segmentation, no drift)

### Takeaway
Use a segmentation mask to confine edits to the furniture, then composite the result back over the untouched original. Always edit from the original or catalogue master, never the last output, to avoid drift. Note that OpenAI masks are only guidance.

### Cited Findings
- OpenAI masks are "prompt-based" and the model "may not follow its exact shape with complete precision". — [OpenAI image guide](https://developers.openai.com/api/docs/guides/image-generation)
- SAM 3 (image segmentation) is on fal at $0.005 per unit. Background removal: Bria RMBG 2.0 $0.018; BiRefNet v2 is billed per compute second. — [fal pricing](https://fal.ai/pricing)
- BFL offers hard-mask inpainting with FLUX.1 Fill [pro] at $0.05 per image. — [bfl.ai/pricing](https://bfl.ai/pricing)
- A furniture brand executive says "AI right now just cannot iterate to get something that meets our quality standards… It's just not there yet". Small hallucinations and difficulty making exact repeated edits remain a problem. — [Business of Home, Oct 2026](https://businessofhome.com/articles/how-ai-generated-imagery-is-quietly-reshaping-the-furniture-business)

### Inferences
- Recommended pipeline: (1) SAM 3 mask of the furniture (about $0.005). (2) Run the edit model with the whole image plus an instruction. (3) Feather-composite only the masked region (dilated for shape changes such as L-shape) back onto the original pixels, so walls and floor stay identical. For shape changes, the mask must cover the new footprint. Dilate the mask or let the model regenerate the whole furniture region.
- Avoid drift by keeping edits as structured parameters (fabric, colour, leg style, shape) and regenerating from the master image each time, rather than chaining edits on outputs.
- Cache by hash(master image + parameter set + model version) so repeat choices cost nothing.

### Gaps
- Seed and determinism support per API was not verified. Hosted Gemini and OpenAI edits are generally not seed-reproducible (background knowledge, unverified).
- SAM 2 vs SAM 3 quality on furniture was not compared.

## 4. Hosting and aggregators (Replicate, fal.ai, Together, OpenRouter)

### Takeaway
fal.ai has the broadest catalogue, but its markup over first-party prices can be large: Nano Banana 2 edit costs $0.08 on fal against $0.067 direct, and Nano Banana Pro edit $0.15 against $0.134. Go direct to Google, OpenAI or BFL for the main model, and use fal only for open models (Qwen, FLUX Klein, SAM 3).

### Cited Findings
- fal: Nano Banana edit $0.0398; Nano Banana 2 edit $0.08; Nano Banana Pro edit $0.15; FLUX 3 edit $0.048/MP; **FLUX 2 edit $0.012/MP; FLUX 2 Flash edit $0.005/MP**; Seedream 4.5 edit $0.04; Bria Fibo 2.0 edit $0.04. Accounts are prepaid with no free credits mentioned. — [fal pricing](https://fal.ai/pricing)
- Replicate Qwen-Image-Edit costs $0.03–0.05 per image (sources conflict). — [muapi](https://muapi.ai/comparison/qwen-image-edit); [pricepertoken](https://pricepertoken.com/image/model/qwen-qwen-image-edit-plus)
- Atlas Cloud resells gpt-image-2 at a flat $0.008 per image, edit included (reseller claim, unverified). — [Atlas Cloud](https://www.atlascloud.ai/blog/gpt-image-2-api-guide)

### Inferences
- FLUX 2 Flash edit at about $0.005 per 1 MP is the cheapest live-preview option found. It could serve instant low-res previews, followed by a higher-quality final render.
- Treat very cheap resellers such as Atlas with caution because of reliability, ToS and data-handling risk.

### Gaps
- Together AI and OpenRouter image-edit price lists were not fetched.

## 5. Inspiration-upload flow (identify, describe, match catalogue)

### Takeaway
I did not research this in depth. Industry practice is to use a vision LLM for type and style extraction and an image-embedding search for catalogue matching.

### Cited Findings
- Wayfair's Decorify linked visuals to its own catalogue (shoppable), and critics called the catalogue lock-in a limitation. — [First Chair (competitor blog)](https://www.firstchair.app/blog/wayfair-decorify-alternatives); [Retail Dive](https://www.retaildive.com/news/wayfair-decorify-home-design-product-visualization-tool/689001/)

### Inferences
- Suggested flow: (1) moderation check on the upload. (2) A vision LLM (e.g. Gemini Flash) returns JSON with furniture type, shape, arm style, leg style or material, fabric, colour and pattern. (3) Embedding search (CLIP/SigLIP vectors in pgvector) over catalogue photos returns the nearest Mehal pieces. (4) Show "closest we make" plus "customise to match", where the extracted attributes map onto Mehal's real option lists.
- For a made-to-order shop this is strong: the inspiration photo becomes a structured order spec, not just a picture.

### Gaps
- No sources gathered on CLIP/SigLIP accuracy for furniture retrieval, or on vision-LLM attribute-extraction accuracy. Prices for embedding APIs were not checked.

## 6. Room visualisation (placing a piece into the customer's room)

### Takeaway
Big retailers moved from 3D/AR scanning (IKEA Kreativ) to generative staging (Wayfair Decorify, then Muse). Generative placement now works with multi-image editors, but the scale and fidelity of the specific product are not guaranteed.

### Cited Findings
- IKEA Kreativ's Scene Scanner builds a 3D model of the room from several photos. Reviewers call it the best free shopper tool, but it is limited to IKEA products. IKEA's pitch is fewer costly mistakes and fewer returns. — [Analytics Insight](https://www.analyticsinsight.net/artificial-intelligence/how-ikea-uses-ai-for-interior-shopping); [First Chair](https://www.firstchair.app/blog/wayfair-decorify-alternatives)
- Wayfair Decorify was a pilot that produced more than 70,000 designs. Early reviews noted artefacts (odd reflections, plants on day beds). A competitor blog says it was replaced by "Muse" with open-ended style prompting (timeline unverified). — [Retail Dive](https://www.retaildive.com/news/wayfair-decorify-home-design-product-visualization-tool/689001/); [Business of Home 2025](https://businessofhome.com/articles/wayfair-s-new-tool-shows-ai-s-strengths-and-limitations.html); [First Chair](https://www.firstchair.app/blog/wayfair-decorify-alternatives)
- AI product-imagery vendors for furniture brands include HookPic (from $800/month), Presti and DecorX (from Markor). Customers include Wayfair, Ashley, Kathy Kuo Home and Moore & Giles. — [Business of Home, Oct 2026](https://businessofhome.com/articles/how-ai-generated-imagery-is-quietly-reshaping-the-furniture-business)
- Cylindo (a vendor) claims an average 58% reduction in visualisation costs. This is self-reported. — [Cylindo](https://blog.cylindo.com/trends-report-2026)

### Inferences
- For Mehal: multi-image edit with [room photo, product render, swatch] and the prompt "place the sofa against the left wall at realistic scale". Label the result "illustrative, not to scale" and ask the customer for wall dimensions separately.
- Building a scanner like IKEA's is out of scope. Generative staging is the realistic option.

### Gaps
- Interior AI, RoomGPT and Havenly UX specifics were not researched in this pass. No dedicated virtual-staging API pricing was found.

## 7. Real furniture products: UX lessons

### Takeaway
The lessons are that accuracy beats novelty, catalogue-linked results convert, and fully open-ended AI produces bland, unbuildable and same-looking rooms. Keep human design control and review.

### Cited Findings
- "When you give AI all of the control, that's where we get the really bland rooms where everyone looks the same" (Zaric). — [Business of Home, Oct 2026](https://businessofhome.com/articles/how-ai-generated-imagery-is-quietly-reshaping-the-furniture-business)
- Rebecca Atwood sometimes needs 20 or more Midjourney iterations to get one usable image. Four Hands still shoots about 160 products a month in its own studio. — [Business of Home, Oct 2026](https://businessofhome.com/articles/how-ai-generated-imagery-is-quietly-reshaping-the-furniture-business)
- Kreber advises against going "from zero to 100" and recommends legal, executive and creative review of AI content. — [Business of Home, Oct 2026](https://businessofhome.com/articles/how-ai-generated-imagery-is-quietly-reshaping-the-furniture-business)
- Wayfair called Decorify a "pilot", and the press highlighted both its strengths and its limits. — [Business of Home 2025](https://businessofhome.com/articles/wayfair-s-new-tool-shows-ai-s-strengths-and-limitations.html)

### Inferences
- UX for Mehal: lead with constrained pickers (real fabric swatches, leg options, sizes and shapes the workshop makes), with free text as an optional extra. Show before/after side by side with a "Concept preview" badge. Offer "Send this design to Mehal on WhatsApp" so a human confirms feasibility and price.

### Gaps
- No independent conversion or returns data was found. All uplift figures are vendor claims.

## 8. Risks: unbuildable results, misleading images, abuse, cost control

### Takeaway
The biggest risk is customers expecting exactly what the AI drew. Fix it by constraining edits to buildable options, labelling outputs as concepts, and confirming with a workshop sign-off. Control costs with auth, per-user quotas and caching.

### Cited Findings
- Buildability: at Samuel & Sons, clients asked how to sew trim that existed only in an edited image ("It was physically impossible"). — [Business of Home, Oct 2026](https://businessofhome.com/articles/how-ai-generated-imagery-is-quietly-reshaping-the-furniture-business)
- Trust and returns: some retailers ban AI brand imagery because inaccurate depictions erode trust and raise returns. Audiences may dismiss it as "slop". — [Business of Home, Oct 2026](https://businessofhome.com/articles/how-ai-generated-imagery-is-quietly-reshaping-the-furniture-business)
- OpenAI says accessing its services from unsupported regions risks account suspension (Pakistan is supported). — [OpenAI help](https://help.openai.com/articles/5347006)

### Inferences
- **Buildability guardrails:** map every edit to a fixed option list (fabric SKU, leg SKU, shape template) and generate from that list, not from free text. Then run a vision-LLM check that compares the output with the option spec, and have a craftsman approve the order before quoting.
- **Misleading images:** add a watermark or caption such as "AI concept, final piece may differ in colour and detail", and keep the spec sheet as the contract.
- **Upload abuse:** customers will upload photos, possibly of people or explicit content. Run a moderation check (OpenAI's moderation endpoint or a vision-LLM classifier) before editing, reject non-furniture images, strip EXIF/location data and auto-delete uploads after N days. The model's own safety filters also refuse some requests, so handle refusals gracefully.
- **Cost control:** require login or phone OTP, set a per-user daily quota (e.g. 10 edits), use a global monthly spend cap with provider budget alerts, a cache keyed on (master image, options, model), cheap 1K/low-quality previews with the high-quality render only on "Save/Order", and the Batch API (50% off) for catalogue pre-renders such as every sofa in its top 20 fabrics.

### Gaps
- Provider-specific rate limits (RPM) for image models were not fetched. Moderation API pricing and current terms were not checked.
- Output ownership and commercial-use terms per provider were not explicitly verified (beyond BFL's open-weights licensing tiers).
