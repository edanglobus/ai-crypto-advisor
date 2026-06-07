# AI Crypto Advisor

APP URL - https://ai-crypto-advisor-ten.vercel.app/
A personalized crypto dashboard: users sign up, take a short onboarding quiz, and
get a daily, tailored dashboard — live coin prices, market news, an AI insight of
the day, and a fun meme — with thumbs up/down feedback on each section.

## Features

- **Auth** — email/name/password sign-up & login with httpOnly cookies (access +
  refresh token rotation, bcrypt-hashed passwords).
- **Onboarding quiz** — pick your coins, investor type (HODLer / Day Trader / NFT
  Collector) and which sections to see; saved as preferences.
- **Personalized dashboard** (editorial "newsletter" layout):
  - **Market Overview** — 24h volume, BTC dominance, Fear & Greed index.
  - **Markets** — live prices + 7-day sparklines for your coins.
  - **Headlines** — crypto news for your coins (CryptoPanic, static fallback).
  - **AI Insight of the Day** — generated via a free LLM (OpenRouter).
  - **Fun Meme** — a random crypto meme.
- **Per-section voting** — 👍/👎 on each section, stored in the DB for future model
  improvements (see [docs/MODEL_IMPROVEMENT.md](docs/MODEL_IMPROVEMENT.md)).
- **Settings** — change your preferences any time; the dashboard updates live.

## Tech stack

- **Frontend:** React + Vite + TypeScript, Tailwind CSS, React Query, Zustand,
  React Router, Framer Motion.
- **Backend:** Node.js + Express + TypeScript, Prisma ORM.
- **Database:** PostgreSQL (Docker for local dev).
- **External APIs (all free):** CoinGecko (prices/global), CryptoPanic (news),
  OpenRouter (AI), alternative.me (Fear & Greed), static JSON memes.

## Architecture

```
backend/src
  routes/         Express route definitions
  controllers/    HTTP request/response handling + validation
  services/       business logic
  repositories/   Prisma queries
  integrations/   external API wrappers (CoinGecko, CryptoPanic, OpenRouter, F&G)
  middlewares/    auth + central error handling
  validators/     Zod schemas
  utils/          jwt, password, cookies, cache, http

frontend/src
  api/            axios client + endpoint wrappers
  hooks/          React Query data hooks
  store/          Zustand auth store
  components/ui/  reusable presentational components
  components/shared/  smart components (guards, dashboard sections, onboarding)
  pages/          thin route components
```

## Getting started

Prerequisites: Node 18+ and Docker.

```bash
# 1. Start PostgreSQL
docker compose up -d

# 2. Backend
cd backend
cp .env.example .env          # then fill in secrets / API keys
npm install
npx prisma migrate dev        # create tables + generate client
npm run dev                   # http://localhost:4000

# 3. Frontend (new terminal)
cd frontend
cp .env.example .env          # VITE_API_URL=http://localhost:4000/api
npm install
npm run dev                   # http://localhost:5173
```

### Environment variables

- **Backend** ([backend/.env.example](backend/.env.example)) — `DATABASE_URL`, JWT
  secrets/TTLs, `FRONTEND_URL`, and optional integration keys (`COINGECKO_API_KEY`,
  `CRYPTOPANIC_API_KEY`, `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`). The app falls
  back gracefully when an integration key is missing.
- **Frontend** ([frontend/.env.example](frontend/.env.example)) — `VITE_API_URL`.


## Deployment

Frontend on **Vercel** (root dir `frontend`, set `VITE_API_URL`); backend +
PostgreSQL on **Render** via the [`render.yaml`](render.yaml) blueprint (set
`FRONTEND_URL` + any API keys). SPA routing handled by
[`frontend/vercel.json`](frontend/vercel.json).

## Database access (read-only)

A **read-only** PostgreSQL user is provided for reviewing the data (`users`,
`user_preferences`, `feedback`, `refresh_tokens`). Connect with any Postgres
client — DBeaver, TablePlus, or `psql`. **SSL is required.**

Connection URL:

```
postgresql://reviewer:ReadOnly_2026!@dpg-d8iihs4m0tmc73blij70-a.oregon-postgres.render.com:5432/crypto_advisor_s980?sslmode=require
```

Or by fields:

| Field | Value |
|---|---|
| Host | `dpg-d8iihs4m0tmc73blij70-a.oregon-postgres.render.com` |
| Port | `5432` |
| Database | `crypto_advisor_s980` |
| Username | `reviewer` |
| Password | `ReadOnly_2026!` |
| SSL mode | `require` |

`psql` example:

```bash
psql "postgresql://reviewer:ReadOnly_2026!@dpg-d8iihs4m0tmc73blij70-a.oregon-postgres.render.com:5432/crypto_advisor_s980?sslmode=require"
```

> The `reviewer` role has `SELECT`-only access. Hosted on Render's free tier, which
> may be removed ~90 days after creation.

## Docs

- [docs/AI_USAGE.md](docs/AI_USAGE.md) — how AI tooling was used to build this.
- [docs/MODEL_IMPROVEMENT.md](docs/MODEL_IMPROVEMENT.md) — how feedback could train
  future improvements (bonus).
