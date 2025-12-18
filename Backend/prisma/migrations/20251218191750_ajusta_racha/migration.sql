/*
  Warnings:

  - You are about to drop the column `nome` on the `Racha` table. All the data in the column will be lost.
  - Added the required column `valorPorJogador` to the `Racha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Racha" DROP COLUMN "nome",
ADD COLUMN     "valorPorJogador" DOUBLE PRECISION NOT NULL;
