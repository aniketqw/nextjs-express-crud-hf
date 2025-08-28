---
title: Next.js Express CRUD
emoji: 🚀
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
---

# Next.js + Express CRUD Application

Full-stack CRUD app with SSR, ready for Hugging Face deployment.

## Quick Start

1. **Install dependencies:**
```bash
cd api && npm install
cd ../web && npm install
```

2. **Run locally:**
```bash
# Terminal 1
cd api && npm run dev

# Terminal 2
cd web && npm run dev
```

3. **Deploy to Hugging Face:**
- Add HF_TOKEN to GitHub secrets
- Update HF_REPO_ID in workflow
- Push to GitHub

Visit http://localhost:3000
