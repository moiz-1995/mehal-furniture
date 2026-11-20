"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COLOURS, FABRICS, PATTERNS, colourName, label, type FabricId, type PatternId } from "@/components/studio/options";
import { colourCanvas, reliefCanvas } from "@/components/studio/textures";
import { SendDesign } from "@/components/request/SendDesign";

const MAX_SIDE = 1280;

type Pt = { x: number; y: number; label: 0 | 1 };

async function loadResized(src: string): Promise<HTMLCanvasElement> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  await img.decode();
  const k = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const c = document.createElement("canvas");
  c.width = Math.round(img.naturalWidth * k);
  c.height = Math.round(img.naturalHeight * k);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  return c;
}

function tiled(src: HTMLCanvasElement, w: number, h: number, tile: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const p = ctx.createPattern(src, "repeat")!;
  p.setTransform(new DOMMatrix().scale(tile / src.width));
  ctx.fillStyle = p;
  ctx.fillRect(0, 0, w, h);
  return ctx.getImageData(0, 0, w, h).data;
}

/** Repaints the masked area, keeping the photo's own light and shadow. */
function recolour(
  base: HTMLCanvasElement,
  mask: { data: Uint8Array; width: number; height: number },
  opts: { fabric: FabricId; colour: string; pattern: PatternId; accent: string },
) {
  const { width: w, height: h } = base;
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const ctx = out.getContext("2d")!;
  ctx.drawImage(base, 0, 0);
  const img = ctx.getImageData(0, 0, w, h);
  const px = img.data;

  // Soft edge: draw the mask, blur it slightly, use it as alpha.
  const mc = document.createElement("canvas");
  mc.width = mask.width;
  mc.height = mask.height;
  const mctx = mc.getContext("2d")!;
  const md = mctx.createImageData(mask.width, mask.height);
  for (let i = 0; i < mask.data.length; i++) md.data[i * 4 + 3] = mask.data[i] ? 255 : 0;
  mctx.putImageData(md, 0, 0);
  const fc = document.createElement("canvas");
  fc.width = w;
  fc.height = h;
  const fctx = fc.getContext("2d")!;
  fctx.filter = "blur(1.2px)";
  fctx.drawImage(mc, 0, 0, w, h);
  const alpha = fctx.getImageData(0, 0, w, h).data;

  let sum = 0;
  let n = 0;
  for (let i = 0; i < w * h; i++) {
    if (alpha[i * 4 + 3] > 128) {
      sum += 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2];
      n++;
    }
  }
  if (!n) return out;
  const mean = sum / n;

  const tile = Math.max(w, h) / 9;
  const pattern = tiled(colourCanvas(opts.colour, opts.pattern, opts.accent), w, h, tile);
  const relief = tiled(reliefCanvas(opts.fabric, "plain"), w, h, tile / 2.5);
  const reliefAmt = { velvet: 0.08, linen: 0.22, boucle: 0.4, leather: 0.12 }[opts.fabric];
  const contrast = { velvet: 1.15, linen: 0.95, boucle: 0.9, leather: 1.3 }[opts.fabric];

  for (let i = 0; i < w * h; i++) {
    const a = alpha[i * 4 + 3] / 255;
    if (a === 0) continue;
    const j = i * 4;
    const L = 0.299 * px[j] + 0.587 * px[j + 1] + 0.114 * px[j + 2];
    let shade = Math.pow(Math.max(L, 1) / mean, contrast);
    shade *= 1 - reliefAmt / 2 + (relief[j] / 255) * reliefAmt;
    // Velvet catches light: lift the brightest folds toward white.
    const sheen = opts.fabric === "velvet" ? Math.max(0, shade - 1.15) * 0.6 : 0;
    for (let k = 0; k < 3; k++) {
      const v = pattern[j + k] * Math.min(shade, 1.6) + 255 * sheen;
      px[j + k] = px[j + k] * (1 - a) + Math.min(255, v) * a;
    }
  }
  ctx.putImageData(img, 0, 0);
  return out;
}

export function Restyler({ initialSrc, productSlug, productName }: { initialSrc?: string; productSlug?: string; productName?: string }) {
  const [base, setBase] = useState<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Pt[]>([]);
  const [mask, setMask] = useState<{ data: Uint8Array; width: number; height: number } | null>(null);
  const [mode, setMode] = useState<0 | 1>(1);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [fabric, setFabric] = useState<FabricId>("velvet");
  const [colour, setColour] = useState("#1f5a43");
  const [pattern, setPattern] = useState<PatternId>("plain");
  const [accent, setAccent] = useState("#c9a44a");
  const [split, setSplit] = useState(100);

  const worker = useRef<Worker | null>(null);
  const view = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const w = new Worker(new URL("./sam.worker.ts", import.meta.url), { type: "module" });
    w.onmessage = (e) => {
      const m = e.data;
      if (m.type === "progress") setProgress(m.value);
      if (m.type === "status") {
        setProgress(null);
        setStatus(m.value);
      }
      if (m.type === "ready") {
        setReady(true);
        setStatus("Tap the piece of furniture you want to restyle.");
      }
      if (m.type === "mask") setMask({ data: m.data, width: m.width, height: m.height });
      if (m.type === "error") setStatus(`Could not read the photo: ${m.value}`);
    };
    worker.current = w;
    return () => w.terminate();
  }, []);

  const start = useCallback(async (src: string) => {
    setReady(false);
    setPoints([]);
    setMask(null);
    setSplit(100);
    setStatus("Getting the photo ready…");
    const c = await loadResized(src);
    setBase(c);
    setStatus("Loading the furniture finder. The first time takes a moment, then it stays on your phone.");
    worker.current?.postMessage({ type: "embed", url: c.toDataURL("image/jpeg", 0.9) });
  }, []);

  useEffect(() => {
    if (initialSrc) void Promise.resolve().then(() => start(initialSrc));
  }, [initialSrc, start]);

  const result = useMemo(
    () => (base && mask ? recolour(base, mask, { fabric, colour, pattern, accent }) : null),
    [base, mask, fabric, colour, pattern, accent],
  );

  // Paint the view: original, with the restyled version revealed up to the split line.
  useEffect(() => {
    const c = view.current;
    if (!c || !base) return;
    c.width = base.width;
    c.height = base.height;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(base, 0, 0);
    if (result) {
      const sx = (split / 100) * base.width;
      ctx.drawImage(result, 0, 0, sx, base.height, 0, 0, sx, base.height);
      if (split < 100) {
        ctx.fillStyle = "#c9a44a";
        ctx.fillRect(sx - 1.5, 0, 3, base.height);
      }
    }
  }, [base, result, split]);

  function tap(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!ready) return;
    const r = e.currentTarget.getBoundingClientRect();
    const p: Pt = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, label: mode };
    const next = [...points, p];
    setPoints(next);
    worker.current?.postMessage({ type: "decode", points: next });
  }

  function undo() {
    const next = points.slice(0, -1);
    setPoints(next);
    if (next.length) worker.current?.postMessage({ type: "decode", points: next });
    else setMask(null);
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    start(url).finally(() => URL.revokeObjectURL(url));
  }

  const summary = [
    ...(productName ? [`Photo of: ${productName}`] : ["My own photo"]),
    ...(mask
      ? [
          `Fabric: ${label(FABRICS, fabric)} in ${colourName(colour)}${pattern === "plain" ? "" : `, ${label(PATTERNS, pattern)} pattern in ${colourName(accent)}`}`,
        ]
      : ["I'd like something like this"]),
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
      <div>
        {!base ? (
          <label className="arch flex aspect-[4/5] max-h-[70svh] w-full cursor-pointer flex-col items-center justify-end bg-emerald px-8 pb-[18%] text-center text-ivory">
            <span className="display text-4xl text-gold">Choose a photo</span>
            <span className="mt-3 max-w-xs text-ivory/75">Your own sofa, a room you love, or a screenshot from Instagram.</span>
            <span className="btn btn-gold mt-6">Upload or take a photo</span>
            <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
          </label>
        ) : (
          <div>
            <div className="relative flex justify-center overflow-hidden rounded-2xl bg-night">
              <div className="relative">
                <canvas
                  ref={view}
                  onClick={tap}
                  className={`block h-auto max-h-[72svh] w-auto max-w-full ${ready ? "cursor-crosshair" : "cursor-wait"}`}
                  aria-label="Your photo. Tap the furniture to select it."
                />
                {points.map((p, i) => (
                  <span
                    key={i}
                    className={`pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow ${p.label ? "bg-gold" : "bg-[#9b2c2c]"}`}
                    style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
                  />
                ))}
              </div>
              {!ready && (
                <div className="absolute inset-x-0 bottom-0 bg-night/80 px-4 py-3 text-sm text-ivory">
                  {status}
                  {progress !== null && (
                    <span className="mt-2 block h-1 overflow-hidden rounded bg-ivory/20">
                      <span className="block h-full bg-gold transition-[width]" style={{ width: `${progress}%` }} />
                    </span>
                  )}
                </div>
              )}
            </div>
            {result && (
              <label className="mt-4 block text-sm text-muted">
                <span className="mb-1 block">Slide to compare with the original</span>
                <input type="range" min={0} max={100} value={split} onChange={(e) => setSplit(Number(e.target.value))} className="w-full accent-[var(--gold)]" />
              </label>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button type="button" aria-pressed={mode === 1} onClick={() => setMode(1)} className={`rounded-full border px-4 py-2 text-sm ${mode === 1 ? "border-emerald bg-emerald text-ivory" : "border-emerald/25"}`}>
                Tap to add
              </button>
              <button type="button" aria-pressed={mode === 0} onClick={() => setMode(0)} className={`rounded-full border px-4 py-2 text-sm ${mode === 0 ? "border-emerald bg-emerald text-ivory" : "border-emerald/25"}`}>
                Tap to remove
              </button>
              <button type="button" onClick={undo} disabled={!points.length} className="rounded-full border border-emerald/25 px-4 py-2 text-sm disabled:opacity-40">
                Undo tap
              </button>
              <label className="ml-auto cursor-pointer text-sm text-emerald underline underline-offset-4">
                Use a different photo
                <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
              </label>
            </div>
            {ready && <p className="mt-3 text-sm text-muted">{mask ? "Tap more spots to include them, or switch to remove." : status}</p>}
          </div>
        )}
      </div>

      <div>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-emerald">Fabric</legend>
          <div className="grid grid-cols-2 gap-2">
            {FABRICS.map((f) => (
              <button key={f.id} type="button" aria-pressed={fabric === f.id} onClick={() => setFabric(f.id)}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold ${fabric === f.id ? "border-emerald bg-emerald text-ivory" : "border-emerald/25 bg-white/40"}`}>
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-semibold text-emerald">Colour</legend>
          <div className="flex flex-wrap gap-2">
            {COLOURS.map((c) => (
              <button key={c.hex} type="button" title={c.label} aria-label={c.label} aria-pressed={colour === c.hex} onClick={() => setColour(c.hex)}
                className={`h-9 w-9 rounded-full border border-black/10 ${colour === c.hex ? "ring-2 ring-gold ring-offset-2 ring-offset-ivory" : ""}`} style={{ background: c.hex }} />
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-semibold text-emerald">Pattern</legend>
          <div className="flex flex-wrap gap-2">
            {PATTERNS.map((p) => (
              <button key={p.id} type="button" aria-pressed={pattern === p.id} onClick={() => setPattern(p.id)}
                className={`rounded-full border px-4 py-2 text-sm ${pattern === p.id ? "border-emerald bg-emerald text-ivory" : "border-emerald/25"}`}>
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>
        {pattern !== "plain" && (
          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-semibold text-emerald">Pattern colour</legend>
            <div className="flex flex-wrap gap-2">
              {COLOURS.map((c) => (
                <button key={c.hex} type="button" title={c.label} aria-label={c.label} aria-pressed={accent === c.hex} onClick={() => setAccent(c.hex)}
                  className={`h-9 w-9 rounded-full border border-black/10 ${accent === c.hex ? "ring-2 ring-gold ring-offset-2 ring-offset-ivory" : ""}`} style={{ background: c.hex }} />
              ))}
            </div>
          </fieldset>
        )}

        <p className="mt-6 rounded-xl bg-linen/70 p-4 text-sm text-ink/80">
          This is a preview painted onto your photo, so folds and stitching stay as they are. We will
          match the real fabric with you at the showroom or over WhatsApp. To change the shape too,
          use <a href="/studio" className="font-semibold text-emerald underline underline-offset-4">Design in 3D</a>.
        </p>

        {base && (
          <div className="mt-8 border-t border-emerald/15 pt-7">
            <h2 className="text-3xl text-emerald">Send it to us</h2>
            <p className="mt-2 text-muted">We will reply with a price and the closest fabrics we have.</p>
            <div className="mt-5">
              <SendDesign
                kind={mask ? "photo" : "inspiration"}
                summary={summary}
                productSlug={productSlug}
                getImage={() => (result ?? base).toDataURL("image/jpeg", 0.85)}
                intro={mask ? "I restyled this photo on your website:" : "I'd like a piece like the one in this photo:"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
