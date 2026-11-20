import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { Database, DesignRequest, Product } from "./types";
import { SEED_PRODUCTS } from "./seed";

/**
 * File-backed store: one JSON file plus an uploads folder. Free, no accounts,
 * and works on any server with a disk (e.g. a VPS). Swap this module for a
 * Supabase-backed one later without touching the pages.
 */
const DATA_DIR = process.env.MEHAL_DATA_DIR ?? path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

let queue: Promise<unknown> = Promise.resolve();

async function load(): Promise<Database> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8")) as Database;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    const fresh: Database = { products: SEED_PRODUCTS, requests: [] };
    await save(fresh);
    return fresh;
  }
}

async function save(db: Database) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = DB_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(db, null, 2));
  await fs.rename(tmp, DB_FILE);
}

/** Serialise writes so two saves can't interleave. */
function mutate<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await load();
    const result = await fn(db);
    await save(db);
    return result;
  });
  queue = run.catch(() => undefined);
  return run;
}

export async function readDb() {
  return load();
}

export function newId() {
  return crypto.randomBytes(6).toString("hex");
}

export function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || "piece"
  );
}

export function upsertProduct(p: Product) {
  return mutate((db) => {
    let slug = p.slug;
    let n = 2;
    while (db.products.some((x) => x.slug === slug && x.id !== p.id)) slug = `${p.slug}-${n++}`;
    const next = { ...p, slug };
    const i = db.products.findIndex((x) => x.id === p.id);
    if (i >= 0) db.products[i] = next;
    else db.products.unshift(next);
    return next;
  });
}

export function deleteProduct(id: string) {
  return mutate((db) => {
    db.products = db.products.filter((p) => p.id !== id);
  });
}

export function addRequest(r: DesignRequest) {
  return mutate((db) => {
    db.requests.unshift(r);
    return r;
  });
}

export function setRequestStatus(id: string, status: DesignRequest["status"]) {
  return mutate((db) => {
    const r = db.requests.find((x) => x.id === id);
    if (r) r.status = status;
  });
}

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

/** Saves an uploaded image and returns its public URL. */
export async function saveImage(data: Buffer, mime: string): Promise<string> {
  const ext = EXT[mime];
  if (!ext) throw new Error("Only JPG, PNG, WebP or AVIF images can be uploaded.");
  if (data.byteLength > MAX_UPLOAD_BYTES) throw new Error("Images must be under 8 MB.");
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${Date.now().toString(36)}-${newId()}.${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), data);
  return `/api/media/${name}`;
}

export async function saveDataUrl(dataUrl: string): Promise<string> {
  const m = /^data:(image\/[a-z+]+);base64,(.+)$/.exec(dataUrl);
  if (!m) throw new Error("That image could not be read.");
  return saveImage(Buffer.from(m[2], "base64"), m[1]);
}
