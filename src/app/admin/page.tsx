import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { LoginForm } from "@/components/admin/LoginForm";
import { DEV_PASSWORD, isOwner, usingDevPassword } from "@/lib/auth";
import { readDb } from "@/lib/store";
import { categoryLabel, formatPKR } from "@/lib/site";
import type { DesignRequest } from "@/lib/types";
import { updateRequestStatus } from "./actions";

export const metadata: Metadata = { title: "Owner", robots: { index: false } };

const STATUS: { id: DesignRequest["status"]; label: string }[] = [
  { id: "new", label: "New" },
  { id: "quoted", label: "Price sent" },
  { id: "making", label: "In the workshop" },
  { id: "delivered", label: "Delivered" },
];

const KIND = { "3d": "3D design", photo: "Restyled photo", inspiration: "Inspiration photo", piece: "Catalogue piece" };

function when(iso: string) {
  return new Date(iso).toLocaleString("en-PK", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

function waLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("0") ? "92" + digits.slice(1) : digits;
  return `https://wa.me/${intl}`;
}

async function Dashboard({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  const owner = await isOwner();
  if (!owner) {
    return (
      <AdminShell signedIn={false}>
        <h1 className="text-5xl text-emerald">Owner sign in</h1>
        <p className="mt-2 text-muted">Add pieces to the website and see customers&rsquo; designs.</p>
        {usingDevPassword() && (
          <p className="mt-6 max-w-lg rounded-xl bg-mustard/25 p-4 text-sm">
            No password has been set yet, so the temporary one is <strong>{DEV_PASSWORD}</strong>. Set
            ADMIN_PASSWORD before the site goes live.
          </p>
        )}
        <LoginForm />
      </AdminShell>
    );
  }

  const sp = await searchParams;
  const tab = sp.tab === "pieces" ? "pieces" : "requests";
  const db = await readDb();
  const fresh = db.requests.filter((r) => r.status === "new").length;
  const samples = db.products.filter((p) => p.sample).length;

  return (
    <AdminShell signedIn>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-5xl text-emerald">Mehal admin</h1>
        <Link href="/admin/pieces/new" className="btn btn-emerald">Add a piece</Link>
      </div>
      {sp.saved && <p className="mt-4 rounded-xl bg-emerald/10 p-3 text-sm text-emerald" role="status">Saved. It&rsquo;s live on the website now.</p>}

      <nav className="mt-8 flex gap-2" aria-label="Admin sections">
        <Link href="/admin" aria-current={tab === "requests" ? "page" : undefined}
          className={`rounded-full px-5 py-2 text-sm font-semibold ${tab === "requests" ? "bg-emerald text-ivory" : "border border-emerald/25 text-emerald"}`}>
          Customer designs{fresh ? ` (${fresh} new)` : ""}
        </Link>
        <Link href="/admin?tab=pieces" aria-current={tab === "pieces" ? "page" : undefined}
          className={`rounded-full px-5 py-2 text-sm font-semibold ${tab === "pieces" ? "bg-emerald text-ivory" : "border border-emerald/25 text-emerald"}`}>
          Pieces ({db.products.length})
        </Link>
      </nav>

      {tab === "requests" && (
        <section className="mt-8">
          {db.requests.length === 0 ? (
            <p className="max-w-lg text-muted">
              No designs yet. When a customer sends a design from the 3D studio or a restyled photo,
              it appears here as well as on your WhatsApp.
            </p>
          ) : (
            <ul className="space-y-4">
              {db.requests.map((r) => (
                <li key={r.id} className="grid gap-5 rounded-2xl bg-white/60 p-5 ring-1 ring-emerald/10 sm:grid-cols-[10rem_1fr]">
                  {r.image ? (
                    <a href={r.image} target="_blank" rel="noopener" className="relative block aspect-square overflow-hidden rounded-xl bg-linen">
                      <Image src={r.image} alt="The customer's design" fill sizes="160px" className="object-cover" />
                    </a>
                  ) : <div className="aspect-square rounded-xl bg-linen" />}
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-lg font-semibold text-emerald">{r.name}</p>
                      <p className="text-sm text-muted">{KIND[r.kind]}, {when(r.createdAt)}</p>
                    </div>
                    <p className="mt-1 text-sm">
                      <a href={waLink(r.phone)} target="_blank" rel="noopener" className="font-semibold text-bronze underline underline-offset-4">{r.phone}</a>
                    </p>
                    <ul className="mt-3 space-y-0.5 text-sm text-ink/85">{r.summary.map((s) => <li key={s}>{s}</li>)}</ul>
                    {r.note && <p className="mt-3 rounded-lg bg-linen/70 p-3 text-sm">{r.note}</p>}
                    <form action={updateRequestStatus} className="mt-4 flex flex-wrap gap-2">
                      <input type="hidden" name="id" value={r.id} />
                      {STATUS.map((s) => (
                        <button key={s.id} name="status" value={s.id} aria-pressed={r.status === s.id}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${r.status === s.id ? "bg-emerald text-ivory" : "border border-emerald/25 text-emerald"}`}>
                          {s.label}
                        </button>
                      ))}
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {tab === "pieces" && (
        <section className="mt-8">
          {samples > 0 && (
            <p className="mb-6 max-w-2xl rounded-xl bg-mustard/25 p-4 text-sm">
              {samples} {samples === 1 ? "piece is a sample" : "pieces are samples"} with stock photos, so the
              site isn&rsquo;t empty on day one. Replace their photos with your own, or delete them.
            </p>
          )}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {db.products.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/pieces/${p.id}`} className="flex gap-4 rounded-2xl bg-white/60 p-3 ring-1 ring-emerald/10 hover:ring-emerald/40">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-emerald">
                    {p.images[0] && <Image src={p.images[0]} alt="" fill sizes="80px" className="object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-emerald">{p.name}</p>
                    <p className="text-sm text-muted">{categoryLabel(p.category)}</p>
                    <p className="text-sm text-bronze">{p.priceFrom ? `From ${formatPKR(p.priceFrom)}` : "Price on request"}</p>
                    {p.sample && <p className="mt-1 text-xs font-semibold text-[#8a5a00]">Sample</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </AdminShell>
  );
}

export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-ivory" />}>
      <Dashboard searchParams={searchParams} />
    </Suspense>
  );
}
