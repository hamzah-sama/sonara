-- CreateEnum
CREATE TYPE "VoiceCategory" AS ENUM ('AUDIOBOOK', 'CONVERSATIONAL', 'CUSTOMER_SERVICE', 'GENERAL', 'NARRATIVE', 'CHARACTERS', 'MEDITATION', 'MOTIVATIONAL', 'PODCAST', 'ADVERTISING', 'VOICEOVER', 'CORPORATE');

-- AlterTable
ALTER TABLE "Voice" ADD COLUMN     "category" "VoiceCategory" NOT NULL DEFAULT 'GENERAL',
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en-US',
ADD COLUMN     "orgId" TEXT,
ADD COLUMN     "r2ObjectKey" TEXT;

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "voiceId" TEXT,
    "voiceName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "topP" DOUBLE PRECISION NOT NULL,
    "topK" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "repetitionPenalty" DOUBLE PRECISION NOT NULL,
    "r2ObjectKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Generation_voiceId_idx" ON "Generation"("voiceId");

-- CreateIndex
CREATE INDEX "Generation_orgId_idx" ON "Generation"("orgId");

-- CreateIndex
CREATE INDEX "Voice_variant_idx" ON "Voice"("variant");

-- CreateIndex
CREATE INDEX "Voice_orgId_idx" ON "Voice"("orgId");

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_voiceId_fkey" FOREIGN KEY ("voiceId") REFERENCES "Voice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
