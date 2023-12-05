/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "site" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
