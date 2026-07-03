import { Pinecone } from "@pinecone-database/pinecone";

let pinecone: Pinecone | null = null;

function getClient(): Pinecone {
  if (!pinecone) {
    pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  }
  return pinecone;
}

// Get a reference to your 'cloud9' index
export const getIndex = () => {
  return getClient().index("cloud9");
};