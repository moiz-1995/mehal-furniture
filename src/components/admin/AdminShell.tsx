import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/ArchDefs";
import { logout } from "@/app/admin/actions";

export function AdminShell({ children, signedIn }: { children: ReactNode; signedIn: boolean }) {
  return (
    <div className="min-h-svh bg-ivory">
      <header className="bg-night text-ivory">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/admin" className="text-gold"><Logo /></Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/" className="underline-offset-4 hover:underline">View site</Link>
            {signedIn && (
              <form action={logout}>
                <button className="underline-offset-4 hover:underline">Sign out</button>
              </form>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
