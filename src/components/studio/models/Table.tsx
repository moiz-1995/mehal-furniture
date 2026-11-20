"use client";

import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { chairCount, type TableConfig, type Upholstery } from "../options";
import { fabricMaterial, goldMaterial, marbleMaterial, woodMaterial } from "../materials";
import { useMat } from "./parts";

function Pedestal({ h, mat, x = 0 }: { h: number; mat: THREE.Material; x?: number }) {
  const geo = useMemo(() => {
    const pts = [
      [0, 0], [0.26, 0], [0.26, 0.03], [0.12, 0.08], [0.07, 0.2], [0.055, h * 0.5],
      [0.07, h * 0.8], [0.14, h - 0.02], [0.16, h], [0, h],
    ].map(([a, b]) => new THREE.Vector2(a, b));
    return new THREE.LatheGeometry(pts, 48);
  }, [h]);
  useEffect(() => () => geo.dispose(), [geo]);
  return <mesh geometry={geo} material={mat} position={[x, 0, 0]} castShadow />;
}

function Chair({ mat, legMat, position, rotation }: { mat: THREE.Material; legMat: THREE.Material; position: [number, number, number]; rotation: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.46, 0.09, 0.46]} radius={0.035} smoothness={4} position={[0, 0.47, 0]} material={mat} castShadow />
      <RoundedBox args={[0.44, 0.5, 0.07]} radius={0.03} smoothness={4} position={[0, 0.76, 0.21]} rotation={[0.1, 0, 0]} material={mat} castShadow />
      {[[-0.19, -0.19], [0.19, -0.19], [-0.19, 0.19], [0.19, 0.19]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.215, z]} material={legMat} castShadow>
          <cylinderGeometry args={[0.014, 0.011, 0.43, 12]} />
        </mesh>
      ))}
    </group>
  );
}

export function Table({ c, u }: { c: TableConfig; u: Upholstery }) {
  const top = useMat(() => (c.top === "wood" ? woodMaterial(c.wood) : marbleMaterial(c.top)), [c.top, c.wood]);
  const baseMat = useMat(() => (c.legs === "gold" ? goldMaterial() : woodMaterial(c.wood)), [c.legs, c.wood]);
  const chairMat = useMat(() => fabricMaterial(u), [u.fabric, u.colour, u.pattern, u.patternColour]);

  const H = c.use === "dining" ? 0.76 : 0.42;
  const th = c.top === "wood" ? 0.045 : 0.032;
  const L = c.length / 100;
  const D = c.shape === "round" ? L : c.use === "dining" ? 1.0 : L * 0.55;
  const legTop = H - th;

  const legSpots: [number, number][] =
    c.shape === "rectangle"
      ? [[-L / 2 + 0.12, -D / 2 + 0.12], [L / 2 - 0.12, -D / 2 + 0.12], [-L / 2 + 0.12, D / 2 - 0.12], [L / 2 - 0.12, D / 2 - 0.12]]
      : [0, 1, 2, 3].map((i) => {
          const a = Math.PI / 4 + (i * Math.PI) / 2;
          return [Math.cos(a) * (L / 2) * 0.62, Math.sin(a) * (D / 2) * 0.62];
        });

  // Chairs around the table, facing in.
  const chairs: { p: [number, number, number]; r: number }[] = [];
  if (c.use === "dining" && c.chairs) {
    const n = chairCount(c);
    if (c.shape === "round") {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const r = L / 2 + 0.2;
        chairs.push({ p: [Math.cos(a) * r, 0, Math.sin(a) * r], r: Math.PI / 2 - a });
      }
    } else {
      const ends = c.length >= 180 ? 1 : 0;
      const perSide = (n - ends * 2) / 2;
      for (let i = 0; i < perSide; i++) {
        const x = -L / 2 + (L / perSide) * (i + 0.5);
        chairs.push({ p: [x, 0, D / 2 + 0.22], r: 0 });
        chairs.push({ p: [x, 0, -D / 2 - 0.22], r: Math.PI });
      }
      if (ends) {
        chairs.push({ p: [L / 2 + 0.3, 0, 0], r: Math.PI / 2 });
        chairs.push({ p: [-L / 2 - 0.3, 0, 0], r: -Math.PI / 2 });
      }
    }
  }

  return (
    <group>
      {c.shape === "rectangle" ? (
        <RoundedBox args={[L, th, D]} radius={0.012} smoothness={3} position={[0, H - th / 2, 0]} material={top} castShadow receiveShadow />
      ) : (
        <mesh position={[0, H - th / 2, 0]} scale={[1, 1, D / L]} material={top} castShadow receiveShadow>
          <cylinderGeometry args={[L / 2, L / 2, th, 96]} />
        </mesh>
      )}

      {c.base === "four-legs" &&
        legSpots.map(([x, z], i) => (
          <mesh key={i} position={[x, legTop / 2, z]} material={baseMat} castShadow>
            {c.legs === "gold" ? <cylinderGeometry args={[0.022, 0.012, legTop, 20]} /> : <boxGeometry args={[0.065, legTop, 0.065]} />}
          </mesh>
        ))}

      {c.base === "pedestal" &&
        (c.shape !== "round" && L > 1.6 ? (
          <>
            <Pedestal h={legTop} mat={baseMat} x={-L / 4} />
            <Pedestal h={legTop} mat={baseMat} x={L / 4} />
          </>
        ) : (
          <Pedestal h={legTop} mat={baseMat} />
        ))}

      {c.base === "trestle" && (
        <>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * (L / 2 - (c.shape === "round" ? L * 0.25 : 0.25)), legTop / 2, 0]} material={baseMat} castShadow>
              <boxGeometry args={[0.07, legTop, D * 0.7]} />
            </mesh>
          ))}
          <mesh position={[0, legTop * 0.35, 0]} material={baseMat} castShadow>
            <boxGeometry args={[L - (c.shape === "round" ? L * 0.5 : 0.5), 0.05, 0.05]} />
          </mesh>
        </>
      )}

      {chairs.map((ch, i) => (
        <Chair key={i} mat={chairMat} legMat={baseMat} position={ch.p} rotation={ch.r} />
      ))}
    </group>
  );
}
