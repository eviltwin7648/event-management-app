/*
  Warnings:

  - A unique constraint covering the columns `[evnetTitle]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_evnetTitle_key" ON "Event"("evnetTitle");
