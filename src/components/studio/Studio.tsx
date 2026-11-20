"use client";

import * as THREE from "three";
import dynamic from "next/dynamic";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  COLOURS, DEFAULT_DESIGN, FABRICS, LEGS, PATTERNS, TOPS, WOODS,
  dimensions, summarise, type Base, type Design,
} from "./options";
import { SendDesign } from "@/components/request/SendDesign";

const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-muted">Setting up the workshop…</div>,
});
const ArViewer = dynamic(() => import("./ArViewer").then((m) => m.ArViewer), { ssr: false });

const BASES: { id: Base; label: string }[] = [
  { id: "sofa", label: "Sofa" },
  { id: "bed", label: "Bed" },
  { id: "table", label: "Table" },
];

function Choice<T extends string | number | boolean>({
  label, value, options, onChange,
}: {
  label: string;
  value: T;
  options: readonly { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="mb-2 text-sm font-semibold text-emerald">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={String(o.id)}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              value === o.id ? "border-emerald bg-emerald text-ivory" : "border-emerald/25 bg-white/40 text-ink hover:border-emerald"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Swatches({ label, value, onChange }: { label: string; value: string; onChange: (hex: string) => void }) {
  return (
    <fieldset className="mt-6">
      <legend className="mb-2 text-sm font-semibold text-emerald">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {COLOURS.map((c) => (
          <button
            key={c.hex}
            type="button"
            title={c.label}
            aria-label={c.label}
            aria-pressed={value.toLowerCase() === c.hex}
            onClick={() => onChange(c.hex)}
            className={`h-9 w-9 rounded-full border border-black/10 transition-transform hover:scale-110 ${
              value.toLowerCase() === c.hex ? "ring-2 ring-gold ring-offset-2 ring-offset-ivory" : ""
            }`}
            style={{ background: c.hex }}
          />
        ))}
        <label className="relative h-9 w-9 cursor-pointer overflow-hidden rounded-full border border-dashed border-emerald/50" title="Any colour">
          <span className="sr-only">Pick any colour</span>
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
          <span className="flex h-full items-center justify-center text-lg text-emerald" aria-hidden="true">+</span>
        </label>
      </div>
    </fieldset>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-emerald/15 py-7 first:border-t-0 first:pt-0">
      <h2 className="text-3xl text-emerald">{title}</h2>
      {children}
    </section>
  );
}

export function Studio({ products }: { products: { slug: string; name: string }[] }) {
  const params = useSearchParams();
  const fromSlug = params.get("from") ?? undefined;
  const from = products.find((p) => p.slug === fromSlug);
  const initialBase = (["sofa", "bed", "table"] as const).find((b) => b === params.get("base")) ?? "sofa";

  const [d, setD] = useState<Design>({ ...DEFAULT_DESIGN, base: initialBase });
  const [arGroup, setArGroup] = useState<THREE.Group | null>(null);
  const group = useRef<THREE.Group>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const set = <K extends keyof Design>(k: K, patch: Partial<Design[K]>) =>
    setD((prev) => ({ ...prev, [k]: { ...(prev[k] as object), ...patch } }));

  const u = d.upholstery;
  const dims = dimensions(d);
  const summary = [...(from ? [`Based on: ${from.name}`] : []), ...summarise(d)];

  const snapshot = useCallback(() => canvas.current?.toDataURL("image/jpeg", 0.82), []);
  const hasFabric = d.base !== "table" || (d.table.use === "dining" && d.table.chairs);
  const woodLegs = (l: string) => l === "turned" || l === "block";

  return (
    <div className="grid lg:h-[calc(100svh-5rem)] lg:grid-cols-[1fr_27rem]">
      <div className="relative h-[52svh] bg-[#efe8d8] lg:h-full">
        <Scene ref={group} design={d} onReady={(c) => (canvas.current = c)} />
        <div className="pointer-events-none absolute left-4 top-4 flex gap-2 sm:left-6 sm:top-6">
          {BASES.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={d.base === b.id}
              onClick={() => setD((p) => ({ ...p, base: b.id }))}
              className={`pointer-events-auto rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
                d.base === b.id ? "bg-emerald text-ivory" : "bg-ivory/90 text-emerald hover:bg-ivory"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
          <dl className="flex gap-4 rounded-full bg-ivory/90 px-4 py-2 text-sm text-ink shadow-sm">
            <div><dt className="sr-only">Width</dt><dd>W {dims.width} cm</dd></div>
            <div><dt className="sr-only">Depth</dt><dd>D {dims.depth} cm</dd></div>
            <div><dt className="sr-only">Height</dt><dd>H {dims.height} cm</dd></div>
          </dl>
          <button type="button" onClick={() => setArGroup(group.current)} className="btn btn-gold pointer-events-auto shadow-sm !py-2.5">
            See it in your room
          </button>
        </div>
        <p className="pointer-events-none absolute right-6 top-6 hidden text-sm text-muted sm:block">Drag to turn it around</p>
      </div>

      <aside className="overflow-y-auto border-l border-emerald/10 bg-ivory px-5 py-8 sm:px-8" data-lenis-prevent>
        {from && <p className="mb-4 text-sm text-muted">Starting from the {from.name}</p>}

        {d.base === "sofa" && (
          <Section title="Shape">
            <Choice label="Seats" value={d.sofa.seats} options={[{ id: 2, label: "2 seats" }, { id: 3, label: "3 seats" }, { id: 4, label: "4 seats" }] as const} onChange={(v) => set("sofa", { seats: v })} />
            <Choice label="L-shape" value={d.sofa.chaise} options={[{ id: "none", label: "Straight" }, { id: "left", label: "Chaise on left" }, { id: "right", label: "Chaise on right" }] as const} onChange={(v) => set("sofa", { chaise: v })} />
            <Choice label="Arms" value={d.sofa.arms} options={[{ id: "rolled", label: "Rolled" }, { id: "track", label: "Square" }, { id: "slope", label: "Low slope" }, { id: "none", label: "Armless" }] as const} onChange={(v) => set("sofa", { arms: v })} />
            <Choice label="Back height" value={d.sofa.back} options={[{ id: "low", label: "Low" }, { id: "medium", label: "Medium" }, { id: "high", label: "High" }] as const} onChange={(v) => set("sofa", { back: v })} />
            <Choice label="Back stitching" value={d.sofa.tufting} options={[{ id: "button", label: "Button tufted" }, { id: "channel", label: "Channels" }, { id: "plain", label: "Plain" }] as const} onChange={(v) => set("sofa", { tufting: v })} />
            <Choice label="Legs" value={d.sofa.legs} options={LEGS} onChange={(v) => set("sofa", { legs: v })} />
            {woodLegs(d.sofa.legs) && <Choice label="Wood finish" value={d.sofa.wood} options={WOODS} onChange={(v) => set("sofa", { wood: v })} />}
          </Section>
        )}

        {d.base === "bed" && (
          <Section title="Shape">
            <Choice label="Size" value={d.bed.size} options={[{ id: "queen", label: "Queen (5 × 6.5 ft)" }, { id: "king", label: "King (6 × 6.5 ft)" }] as const} onChange={(v) => set("bed", { size: v })} />
            <Choice label="Headboard" value={d.bed.headboard} options={[{ id: "mehrab", label: "Mehrab arch" }, { id: "button", label: "Button tufted" }, { id: "channel", label: "Channels" }] as const} onChange={(v) => set("bed", { headboard: v })} />
            <Choice label="Headboard height" value={d.bed.headHeight} options={[{ id: "standard", label: "Standard" }, { id: "tall", label: "Tall" }, { id: "grand", label: "Grand" }] as const} onChange={(v) => set("bed", { headHeight: v })} />
            <Choice label="Legs" value={d.bed.legs} options={LEGS} onChange={(v) => set("bed", { legs: v })} />
            {woodLegs(d.bed.legs) && <Choice label="Wood finish" value={d.bed.wood} options={WOODS} onChange={(v) => set("bed", { wood: v })} />}
          </Section>
        )}

        {d.base === "table" && (
          <Section title="Shape">
            <Choice label="Table for" value={d.table.use} options={[{ id: "dining", label: "Dining" }, { id: "coffee", label: "Coffee / centre" }] as const}
              onChange={(v) => set("table", { use: v, length: v === "dining" ? 200 : 110 })} />
            <Choice label="Shape" value={d.table.shape} options={[{ id: "rectangle", label: "Rectangle" }, { id: "oval", label: "Oval" }, { id: "round", label: "Round" }] as const}
              onChange={(v) => set("table", { shape: v, length: v === "round" ? (d.table.use === "dining" ? 130 : 90) : d.table.use === "dining" ? 200 : 110 })} />
            <label className="mt-6 block">
              <span className="mb-2 flex justify-between text-sm font-semibold text-emerald">
                <span>{d.table.shape === "round" ? "Diameter" : "Length"}</span>
                <span className="text-bronze">{d.table.length} cm</span>
              </span>
              <input
                type="range"
                className="w-full accent-[var(--emerald)]"
                min={d.table.use === "dining" ? (d.table.shape === "round" ? 100 : 140) : 60}
                max={d.table.use === "dining" ? (d.table.shape === "round" ? 160 : 320) : 160}
                step={10}
                value={d.table.length}
                onChange={(e) => set("table", { length: Number(e.target.value) })}
              />
            </label>
            <Choice label="Top" value={d.table.top} options={TOPS} onChange={(v) => set("table", { top: v })} />
            <Choice label="Base" value={d.table.base} options={[{ id: "four-legs", label: "Four legs" }, { id: "pedestal", label: "Pedestal" }, { id: "trestle", label: "Trestle" }] as const} onChange={(v) => set("table", { base: v })} />
            <Choice label="Base finish" value={d.table.legs} options={[{ id: "gold", label: "Gold" }, { id: "wood", label: "Wood" }] as const} onChange={(v) => set("table", { legs: v })} />
            {(d.table.legs === "wood" || d.table.top === "wood") && <Choice label="Wood finish" value={d.table.wood} options={WOODS} onChange={(v) => set("table", { wood: v })} />}
            {d.table.use === "dining" && (
              <Choice label="Chairs" value={d.table.chairs} options={[{ id: true, label: "With chairs" }, { id: false, label: "Table only" }] as const} onChange={(v) => set("table", { chairs: v })} />
            )}
          </Section>
        )}

        {hasFabric && (
          <Section title={d.base === "table" ? "Chair fabric" : "Fabric and colour"}>
            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-semibold text-emerald">Fabric</legend>
              <div className="grid grid-cols-2 gap-2">
                {FABRICS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={u.fabric === f.id}
                    onClick={() => set("upholstery", { fabric: f.id })}
                    className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${u.fabric === f.id ? "border-emerald bg-emerald text-ivory" : "border-emerald/25 bg-white/40 hover:border-emerald"}`}
                  >
                    <span className="block text-sm font-semibold">{f.label}</span>
                    <span className={`block text-xs ${u.fabric === f.id ? "text-ivory/75" : "text-muted"}`}>{f.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <Swatches label="Colour" value={u.colour} onChange={(hex) => set("upholstery", { colour: hex })} />
            <Choice label="Pattern" value={u.pattern} options={PATTERNS} onChange={(v) => set("upholstery", { pattern: v })} />
            <Swatches label={u.pattern === "plain" ? "Cushion colour" : "Pattern colour"} value={u.patternColour} onChange={(hex) => set("upholstery", { patternColour: hex })} />
          </Section>
        )}

        <Section title="Send it to us">
          <p className="mt-3 text-muted">
            We will check the sizes and fabric with you and reply with a price. Nothing is charged
            until you agree.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-ink/80">
            {summary.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <div className="mt-6">
            <SendDesign kind="3d" summary={summary} getImage={snapshot} productSlug={from?.slug} intro="I designed this piece on your website:" />
          </div>
        </Section>
      </aside>

      {arGroup && <ArViewer group={arGroup} onClose={() => setArGroup(null)} />}
    </div>
  );
}
