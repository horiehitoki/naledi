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
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "authorDid" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);
