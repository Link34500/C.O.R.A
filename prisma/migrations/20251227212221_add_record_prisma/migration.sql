/*
  Warnings:

  - You are about to drop the column `coraAudioUrl` on the `Bird` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bird" DROP COLUMN "coraAudioUrl";

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "birdId" INTEGER NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "Bird"("id") ON DELETE SET NULL ON UPDATE CASCADE;
