# How feedback could improve the app over time (bonus)

A short suggestion on how the stored feedback could be used to train/improve the
recommendations later. This is just my thinking, not implemented.

## How feedback is stored

Every thumbs up/down goes into the `Feedback` table, one row per vote:

- **who** voted (`userId`)
- **which section** (`contentType`: news, prices, AI insight, or meme)
- **which exact item** (`contentRef`: a coin id, news id, or the day's insight)
- **the vote** (up/down) and when

A unique constraint on (user, contentType, contentRef) keeps it to one vote per
item (they can flip or remove it). Combined with `UserPreference` (their coins,
investor type, chosen sections), each vote is basically a labeled example:
*this user, in this context, liked / didn't like this content.*

One thing I'd add first: also save **what was shown** (e.g. the insight's prompt
and text), since right now only the insight id is stored, you need the actual
content to learn from a vote. That's just an extra table, no schema change.

## How I'd use it to improve (simple → advanced)

1. **Better prompts (no training).** When generating the AI insight, include a few
   of the user's upvoted insights as examples and avoid downvoted ones.
2. **Personalized ordering.** Use votes to rank news/memes so users see what people
   like them upvoted, instead of newest/random.
3. **Fine-tune later.** Up/down votes are pairs of "good vs bad" answers, the right
   format to fine-tune a small open model to prefer the insights people upvote.
   Only worth doing once there are enough votes.

## The loop

```
collect votes → build a dataset → improve (prompt or trained model)
   → test against past votes → try on real users → keep what wins → repeat
```

New users with no votes fall back on their onboarding preferences until enough
feedback builds up.

A couple of cautions: feedback is sparse, so I'd group similar users; and since
it's finance, votes shouldn't push the AI toward hype without a safety check.
Privacy-wise, account deletion already cascades to remove a user's feedback.
