-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "from" JSONB NOT NULL DEFAULT '{}';
