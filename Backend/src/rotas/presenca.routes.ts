import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

/* =========================
   CREATE presença
========================= */
router.post('/', async (req, res) => {
  try { 
    const { jogadorId, rachaId, pagou, tipoPagamento, valorPago, isGoleiro } = req.body;

    //regra de negocio: goleiro nao paga
    const valorFinal = isGoleiro ? 0 : valorPago;
    const pagouFinal = isGoleiro ? true : pagou;

    //regra de negocio: um jogador so pode ter uma presenca por racha
    const presencaExistente = await prisma.presenca.findFirst({
      where: {
        jogadorId,
        rachaId
      }
    });

    if (presencaExistente) {
      return res.status(400).json({ error: 'Jogador já possui presença registrada para este racha' });
    }

    const presenca = await prisma.presenca.create({
      data: {
        jogadorId,
        rachaId,
        pagou : pagouFinal,
        tipoPagamento,
        valorPago: valorFinal,
        isGoleiro
      },
      include: {
        jogador: true,
        racha: true
      }
    });

    res.status(201).json(presenca);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar presença' });
  }                   
});

/* =========================
   GET presenças por racha
========================= */
router.get('/racha/:rachaId', async (req, res) => {
  try {
    const rachaId = Number(req.params.rachaId);

    const presencas = await prisma.presenca.findMany({
      where: { rachaId },
      include: {
        jogador: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });

    res.json(presencas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar presenças' });
  }
});

/* =========================
   UPDATE presença
========================= */
router.put('/:id', async (req, res) => {
  try {   
    const id = Number(req.params.id);
    const { pagou, tipoPagamento, valorPago, isGoleiro } = req.body;

    const presenca = await prisma.presenca.update({
      where: { id },
      data: {
        pagou,
        tipoPagamento,
        valorPago,
        isGoleiro
      },
      include: {
        jogador: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });

    res.json(presenca);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar presença' });
  }
});

/* =========================
   DELETE presença
========================= */
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.presenca.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar presença' });
  }
});

export default router;
