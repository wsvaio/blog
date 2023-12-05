-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_articleId_fkey";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "articleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
