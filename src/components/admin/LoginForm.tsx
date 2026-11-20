"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-8 max-w-sm space-y-4">
      <label className="block text-sm">
        <span className="mb-1 block font-semibold text-emerald">Password</span>
        <input name="password" type="password" className="field" autoComplete="current-password" required autoFocus />
      </label>
      {error && <p className="text-sm font-semibold text-[#9b2c2c]" role="alert">{error}</p>}
      <button className="btn btn-emerald" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
