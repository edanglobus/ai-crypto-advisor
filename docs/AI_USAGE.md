# How I worked with it

Before writing anything, I gave it the ground rules: the stack, a layered backend
(routes → controllers → services → repositories → integrations), how the frontend
should be organized, and a plan broken into stages. Then I made it build **one
stage at a time** instead of dumping the whole app at once - that way I could
actually read each change and catch problems early.

At each step it would lay out the real choices (with trade-offs) and I'd pick the
direction. After each stage I ran a type-check, a build, and tested the API by hand
before moving on.

## My thinking process

How I actually approached the problem, before and during the build:

- **Read the brief, then map it to pieces.** I broke the assignment into a clear
  order - data model, then auth, then onboarding, then the data sources, then the
  dashboard and voting. Each one depends on the one before it, so building in that
  order meant I was never blocked or guessing.
- **Get the foundation right first.** I spent the most care on the database schema,
  because everything else sits on top of it and it's the most painful thing to
  change later. A lot of the app just falls out of a good schema.
- **Make it work, then make it nice.** I got each feature working end to end before
  touching styling. The UI came last and went through a few rounds - I'd run the
  app, see how it felt, and adjust, instead of designing it perfectly up front.
- **Decide on trade-offs, not defaults.** For each choice I asked "what does this
  cost vs. what does it buy?" - proper cookie auth was more work but felt right;
  extra coins and sections felt like clutter, so I cut them.
- **When in doubt, simplify.** A few times it got more complex than it needed to be,
  and my instinct was to remove things (fewer coins, less animation, drop unused
  code) rather than keep piling on.
- **Treat the AI's output as a draft.** I assumed it could be wrong (and it was, a
  couple of times), so I read everything and tested it instead of trusting it.

## How it came together, stage by stage

| Stage | What it covered | Status |
|------|------------------|--------|
| 1 | Database + Prisma schema + local Postgres (Docker) | ✅ |
| 2 | Auth (register/login) + Login/Signup pages | ✅ |
| 3 | Onboarding quiz + saving preferences | ✅ |
| 4 | External APIs (CoinGecko, CryptoPanic, OpenRouter) | ✅ |
| 5 | Dashboard + thumbs up/down voting | ✅ |
| 6 | Write-up on using feedback to improve the model (bonus) | ✅ |
| 7 | Deployment config | ✅ |

**Database first.** I started with the schema because everything depends on it. I
chose UUID ids and a unique vote-per-item rule so voting could be a clean
toggle/flip instead of piling up duplicate rows.

**Auth.** The brief only needed basic auth, but I went with httpOnly cookies plus
access/refresh tokens. It was a bit more work, but it's closer to how I'd really do
it and avoids putting tokens in localStorage. I tested the whole flow by hand —
register, refresh, logout, and confirming a logged-out user gets blocked.

**Onboarding + dashboard.** This is where I changed my mind a few times. The quiz's
content options didn't line up cleanly with the four dashboard sections, so I
simplified it: the quiz now just picks which sections you want, and the dashboard
only shows those. Coin Prices always shows since it follows the coins you picked.

**External data.** Free APIs get rate-limited, so I made sure every section
degrades gracefully - static news if CryptoPanic isn't available, a templated
insight if the AI call fails - and added caching so I'm not hammering them.

**UI.** I iterated on this a lot by just running the app and reacting: first a
plainer dashboard, then more animation and little price charts, then an Apple-style
light theme, and finally an editorial "newsletter" layout, which I liked best. I
also did a cleanup pass to trim things down once it felt too busy.


## What I made sure to own

- The architecture and all the product decisions.
- Reviewing the code and testing each stage (type-checks, builds, and real
  API calls - not just trusting it ran).
- The API keys and environment setup stayed mine, in a gitignored `.env`.

