-- Rename enum value HOLDER -> HODLER (data-preserving; keeps existing rows intact)
ALTER TYPE "InvestorType" RENAME VALUE 'HOLDER' TO 'HODLER';
