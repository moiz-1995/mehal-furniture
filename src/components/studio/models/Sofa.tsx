"use client";

import { RoundedBox } from "@react-three/drei";
import type { SofaConfig, Upholstery } from "../options";
import { fabricMaterial, plainFabric } from "../materials";
import { Leg, legHeight, useMat } from "./parts";

const SEAT_W = 0.65;
const DEPTH = 0.95;
const CHAISE_DEPTH = 1.6;
const BASE_H = 0.2;
const CUSH_H = 0.14;
const BACK_T = 0.2;

/**
 * A sofa assembled from parts, the way the workshop builds one: a base per
 * seat, cushions, a tufted back, two arms and legs. Length grows by adding
 * seats, so tufting never stretches.
 */
export function Sofa({ c, u }: { c: SofaConfig; u: Upholstery }) {
  const body = useMat(() => fabricMaterial(u), [u.fabric, u.colour, u.pattern, u.patternColour]);
  const back = useMat(() => fabricMaterial(u, c.tufting), [u.fabric, u.colour, u.pattern, u.patternColour, c.tufting]);
  const accent = useMat(() => plainFabric(u.pattern === "plain" ? u.patternColour : u.colour, u.fabric === "leather" ? "velvet" : u.fabric), [u.pattern, u.patternColour, u.colour, u.fabric]);
  const plinth = useMat(() => plainFabric("#1d1b16", "linen"), []);

  const armW = c.arms === "none" ? 0 : c.arms === "slope" ? 0.15 : 0.2;
  const innerW = c.seats * SEAT_W;
  const totalW = innerW + armW * 2;
  const legH = legHeight(c.legs);
  const baseTop = legH + BASE_H;
  const seatTop = baseTop + CUSH_H;
  const backH = { low: 0.3, medium: 0.42, high: 0.54 }[c.back];
  const chaiseIdx = c.chaise === "left" ? 0 : c.chaise === "right" ? c.seats - 1 : -1;
  const back0 = -DEPTH / 2;
  const seatX = (i: number) => -innerW / 2 + SEAT_W * (i + 0.5);
  const depthOf = (i: number) => (i === chaiseIdx ? CHAISE_DEPTH : DEPTH);

  // Legs at the corners of the footprint, plus centre supports on long sofas.
  const front = back0 + DEPTH;
  const legInset = 0.07;
  const legs: [number, number][] = [
    [-totalW / 2 + legInset, back0 + legInset],
    [totalW / 2 - legInset, back0 + legInset],
    [-totalW / 2 + legInset, (c.chaise === "left" ? back0 + CHAISE_DEPTH : front) - legInset],
    [totalW / 2 - legInset, (c.chaise === "right" ? back0 + CHAISE_DEPTH : front) - legInset],
  ];
  if (c.seats >= 3) legs.push([0, back0 + legInset], [0, front - legInset]);
  if (chaiseIdx >= 0) {
    const inner = seatX(chaiseIdx) + (chaiseIdx === 0 ? SEAT_W / 2 : -SEAT_W / 2);
    legs.push([inner, back0 + CHAISE_DEPTH - legInset]);
  }

  const armH = c.arms === "slope" ? seatTop + 0.08 - legH : seatTop + 0.2 - legH;
  const arm = (side: -1 | 1) => {
    if (c.arms === "none") return null;
    const onChaise = (side === -1 && c.chaise === "left") || (side === 1 && c.chaise === "right");
    const d = onChaise ? CHAISE_DEPTH : DEPTH;
    const x = side * (innerW / 2 + armW / 2);
    const z = back0 + d / 2;
    if (c.arms === "rolled") {
      const blockH = armH - 0.09;
      return (
        <group key={side}>
          <RoundedBox args={[armW, blockH, d]} radius={0.03} smoothness={4} position={[x, legH + blockH / 2, z]} material={body} castShadow />
          <mesh position={[x + side * 0.02, legH + blockH, z]} rotation={[Math.PI / 2, 0, 0]} material={body} castShadow>
            <cylinderGeometry args={[0.115, 0.115, d, 40]} />
          </mesh>
        </group>
      );
    }
    return (
      <RoundedBox key={side} args={[armW, armH, d]} radius={c.arms === "slope" ? 0.06 : 0.035} smoothness={4} position={[x, legH + armH / 2, z]} material={body} castShadow />
    );
  };

  return (
    <group>
      {/* Base, one block per seat so a chaise can run forward */}
      {Array.from({ length: c.seats }, (_, i) => (
        <RoundedBox
          key={`base${i}`}
          args={[SEAT_W + 0.002, BASE_H, depthOf(i)]}
          radius={0.02}
          smoothness={3}
          position={[seatX(i), legH + BASE_H / 2, back0 + depthOf(i) / 2]}
          material={body}
          castShadow
          receiveShadow
        />
      ))}

      {/* Seat cushions */}
      {Array.from({ length: c.seats }, (_, i) => {
        const d = depthOf(i) - BACK_T - 0.02;
        return (
          <RoundedBox
            key={`seat${i}`}
            args={[SEAT_W - 0.012, CUSH_H, d]}
            radius={0.05}
            smoothness={5}
            position={[seatX(i), baseTop + CUSH_H / 2, back0 + BACK_T + 0.01 + d / 2]}
            material={body}
            castShadow
          />
        );
      })}

      {/* Back */}
      <RoundedBox
        args={[innerW, backH + CUSH_H, BACK_T]}
        radius={0.06}
        smoothness={5}
        position={[0, baseTop + (backH + CUSH_H) / 2, back0 + BACK_T / 2]}
        rotation={[-0.06, 0, 0]}
        material={back}
        castShadow
      />

      {/* Scatter cushions */}
      {[-1, 1].map((side) => (
        <RoundedBox
          key={`sc${side}`}
          args={[0.42, 0.42, 0.13]}
          radius={0.06}
          smoothness={6}
          position={[side * (innerW / 2 - 0.3), seatTop + 0.2, back0 + BACK_T + 0.09]}
          rotation={[-0.25, side * -0.25, side * 0.06]}
          material={accent}
          castShadow
        />
      ))}

      {arm(-1)}
      {arm(1)}

      {c.legs === "plinth" ? (
        <mesh position={[0, legH / 2, back0 + DEPTH / 2]} material={plinth}>
          <boxGeometry args={[totalW - 0.1, legH, DEPTH - 0.1]} />
        </mesh>
      ) : (
        legs.map((p, i) => <Leg key={i} kind={c.legs} wood={c.wood} h={legH} position={p} />)
      )}
    </group>
  );
}
