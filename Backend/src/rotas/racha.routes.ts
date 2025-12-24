import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * CREATE - criar racha
 */
router.post("/", async (req, res) => {
  try {
    const {local, data, valorTotal, valorPorJogador } = req.body;

    const racha = await prisma.racha.create({
      data: {
        data: new Date(data),
        local,
        valorTotal,
        valorPorJogador,
      },
    });

    res.status(201).json(racha);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar racha", detalhe: error });
  }
});

/**
 * READ - listar rachas
 */
router.get("/", async (_req, res) => {
  const rachas = await prisma.racha.findMany({
    orderBy: { data: "desc" },
  });

  res.json(rachas);
});

/**
 * READ - buscar racha por data
 */
router.get("/:data", async (req, res) => {
  const dataString = req.params.data;
  const data = new Date(dataString);

  const racha = await prisma.racha.findFirst({
    where: { data }, 
    include: { presencas: true },
  });

  if (!racha) {
    return res.status(404).json({ error: "Racha não encontrado" });
  }

  res.json(racha);
});

/**
 * UPDATE - atualizar racha
 */
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { data, valorTotal, valorPorJogador } = req.body;

  const racha = await prisma.racha.update({
    where: { id },
    data: {
      data: new Date(data),
      valorTotal,
      valorPorJogador,
    },
  });

  res.json(racha);
});

/**
 * DELETE - deletar racha
 */
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.racha.delete({
    where: { id },
  });

  res.status(204).send();
});

export default router;
