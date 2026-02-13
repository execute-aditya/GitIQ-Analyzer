import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

const LANG_COLORS = [
  "hsl(160, 100%, 50%)",
  "hsl(190, 100%, 50%)",
  "hsl(140, 80%, 45%)",
  "hsl(200, 80%, 55%)",
  "hsl(170, 70%, 40%)",
  "hsl(210, 60%, 50%)",
  "hsl(150, 60%, 35%)",
  "hsl(180, 50%, 45%)",
];

interface Props {
  languages: Record<string, number>;
}

export const LanguageChart = ({ languages }: Props) => {
  const data = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  const config = Object.fromEntries(
    data.map((d, i) => [d.name, { label: d.name, color: LANG_COLORS[i % LANG_COLORS.length] }])
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-mono text-foreground">Language Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-[250px] w-full">
            <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
              <XAxis type="number" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12, fontFamily: "JetBrains Mono" }} />
              <YAxis type="category" dataKey="name" tick={{ fill: "hsl(160, 30%, 85%)", fontSize: 12, fontFamily: "JetBrains Mono" }} width={75} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={LANG_COLORS[i % LANG_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
