/*
  Warnings:

  - You are about to drop the `common` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "common" DROP CONSTRAINT "common_articleId_fkey";

-- DropForeignKey
ALTER TABLE "common" DROP CONSTRAINT "common_userId_fkey";

-- DropTable
DROP TABLE "common";

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "articleId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
