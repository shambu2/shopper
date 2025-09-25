/*
  Warnings:

  - Changed the type of `gender` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "sizes" SET NOT NULL,
ALTER COLUMN "sizes" SET DATA TYPE TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "public"."Gender";
