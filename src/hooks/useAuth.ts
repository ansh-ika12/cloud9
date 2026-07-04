"use client";

import { useContext } from "react";
import { AuthContext } from "@/components/providers/AuthProvider";

/**
 * Reads the current session/user from AuthProvider's context. Throws if
 * called outside <AuthProvider> — a clear error immediately, rather than a
 * confusing "cannot read property of undefined" somewhere downstream.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }

  return context;
}