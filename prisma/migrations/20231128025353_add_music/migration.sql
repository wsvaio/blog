-- CreateTable
CREATE TABLE "music" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "lrc" TEXT NOT NULL,

    CONSTRAINT "music_pkey" PRIMARY KEY ("id")
);
