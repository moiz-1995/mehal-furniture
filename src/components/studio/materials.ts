import * as THREE from "three";
import type { Upholstery, WoodId } from "./options";
import { WOODS } from "./options";
import { colourTexture, marbleTexture, reliefTexture, woodTexture } from "./textures";

/** Pattern repeats every 35 cm; tufting buttons every 22 cm. */
const PATTERN_TILE = 0.35;
const TUFT_TILE = 0.22;

function repeated(t: THREE.Texture, tile: number) {
  const c = t.clone();
  c.repeat.set(1 / tile, 1 / tile);
  c.needsUpdate = true;
  return c;
}

export function fabricMaterial(u: Upholstery, tufting: "button" | "channel" | "plain" = "plain") {
  const base = new THREE.Color(u.colour);
  const map = repeated(colourTexture(u.colour, u.pattern, u.patternColour), PATTERN_TILE);
  const bump = repeated(reliefTexture(u.fabric, tufting), tufting === "plain" ? 0.12 : TUFT_TILE);

  const m = new THREE.MeshPhysicalMaterial({ map, bumpMap: bump });
  switch (u.fabric) {
    case "velvet":
      m.roughness = 0.82;
      m.sheen = 1;
      m.sheenRoughness = 0.32;
      m.sheenColor = base.clone().lerp(new THREE.Color("#ffffff"), 0.35);
      m.bumpScale = tufting === "plain" ? 0.4 : 3;
      break;
    case "linen":
      m.roughness = 0.95;
      m.sheen = 0.25;
      m.sheenColor = new THREE.Color("#ffffff");
      m.bumpScale = tufting === "plain" ? 1 : 3;
      break;
    case "boucle":
      m.roughness = 1;
      m.sheen = 0.5;
      m.sheenRoughness = 0.8;
      m.sheenColor = new THREE.Color("#ffffff");
      m.bumpScale = tufting === "plain" ? 3 : 4;
      break;
    case "leather":
      m.roughness = 0.42;
      m.clearcoat = 0.25;
      m.clearcoatRoughness = 0.5;
      m.bumpScale = tufting === "plain" ? 0.3 : 3;
      break;
  }
  return m;
}

export function plainFabric(colour: string, fabric: Upholstery["fabric"]) {
  return fabricMaterial({ fabric, colour, pattern: "plain", patternColour: colour });
}

export const goldMaterial = () =>
  new THREE.MeshPhysicalMaterial({ color: "#d4ad57", metalness: 1, roughness: 0.28, clearcoat: 0.3 });

export function woodMaterial(id: WoodId) {
  const hex = WOODS.find((w) => w.id === id)!.hex;
  const map = repeated(woodTexture(hex), 0.6);
  return new THREE.MeshPhysicalMaterial({
    map,
    roughness: id === "ivory" ? 0.55 : 0.48,
    clearcoat: 0.35,
    clearcoatRoughness: 0.4,
  });
}

export function marbleMaterial(kind: "marble-white" | "marble-green" | "marble-grey") {
  const map = repeated(marbleTexture(kind), 1.4);
  return new THREE.MeshPhysicalMaterial({ map, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.08 });
}

export const linenWhite = () =>
  new THREE.MeshPhysicalMaterial({ color: "#f6f2ea", roughness: 0.95, sheen: 0.4, sheenColor: new THREE.Color("#ffffff") });
