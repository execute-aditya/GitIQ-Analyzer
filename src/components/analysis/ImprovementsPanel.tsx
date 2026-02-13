import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Improvement } from "@/types/github";

interface Props {
  improvements: Improvement[];
}

const impactColors: Record<string, string> = {
  high: "border-primary text-primary",
  medium: "border-secondary text-secondary",
  low: "border-muted-foreground text-muted-foreground",
};

export const ImprovementsPanel = ({ improvements }: Props) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-mono text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-secondary" /> Improvement Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {improvements
            .sort((a, b) => {
              const order = { high: 0, medium: 1, low: 2 };
              return (order[a.impact] ?? 2) - (order[b.impact] ?? 2);
            })
            .map((imp, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-muted border border-border">
                <Badge variant="outline" className={`shrink-0 font-mono text-xs ${impactColors[imp.impact] || ""}`}>
                  {imp.impact}
                </Badge>
                <p className="text-sm text-card-foreground">{imp.tip}</p>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
