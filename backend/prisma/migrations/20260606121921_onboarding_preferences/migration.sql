/*
  Warnings:

  - You are about to drop the column `experienceLevel` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `investmentGoals` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `investmentHorizon` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `preferredContentTypes` on the `user_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `riskTolerance` on the `user_preferences` table. All the data in the column will be lost.
  - Added the required column `investorType` to the `user_preferences` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvestorType" AS ENUM ('HOLDER', 'DAY_TRADER', 'NFT_COLLECTOR');

-- CreateEnum
CREATE TYPE "ContentPreference" AS ENUM ('MARKET_NEWS', 'CHARTS', 'SOCIAL', 'FUN');

-- AlterTable
ALTER TABLE "user_preferences" DROP COLUMN "experienceLevel",
DROP COLUMN "investmentGoals",
DROP COLUMN "investmentHorizon",
DROP COLUMN "preferredContentTypes",
DROP COLUMN "riskTolerance",
ADD COLUMN     "contentPreferences" "ContentPreference"[],
ADD COLUMN     "investorType" "InvestorType" NOT NULL;

-- DropEnum
DROP TYPE "ExperienceLevel";

-- DropEnum
DROP TYPE "InvestmentGoal";

-- DropEnum
DROP TYPE "InvestmentHorizon";

-- DropEnum
DROP TYPE "RiskTolerance";
