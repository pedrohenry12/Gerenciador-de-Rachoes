/*
  Warnings:

  - Added the required column `nome` to the `Presenca` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Presenca" ADD COLUMN     "nome" TEXT NOT NULL;
