/*
  Warnings:

  - You are about to drop the column `record` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `emoji` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "record",
ADD COLUMN     "emoji" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Emoji" (
    "id" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);
