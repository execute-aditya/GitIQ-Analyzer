import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GitHubRepo } from "@/types/github";

interface Props {
  repos: GitHubRepo[];
}

export const TopRepos = ({ repos }: Props) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-mono text-foreground">Top Repositories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {repos.slice(0, 6).map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-md bg-muted border border-border hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-primary font-semibold truncate">{repo.name}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                {repo.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{repo.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-secondary" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" /> {repo.forks_count}
                </span>
              </div>
            </div>
            {repo.language && (
              <Badge variant="outline" className="mt-2 text-xs font-mono border-border text-muted-foreground">
                {repo.language}
              </Badge>
            )}
          </a>
        ))}
      </CardContent>
    </Card>
  </motion.div>
);
