import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-grid-pastel px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <span className="font-display text-3xl text-[var(--ink)]">
            Cloud9
          </span>
        </Link>
        <div className="card-sticky card-sticky--ink p-8">{children}</div>
      </div>
    </div>
  );
}