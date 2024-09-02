/*
  Warnings:

  - A unique constraint covering the columns `[userId,eventId]` on the table `Registered` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Registered_userId_eventId_key" ON "Registered"("userId", "eventId");
