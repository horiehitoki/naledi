/*
  Warnings:

  - The primary key for the `Emoji` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Emoji` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rkey,repo]` on the table `Emoji` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rkey` to the `Emoji` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emoji" DROP CONSTRAINT "Emoji_pkey",
DROP COLUMN "id",
ADD COLUMN     "rkey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_rkey_repo_key" ON "Emoji"("rkey", "repo");
