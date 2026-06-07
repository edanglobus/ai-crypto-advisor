-- Onboarding content preferences now select dashboard sections directly,
-- reusing the ContentType enum. Drop the old ContentPreference enum + column.
-- Existing rows default to all four sections.
ALTER TABLE "user_preferences" DROP COLUMN "contentPreferences";

ALTER TABLE "user_preferences"
  ADD COLUMN "contentPreferences" "ContentType"[] NOT NULL
  DEFAULT ARRAY['PRICES', 'NEWS', 'AI_INSIGHT', 'MEME']::"ContentType"[];

ALTER TABLE "user_preferences" ALTER COLUMN "contentPreferences" DROP DEFAULT;

DROP TYPE "ContentPreference";
