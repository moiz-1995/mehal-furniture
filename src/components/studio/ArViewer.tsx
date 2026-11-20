"use client";

import * as THREE from "three";
import { useEffect, useState } from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

const MODEL_VIEWER = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "ar-scale"?: string;
        "ar-placement"?: string;
        "camera-controls"?: boolean;
        "touch-action"?: string;
        "shadow-intensity"?: string;
        exposure?: string;
        alt?: string;
      };
    }
  }
}

function loadModelViewer() {
  if (customElements.get("model-viewer")) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.type = "module";
    s.src = MODEL_VIEWER;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("AR viewer could not load"));
    document.head.appendChild(s);
  });
}

function exportGlb(group: THREE.Object3D) {
  return new Promise<Blob>((resolve, reject) => {
    new GLTFExporter().parse(
      group,
      (out) => resolve(new Blob([out as ArrayBuffer], { type: "model/gltf-binary" })),
      reject,
      { binary: true, maxTextureSize: 1024 },
    );
  });
}

/**
 * "See it in your room": exports the piece exactly as designed and opens it
 * in Google's model-viewer at true size. Phones with AR get a camera button.
 */
export function ArViewer({ group, onClose }: { group: THREE.Object3D; onClose: () => void }) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let url = "";
    Promise.all([loadModelViewer(), exportGlb(group)])
      .then(([, blob]) => {
        url = URL.createObjectURL(blob);
        setSrc(url);
      })
      .catch((e) => setError(e.message ?? "Something went wrong"));
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [group]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-night/95 text-ivory" role="dialog" aria-modal="true" aria-label="See it in your room">
      <div className="flex items-center justify-between px-5 py-4">
        <p className="display text-2xl text-gold">See it in your room</p>
        <button type="button" onClick={onClose} className="btn btn-line !py-2">Close</button>
      </div>
      <div className="relative flex-1">
        {error && <p className="p-6">{error}. Check your connection and try again.</p>}
        {!src && !error && <p className="p-6 text-ivory/70">Preparing your piece…</p>}
        {src && (
          <model-viewer
            src={src}
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="fixed"
            ar-placement="floor"
            camera-controls
            touch-action="pan-y"
            shadow-intensity="1"
            exposure="1"
            alt="Your designed piece"
            style={{ width: "100%", height: "100%", background: "#efe8d8" }}
          >
            <button
              slot="ar-button"
              className="btn btn-gold absolute bottom-6 left-1/2 -translate-x-1/2"
            >
              Place it in my room
            </button>
          </model-viewer>
        )}
      </div>
      <p className="px-5 pb-5 pt-3 text-sm text-ivory/60">
        Shown at its real size. On a phone with AR, tap &ldquo;Place it in my room&rdquo; and point
        the camera at your floor. On other devices you can turn it around here.
      </p>
    </div>
  );
}
