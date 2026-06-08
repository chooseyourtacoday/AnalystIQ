# AnalystIQ

AI-powered data analyst for freelancers and consultants. Upload a CSV, get instant insights.

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
gh repo create analystiq --public --push
```

### 2. Import to Vercel
- Go to vercel.com → New Project
- Import your GitHub repo
- Vercel auto-detects Vite/React — no config needed

### 3. Add your API key
- In Vercel dashboard → Settings → Environment Variables
- Add: ANTHROPIC_API_KEY = your key from console.anthropic.com

### 4. Deploy
- Click Deploy — live in ~60 seconds

## Local Development
```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

## Project Structure
```
analystiq/
├── api/
│   └── analyze.js        ← Vercel serverless function (API key lives here)
├── src/
│   ├── App.jsx           ← Main React app
│   └── main.jsx          ← Entry point
├── index.html
├── vite.config.js
└── package.json
```
