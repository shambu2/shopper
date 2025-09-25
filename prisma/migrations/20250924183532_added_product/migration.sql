-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Men', 'women', 'Kids');

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "review" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "intro" TEXT NOT NULL,
    "sizes" TEXT[],
    "description" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
