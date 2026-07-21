import { GoogleGenAI } from "@google/genai";
import { retrieveContext } from "./retrieve";
import { buildMentorPrompt, MentorMode } from "../prompts/mentorPrompt";
import { classifyQuery } from "./classifier";
import { evaluateRetrieval } from "./evaluator";
import { getCachedResponse, setCachedResponse } from "./cache";

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
  const { chunks, hasStrongMatch } = await retrieveContext(userInput);
  const cacheKey = `${mode}:${userInput.trim().toLowerCase()}`;

const cached = getCachedResponse(cacheKey);

if (cached) {
  return {
    response: cached.response,
    sources: cached.sources,
  };
}
 const classification = classifyQuery(userInput);
const evaluation = evaluateRetrieval(hasStrongMatch, chunks.length);
if (!evaluation.confident) {
  return {
    response: evaluation.reason,
    sources: [],
  };
}
const effectiveMode =
  classification.type === "debug" ||
  classification.type === "explain" ||
  classification.type === "practice"
    ? classification.type
    : mode;
mode = classification.type === "general"
  ? mode
  : (classification.type as MentorMode);
const prompt = buildMentorPrompt(
  effectiveMode,
  userInput,
  chunks,
  hasStrongMatch
);
  const result = await getClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const response = result.text ?? "";
const sources = [...new Set(chunks.map((c) => c.source))];

setCachedResponse(cacheKey, response, sources);

return {
  response,
  sources,
};
}