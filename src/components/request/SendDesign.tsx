"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

type Kind = "3d" | "photo" | "inspiration" | "piece";

/**
 * Last step of every design flow: save the design for the owner, then hand
 * the customer a WhatsApp message with every choice already written out.
 */
export function SendDesign({
  kind,
  summary,
  getImage,
  productSlug,
  intro,
}: {
  kind: Kind;
  summary: string[];
  getImage?: () => Promise<string | undefined> | string | undefined;
  productSlug?: string;
  intro: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ link: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim()) {
      setError("Add your name and phone number so we can reply.");
      return;
    }
    setBusy(true);
    let ref = "";
    let picture = "";
    try {
      const image = await getImage?.();
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, name, phone, note, summary, image, productSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Saving failed");
      ref = data.id;
      if (data.image) picture = new URL(data.image, window.location.origin).toString();
    } catch {
      // Saving is a convenience for the owner; WhatsApp still carries the design.
    } finally {
      setBusy(false);
    }

    const lines = [
      `Assalam o alaikum Mehal Furniture! ${intro}`,
      "",
      ...summary.map((s) => `• ${s}`),
      ...(note.trim() ? ["", `Note: ${note.trim()}`] : []),
      ...(picture ? ["", `Picture: ${picture}`] : []),
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      ...(ref ? [`Design ref: ${ref}`] : []),
    ];
    setSent({ link: whatsappLink(lines.join("\n")) });
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-emerald p-6 text-ivory">
        <p className="display text-3xl text-gold">Your design is ready to send</p>
        <p className="mt-2 text-ivory/80">
          Tap below to open WhatsApp with your design written out. Press send, and we will reply
          with a price, usually the same day.
        </p>
        <a href={sent.link} target="_blank" rel="noopener" className="btn btn-gold mt-5">
          Open WhatsApp and send
        </a>
        <button type="button" className="mt-3 block text-sm text-ivory/70 underline underline-offset-4" onClick={() => setSent(null)}>
          Change my details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-emerald">Your name</span>
          <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold text-emerald">Phone or WhatsApp</span>
          <input className="field" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="03xx xxxxxxx" required />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-semibold text-emerald">Anything else? (optional)</span>
        <textarea className="field min-h-20" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Room size, when you need it, budget…" />
      </label>
      {error && <p className="text-sm font-semibold text-[#9b2c2c]" role="alert">{error}</p>}
      <button type="submit" className="btn btn-emerald w-full justify-center" disabled={busy}>
        {busy ? "Saving your design…" : "Send this design on WhatsApp"}
      </button>
    </form>
  );
}
