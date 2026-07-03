import Link from "next/link";

type Mode = {
  name: string;
  description: string;
};

const MODES: Mode[] = [
  {
    name: "Debug",
    description:
      "Paste a snippet that's breaking and get a step-by-step walkthrough of what's actually going wrong — not just the fix, but why.",
  },
  {
    name: "Explain",
    description:
      "Ask about a concept, function, or error message in plain English and get grounded explanations, backed by curated docs where they exist.",
  },
  {
    name: "Practice",
    description:
      "Get a problem sized to your skill level. Stuck? You'll get progressive hints before the solution — never an instant answer.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-grid-pastel">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <span className="font-display text-2xl text-[var(--ink)] sm:text-3xl">
          Cloud9
        </span>
        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="font-heading text-sm font-semibold text-[var(--ink)] underline decoration-2 underline-offset-4"
          >
            Sign in
          </Link>
          <Link href="/signup" className="btn btn-primary text-sm">
            Get Started
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-20 pt-10 text-center sm:px-10 sm:pt-16">
        <div className="mb-6 flex justify-center dot-divider" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <h1 className="text-4xl font-bold text-[var(--ink)] sm:text-5xl">
          A mentor that debugs, explains, and quizzes you — never just
          hands you the answer.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--ink-muted)] sm:text-lg">
          Paste code that&rsquo;s breaking, ask what a concept means, or
          request a practice problem. Your AI Coding Mentor picks the right
          mode and meets you where you are.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/signup" className="btn btn-primary">
            Get Started
          </Link>
          <Link href="/login" className="btn btn-secondary">
            I already have an account
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            Three modes, one mentor
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[var(--ink-muted)]">
            Built on Stop · Start · Continue — every mode has a clear job.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {MODES.map((mode) => (
            <article
              key={mode.name}
              className="card-sticky card-sticky--ink p-6"
            >
              <h3 className="text-xl font-bold text-[var(--ink)]">
                {mode.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                {mode.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t-2 border-[var(--ink)] bg-[var(--surface)] px-6 py-6 text-center text-xs text-[var(--ink-muted)] sm:px-10">
        Your code is used to generate mentor responses and is never shared
        outside this app.{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          Learn how we handle your data
        </Link>
        .
      </footer>
    </div>
  );
}