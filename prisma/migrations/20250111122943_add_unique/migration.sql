/*
  Warnings:

  - Made the column `id` on table `Emoji` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Emoji" ALTER COLUMN "id" SET NOT NULL;
