"use client";

import * as THREE from "three";
import { forwardRef, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Design } from "./options";
import { dimensions } from "./options";
import { Sofa } from "./models/Sofa";
import { Bed } from "./models/Bed";
import { Table } from "./models/Table";

/** Frames the piece whenever its footprint changes. */
function AutoFrame({ design }: { design: Design }) {
  const { camera, size } = useThree();
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const { width, depth, height } = dimensions(design);
  const chairs = design.base === "table" && design.table.use === "dining" && design.table.chairs;
  const span = Math.max(width, depth * 0.9) / 100 + (chairs ? 1.1 : 0);
  const key = `${design.base}:${Math.round(span * 10)}:${height}`;

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const fit = (span / 2 + 0.25) / Math.tan((cam.fov * Math.PI) / 360) / Math.min(1, aspect * 0.85);
    const dist = Math.max(2.2, fit * 1.05);
    const target = new THREE.Vector3(0, (height / 100) * 0.42, 0);
    const dir = new THREE.Vector3(0.62, 0.42, 1).normalize();
    cam.position.copy(target.clone().add(dir.multiplyScalar(dist)));
    controls?.target.copy(target);
    controls?.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, size.width, size.height, controls]);
  return null;
}

export const Scene = forwardRef<THREE.Group, { design: Design; onReady?: (c: HTMLCanvasElement) => void }>(
  function Scene({ design, onReady }, ref) {
    const wrap = useRef<HTMLDivElement>(null);
    return (
      <div ref={wrap} className="h-full w-full touch-none">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ fov: 32, position: [3, 1.8, 4], near: 0.05, far: 60 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            onReady?.(gl.domElement);
          }}
        >
          <color attach="background" args={["#efe8d8"]} />
          <fog attach="fog" args={["#efe8d8", 9, 22]} />

          <group ref={ref}>
            {design.base === "sofa" && <Sofa c={design.sofa} u={design.upholstery} />}
            {design.base === "bed" && <Bed c={design.bed} u={design.upholstery} />}
            {design.base === "table" && <Table c={design.table} u={design.upholstery} />}
          </group>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
            <circleGeometry args={[14, 64]} />
            <meshStandardMaterial color="#e6dcc6" roughness={1} />
          </mesh>
          <ContactShadows position={[0, 0.001, 0]} opacity={0.55} scale={9} blur={2.4} far={2.5} resolution={1024} color="#3b2f1c" />

          <ambientLight intensity={0.25} />
          <directionalLight position={[3, 5, 3]} intensity={1.6} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004}>
            <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 15]} />
          </directionalLight>

          {/* Studio lighting built from light panels: no downloads needed. */}
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={2.2} position={[0, 4, 1]} rotation-x={Math.PI / 2} scale={[8, 4, 1]} color="#fff6e6" />
            <Lightformer form="rect" intensity={1.4} position={[-5, 2, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={0.9} position={[5, 1.5, -1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#f3d9a4" />
            <Lightformer form="ring" intensity={1.2} position={[2, 3, 5]} scale={2} color="#ffffff" />
            <mesh scale={30}>
              <sphereGeometry />
              <meshBasicMaterial color="#d8ccb0" side={THREE.BackSide} />
            </mesh>
          </Environment>

          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping
            minDistance={1.4}
            maxDistance={10}
            minPolarAngle={0.25}
            maxPolarAngle={Math.PI / 2 - 0.06}
          />
          <AutoFrame design={design} />
        </Canvas>
      </div>
    );
  },
);
