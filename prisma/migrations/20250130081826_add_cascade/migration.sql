-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_emoji_rkey_emoji_repo_fkey";

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_emoji_rkey_emoji_repo_fkey" FOREIGN KEY ("emoji_rkey", "emoji_repo") REFERENCES "Emoji"("rkey", "repo") ON DELETE CASCADE ON UPDATE CASCADE;
