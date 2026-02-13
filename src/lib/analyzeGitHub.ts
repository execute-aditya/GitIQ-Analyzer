import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResult, RecentAnalysis } from "@/types/github";

export function extractUsername(input: string): string {
  const trimmed = input.trim();
  // Handle URLs like https://github.com/username
  const urlMatch = trimmed.match(/github\.com\/([a-zA-Z0-9-]+)/);
  if (urlMatch) return urlMatch[1];
  // Otherwise treat as username
  return trimmed.replace(/^@/, "");
}

export async function analyzeGitHub(username: string): Promise<AnalysisResult> {
  const { data, error } = await supabase.functions.invoke("analyze-github", {
    body: { username },
  });

  if (error) throw new Error(error.message || "Analysis failed");
  if (data?.error) throw new Error(data.error);
  return data as AnalysisResult;
}

const STORAGE_KEY = "github-analyzer-recent";

export function getRecentAnalyses(): RecentAnalysis[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveRecentAnalysis(analysis: RecentAnalysis) {
  const recent = getRecentAnalyses().filter((a) => a.username !== analysis.username);
  recent.unshift(analysis);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 10)));
}
