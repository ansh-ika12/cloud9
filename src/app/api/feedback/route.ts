import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const VALID_RATINGS = ["up", "down"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messageId, rating } = body;

    if (!messageId || typeof messageId !== "string") {
      return NextResponse.json(
        { error: "A 'messageId' string is required." },
        { status: 400 }
      );
    }

    if (!rating || !VALID_RATINGS.includes(rating)) {
      return NextResponse.json(
        { error: `'rating' must be one of: ${VALID_RATINGS.join(", ")}` },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    // Upsert on (message_id, user_id) — the unique constraint from
    // supabase/migrations/001_create_tables.sql. If the person already
    // voted on this message and taps the other thumb, this updates their
    // existing row instead of failing on a duplicate.
    const { error } = await supabase.from("feedback").upsert(
      {
        message_id: messageId,
        user_id: user.id,
        rating,
      },
      { onConflict: "message_id,user_id" }
    );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in /api/feedback:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your feedback." },
      { status: 500 }
    );
  }
}