/** Everything a customer can choose in the 3D studio, with workshop-friendly labels. */

export type Base = "sofa" | "bed" | "table";

export const FABRICS = [
  { id: "velvet", label: "Velvet", note: "Soft sheen, deep colour" },
  { id: "linen", label: "Linen blend", note: "Matte and breathable" },
  { id: "boucle", label: "Bouclé", note: "Looped, textured wool" },
  { id: "leather", label: "Leather", note: "Smooth, wipe-clean" },
] as const;
export type FabricId = (typeof FABRICS)[number]["id"];

export const COLOURS = [
  { hex: "#efe6d2", label: "Ivory" },
  { hex: "#d9c6a5", label: "Sand" },
  { hex: "#b98b5e", label: "Camel" },
  { hex: "#8a4b2a", label: "Russet" },
  { hex: "#6e1f2f", label: "Maroon" },
  { hex: "#5b2a4e", label: "Plum" },
  { hex: "#d9a441", label: "Mustard" },
  { hex: "#1f5a43", label: "Emerald" },
  { hex: "#0f3d2e", label: "Bottle green" },
  { hex: "#5f7f8a", label: "Teal grey" },
  { hex: "#1d2f4f", label: "Midnight blue" },
  { hex: "#7d7a74", label: "Stone grey" },
  { hex: "#2b2a28", label: "Charcoal" },
] as const;

export const PATTERNS = [
  { id: "plain", label: "Plain" },
  { id: "damask", label: "Damask" },
  { id: "jali", label: "Jali lattice" },
  { id: "stripe", label: "Stripe" },
  { id: "herringbone", label: "Herringbone" },
] as const;
export type PatternId = (typeof PATTERNS)[number]["id"];

export const LEGS = [
  { id: "gold", label: "Gold taper" },
  { id: "turned", label: "Turned wood" },
  { id: "block", label: "Wooden block" },
  { id: "plinth", label: "Hidden plinth" },
] as const;
export type LegId = (typeof LEGS)[number]["id"];

export const WOODS = [
  { id: "walnut", label: "Walnut stain", hex: "#5a3a24" },
  { id: "sheesham", label: "Natural sheesham", hex: "#8a5a35" },
  { id: "ebony", label: "Ebony black", hex: "#1f1a17" },
  { id: "ivory", label: "Painted ivory", hex: "#e9e0cc" },
] as const;
export type WoodId = (typeof WOODS)[number]["id"];

export interface Upholstery {
  fabric: FabricId;
  colour: string;
  pattern: PatternId;
  patternColour: string;
}

export interface SofaConfig {
  seats: 2 | 3 | 4;
  chaise: "none" | "left" | "right";
  arms: "track" | "rolled" | "slope" | "none";
  back: "low" | "medium" | "high";
  tufting: "button" | "channel" | "plain";
  legs: LegId;
  wood: WoodId;
}

export interface BedConfig {
  size: "queen" | "king";
  headboard: "button" | "channel" | "mehrab";
  headHeight: "standard" | "tall" | "grand";
  legs: LegId;
  wood: WoodId;
}

export interface TableConfig {
  use: "dining" | "coffee";
  shape: "rectangle" | "round" | "oval";
  length: number; // cm, for rectangle/oval; diameter for round
  top: "marble-white" | "marble-green" | "marble-grey" | "wood";
  base: "four-legs" | "pedestal" | "trestle";
  legs: "gold" | "wood";
  wood: WoodId;
  /** Dining only: show upholstered chairs around it. */
  chairs: boolean;
}

export interface Design {
  base: Base;
  upholstery: Upholstery;
  sofa: SofaConfig;
  bed: BedConfig;
  table: TableConfig;
}

export const DEFAULT_DESIGN: Design = {
  base: "sofa",
  upholstery: { fabric: "velvet", colour: "#efe6d2", pattern: "plain", patternColour: "#1f5a43" },
  sofa: { seats: 3, chaise: "none", arms: "rolled", back: "medium", tufting: "button", legs: "gold", wood: "walnut" },
  bed: { size: "king", headboard: "mehrab", headHeight: "tall", legs: "gold", wood: "walnut" },
  table: { use: "dining", shape: "rectangle", length: 200, top: "marble-white", base: "four-legs", legs: "gold", wood: "walnut", chairs: true },
};

export const TOPS = [
  { id: "marble-white", label: "White marble" },
  { id: "marble-grey", label: "Grey marble" },
  { id: "marble-green", label: "Green marble" },
  { id: "wood", label: "Solid wood" },
] as const;

export const label = <T extends { id: string; label: string }>(list: readonly T[], id: string) =>
  list.find((x) => x.id === id)?.label ?? id;

export const colourName = (hex: string) =>
  COLOURS.find((c) => c.hex.toLowerCase() === hex.toLowerCase())?.label ?? `custom ${hex}`;

/** Overall size in cm, shown on screen and sent to the workshop. */
export function dimensions(d: Design) {
  if (d.base === "sofa") {
    const s = d.sofa;
    const armW = s.arms === "none" ? 0 : 20;
    const width = s.seats * 65 + armW * 2;
    const depth = s.chaise === "none" ? 95 : 160;
    const height = { low: 78, medium: 90, high: 102 }[s.back];
    return { width, depth, height };
  }
  if (d.base === "bed") {
    const b = d.bed;
    const width = b.size === "king" ? 205 : 170;
    const height = { standard: 110, tall: 135, grand: 165 }[b.headHeight];
    return { width, depth: 220, height };
  }
  const t = d.table;
  const height = t.use === "dining" ? 76 : 42;
  if (t.shape === "round") return { width: t.length, depth: t.length, height };
  return { width: t.length, depth: Math.round(t.use === "dining" ? 100 : t.length * 0.55), height };
}

export function summarise(d: Design): string[] {
  const u = d.upholstery;
  const fabricLine = `${label(FABRICS, u.fabric)} in ${colourName(u.colour)}${
    u.pattern === "plain" ? "" : `, ${label(PATTERNS, u.pattern)} pattern in ${colourName(u.patternColour)}`
  }`;
  const { width, depth, height } = dimensions(d);
  const size = `Size: about ${width} × ${depth} cm, ${height} cm high`;

  if (d.base === "sofa") {
    const s = d.sofa;
    return [
      `Sofa: ${s.seats} seats${s.chaise === "none" ? "" : `, L-shape with chaise on the ${s.chaise}`}`,
      `Arms: ${{ track: "track (square)", rolled: "rolled", slope: "low slope", none: "armless" }[s.arms]}`,
      `Back: ${s.back}, ${{ button: "button tufted", channel: "channel stitched", plain: "plain" }[s.tufting]}`,
      `Legs: ${label(LEGS, s.legs)}${s.legs === "turned" || s.legs === "block" ? `, ${label(WOODS, s.wood)}` : ""}`,
      `Fabric: ${fabricLine}`,
      size,
    ];
  }
  if (d.base === "bed") {
    const b = d.bed;
    return [
      `Bed: ${b.size}`,
      `Headboard: ${{ button: "button tufted", channel: "channel stitched", mehrab: "mehrab arch" }[b.headboard]}, ${b.headHeight}`,
      `Legs: ${label(LEGS, b.legs)}${b.legs === "turned" || b.legs === "block" ? `, ${label(WOODS, b.wood)}` : ""}`,
      `Fabric: ${fabricLine}`,
      size,
    ];
  }
  const t = d.table;
  return [
    `Table: ${t.use} table, ${t.shape}`,
    `Top: ${label(TOPS, t.top)}${t.top === "wood" ? `, ${label(WOODS, t.wood)}` : ""}`,
    `Base: ${{ "four-legs": "four legs", pedestal: "pedestal", trestle: "trestle" }[t.base]}, ${t.legs === "gold" ? "gold finish" : label(WOODS, t.wood)}`,
    ...(t.use === "dining" && t.chairs
      ? [`Chairs: ${chairCount(t)} upholstered in ${label(FABRICS, u.fabric)}, ${colourName(u.colour)}`]
      : []),
    size,
  ];
}

/** How many chairs fit around a dining table, at about 60 cm per place. */
export function chairCount(t: TableConfig) {
  if (t.shape === "round") return Math.max(4, Math.min(8, Math.floor((Math.PI * t.length) / 60)));
  const perSide = Math.max(1, Math.floor((t.length - 20) / 60));
  return perSide * 2 + (t.length >= 180 ? 2 : 0);
}
