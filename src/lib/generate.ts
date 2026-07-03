import { GoogleGenAI } from "@google/genai";
import { retrieveContext } from "./retrieve";
import { buildMentorPrompt, MentorMode } from "../prompts/mentorPrompt";

let ai: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  }
  return ai;
}

export interface MentorResponse {
  response: string;
  sources: string[];
}

export async function getMentorResponse(
  mode: MentorMode,
  userInput: string
): Promise<MentorResponse> {
  const context = await retrieveContext(userInput);
  const prompt = buildMentorPrompt(mode, userInput, context);

  const result = await getClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return {
    response: result.text ?? "",
    sources: [...new Set(context.map((c) => c.source))], // dedupe repeated sources
  };
}