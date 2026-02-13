import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyzeGitHub, saveRecentAnalysis } from "@/lib/analyzeGitHub";
import type { AnalysisResult } from "@/types/github";
import { ProfileCard } from "@/components/analysis/ProfileCard";
import { MetricsGrid } from "@/components/analysis/MetricsGrid";
import { LanguageChart } from "@/components/analysis/LanguageChart";
import { TopRepos } from "@/components/analysis/TopRepos";
import { AIEvaluation } from "@/components/analysis/AIEvaluation";
import { ImprovementsPanel } from "@/components/analysis/ImprovementsPanel";
import { useToast } from "@/hooks/use-toast";

const AnalysisPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await analyzeGitHub(username);
        setResult(data);
        saveRecentAnalysis({
          username: data.profile.login,
          avatarUrl: data.profile.avatar_url,
          analyzedAt: new Date().toISOString(),
        });
      } catch (e: any) {
        setError(e.message || "Analysis failed");
        toast({ title: "Error", description: e.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="font-mono text-muted-foreground">
          Analyzing <span className="text-primary">@{username}</span>...
        </p>
        <p className="text-xs text-muted-foreground font-mono">Fetching repos, calculating metrics, running AI evaluation</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-destructive font-mono">{error}</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen px-4 py-8 max-w-6xl mx-auto">
      <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 font-mono text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <ProfileCard profile={result.profile} metrics={result.metrics} />
        <MetricsGrid metrics={result.metrics} repoCount={result.profile.public_repos} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LanguageChart languages={result.metrics.languages} />
          <TopRepos repos={result.repos} />
        </div>

        {result.aiEvaluation && <AIEvaluation evaluation={result.aiEvaluation} />}
        {result.improvements && result.improvements.length > 0 && (
          <ImprovementsPanel improvements={result.improvements} />
        )}
      </motion.div>
    </div>
  );
};

export default AnalysisPage;
