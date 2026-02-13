# 🚀 GitIQ Analyzer

> 🔍 AI-powered GitHub Profile Analyzer that evaluates developer skills, activity, and influence using real GitHub data.

---

## 📸 Demo Preview

![Dashboard Preview](./public/Pasted_image.png)

---

## 🌐 Live Demo

👉 https://git-iq-analyzer.vercel.app

---

## ✨ Features

### 🔎 GitHub Profile Analysis
- Fetch any public GitHub profile instantly
- Analyze repositories, stars, forks, and contributions
- Track developer activity and engagement

### 📊 Visual Analytics
- Language distribution charts
- Repository performance metrics
- Contribution insights

### 🤖 AI-Powered Developer Score

GitIQ generates an **AI Score (0–100)** based on:

- Repository quality
- Activity frequency
- Technology diversity
- Community engagement
- Open-source impact

---

## 🧠 AI Score Formula

```ts
const aiScore =
  activityScore * 0.30 +
  repoQualityScore * 0.30 +
  languageDiversity * 0.20 +
  communityEngagement * 0.20;
Metrics Used
⭐ Stars count

🍴 Fork count

📅 Commit frequency

🧩 Language diversity

📈 Repo popularity

🛠 Tech Stack
Frontend
React (Vite)

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Recharts

Backend
Supabase

Supabase Edge Functions

GitHub REST API

⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/your-username/gitiq-analyzer.git
cd gitiq-analyzer
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables
Create a .env file:

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
4️⃣ Run Development Server
npm run dev
☁️ Supabase Setup
Deploy Edge Function
npx supabase functions deploy analyze-github
Add GitHub Token
npx supabase secrets set GITHUB_ACCESS_TOKEN=your_token
📂 Project Structure
src
│
├── components
│   ├── analysis
│   └── ui
│
├── lib
│   ├── analyzeGitHub.ts
│   └── utils.ts
│
├── pages
├── types
└── integrations
🎯 Use Cases
Recruiters evaluating developers

Portfolio enhancement

Developer self-analysis

Open-source performance tracking

🚀 Deployment (Vercel)
Push project to GitHub

Import repository into Vercel

Add environment variables

Deploy

🤝 Contributing
Fork → Create Branch → Commit → Push → Pull Request
📄 License
MIT License

⭐ Support
If you like this project:

Star the repo ⭐

Fork the repo 🍴

Share with others 🚀
