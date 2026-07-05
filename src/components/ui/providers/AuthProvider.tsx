"use client";

import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import type { AuthContextValue } from "@/types";
import { createClient } from "@/lib/supabase-client";

/**
 * The context object itself — exported so useAuth.ts (next file in the
 * list) can read it via useContext. Components should use the useAuth()
 * hook once it exists rather than importing this directly.
 */
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

/**
 * Wraps the app in a React Context exposing the current session/user, per
 * FRD §6.1. Subscribes to Supabase's onAuthStateChange so the whole app
 * reacts immediately to login/logout/token refresh, instead of only
 * reading the session once on load.
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, session, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}