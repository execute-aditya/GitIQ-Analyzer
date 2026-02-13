import { motion } from "framer-motion";
import { GitBranch, Star, FileText, Activity, Users, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AnalysisMetrics } from "@/types/github";

interface Props {
  metrics: AnalysisMetrics;
  repoCount: number;
}

// UPDATED MetricCard Component
const MetricCard = ({ icon: Icon, label, value, color, delay }: {
  icon: any; label: string; value: string | number; color: string; delay: number;
}) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
    <Card className="border-border bg-card hover:border-primary/50 transition-colors">
      <CardContent className="p-4 flex items-center gap-4">
        {/* Added shrink-0 to prevent the icon from squishing */}
        <div className={`p-2.5 rounded-lg bg-muted ${color} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        
        {/* Added min-w-0 and flex-1 to strictly contain the text area */}
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{label}</p>
          
          {/* CHANGED: 
              1. Reduced size from text-2xl to text-lg or text-xl to fit longer words.
              2. Used 'truncate' to prevent overflow, or use 'break-all' if you want it to wrap.
              3. Added 'title' so hovering shows the full text if truncated.
          */}
          <p className="text-lg font-bold font-mono text-foreground truncate" title={String(value)}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const MetricsGrid = ({ metrics, repoCount }: Props) => {
  const topLang = Object.entries(metrics.languages).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <MetricCard icon={GitBranch} label="Repos" value={repoCount} color="text-primary" delay={0.15} />
      <MetricCard icon={Star} label="Stars" value={metrics.totalStars} color="text-secondary" delay={0.2} />
      <MetricCard icon={Code} label="Top Lang" value={topLang} color="text-primary" delay={0.25} />
      <MetricCard icon={FileText} label="README %" value={`${metrics.readmeRatio}%`} color="text-secondary" delay={0.3} />
      <MetricCard icon={Activity} label="Activity" value={`${metrics.activityScore}%`} color="text-primary" delay={0.35} />
      <MetricCard icon={Users} label="Influence" value={`${metrics.followersScore}/100`} color="text-secondary" delay={0.4} />
    </div>
  );
};