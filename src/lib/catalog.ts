import { cacheLife, cacheTag } from "next/cache";
import { readDb } from "./store";

export const CATALOG_TAG = "catalog";

export async function getProducts() {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("max");
  const db = await readDb();
  return db.products;
}

export async function getProduct(slug: string) {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("max");
  const db = await readDb();
  return db.products.find((p) => p.slug === slug) ?? null;
}
