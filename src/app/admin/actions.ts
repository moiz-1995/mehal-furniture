"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isOwner, passwordMatches, signIn, signOut } from "@/lib/auth";
import { CATALOG_TAG } from "@/lib/catalog";
import { deleteProduct, newId, readDb, saveImage, setRequestStatus, slugify, upsertProduct } from "@/lib/store";
import { CATEGORIES } from "@/lib/site";
import type { DesignBase, MaterialLine, Product, RequestStatus } from "@/lib/types";

export async function login(_: string | undefined, form: FormData) {
  if (!passwordMatches(String(form.get("password") ?? ""))) return "That password is not right.";
  await signIn();
  redirect("/admin");
}

export async function logout() {
  await signOut();
  redirect("/admin");
}

async function requireOwner() {
  if (!(await isOwner())) redirect("/admin");
}

export type SaveState = { error?: string } | undefined;

export async function saveProduct(_: SaveState, form: FormData): Promise<SaveState> {
  await requireOwner();
  const id = String(form.get("id") || "") || newId();
  const name = String(form.get("name") ?? "").trim();
  if (!name) return { error: "Give the piece a name." };

  const category = String(form.get("category"));
  if (!CATEGORIES.some((c) => c.id === category)) return { error: "Choose a category." };

  const parts = form.getAll("materialPart").map(String);
  const mats = form.getAll("materialValue").map(String);
  const materials: MaterialLine[] = parts
    .map((part, i) => ({ part: part.trim(), material: (mats[i] ?? "").trim() }))
    .filter((m) => m.part && m.material);

  const keep = form.getAll("keepImage").map(String).filter((s) => s.startsWith("/"));
  const uploads: string[] = [];
  for (const f of form.getAll("newImage")) {
    if (!(f instanceof File) || f.size === 0) continue;
    try {
      uploads.push(await saveImage(Buffer.from(await f.arrayBuffer()), f.type));
    } catch (e) {
      return { error: (e as Error).message };
    }
  }

  const db = await readDb();
  const existing = db.products.find((p) => p.id === id);
  const price = Number(String(form.get("priceFrom") ?? "").replace(/[^\d]/g, ""));
  const weeks = Number(form.get("leadTimeWeeks"));
  const base = String(form.get("designBase") ?? "");

  const product: Product = {
    id,
    slug: existing?.slug ?? slugify(name),
    name,
    category: category as Product["category"],
    summary: String(form.get("summary") ?? "").trim(),
    description: String(form.get("description") ?? "").trim(),
    materials,
    priceFrom: price > 0 ? price : undefined,
    leadTimeWeeks: weeks > 0 ? weeks : undefined,
    images: [...keep, ...uploads],
    designBase: ["sofa", "bed", "table"].includes(base) ? (base as DesignBase) : undefined,
    featured: form.get("featured") === "on",
    // Once the owner edits a sample piece it counts as theirs.
    sample: false,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };

  await upsertProduct(product);
  updateTag(CATALOG_TAG);
  redirect("/admin?saved=1");
}

export async function removeProduct(form: FormData) {
  await requireOwner();
  await deleteProduct(String(form.get("id")));
  updateTag(CATALOG_TAG);
  redirect("/admin?tab=pieces");
}

export async function updateRequestStatus(form: FormData) {
  await requireOwner();
  const status = String(form.get("status")) as RequestStatus;
  if (!["new", "quoted", "making", "delivered"].includes(status)) return;
  await setRequestStatus(String(form.get("id")), status);
  redirect("/admin");
}
