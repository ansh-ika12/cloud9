import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  }
  return ai;
}

// taskType matters: use "RETRIEVAL_DOCUMENT" when embedding knowledge-base
// chunks (indexing), and "RETRIEVAL_QUERY" when embedding a user's question
// (searching). Using the matching type on both sides improves match quality.
export async function generateEmbedding(
  text: string,
  taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY" = "RETRIEVAL_DOCUMENT"
): Promise<number[]> {
  const response = await getClient().models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    config: {
      taskType,
      outputDimensionality: 768, // must match your Pinecone index dimension
    },
  });
  return response.embeddings![0].values!;
}

// Same thing but for multiple texts at once (used during ingestion)
export async function generateEmbeddings(
  texts: string[],
  taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY" = "RETRIEVAL_DOCUMENT"
): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (const text of texts) {
    const embedding = await generateEmbedding(text, taskType);
    embeddings.push(embedding);
  }

  return embeddings;
}