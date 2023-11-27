/*
  Warnings:

  - You are about to drop the column `views` on the `article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "article" DROP COLUMN "views",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reads" INTEGER NOT NULL DEFAULT 0;
