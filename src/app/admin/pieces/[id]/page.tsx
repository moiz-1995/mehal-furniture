import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { isOwner } from "@/lib/auth";
import { readDb } from "@/lib/store";
import { removeProduct } from "../../actions";

export const metadata: Metadata = { title: "Edit piece", robots: { index: false } };

async function Editor({ params }: { params: PageProps<"/admin/pieces/[id]">["params"] }) {
  if (!(await isOwner())) redirect("/admin");
  const { id } = await params;
  const product = id === "new" ? undefined : (await readDb()).products.find((p) => p.id === id);
  if (id !== "new" && !product) notFound();

  return (
    <AdminShell signedIn>
      <Link href="/admin?tab=pieces" className="text-sm text-muted underline underline-offset-4">All pieces</Link>
      <h1 className="mt-3 text-5xl text-emerald">{product ? product.name : "Add a piece"}</h1>
      {product && (
        <p className="mt-2 text-sm">
          <Link href={`/pieces/${product.slug}`} className="text-emerald underline underline-offset-4">See it on the website</Link>
        </p>
      )}
      <ProductForm product={product} />
      {product && (
        <form action={removeProduct} className="mt-16 border-t border-emerald/15 pt-6">
          <input type="hidden" name="id" value={product.id} />
          <details>
            <summary className="cursor-pointer text-sm font-semibold text-[#9b2c2c]">Delete this piece</summary>
            <p className="mt-3 text-sm text-muted">It disappears from the website straight away. This can&rsquo;t be undone.</p>
            <button className="btn mt-3 bg-[#9b2c2c] text-white">Yes, delete {product.name}</button>
          </details>
        </form>
      )}
    </AdminShell>
  );
}

export default function EditPiecePage({ params }: PageProps<"/admin/pieces/[id]">) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-ivory" />}>
      <Editor params={params} />
    </Suspense>
  );
}
