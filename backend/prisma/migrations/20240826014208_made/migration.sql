/*
  Warnings:

  - You are about to drop the column `evnetTitle` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventTitle]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventTitle` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Event_evnetTitle_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "evnetTitle",
ADD COLUMN     "eventTitle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventTitle_key" ON "Event"("eventTitle");
