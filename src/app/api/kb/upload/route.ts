import { NextResponse } from "next/server";
import { chunkText } from "@/lib/chunker";
import { generateEmbeddings } from "@/lib/embeddings";
import { getIndex } from "@/lib/pinecone";
import { randomUUID } from "crypto";
export async function POST(req: Request) {
  try{
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    const text = await file.text();
    const chunks = chunkText(text);
    const embeddings = await generateEmbeddings(chunks);
    const vectors = chunks.map((chunk, index) => ({
  id: randomUUID(),
  values: embeddings[index],
  metadata: {
    text: chunk,
    source: file.name,
  },
}));
const index = getIndex();

await index.upsert(vectors);

    return NextResponse.json({
  success: true,
  filename: file.name,
  chunkCount: chunks.length,
  indexedVectors: vectors.length,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}