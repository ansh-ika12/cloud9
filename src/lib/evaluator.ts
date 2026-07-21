export interface EvaluationResult {
  confident: boolean;
  reason: string;
}

export function evaluateRetrieval(
  hasStrongMatch: boolean,
  sourceCount: number
): EvaluationResult {
  if (!hasStrongMatch) {
    return {
      confident: false,
      reason: "No relevant knowledge base context found.",
    };
  }

  if (sourceCount < 1) {
    return {
      confident: false,
      reason: "Too few relevant sources were retrieved.",
    };
  }

  return {
    confident: true,
    reason: "Relevant context found.",
  };
}