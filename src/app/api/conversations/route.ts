import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("conversations")
    .select("id, title, mode, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error in GET /api/conversations:", error);
    return NextResponse.json(
      { error: "Failed to load conversations." },
      { status: 500 }
    );
  }

  // Shape matches ConversationSummary in src/types/index.ts
  const conversations = data.map((c) => ({
    id: c.id,
    title: c.title,
    mode: c.mode,
    updatedAt: c.updated_at,
  }));

  return NextResponse.json(conversations);
}