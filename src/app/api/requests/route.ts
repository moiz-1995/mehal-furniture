import { addRequest, newId, saveDataUrl } from "@/lib/store";
import type { DesignRequest } from "@/lib/types";

const KINDS = new Set(["3d", "photo", "inspiration", "piece"]);

/**
 * Saves a customer's design so the owner sees it in the admin inbox. The
 * customer's browser then opens WhatsApp with the same summary, so the
 * request reaches the owner even if nobody checks the inbox.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "The request could not be read." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 80);
  const phone = String(body.phone ?? "").trim().slice(0, 30);
  const kind = String(body.kind ?? "");
  if (!name || !phone) {
    return Response.json({ error: "Add your name and phone number." }, { status: 400 });
  }
  if (!KINDS.has(kind)) {
    return Response.json({ error: "Unknown request type." }, { status: 400 });
  }

  let image: string | undefined;
  if (typeof body.image === "string" && body.image.startsWith("data:image/")) {
    try {
      image = await saveDataUrl(body.image);
    } catch (e) {
      return Response.json({ error: (e as Error).message }, { status: 400 });
    }
  }

  const summary = Array.isArray(body.summary)
    ? body.summary.map((s) => String(s).slice(0, 200)).slice(0, 30)
    : [];

  const request: DesignRequest = {
    id: newId(),
    createdAt: new Date().toISOString(),
    kind: kind as DesignRequest["kind"],
    name,
    phone,
    note: String(body.note ?? "").trim().slice(0, 1000) || undefined,
    summary,
    image,
    productSlug: typeof body.productSlug === "string" ? body.productSlug.slice(0, 80) : undefined,
    status: "new",
  };
  await addRequest(request);
  return Response.json({ id: request.id, image });
}
