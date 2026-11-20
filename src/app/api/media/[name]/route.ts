import { promises as fs } from "node:fs";
import path from "node:path";
import { UPLOAD_DIR } from "@/lib/store";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

/** Serves owner and customer uploads from the data folder. */
export async function GET(_req: Request, ctx: RouteContext<"/api/media/[name]">) {
  const { name } = await ctx.params;
  if (!/^[\w-]+\.(jpg|png|webp|avif)$/.test(name)) {
    return new Response("Not found", { status: 404 });
  }
  try {
    const file = await fs.readFile(path.join(UPLOAD_DIR, name));
    const ext = name.split(".").pop()!;
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": TYPES[ext],
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
