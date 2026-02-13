import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Terminal, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractUsername, getRecentAnalyses } from "@/lib/analyzeGitHub";

const Index = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const recentAnalyses = getRecentAnalyses();

  const handleAnalyze = () => {
    const username = extractUsername(input);
    if (username) {
      navigate(`/analyze/${username}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden scanlines">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(hsl(160 100% 50% / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(160 100% 50% / 0.15) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl w-full"
      >
        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-mono text-sm text-muted-foreground">
            ~/github-analyzer <span className="text-primary">$</span>
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="neon-text text-primary">Decode</span>{" "}
          <span className="text-foreground">Any Developer's</span>
          <br />
          <span className="cyan-text text-secondary">GitHub</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
          AI-powered recruiter-style analysis of any GitHub profile. Get hiring signals, skill evaluation, and improvement roadmaps.
        </p>

        {/* Input */}
        <div className="flex gap-3 max-w-lg mx-auto mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter GitHub username or URL..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              className="pl-10 h-12 bg-muted border-border font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={!input.trim()}
            size="lg"
            className="h-12 px-6 font-semibold animate-pulse-glow"
          >
            Analyze
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground font-mono mb-16">
          e.g. torvalds, https://github.com/octocat
        </p>

        {/* Recent Analyses */}
        {recentAnalyses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 justify-center mb-4">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-mono">Recent Analyses</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {recentAnalyses.map((a) => (
                <button
                  key={a.username}
                  onClick={() => navigate(`/analyze/${a.username}`)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted border border-border hover:border-primary transition-colors"
                >
                  <img src={a.avatarUrl} alt={a.username} className="w-6 h-6 rounded-full" />
                  <span className="font-mono text-sm text-foreground">{a.username}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
