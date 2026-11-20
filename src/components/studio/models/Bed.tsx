"use client";

import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import type { BedConfig, Upholstery } from "../options";
import { fabricMaterial, linenWhite, plainFabric } from "../materials";
import { Leg, legHeight, useMat } from "./parts";

const LENGTH = 2.1;
const FRAME_H = 0.3;
const MATTRESS_H = 0.26;
const HEAD_T = 0.12;

/** Mehrab-shaped headboard: the same pointed arch as the Mehal logo. */
function useArchGeometry(w: number, h: number) {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    const shoulder = h * 0.62;
    s.moveTo(-w / 2, 0);
    s.lineTo(-w / 2, shoulder);
    s.bezierCurveTo(-w / 2, shoulder + (h - shoulder) * 0.6, -w * 0.12, h * 0.86, 0, h);
    s.bezierCurveTo(w * 0.12, h * 0.86, w / 2, shoulder + (h - shoulder) * 0.6, w / 2, shoulder);
    s.lineTo(w / 2, 0);
    s.lineTo(-w / 2, 0);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: HEAD_T - 0.06,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 6,
      curveSegments: 48,
    });
    g.translate(0, 0, -(HEAD_T - 0.06) / 2);
    return g;
  }, [w, h]);
  useEffect(() => () => geo.dispose(), [geo]);
  return geo;
}

export function Bed({ c, u }: { c: BedConfig; u: Upholstery }) {
  const tuft = c.headboard === "mehrab" ? "button" : c.headboard;
  const head = useMat(() => fabricMaterial(u, tuft), [u.fabric, u.colour, u.pattern, u.patternColour, tuft]);
  const body = useMat(() => fabricMaterial(u), [u.fabric, u.colour, u.pattern, u.patternColour]);
  const sheet = useMat(linenWhite, []);
  const throwMat = useMat(() => plainFabric(u.pattern === "plain" ? u.patternColour : u.colour, "velvet"), [u.pattern, u.patternColour, u.colour]);

  const W = c.size === "king" ? 1.95 : 1.6;
  const legH = legHeight(c.legs);
  const frameTop = legH + FRAME_H;
  const headH = { standard: 1.1, tall: 1.35, grand: 1.65 }[c.headHeight];
  const head0 = -LENGTH / 2;
  const arch = useArchGeometry(W + 0.12, headH - legH);

  const inset = 0.08;
  const legs: [number, number][] = [
    [-(W / 2) + inset, head0 + inset + 0.05],
    [W / 2 - inset, head0 + inset + 0.05],
    [-(W / 2) + inset, LENGTH / 2 - inset],
    [W / 2 - inset, LENGTH / 2 - inset],
  ];

  return (
    <group>
      {/* Upholstered frame */}
      <RoundedBox args={[W + 0.08, FRAME_H, LENGTH]} radius={0.03} smoothness={4} position={[0, legH + FRAME_H / 2, 0.04]} material={body} castShadow receiveShadow />

      {/* Mattress and bedding */}
      <RoundedBox args={[W - 0.04, MATTRESS_H, LENGTH - 0.12]} radius={0.06} smoothness={5} position={[0, frameTop + MATTRESS_H / 2 - 0.04, 0.08]} material={sheet} castShadow />
      <RoundedBox args={[W + 0.02, 0.05, LENGTH * 0.62]} radius={0.025} smoothness={4} position={[0, frameTop + MATTRESS_H - 0.03, LENGTH * 0.17]} material={sheet} castShadow />
      <RoundedBox args={[W + 0.06, 0.035, 0.5]} radius={0.017} smoothness={4} position={[0, frameTop + MATTRESS_H + 0.0, LENGTH * 0.33]} material={throwMat} castShadow />
      {[-1, 1].map((side) => (
        <RoundedBox key={side} args={[W * 0.4, 0.15, 0.42]} radius={0.07} smoothness={6} position={[side * W * 0.235, frameTop + MATTRESS_H + 0.05, head0 + 0.34]} rotation={[-0.45, 0, 0]} material={sheet} castShadow />
      ))}
      <RoundedBox args={[0.46, 0.34, 0.12]} radius={0.05} smoothness={6} position={[0, frameTop + MATTRESS_H + 0.17, head0 + 0.52]} rotation={[-0.3, 0, 0]} material={throwMat} castShadow />

      {/* Headboard */}
      {c.headboard === "mehrab" ? (
        <mesh geometry={arch} position={[0, legH, head0 - HEAD_T / 2]} material={head} castShadow />
      ) : (
        <RoundedBox args={[W + 0.12, headH - legH, HEAD_T]} radius={0.04} smoothness={5} position={[0, legH + (headH - legH) / 2, head0 - HEAD_T / 2]} material={head} castShadow />
      )}

      {c.legs !== "plinth" && legs.map((p, i) => <Leg key={i} kind={c.legs} wood={c.wood} h={legH} position={p} />)}
    </group>
  );
}
