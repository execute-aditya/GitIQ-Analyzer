<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitIQ Analyzer - Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #24292f;
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
            background-color: #ffffff;
        }
        h1, h2, h3 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
        }
        h1 {
            font-size: 2em;
            border-bottom: 1px solid #eaecef;
            padding-bottom: .3em;
        }
        h2 {
            font-size: 1.5em;
            border-bottom: 1px solid #eaecef;
            padding-bottom: .3em;
        }
        p {
            margin-top: 0;
            margin-bottom: 16px;
        }
        a {
            color: #0969da;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        ul, ol {
            padding-left: 2em;
            margin-top: 0;
            margin-bottom: 16px;
        }
        li {
            margin-bottom: 4px;
        }
        li > ul {
            margin-top: 4px;
        }
        code {
            padding: .2em .4em;
            margin: 0;
            font-size: 85%;
            background-color: #afb8c133;
            border-radius: 6px;
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
        }
        pre {
            background-color: #f6f8fa;
            border-radius: 6px;
            padding: 16px;
            overflow: auto;
            line-height: 1.45;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            font-size: 100%;
            word-break: normal;
            white-space: pre;
        }
        img {
            max-width: 100%;
            box-sizing: border-box;
            background-color: #fff;
        }
        hr {
            height: 0.25em;
            padding: 0;
            margin: 24px 0;
            background-color: #e1e4e8;
            border: 0;
        }
        blockquote {
            margin: 0;
            padding: 0 1em;
            color: #6a737d;
            border-left: 0.25em solid #dfe2e5;
        }
        .emoji {
            font-family: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        }
    </style>
</head>
<body>

    <h1>GitIQ Analyzer</h1>

    <p>GitIQ Analyzer is a modern, interactive tool designed to analyze GitHub profiles and provide deep insights into developer activity. It visualizes key metrics, language distribution, and repository performance using a sleek, responsive interface.</p>

    <p><img src="public/placeholder.svg" alt="Project Preview"></p>

    <h2><span class="emoji">🚀</span> Features</h2>
    <ul>
        <li><strong>Comprehensive Profile Analysis</strong>: Instantly fetch and analyze any public GitHub profile.</li>
        <li><strong>Visual Metrics</strong>:
            <ul>
                <li><strong>Language Distribution</strong>: Interactive bar charts showing top languages used.</li>
                <li><strong>Engagement Stats</strong>: Total stars, forks, followers, and influence scores.</li>
                <li><strong>Activity Tracking</strong>: Visual indicators of recent contribution activity.</li>
            </ul>
        </li>
        <li><strong>AI-Powered Evaluation</strong>: Smart insights and "AI Score" for developer profiles.</li>
        <li><strong>Top Repositories</strong>: Detailed cards highlighting the most popular repositories.</li>
        <li><strong>Recent History</strong>: Local storage integration to quickly access previously analyzed profiles.</li>
        <li><strong>Responsive Design</strong>: Built with a mobile-first approach using Tailwind CSS and Framer Motion.</li>
    </ul>

    <h2><span class="emoji">🛠️</span> Tech Stack</h2>
    <p><strong>Frontend:</strong></p>
    <ul>
        <li><a href="https://react.dev/">React</a> (Vite)</li>
        <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
        <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
        <li><a href="https://ui.shadcn.com/">shadcn/ui</a> (UI Components)</li>
        <li><a href="https://www.framer.com/motion/">Framer Motion</a> (Animations)</li>
        <li><a href="https://recharts.org/">Recharts</a> (Data Visualization)</li>
        <li><a href="https://lucide.dev/">Lucide React</a> (Icons)</li>
    </ul>

    <p><strong>Backend & Services:</strong></p>
    <ul>
        <li><a href="https://supabase.com/">Supabase</a> (Backend as a Service)</li>
        <li><a href="https://supabase.com/docs/guides/functions">Supabase Edge Functions</a> (Serverless logic for GitHub API handling)</li>
        <li><a href="https://docs.github.com/en/rest">GitHub API</a></li>
    </ul>

    <h2><span class="emoji">⚙️</span> Prerequisites</h2>
    <p>Before you begin, ensure you have the following installed:</p>
    <ul>
        <li><a href="https://nodejs.org/">Node.js</a> (v18+ recommended)</li>
        <li><a href="https://www.npmjs.com/">npm</a> or <a href="https://bun.sh/">Bun</a></li>
        <li>A <a href="https://supabase.com/">Supabase</a> project</li>
    </ul>

    <h2><span class="emoji">📦</span> Installation</h2>

    <ol>
        <li>
            <strong>Clone the repository</strong>
            <pre><code>git clone https://github.com/your-username/gitiq-analyzer.git
cd gitiq-analyzer</code></pre>
        </li>
        <li>
            <strong>Install dependencies</strong>
            <pre><code>npm install</code></pre>
        </li>
        <li>
            <strong>Configure Environment Variables</strong>
            <p>Create a <code>.env</code> file in the root directory based on your Supabase configuration:</p>
            <pre><code>VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key</code></pre>
        </li>
        <li>
            <strong>Start the Development Server</strong>
            <pre><code>npm run dev</code></pre>
        </li>
    </ol>

    <h2><span class="emoji">☁️</span> Backend Setup (Supabase)</h2>
    <p>This project relies on a Supabase Edge Function to securely communicate with the GitHub API.</p>

    <ol>
        <li>
            <strong>Initialize Supabase locally</strong> (if not already done):
            <pre><code>npx supabase init</code></pre>
        </li>
        <li>
            <strong>Deploy the Edge Function</strong>:
            <p>Ensure you have the <code>analyze-github</code> function in your <code>supabase/functions</code> directory.</p>
            <pre><code>npx supabase functions deploy analyze-github</code></pre>
        </li>
        <li>
            <strong>Set GitHub Token</strong>:
            <p>For the analyzer to work with higher rate limits, set your GitHub Personal Access Token in Supabase secrets:</p>
            <pre><code>npx supabase secrets set GITHUB_ACCESS_TOKEN=your_github_token</code></pre>
        </li>
    </ol>

    <h2><span class="emoji">📂</span> Project Structure</h2>
    <pre><code>src/
├── components/
│   ├── analysis/       # Core analysis components (Charts, Metrics, AI Eval)
│   ├── ui/             # Reusable UI components (Buttons, Cards, etc.)
│   └── ...
├── lib/
│   ├── analyzeGitHub.ts # Main logic for fetching/parsing data
│   └── utils.ts         # Utility functions
├── pages/              # Route pages (Index, AnalysisPage)
├── types/              # TypeScript definitions (GitHub types)
└── integrations/       # Supabase client configuration</code></pre>

    <h2><span class="emoji">🤝</span> Contributing</h2>
    <p>Contributions are welcome! Please feel free to submit a Pull Request.</p>
    <ol>
        <li>Fork the project</li>
        <li>Create your feature branch (<code>git checkout -b feature/AmazingFeature</code>)</li>
        <li>Commit your changes (<code>git commit -m 'Add some AmazingFeature'</code>)</li>
        <li>Push to the branch (<code>git push origin feature/AmazingFeature</code>)</li>
        <li>Open a Pull Request</li>
    </ol>

    <h2><span class="emoji">📄</span> License</h2>
    <p>This project is licensed under the MIT License - see the LICENSE file for details.</p>

</body>
</html>
