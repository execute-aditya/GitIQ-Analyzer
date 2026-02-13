import { motion } from "framer-motion";
import { Brain, CheckCircle, AlertTriangle, Compass, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AIEvaluation as AIEvalType } from "@/types/github";

interface Props {
  evaluation: AIEvalType;
}

const signalColors: Record<string, string> = {
  "Strong Hire": "bg-primary text-primary-foreground",
  "Hire": "bg-secondary text-secondary-foreground",
  "Lean Hire": "bg-muted text-foreground",
  "No Hire": "bg-destructive text-destructive-foreground",
};

export const AIEvaluation = ({ evaluation }: Props) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
    <Card className="border-border bg-card overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono text-foreground flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> AI Recruiter Evaluation
          </CardTitle>
          <Badge className={`font-mono text-sm px-3 py-1 ${signalColors[evaluation.hiringSignal] || "bg-muted text-foreground"}`}>
            {evaluation.hiringSignal}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        {evaluation.overallSummary && (
          <div className="p-4 rounded-lg bg-muted border border-border">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-secondary" />
              <span className="font-mono text-sm text-secondary font-semibold">Summary</span>
            </div>
            <p className="text-sm text-card-foreground leading-relaxed">{evaluation.overallSummary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary font-semibold">Technical Strengths</span>
            </div>
            <ul className="space-y-2">
              {evaluation.technicalStrengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-card-foreground">
                  <span className="text-primary mt-0.5">▹</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Skill Gaps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-secondary" />
              <span className="font-mono text-sm text-secondary font-semibold">Skill Gaps</span>
            </div>
            <ul className="space-y-2">
              {evaluation.skillGaps.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-card-foreground">
                  <span className="text-secondary mt-0.5">▹</span> {g}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Roadmap */}
        {evaluation.improvementRoadmap.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary font-semibold">Improvement Roadmap</span>
            </div>
            <ol className="space-y-2">
              {evaluation.improvementRoadmap.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-card-foreground">
                  <span className="font-mono text-primary font-bold shrink-0">{i + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);
