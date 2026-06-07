-- Replace the short contentRef id with a richer JSON snapshot of what was shown.
DROP INDEX "feedbacks_userId_contentType_contentRef_idx";

ALTER TABLE "feedbacks" DROP COLUMN "contentRef";
ALTER TABLE "feedbacks" ADD COLUMN "context" JSONB;

CREATE INDEX "feedbacks_userId_contentType_idx" ON "feedbacks"("userId", "contentType");
