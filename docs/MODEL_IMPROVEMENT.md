# Using feedback to improve the app (bonus)

This is my idea for how the like and dislike buttons could help the app give
better suggestions over time. I haven't built it yet, this is just the plan.

When I say "the app's model" I mean how the app chooses what to show each user:
which coins, which news, what kind of insight, and which meme. Right now it only
uses the answers from the onboarding quiz. Feedback would let it learn what people
actually like.

## What I save for each vote

Every like or dislike is saved as its own row in the Feedback table, and I never
change or remove them. For each vote I keep:

who voted, which section it was (prices, news, AI insight, or meme), what they
actually saw (I save the real content in a context field, so the coins, the
headlines, the insight text, or the meme, plus the time), and the vote itself.

So every vote becomes a clear example: this user liked or didn't like this exact
content.

Saving the real content is the important part. Because I keep what was really
shown and not just an id, the app can later learn from the actual things people
liked, like the exact insight or headline, instead of an id that might change or
go away.

## How I would use it

1. Show more of what they like. I can use a person's likes to push the dashboard
   and the AI insight toward the things they enjoyed, and away from what they
   disliked. This needs no training at all.
2. Order things by what people like. I can sort the news, coins, and memes by what
   the user and people with similar taste liked, instead of just newest or random.
   This ordering is really the heart of the suggestions.
3. Learn their taste over time. As votes add up, I can keep a simple profile of
   what each kind of user likes and use it to choose what to show, so it keeps
   getting better the more they use the app.

## The cycle

It works as a cycle: collect votes, look at what people liked, change what the app
shows, check it against past votes, try it on real users, keep what works, and
repeat. New users start from their quiz answers until there are enough votes.

A few things to keep in mind. There usually aren't many votes, so I would group
similar users together. It's about money, so feedback shouldn't push the app
toward hype without a sanity check. And if someone deletes their account, their
feedback is removed too.
