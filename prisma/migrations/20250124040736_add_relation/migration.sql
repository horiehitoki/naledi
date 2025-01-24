/*
  Warnings:

  - You are about to drop the column `emoji` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `emoji_repo` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoji_rkey` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emoji" ADD CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "emoji",
ADD COLUMN     "emoji_repo" TEXT NOT NULL,
ADD COLUMN     "emoji_rkey" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_emoji_rkey_emoji_repo_fkey" FOREIGN KEY ("emoji_rkey", "emoji_repo") REFERENCES "Emoji"("rkey", "repo") ON DELETE RESTRICT ON UPDATE CASCADE;
