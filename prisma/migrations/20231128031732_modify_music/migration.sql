/*
  Warnings:

  - You are about to drop the column `cover` on the `music` table. All the data in the column will be lost.
  - You are about to drop the column `lrc` on the `music` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `music` table. All the data in the column will be lost.
  - Added the required column `coverId` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lrcId` to the `music` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "music" DROP COLUMN "cover",
DROP COLUMN "lrc",
DROP COLUMN "url",
ADD COLUMN     "coverId" INTEGER NOT NULL,
ADD COLUMN     "fileId" INTEGER NOT NULL,
ADD COLUMN     "lrcId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "music" ADD CONSTRAINT "music_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music" ADD CONSTRAINT "music_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music" ADD CONSTRAINT "music_lrcId_fkey" FOREIGN KEY ("lrcId") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
