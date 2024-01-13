-- CreateTable
CREATE TABLE "friend" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "screenshot" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friend_pkey" PRIMARY KEY ("id")
);
