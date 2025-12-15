/*
  Warnings:

  - Added the required column `updateAt` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Bird" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT,
    "imageUrl" TEXT,
    "coraAudioUrl" TEXT,
    "gepogAudioUrl" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "Bird_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "birdId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_birdId_key" ON "Location"("birdId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "Bird"("id") ON DELETE CASCADE ON UPDATE CASCADE;
