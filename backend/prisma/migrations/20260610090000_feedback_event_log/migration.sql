-- Feedback becomes an append-only event log: drop the per-item uniqueness so
-- every vote is stored as its own row, and keep a plain index for lookups.
DROP INDEX "feedbacks_userId_contentType_contentRef_key";

CREATE INDEX "feedbacks_userId_contentType_contentRef_idx"
  ON "feedbacks"("userId", "contentType", "contentRef");
