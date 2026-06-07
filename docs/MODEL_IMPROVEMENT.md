# How feedback could improve the app over time (bonus)

A short suggestion on how the stored feedback could improve **the app's
recommendation model** — i.e. how the advisor decides what to show each user
(which coins, which news, what kind of insight, which memes). This is the future
direction, not implemented.

## How feedback is stored

Every thumbs up/down is appended to the `Feedback` table as its own row (an
event log — nothing is overwritten or deleted), capturing:

- **who** voted (`userId`)
- **which section** (`contentType`: news, prices, AI insight, or meme)
- **the specific content the user saw** (`context` JSON) — the actual coins,
  headlines, the insight text, or the meme — plus a `shownAt` timestamp
- **the vote** (up/down) and **when** (`createdAt`)

Combined with `UserPreference` (their coins, investor type, chosen sections),
each vote is a complete labeled example: *this user liked / didn't like this
exact content.*

**Key improvement — save the specific content the user liked.** Storing the
content itself in `context` (not just a short reference id) means the app can
learn from the real items a user upvoted/downvoted — the exact insight text,
headlines, or coins they reacted to — which is far more useful than an id that
may change or disappear over time.

## How the app's recommendation model would improve

The "model" here is the app's personalization logic — what it chooses to show —
which today is driven only by the onboarding preferences. Feedback lets it adapt:

1. **Tune what each user sees (no training).** Use a user's upvotes to bias the
   dashboard toward the content and tone they like, and steer the AI insight
   prompt with examples of insights they upvoted (and away from downvoted ones).
2. **Personalized ranking.** Rank news, coins, and memes by what the user — and
   users with similar preferences — upvoted, instead of newest/random. This
   ordering *is* the core of the advisor's recommendation model.
3. **A preference profile per user/segment.** As votes accumulate, build a profile
   of what each segment likes (topics, coins, insight style) and feed it back into
   the dashboard's selection logic, so recommendations get better the more the
   user interacts.

## The loop

```
collect votes → build a dataset → update the recommendation model
   → test against past votes → try on real users → keep what wins → repeat
```

New users with no votes fall back on their onboarding preferences until enough
feedback builds up.

A couple of cautions: feedback is sparse, so I'd group similar users; and since
it's finance, recommendations shouldn't be pushed toward hype without a safety
check. Privacy-wise, account deletion already cascades to remove a user's
feedback.
