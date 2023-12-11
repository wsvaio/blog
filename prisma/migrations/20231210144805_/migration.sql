/*
  Warnings:

  - Added the required column `acceptEmails` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "acceptEmails" BOOLEAN NOT NULL;
