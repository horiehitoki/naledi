-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);
