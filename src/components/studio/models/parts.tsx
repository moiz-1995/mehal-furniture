"use client";

import * as THREE from "three";
import { useEffect, useMemo, type DependencyList } from "react";
import type { LegId, WoodId } from "../options";
import { goldMaterial, woodMaterial } from "../materials";

/** Memoised material that is disposed when its inputs change. */
export function useMat<T extends THREE.Material>(make: () => T, deps: DependencyList) {
  const key = JSON.stringify(deps);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const m = useMemo(() => make(), [key]);
  useEffect(() => () => m.dispose(), [m]);
  return m;
}

const turnedProfile = (h: number) =>
  [
    [0.0, 0], [0.018, 0], [0.02, h * 0.06], [0.014, h * 0.2], [0.026, h * 0.45],
    [0.016, h * 0.62], [0.022, h * 0.78], [0.026, h * 0.92], [0.024, h], [0, h],
  ].map(([x, y]) => new THREE.Vector2(x, y));

/** One leg standing on the floor with its top at height h. */
export function Leg({
  kind,
  wood,
  h,
  position,
}: {
  kind: LegId;
  wood: WoodId;
  h: number;
  position: [number, number];
}) {
  const gold = useMat(goldMaterial, []);
  const wm = useMat(() => woodMaterial(wood), [wood]);
  const lathe = useMemo(() => new THREE.LatheGeometry(turnedProfile(h), 24), [h]);
  useEffect(() => () => lathe.dispose(), [lathe]);
  const [x, z] = position;

  if (kind === "plinth") return null;
  if (kind === "gold")
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, h / 2, 0]} material={gold} castShadow>
          <cylinderGeometry args={[0.018, 0.009, h, 20]} />
        </mesh>
        <mesh position={[0, 0.006, 0]} material={gold}>
          <cylinderGeometry args={[0.011, 0.011, 0.012, 16]} />
        </mesh>
      </group>
    );
  if (kind === "turned")
    return <mesh position={[x, 0, z]} geometry={lathe} material={wm} castShadow />;
  return (
    <mesh position={[x, h / 2, z]} material={wm} castShadow>
      <boxGeometry args={[0.06, h, 0.06]} />
    </mesh>
  );
}

export function legHeight(kind: LegId) {
  return kind === "plinth" ? 0.05 : kind === "block" ? 0.1 : 0.15;
}
