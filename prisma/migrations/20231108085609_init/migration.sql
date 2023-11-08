/*
  Warnings:

  - Changed the type of `lastModified` on the `file` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "lastModified",
ADD COLUMN     "lastModified" INTEGER NOT NULL;
