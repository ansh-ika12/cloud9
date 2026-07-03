import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

console.log("GEMINI_API_KEY loaded:", process.env.GEMINI_API_KEY ? "yes (" + process.env.GEMINI_API_KEY.slice(0, 6) + "...)" : "NO - undefined");

import { retrieveContext } from "../src/lib/retrieve";

async function main() {
  const query = "What is recursion?";
  const results = await retrieveContext(query);

  console.log(`🔍 Query: "${query}"\n`);
  results.forEach((r, i) => {
    console.log(`[${i + 1}] source: ${r.source} | score: ${r.score.toFixed(3)}`);
    console.log(r.text.slice(0, 150) + "...\n");
  });
}

main().catch(console.error);