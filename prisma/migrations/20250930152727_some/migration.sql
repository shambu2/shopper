/*
  Warnings:

  - The `sizes` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'other',
ALTER COLUMN "review" DROP NOT NULL,
DROP COLUMN "sizes",
ADD COLUMN     "sizes" TEXT[];
