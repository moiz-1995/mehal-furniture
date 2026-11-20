import * as THREE from "three";
import type { FabricId, PatternId } from "./options";

/**
 * All textures are painted in code on a canvas: no downloads, no licences,
 * and any colour combination works instantly.
 */

const cache = new Map<string, THREE.CanvasTexture>();

function canvas(size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  return [c, c.getContext("2d")!] as const;
}

function toTexture(c: HTMLCanvasElement, srgb: boolean) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function cached(key: string, make: () => THREE.CanvasTexture) {
  let t = cache.get(key);
  if (!t) {
    t = make();
    cache.set(key, t);
  }
  return t;
}

/* ---------- colour + pattern ---------- */

function damask(ctx: CanvasRenderingContext2D, s: number) {
  // A symmetric floral medallion, mirrored left/right, tiled on a half-drop.
  const motif = (cx: number, cy: number, k: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(k, k);
    for (const dir of [1, -1]) {
      ctx.save();
      ctx.scale(dir, 1);
      ctx.beginPath();
      ctx.moveTo(0, -60);
      ctx.bezierCurveTo(30, -50, 40, -20, 18, 0);
      ctx.bezierCurveTo(45, 10, 40, 45, 0, 62);
      ctx.bezierCurveTo(10, 30, 12, 15, 0, 6);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(34, -28, 9, 20, -0.6, 0, Math.PI * 2);
      ctx.ellipse(36, 30, 8, 18, 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, -72, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  motif(s / 4, s / 4, s / 520);
  motif((3 * s) / 4, (3 * s) / 4, s / 520);
  motif((3 * s) / 4, -s / 4, s / 520);
  motif(-s / 4, (3 * s) / 4, s / 520);
  motif(s / 4 + s, s / 4, s / 520);
  motif((3 * s) / 4 - s, (3 * s) / 4, s / 520);
  motif(s / 4, s / 4 + s, s / 520);
  motif((3 * s) / 4, (3 * s) / 4 - s, s / 520);
}

function jali(ctx: CanvasRenderingContext2D, s: number) {
  ctx.lineWidth = s / 90;
  const star = (cx: number, cy: number, r: number) => {
    for (const rot of [0, Math.PI / 4]) {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = rot + (i * Math.PI) / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  };
  for (const [x, y] of [
    [0, 0], [s, 0], [0, s], [s, s], [s / 2, s / 2],
  ]) {
    star(x, y, s * 0.3);
  }
}

function stripe(ctx: CanvasRenderingContext2D, s: number) {
  const w = s / 8;
  for (let x = 0; x < s; x += w * 2) ctx.fillRect(x, 0, w * 0.55, s);
  ctx.globalAlpha = 0.5;
  for (let x = w; x < s; x += w * 2) ctx.fillRect(x + w * 0.4, 0, w * 0.12, s);
  ctx.globalAlpha = 1;
}

function herringbone(ctx: CanvasRenderingContext2D, s: number) {
  const n = 8;
  const w = s / n;
  ctx.lineWidth = w * 0.28;
  for (let col = 0; col < n; col++) {
    const dir = col % 2 === 0 ? 1 : -1;
    for (let y = -w; y < s + w; y += w * 0.5) {
      ctx.beginPath();
      ctx.moveTo(col * w, y);
      ctx.lineTo(col * w + w, y + dir * w * 0.5);
      ctx.stroke();
    }
  }
}

/** The raw painted tile, also used by the photo restyler (no three.js needed there). */
export function colourCanvas(colour: string, pattern: PatternId, accent: string) {
    const s = 512;
    const [c, ctx] = canvas(s);
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = accent;
    ctx.strokeStyle = accent;
    if (pattern === "damask") damask(ctx, s);
    if (pattern === "jali") jali(ctx, s);
    if (pattern === "stripe") stripe(ctx, s);
    if (pattern === "herringbone") {
      ctx.globalAlpha = 0.55;
      herringbone(ctx, s);
      ctx.globalAlpha = 1;
    }
    return c;
}

export function colourTexture(colour: string, pattern: PatternId, accent: string) {
  return cached(`c:${colour}:${pattern}:${accent}`, () => toTexture(colourCanvas(colour, pattern, accent), true));
}

/* ---------- surface relief: weave + tufting ---------- */

function noise(ctx: CanvasRenderingContext2D, s: number, amount: number, seed = 7) {
  const img = ctx.getImageData(0, 0, s, s);
  let x = seed;
  for (let i = 0; i < img.data.length; i += 4) {
    x = (x * 16807) % 2147483647;
    const n = ((x / 2147483647) - 0.5) * amount;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
}

export function reliefCanvas(fabric: FabricId, tufting: "button" | "channel" | "plain") {
    const s = 512;
    const [c, ctx] = canvas(s);
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, s, s);

    if (tufting === "button") {
      // Diamond tufting: soft pillows between buttons, deep dimple at each button.
      const pts = [
        [0, 0], [s, 0], [0, s], [s, s], [s / 2, s / 2],
      ];
      for (const [x, y] of pts) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, s * 0.42);
        g.addColorStop(0, "#000");
        g.addColorStop(0.12, "#3a3a3a");
        g.addColorStop(0.55, "#b0b0b0");
        g.addColorStop(1, "rgba(176,176,176,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      ctx.strokeStyle = "rgba(40,40,40,.55)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(s, s);
      ctx.moveTo(s, 0); ctx.lineTo(0, s);
      ctx.stroke();
    } else if (tufting === "channel") {
      for (let i = 0; i < 2; i++) {
        const x0 = (i * s) / 2;
        const g = ctx.createLinearGradient(x0, 0, x0 + s / 2, 0);
        g.addColorStop(0, "#202020");
        g.addColorStop(0.15, "#9a9a9a");
        g.addColorStop(0.5, "#c8c8c8");
        g.addColorStop(0.85, "#9a9a9a");
        g.addColorStop(1, "#202020");
        ctx.fillStyle = g;
        ctx.fillRect(x0, 0, s / 2, s);
      }
    }

    // Weave
    if (fabric === "boucle") {
      let seed = 11;
      for (let i = 0; i < 2600; i++) {
        seed = (seed * 16807) % 2147483647;
        const x = (seed % 1000) / 1000 * s;
        seed = (seed * 16807) % 2147483647;
        const y = (seed % 1000) / 1000 * s;
        ctx.strokeStyle = `rgba(${seed % 2 ? 255 : 0},${seed % 2 ? 255 : 0},${seed % 2 ? 255 : 0},.18)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 3 + (seed % 4), 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (fabric === "linen") {
      ctx.globalAlpha = 0.12;
      for (let y = 0; y < s; y += 3) {
        ctx.fillStyle = y % 6 ? "#fff" : "#000";
        ctx.fillRect(0, y, s, 1);
      }
      for (let x = 0; x < s; x += 3) {
        ctx.fillStyle = x % 6 ? "#000" : "#fff";
        ctx.fillRect(x, 0, 1, s);
      }
      ctx.globalAlpha = 1;
    }
    noise(ctx, s, fabric === "leather" ? 26 : fabric === "velvet" ? 10 : 18);
    return c;
}

export function reliefTexture(fabric: FabricId, tufting: "button" | "channel" | "plain") {
  return cached(`r:${fabric}:${tufting}`, () => toTexture(reliefCanvas(fabric, tufting), false));
}

/* ---------- hard materials ---------- */

export function marbleTexture(kind: "marble-white" | "marble-green" | "marble-grey") {
  return cached(`m:${kind}`, () => {
    const s = 1024;
    const [c, ctx] = canvas(s);
    const base = { "marble-white": "#ece8e1", "marble-grey": "#8e8f8f", "marble-green": "#2f4a3c" }[kind];
    const vein = { "marble-white": "#9c968c", "marble-grey": "#e9e6e1", "marble-green": "#c8b98a" }[kind];
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, s, s);
    let seed = kind.length * 977;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let v = 0; v < 26; v++) {
      ctx.strokeStyle = vein;
      ctx.globalAlpha = 0.15 + rnd() * 0.45;
      ctx.lineWidth = 0.6 + rnd() * (v < 4 ? 5 : 1.6);
      let x = rnd() * s;
      let y = -20;
      ctx.beginPath();
      ctx.moveTo(x, y);
      while (y < s + 20) {
        x += (rnd() - 0.45) * 60;
        y += 14 + rnd() * 30;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    noise(ctx, s, 14, 3);
    return toTexture(c, true);
  });
}

export function woodTexture(hex: string) {
  return cached(`w:${hex}`, () => {
    const s = 512;
    const [c, ctx] = canvas(s);
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, s, s);
    let seed = 4242;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 90; i++) {
      const y = rnd() * s;
      ctx.strokeStyle = rnd() > 0.5 ? "rgba(0,0,0,.18)" : "rgba(255,255,255,.07)";
      ctx.lineWidth = 0.5 + rnd() * 2.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= s; x += 32) ctx.lineTo(x, y + Math.sin(x / 70 + i) * 4 + (rnd() - 0.5) * 2);
      ctx.stroke();
    }
    noise(ctx, s, 10, 9);
    return toTexture(c, true);
  });
}
