/// <reference lib="webworker" />
/**
 * Finds the furniture the customer taps on, entirely on their own device:
 * SlimSAM (Apache-2.0) via transformers.js, downloaded once from Hugging Face
 * and cached by the browser. No server, no API key, no per-image cost.
 */
import { SamModel, AutoProcessor, RawImage, Tensor, env } from "@huggingface/transformers";

env.allowLocalModels = false;

const MODEL = "Xenova/slimsam-77-uniform";

type Processor = Awaited<ReturnType<typeof AutoProcessor.from_pretrained>>;
let model: SamModel | null = null;
let processor: Processor | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let inputs: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let embeddings: any = null;

async function load() {
  if (model && processor) return;
  const progress = (p: { status: string; progress?: number }) => {
    if (p.status === "progress" && typeof p.progress === "number") {
      self.postMessage({ type: "progress", value: p.progress });
    }
  };
  [model, processor] = await Promise.all([
    SamModel.from_pretrained(MODEL, { dtype: "q8", progress_callback: progress }) as Promise<SamModel>,
    AutoProcessor.from_pretrained(MODEL, {}),
  ]);
}

self.onmessage = async (e: MessageEvent) => {
  const msg = e.data;
  try {
    if (msg.type === "embed") {
      await load();
      self.postMessage({ type: "status", value: "Studying your photo…" });
      const image = await RawImage.read(msg.url);
      inputs = await processor!(image);
      embeddings = await model!.get_image_embeddings(inputs);
      self.postMessage({ type: "ready" });
    }

    if (msg.type === "decode" && embeddings) {
      const [h, w] = inputs.reshaped_input_sizes[0];
      const pts: { x: number; y: number; label: 0 | 1 }[] = msg.points;
      const input_points = new Tensor("float32", pts.flatMap((p) => [p.x * w, p.y * h]), [1, 1, pts.length, 2]);
      const input_labels = new Tensor("int64", pts.map((p) => BigInt(p.label)), [1, 1, pts.length]);
      const out = await model!({ ...embeddings, input_points, input_labels });
      const masks = await (processor as unknown as {
        post_process_masks: (...a: unknown[]) => Promise<Tensor[]>;
      }).post_process_masks(out.pred_masks, inputs.original_sizes, inputs.reshaped_input_sizes);
      const scores = out.iou_scores.data as Float32Array;
      let best = 0;
      for (let i = 1; i < scores.length; i++) if (scores[i] > scores[best]) best = i;
      const m = masks[0];
      const [, , H, W] = m.dims;
      const all = m.data as Uint8Array;
      const one = all.slice(best * H * W, (best + 1) * H * W);
      self.postMessage({ type: "mask", width: W, height: H, data: one }, [one.buffer]);
    }
  } catch (err) {
    self.postMessage({ type: "error", value: (err as Error).message });
  }
};
