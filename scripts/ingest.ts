import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";

// ---- CONFIG ----
const KNOWLEDGE_BASE_DIR = path.join(process.cwd(), "knowledge-base");
const INDEX_NAME = "cloud9";
const CHUNK_SIZE = 500; // characters per chunk
const CHUNK_OVERLAP = 50; // overlap between chunks for context continuity
const EMBEDDING_DIM = 768;

// ---- INIT CLIENTS ----
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// ---- STEP 1: READ FILES ----
function readKnowledgeBase(): { filename: string; content: string }[] {
  const files = fs.readdirSync(KNOWLEDGE_BASE_DIR).filter((f) => f.endsWith(".md"));

  console.log(`📂 Found ${files.length} files in knowledge-base/\n`);

  return files.map((filename) => ({
    filename,
    content: fs.readFileSync(path.join(KNOWLEDGE_BASE_DIR, filename), "utf-8"),
  }));
}

// ---- STEP 2: CHUNK TEXT ----
function chunkText(text: string, filename: string): { id: string; text: string; source: string }[] {
  const chunks: { id: string; text: string; source: string }[] = [];
  let start = 0;
  let chunkIndex = 0;

  while (start < text.length) {
    const end = Math.min(start + CHUNK_SIZE, text.length);
    const piece = text.slice(start, end).trim();

    if (piece.length > 0) {
      chunks.push({
        id: `${filename}-chunk-${chunkIndex}`,
        text: piece,
        source: filename,
      });
      chunkIndex++;
    }

    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }

  return chunks;
}

// ---- STEP 3: GENERATE EMBEDDING ----
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    config: {
      taskType: "RETRIEVAL_DOCUMENT",
      outputDimensionality: EMBEDDING_DIM,
    },
  });
  return response.embeddings![0].values!;
}

// ---- STEP 4: UPSERT TO PINECONE ----
async function upsertToPinecone(
  chunks: { id: string; text: string; source: string }[]
) {
  const index = pinecone.index(INDEX_NAME);

  const BATCH_SIZE = 10;

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);

    const vectors = await Promise.all(
      batch.map(async (chunk) => {
        const embedding = await generateEmbedding(chunk.text);
        return {
          id: chunk.id,
          values: embedding,
          metadata: {
            text: chunk.text,
            source: chunk.source,
          },
        };
      })
    );

    await index.upsert(vectors);
    console.log(`   ✅ Upserted batch ${Math.floor(i / BATCH_SIZE) + 1} (${vectors.length} vectors)`);
  }
}

// ---- MAIN: RUN EVERYTHING ----
async function main() {
  console.log("🚀 Starting Cloud9 Knowledge Base Ingestion\n");

  const files = readKnowledgeBase();

  const allChunks: { id: string; text: string; source: string }[] = [];
  for (const file of files) {
    const chunks = chunkText(file.content, file.filename);
    allChunks.push(...chunks);
    console.log(`📄 ${file.filename} → ${chunks.length} chunks`);
  }

  console.log(`\n📦 Total chunks to embed: ${allChunks.length}\n`);

  console.log("🔄 Embedding and uploading to Pinecone...\n");
  await upsertToPinecone(allChunks);

  console.log(`\n✅ Done! ${allChunks.length} vectors stored in Pinecone index "${INDEX_NAME}"`);
}

main().catch(console.error);