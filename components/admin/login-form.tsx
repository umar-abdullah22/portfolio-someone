"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setSubmitting(false);

    if (!response.ok) {
      const payload = (await response.json()) as { message?: string };
      setError(payload.message ?? "Login failed.");
      return;
    }

    router.push(searchParams.get("next") ?? "/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-[2rem] border border-white/12 bg-white/[0.05] p-8 shadow-[0_30px_90px_-40px_rgba(110,75,220,0.55)] backdrop-blur"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-primary">
        Hidden access
      </p>
      <h1 className="mt-4 font-display text-4xl">Admin login</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Use your single admin username and password to manage the portfolio content.
      </p>

      <div className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm text-muted-foreground">Username</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="Enter username"
            autoComplete="username"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-muted-foreground">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
        {submitting ? "Signing in..." : "Open dashboard"}
      </Button>
    </form>
  );
}
