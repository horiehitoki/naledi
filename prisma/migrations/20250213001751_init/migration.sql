-- CreateTable
CREATE TABLE "AuthSession" (
    "key" TEXT NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "AuthState" (
    "key" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "AuthState_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Emoji" (
    "id" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "rkey" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "rkey" TEXT NOT NULL,
    "post_uri" TEXT NOT NULL,
    "post_cid" TEXT NOT NULL,
    "authorDid" TEXT NOT NULL,
    "emoji_rkey" TEXT NOT NULL,
    "emoji_repo" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("rkey")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_rkey_repo_key" ON "Emoji"("rkey", "repo");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_emoji_rkey_emoji_repo_fkey" FOREIGN KEY ("emoji_rkey", "emoji_repo") REFERENCES "Emoji"("rkey", "repo") ON DELETE CASCADE ON UPDATE CASCADE;
