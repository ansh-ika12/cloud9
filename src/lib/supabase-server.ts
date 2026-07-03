import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client for the server — Server Components, Server Actions, and
 * Route Handlers (src/app/api/**, src/app/(auth)/callback/route.ts,
 * src/middleware.ts). Reads/writes the session via cookies instead of
 * localStorage, which is what makes auth work with SSR.
 *
 * Written for Next.js 16, where `cookies()` returns a Promise and must be
 * awaited. (Earlier drafts of this file assumed Next 14, where it was
 * synchronous — this project is actually on 16, so it's async here.)
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll was called from a Server Component, which can't set
            // cookies directly. Safe to ignore as long as middleware.ts is
            // refreshing the session (it will be, once we build it).
          }
        },
      },
    }
  );
}