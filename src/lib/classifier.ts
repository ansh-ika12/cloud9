export type QueryType =
  | "kb"
  | "debug"
  | "explain"
  | "practice"
  | "general";

export interface ClassificationResult {
  type: QueryType;
}

export function classifyQuery(input: string): ClassificationResult {
  const text = input.toLowerCase();

  // Debugging
  if (
    text.includes("error") ||
    text.includes("bug") ||
    text.includes("exception") ||
    text.includes("fix") ||
    text.includes("why doesn't")
  ) {
    return { type: "debug" };
  }

  // Practice
  if (
    text.includes("practice") ||
    text.includes("quiz") ||
    text.includes("exercise") ||
    text.includes("question")
  ) {
    return { type: "practice" };
  }

  // Explanation
  if (
    text.includes("what is") ||
    text.includes("explain") ||
    text.includes("how does")
  ) {
    return { type: "explain" };
  }

  // Knowledge base lookup
  if (
    text.includes("documentation") ||
    text.includes("docs") ||
    text.includes("cloud9")
  ) {
    return { type: "kb" };
  }

  return { type: "general" };
}