"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

type SkillLevel = "beginner" | "intermediate" | "advanced";

const SKILL_LEVELS: { value: SkillLevel; label: string; tint: string }[] = [
  { value: "beginner", label: "Beginner", tint: "var(--bg-mint)" },
  {
    value: "intermediate",
    label: "Intermediate",
    tint: "var(--bg-blue)",
  },
  { value: "advanced", label: "Advanced", tint: "var(--bg-pink)" },
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Fill in your name, email, and password to continue.");
      return;
    }
    if (!skillLevel) {
      setError("Pick a skill level so your mentor can calibrate to you.");
      return;
    }
    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, skill_level: skillLevel },
      },
    });
    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message || "Couldn't create your account. Try again.");
      return;
    }

    router.push("/chat");
    router.refresh();
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-[var(--ink)]">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">
        A few details, then straight into the chat.
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
            htmlFor="name"
            className="block text-sm font-semibold text-[var(--ink)]"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border-2 border-[var(--ink)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--ink)] focus-visible:outline-none"
            placeholder="Ada Lovelace"
          />
        </div>

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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border-2 border-[var(--ink)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--ink)] focus-visible:outline-none"
            placeholder="At least 8 characters"
          />
        </div>

        <fieldset>
          <legend className="block text-sm font-semibold text-[var(--ink)]">
            Skill level
          </legend>
          <div className="mt-2 flex gap-3">
            {SKILL_LEVELS.map((level) => {
              const isActive = skillLevel === level.value;
              return (
                <button
                  key={level.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSkillLevel(level.value)}
                  className="sticky-note text-sm font-semibold"
                  style={{
                    ["--tag-color" as string]: level.tint,
                    opacity: isActive ? 1 : 0.55,
                    outline: isActive ? "2px solid var(--ink)" : "none",
                    outlineOffset: "2px",
                  }}
                >
                  {level.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full disabled:opacity-60"
        >
          {isSubmitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--ink)] underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}