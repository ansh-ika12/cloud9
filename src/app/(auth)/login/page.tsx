"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Enter your email and password to sign in.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSubmitting(false);

    if (signInError) {
      if (signInError.code === "email_not_confirmed") {
        setError(
          "Please confirm your email first — check your inbox for a confirmation link."
        );
      } else if (signInError.code === "invalid_credentials") {
        setError("That email and password don't match an account. Try again.");
      } else {
        setError(signInError.message || "Something went wrong signing in. Try again.");
      }
      return;
    }

    router.push("/chat");
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setError(null);
    setIsGoogleLoading(true);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/callback` },
    });

    if (oauthError) {
      setIsGoogleLoading(false);
      setError("Google sign-in didn't go through. Try again.");
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-[var(--ink)]">Sign in</h1>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">
        Pick up where you left off.
      </p>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-4 rounded-md border-2 border-[var(--ink)] bg-[var(--danger)] px-4 py-3 text-sm font-medium text-[var(--ink)]"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[var(--ink)]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border-2 border-[var(--ink)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--ink)] focus-visible:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-[var(--ink)]"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border-2 border-[var(--ink)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--ink)] focus-visible:outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full disabled:opacity-60"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-[var(--ink)]/20" />
        <span className="text-xs font-semibold text-[var(--ink-muted)]">
          OR
        </span>
        <span className="h-px flex-1 bg-[var(--ink)]/20" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        className="btn btn-secondary w-full disabled:opacity-60"
      >
        {isGoogleLoading ? "Connecting…" : "Sign in with Google"}
      </button>

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        Don&rsquo;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[var(--ink)] underline underline-offset-2"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}