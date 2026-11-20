"use client";

import Image from "next/image";
import { startTransition, useActionState, useState } from "react";
import { saveProduct } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/site";
import type { Product } from "@/lib/types";

const MAX_SIDE = 1800;

/** Phone photos are often 5–10 MB; shrink them before they leave the phone. */
async function shrink(file: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.85));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

type NewImage = { file: File; preview: string };

const SUGGESTED_PARTS = ["Frame", "Seat", "Upholstery", "Legs", "Top", "Base", "Finish", "Headboard"];

export function ProductForm({ product }: { product?: Product }) {
  const [state, action, pending] = useActionState(saveProduct, undefined);
  const [keep, setKeep] = useState<string[]>(product?.images ?? []);
  const [added, setAdded] = useState<NewImage[]>([]);
  const [materials, setMaterials] = useState(
    product?.materials.length ? product.materials : [{ part: "Frame", material: "" }, { part: "Upholstery", material: "" }],
  );
  const [shrinking, setShrinking] = useState(false);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setShrinking(true);
    const next = await Promise.all(Array.from(files).map(async (f) => {
      const file = await shrink(f);
      return { file, preview: URL.createObjectURL(file) };
    }));
    setAdded((a) => [...a, ...next]);
    setShrinking(false);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.delete("newImageInput");
    keep.forEach((k) => fd.append("keepImage", k));
    added.forEach((a) => fd.append("newImage", a.file));
    startTransition(() => action(fd));
  }

  const photoCount = keep.length + added.length;

  return (
    <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
      <input type="hidden" name="id" value={product?.id ?? ""} />

      <div className="space-y-5">
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-emerald">Name</span>
          <input name="name" className="field" defaultValue={product?.name} placeholder="e.g. Shahi tufted sofa" required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-emerald">Category</span>
          <select name="category" className="field" defaultValue={product?.category ?? "sofa"}>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-emerald">One-line summary</span>
          <input name="summary" className="field" defaultValue={product?.summary} placeholder="What makes it special, in one sentence" maxLength={140} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-emerald">Description</span>
          <textarea name="description" className="field min-h-32" defaultValue={product?.description} placeholder="Sizes, comfort, what can be changed…" />
        </label>

        <fieldset>
          <legend className="mb-1 text-sm font-semibold text-emerald">What it&rsquo;s made of</legend>
          <p className="mb-3 text-sm text-muted">One line per part, for example Frame: seasoned sheesham.</p>
          <datalist id="parts">{SUGGESTED_PARTS.map((p) => <option key={p} value={p} />)}</datalist>
          <div className="space-y-2">
            {materials.map((m, i) => (
              <div key={i} className="grid grid-cols-[8rem_1fr_auto] gap-2">
                <input name="materialPart" list="parts" className="field" aria-label="Part" value={m.part}
                  onChange={(e) => setMaterials((ms) => ms.map((x, j) => (j === i ? { ...x, part: e.target.value } : x)))} />
                <input name="materialValue" className="field" aria-label="Material" value={m.material} placeholder="Material"
                  onChange={(e) => setMaterials((ms) => ms.map((x, j) => (j === i ? { ...x, material: e.target.value } : x)))} />
                <button type="button" className="px-2 text-muted hover:text-[#9b2c2c]" aria-label={`Remove ${m.part || "line"}`}
                  onClick={() => setMaterials((ms) => ms.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
          </div>
          <button type="button" className="mt-3 text-sm font-semibold text-emerald underline underline-offset-4"
            onClick={() => setMaterials((ms) => [...ms, { part: "", material: "" }])}>
            Add a material
          </button>
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-emerald">Starting price (Rs)</span>
            <input name="priceFrom" inputMode="numeric" className="field" defaultValue={product?.priceFrom ?? ""} placeholder="Leave empty for “on request”" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-emerald">Made in (weeks)</span>
            <input name="leadTimeWeeks" type="number" min={1} max={30} className="field" defaultValue={product?.leadTimeWeeks ?? ""} />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-emerald">Customers can redesign it in 3D as a…</span>
          <select name="designBase" className="field" defaultValue={product?.designBase ?? ""}>
            <option value="">No 3D design for this piece</option>
            <option value="sofa">Sofa</option>
            <option value="bed">Bed</option>
            <option value="table">Table</option>
          </select>
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} className="h-5 w-5 accent-[var(--emerald)]" />
          <span>Show on the home page</span>
        </label>
      </div>

      <div>
        <p className="text-sm font-semibold text-emerald">Photos</p>
        <p className="mb-3 text-sm text-muted">The first photo is the cover. Tap ★ to make a photo the cover.</p>
        <div className="grid grid-cols-3 gap-3">
          {keep.map((src, i) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-linen">
              <Image src={src} alt="" fill sizes="160px" className="object-cover" />
              <div className="absolute inset-x-1 top-1 flex justify-between">
                <button type="button" aria-label="Make cover photo" className="rounded-full bg-ivory/90 px-2 text-sm"
                  onClick={() => setKeep((k) => [src, ...k.filter((x) => x !== src)])}>{i === 0 ? "Cover" : "★"}</button>
                <button type="button" aria-label="Remove photo" className="rounded-full bg-ivory/90 px-2 text-sm"
                  onClick={() => setKeep((k) => k.filter((x) => x !== src))}>✕</button>
              </div>
            </div>
          ))}
          {added.map((a) => (
            <div key={a.preview} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-linen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.preview} alt="" className="h-full w-full object-cover" />
              <button type="button" aria-label="Remove photo" className="absolute right-1 top-1 rounded-full bg-ivory/90 px-2 text-sm"
                onClick={() => setAdded((x) => x.filter((y) => y !== a))}>✕</button>
            </div>
          ))}
          <label className="flex aspect-[4/5] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-emerald/30 text-center text-sm text-emerald hover:border-emerald">
            <span className="text-3xl" aria-hidden="true">+</span>
            <span>{shrinking ? "Preparing…" : "Add photos"}</span>
            <input name="newImageInput" type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} />
          </label>
        </div>
        {photoCount === 0 && <p className="mt-3 text-sm text-muted">No photos yet. Pieces without photos show a &ldquo;Design it in 3D&rdquo; card.</p>}

        <div className="sticky bottom-4 mt-10 rounded-2xl bg-ivory/95 p-4 shadow-lg ring-1 ring-emerald/10 backdrop-blur">
          {state?.error && <p className="mb-3 text-sm font-semibold text-[#9b2c2c]" role="alert">{state.error}</p>}
          <button className="btn btn-emerald w-full justify-center" disabled={pending || shrinking}>
            {pending ? "Saving…" : product ? "Save changes" : "Publish piece"}
          </button>
        </div>
      </div>
    </form>
  );
}
