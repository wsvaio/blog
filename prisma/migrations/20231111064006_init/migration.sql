/*
  Warnings:

  - You are about to drop the column `articleId` on the `tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_articleId_fkey";

-- AlterTable
ALTER TABLE "tag" DROP COLUMN "articleId";

-- CreateTable
CREATE TABLE "_articleTotag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_articleTotag_AB_unique" ON "_articleTotag"("A", "B");

-- CreateIndex
CREATE INDEX "_articleTotag_B_index" ON "_articleTotag"("B");

-- AddForeignKey
ALTER TABLE "_articleTotag" ADD CONSTRAINT "_articleTotag_A_fkey" FOREIGN KEY ("A") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_articleTotag" ADD CONSTRAINT "_articleTotag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
