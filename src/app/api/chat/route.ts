import { NextRequest, NextResponse } from "next/server";
import { getMentorResponse } from "@/lib/generate";
import type { MentorMode } from "@/prompts/mentorPrompt";

const VALID_MODES: MentorMode[] = ["debug", "explain", "practice"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, message } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "A non-empty 'message' string is required." },
        { status: 400 }
      );
    }

    if (!mode || !VALID_MODES.includes(mode)) {
      return NextResponse.json(
        { error: `'mode' must be one of: ${VALID_MODES.join(", ")}` },
        { status: 400 }
      );
    }

    const result = await getMentorResponse(mode as MentorMode, message);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return NextResponse.json(
      { error: "Something went wrong generating a response. Please try again." },
      { status: 500 }
    );
  }
}