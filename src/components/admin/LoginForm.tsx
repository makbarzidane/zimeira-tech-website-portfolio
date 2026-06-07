"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { loginAdmin, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {
  message: "",
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <LockKeyhole className="size-4" aria-hidden="true" />
      {pending ? "Memeriksa..." : "Masuk Admin"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAdmin, initialState);

  return (
    <section className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-slate-950/40 ring-1 ring-white/10 backdrop-blur sm:p-7">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-white"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Kembali ke website
      </Link>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
          Login admin
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Masukkan akun admin
        </h2>
      </div>

      <form action={formAction} className="mt-7 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          ID admin
          <input
            type="text"
            name="username"
            required
            autoComplete="username"
            placeholder="Masukkan ID admin"
            className="h-12 rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/15"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          Password
          <input
            type="password"
            name="passcode"
            required
            autoComplete="current-password"
            placeholder="Masukkan password admin"
            className="h-12 rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/15"
          />
        </label>

        {state.message ? (
          <div className="rounded-2xl border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-100">
            {state.message}
          </div>
        ) : null}

        <LoginButton />
      </form>
    </section>
  );
}
