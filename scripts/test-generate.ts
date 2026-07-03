import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getMentorResponse } from "../src/lib/generate";

async function main() {
  const mode = "explain" as const;
  const userInput = "What is a monad?";  const result = await getMentorResponse(mode, userInput);

  console.log("Mode:", mode);
  console.log("Input:", userInput);
  console.log("\nMentor response:\n");
  console.log(result.response);
  console.log("\nSources used:", result.sources.join(", "));
}

main().catch(console.error);