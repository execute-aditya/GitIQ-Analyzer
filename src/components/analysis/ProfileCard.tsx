import { motion } from "framer-motion";
import { MapPin, Building, Calendar, Users, Link as LinkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubProfile, AnalysisMetrics } from "@/types/github";

interface Props {
  profile: GitHubProfile;
  metrics: AnalysisMetrics;
}

export const ProfileCard = ({ profile, metrics }: Props) => {
  const accountAge = Math.floor(metrics.accountAgeDays / 365);
  const joinDate = new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="border-border bg-card overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-24 h-24 rounded-full border-2 border-primary shadow-lg"
              style={{ boxShadow: "0 0 20px hsl(160 100% 50% / 0.2)" }}
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-foreground">{profile.name || profile.login}</h2>
              <p className="font-mono text-primary text-sm">@{profile.login}</p>
              {profile.bio && <p className="text-muted-foreground mt-2 text-sm">{profile.bio}</p>}

              <div className="flex flex-wrap gap-4 mt-4 justify-center sm:justify-start text-sm text-muted-foreground">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {profile.location}
                  </span>
                )}
                {profile.company && (
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> {profile.company}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Joined {joinDate} ({accountAge}y)
                </span>
                {profile.blog && (
                  <a href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <LinkIcon className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>

              <div className="flex gap-6 mt-4 justify-center sm:justify-start">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-mono text-foreground font-semibold">{profile.followers}</span>
                  <span className="text-muted-foreground text-xs">followers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-foreground font-semibold">{profile.following}</span>
                  <span className="text-muted-foreground text-xs">following</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
