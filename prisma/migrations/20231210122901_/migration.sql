/*
  Warnings:

  - Made the column `articleId` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_articleId_fkey";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "articleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
