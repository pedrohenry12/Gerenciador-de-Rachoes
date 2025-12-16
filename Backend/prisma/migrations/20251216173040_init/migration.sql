-- CreateTable
CREATE TABLE "Racha" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Racha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presenca" (
    "id" SERIAL NOT NULL,
    "rachaId" INTEGER NOT NULL,
    "jogadorId" INTEGER NOT NULL,
    "pagou" BOOLEAN NOT NULL,
    "tipoPagamento" TEXT NOT NULL,
    "valorPago" DOUBLE PRECISION NOT NULL,
    "isGoleiro" BOOLEAN NOT NULL,

    CONSTRAINT "Presenca_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_rachaId_fkey" FOREIGN KEY ("rachaId") REFERENCES "Racha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
