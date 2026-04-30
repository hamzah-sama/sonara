/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VoiceVariant" AS ENUM ('SYSTEM', 'CUSTOM');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Voice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "variant" "VoiceVariant" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);
