import { getIndex } from "./pinecone";
import { generateEmbedding } from "./embeddings";

export interface RetrievedChunk {
  text: string;
  source: string;
  score: number;
}

export async function retrieveContext(
  query: string,
  topK = 4
): Promise<RetrievedChunk[]> {
  const index = getIndex();

  // "RETRIEVAL_QUERY" because this is a search question, not a document being indexed
  const queryEmbedding = await generateEmbedding(query, "RETRIEVAL_QUERY");

  const results = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return results.matches.map((match) => ({
    text: match.metadata?.text as string,
    source: match.metadata?.source as string,
    score: match.score ?? 0,
  }));
}