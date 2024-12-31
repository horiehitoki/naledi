-- CreateTable
CREATE TABLE "Reaction" (
    "rkey" TEXT NOT NULL,
    "post_uri" TEXT NOT NULL,
    "post_cid" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "authorDid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("rkey")
);
