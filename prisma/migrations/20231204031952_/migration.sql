/*
  Warnings:

  - Added the required column `commentId` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "commentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
