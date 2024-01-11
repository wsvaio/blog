/*
  Warnings:

  - Added the required column `name` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "name" TEXT NOT NULL;
