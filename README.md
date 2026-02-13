# GitIQ Analyzer

GitIQ Analyzer is a small React + Vite app that analyzes a GitHub profile and provides metrics, visualizations, and an AI evaluation.

It fetches a user's public profile and repositories (via the GitHub API), computes metrics (stars, languages, activity, README coverage), and calls an AI gateway to provide a structured evaluation and improvement suggestions.

## Features

- Profile summary and repository metrics
- Language distribution chart and top repositories
- AI-driven evaluation and improvement tips
- Recent analyses saved in browser localStorage
- Serverless analysis function implemented as a Supabase/Deno function

## Technology stack

- Frontend: Vite, React, TypeScript
- UI: shadcn-ui, Tailwind CSS
- Data fetching: Supabase Functions (Deno) for backend GitHub calls
- AI gateway: Lovable AI gateway (configured via environment variable)

## Repository structure (high level)

- [src](src) — React app and components
- [src/lib/analyzeGitHub.ts](src/lib/analyzeGitHub.ts) — client helper that invokes the analysis function
- [src/pages/AnalysisPage.tsx](src/pages/AnalysisPage.tsx) — page that runs and displays an analysis
- [supabase/functions/analyze-github/index.ts](supabase/functions/analyze-github/index.ts) — serverless function that queries GitHub and the AI gateway
- [package.json](package.json) — scripts and dependencies

## Quick start (local)

Prerequisites: Node.js (v18+ recommended) and npm installed.

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open the app at `http://localhost:5173` (Vite default)

## Environment variables

The serverless analysis function requires two environment variables. When deploying to Supabase Functions (or running the function in Deno), set these:

- `GITHUB_API_TOKEN` — optional but recommended to avoid GitHub rate limits (personal access token with public_repo scope is sufficient)
- `LOVABLE_API_KEY` — required: API key for the AI gateway used by the function

When deploying, configure these in your Supabase project or your hosting provider's secrets/variables.

## How analysis works (brief)

1. The frontend calls the Supabase function `analyze-github` with `{ username }` (see [src/lib/analyzeGitHub.ts](src/lib/analyzeGitHub.ts)).
2. The function fetches the GitHub profile and repositories, checks READMEs for top repos, computes metrics (stars, repo count, language distribution, README ratio, activity score), and selects top repos.
3. The function then calls the Lovable AI gateway to request a structured JSON evaluation and returns the combined result.

## Running tests

The project uses Vitest. Run tests with:

```bash
npm test
```

## Deploying the Supabase function

This repo contains the function at [supabase/functions/analyze-github/index.ts](supabase/functions/analyze-github/index.ts). Deploy using the Supabase CLI or manage functions in the Supabase dashboard.

Example (Supabase CLI):

```bash
# from repo root
supabase functions deploy analyze-github --project-ref <your-project-ref>
```

Note: the function is a small Deno server handler that expects a JSON body `{ "username": "<username>" }` and returns a JSON analysis. It requires `LOVABLE_API_KEY` to be configured in the environment.

## Notes & troubleshooting

- If AI evaluations fail, the function still returns computed `metrics` and `top repos` (see function error handling).
- If you see GitHub rate limit errors, set `GITHUB_API_TOKEN`.
- Recent analyses are saved to localStorage under the key `github-analyzer-recent`.

## Contributing

Contributions are welcome. Open an issue or a PR; run `npm install` and `npm run dev` to test locally.

## License

This project does not include a license file. Add a `LICENSE` if you plan to publish this repository.

---
