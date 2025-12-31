/*
  Warnings:

  - A unique constraint covering the columns `[rachaId,jogadorId]` on the table `Presenca` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Presenca_rachaId_jogadorId_key" ON "Presenca"("rachaId", "jogadorId");
