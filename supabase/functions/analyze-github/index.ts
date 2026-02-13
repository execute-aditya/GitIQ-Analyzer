import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { username } = await req.json();
    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GITHUB_TOKEN = Deno.env.get("GITHUB_API_TOKEN");
    const ghHeaders: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "GitHub-Portfolio-Analyzer",
    };
    if (GITHUB_TOKEN) ghHeaders["Authorization"] = `Bearer ${GITHUB_TOKEN}`;

    // Fetch profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`, { headers: ghHeaders });
    if (!profileRes.ok) {
      const status = profileRes.status;
      return new Response(JSON.stringify({ error: status === 404 ? "User not found" : "GitHub API error" }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const profile = await profileRes.json();

    // Fetch repos (up to 100)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers: ghHeaders });
    const rawRepos = await reposRes.json();

    // Check READMEs for top 30 repos
    const reposToCheck = rawRepos.slice(0, 30);
    const readmeChecks = await Promise.all(
      reposToCheck.map(async (repo: any) => {
        try {
          const res = await fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`, { headers: ghHeaders });
          return { ...repo, has_readme: res.ok };
        } catch {
          return { ...repo, has_readme: false };
        }
      })
    );

    const remainingRepos = rawRepos.slice(30).map((r: any) => ({ ...r, has_readme: false }));
    const repos = [...readmeChecks, ...remainingRepos];

    // Calculate metrics
    const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
    const languages: Record<string, number> = {};
    repos.forEach((r: any) => {
      if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
    });
    const readmeCount = repos.filter((r: any) => r.has_readme).length;
    const readmeRatio = repos.length > 0 ? readmeCount / Math.min(repos.length, 30) : 0;

    const now = Date.now();
    const accountAgeDays = Math.floor((now - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24));

    // Activity score based on recent updates
    const recentRepos = repos.filter((r: any) => {
      const updated = new Date(r.updated_at).getTime();
      return now - updated < 180 * 24 * 60 * 60 * 1000; // last 6 months
    });
    const activityScore = Math.min(100, Math.round((recentRepos.length / Math.max(repos.length, 1)) * 100));

    const followersScore = Math.min(100, Math.round(Math.log2(profile.followers + 1) * 15));

    const metrics = {
      totalStars,
      repoCount: repos.length,
      languages,
      readmeRatio: Math.round(readmeRatio * 100),
      activityScore,
      accountAgeDays,
      followersScore,
    };

    // Top repos by stars
    const topRepos = [...repos]
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        language: r.language,
        html_url: r.html_url,
        updated_at: r.updated_at,
        has_readme: r.has_readme,
      }));

    // AI Evaluation
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const topLangs = Object.entries(languages).sort(([, a], [, b]) => b - a).slice(0, 5).map(([l]) => l).join(", ");

    const prompt = `You are a senior technical recruiter evaluating a GitHub profile. Analyze this developer and provide a structured evaluation.

Profile: ${profile.name || profile.login}
Bio: ${profile.bio || "None"}
Location: ${profile.location || "Unknown"}
Followers: ${profile.followers} | Following: ${profile.following}
Account Age: ${accountAgeDays} days
Public Repos: ${repos.length}
Total Stars: ${totalStars}
Top Languages: ${topLangs}
Documentation (README) Ratio: ${metrics.readmeRatio}%
Activity Score (6-month): ${activityScore}%
Followers Influence Score: ${followersScore}/100

Top Repositories:
${topRepos.map((r: any) => `- ${r.name}: ${r.stargazers_count}★, ${r.language || 'N/A'}, "${r.description || 'No description'}"`).join("\n")}

Respond with a JSON object using this exact schema. Do NOT wrap in markdown code blocks:
{
  "hiringSignal": "Strong Hire | Hire | Lean Hire | No Hire",
  "technicalStrengths": ["strength1", "strength2", "strength3"],
  "skillGaps": ["gap1", "gap2"],
  "improvementRoadmap": ["step1", "step2", "step3"],
  "overallSummary": "A paragraph summarizing the developer",
  "improvements": [
    {"tip": "actionable tip", "impact": "high|medium|low"},
    {"tip": "another tip", "impact": "high|medium|low"}
  ]
}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a senior technical recruiter. Always respond with valid JSON only, no markdown formatting." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!aiRes.ok) {
      console.error("AI gateway error:", aiRes.status, await aiRes.text());
      // Return metrics without AI if it fails
      return new Response(JSON.stringify({
        profile: {
          login: profile.login,
          name: profile.name,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          location: profile.location,
          blog: profile.blog,
          company: profile.company,
          followers: profile.followers,
          following: profile.following,
          public_repos: profile.public_repos,
          created_at: profile.created_at,
        },
        repos: topRepos,
        metrics,
        aiEvaluation: null,
        improvements: [],
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const aiContent = aiData.choices?.[0]?.message?.content || "{}";

    let aiEvaluation;
    let improvements: any[] = [];
    try {
      const cleaned = aiContent.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      improvements = parsed.improvements || [];
      aiEvaluation = {
        hiringSignal: parsed.hiringSignal || "Unknown",
        technicalStrengths: parsed.technicalStrengths || [],
        skillGaps: parsed.skillGaps || [],
        improvementRoadmap: parsed.improvementRoadmap || [],
        overallSummary: parsed.overallSummary || "",
      };
    } catch {
      aiEvaluation = {
        hiringSignal: "Unknown",
        technicalStrengths: [],
        skillGaps: [],
        improvementRoadmap: [],
        overallSummary: aiContent,
      };
    }

    return new Response(JSON.stringify({
      profile: {
        login: profile.login,
        name: profile.name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        location: profile.location,
        blog: profile.blog,
        company: profile.company,
        followers: profile.followers,
        following: profile.following,
        public_repos: profile.public_repos,
        created_at: profile.created_at,
      },
      repos: topRepos,
      metrics,
      aiEvaluation,
      improvements,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-github error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
