/*
  Warnings:

  - A unique constraint covering the columns `[uri,createdBy]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reaction_uri_createdBy_key" ON "Reaction"("uri", "createdBy");
