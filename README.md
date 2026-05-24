# NaijaInsight — DSN x BCT LLM Agent Challenge (Frontend)

[![Repository](https://img.shields.io/badge/GitHub-Repository-181717.svg?style=for-the-badge&logo=github)](https://github.com/thetruesammyjay/dsn-bct-frontend)

This repository contains the frontend client for the **DSN x BCT LLM Agent Challenge (Data & AI Summit · Hackathon 3.0)**. 

Our submission, **NaijaInsight**, focuses on designing autonomous LLM agents that understand Nigerian user context, behavioral patterns, and nuances. The frontend is built as a **Next.js Monorepo** (using Turborepo) to deploy two distinct applications for the two specific tasks of the competition.

---

## Deliverables & Live Links

### Live Agent Deployments
- **Task A (User Modeling):** [https://dsn-bct-task-a.vercel.app/](https://dsn-bct-task-a.vercel.app/)
- **Task B (Recommendation):** [https://dsn-bct-task-b.vercel.app/](https://dsn-bct-task-b.vercel.app/)

### Solution Papers (Thesis Format)
Extensive architectural deep-dives, RAG pipeline mechanics, vector mathematics, ablation studies, and UML flowcharts are provided in the `/Solution Paper` directory:
- [Task A Solution Paper](./Solution%20Paper/SOLUTION_PAPER_TASK_A.md)
- [Task B Solution Paper](./Solution%20Paper/SOLUTION_PAPER_TASK_B.md)

---

## The Challenge: Two Tasks. One Ambition.

We are evaluating LLM models on real-world datasets, specifically leveraging the [Yelp Open Dataset](https://business.yelp.com/data/resources/open-dataset/), tailored with Nigerian nuance. This repo hosts the UI for:

### Task A: User Modeling (`apps/task-a-user-modeling`)
An interface for an agent that understands users deeply enough to simulate their reviews. 
- Simulates star ratings and written reviews for unseen items based on Nigerian personas.
- Evaluates tone, rating behavior, and contextual nuance (e.g., Casual Lagos, Heavy Pidgin).

### Task B: Recommendation (`apps/task-b-recommendation`)
An interface that delivers personalized, contextual, and conversational item recommendations.
- Ranks items tailored to individual user context.
- Handles cold-start and multi-turn conversational retrieval.

---

## Architecture & Tech Stack

This project is a **Monorepo** configured via npm workspaces and **Turborepo** to share UI components and tooling, while generating separate Vercel deployments.

- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS, Bootstrap Icons / Lucide React
- **Components:** Radix UI Primitives, customized dark theme (`#080C10` base, `#1DDF8A` primary neon green)
- **Monorepo Tooling:** Turborepo
- **Package Manager:** npm

### Workspace Structure
```text
dsn-bct-frontend/
├── apps/
│   ├── task-a-user-modeling/   # Next.js app for Task A
│   └── task-b-recommendation/  # Next.js app for Task B
├── packages/
│   ├── ui/                     # Shared React components (Tailwind, Radix)
│   ├── config/                 # Shared ESLint, TypeScript, Tailwind config
│   └── core/                   # Shared API utilities
```

---

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thetruesammyjay/dsn-bct-frontend.git
   cd dsn-bct-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env.local` file in each app directory (`apps/task-a-user-modeling` and `apps/task-b-recommendation`).
   - Add your backend agent API URL:
     ```env
     NEXT_PUBLIC_API_URL=http://your-agent-backend-url.com
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *This command leverages Turborepo to concurrently spin up all apps and watch for shared package changes.*

---

## Design Context & Theme

The UI translates a dark-themed, "cyberpunk-leaning", hyper-modern aesthetic with specific Nigerian cultural framing. It features:
- **Noise Overlays** and **Glowing Orbs** for depth.
- **Typography:** `Syne` (Heads) and `DM Sans` (Body), falling back to `PP Neue Machina`.
- Clean task metric indicators and toggle switches adapted from the provided design spec.

---

## License & Credits

Built by [@thetruesammyjay](https://github.com/thetruesammyjay) for the **DSN x Bluechip Tech Hackathon 3.0**.
