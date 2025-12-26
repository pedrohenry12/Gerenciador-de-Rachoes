import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// create jogador
router.post('/', async (req, res) => {
    try {
        const { nome} = req.body;
        const jogador = await prisma.jogador.create({
            data: {
                nome,
            }
        });
        res.json(jogador);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar jogador' });
    }
})

// listagem de jogadores
router.get('/', async (_req, res) => {
  try {
    const jogadores = await prisma.jogador.findMany();
    res.json(jogadores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar jogadores" });
  }
});

//buscar jogador por nome
router.get('/:nome', async (req, res) => {
  try {
    const nome = req.params.nome;   
    const jogador = await prisma.jogador.findFirst({
      where: { nome },
    }); 

    if (jogador) {
      res.json(jogador);
    } else {
      res.status(404).json({ error: "Jogador não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar jogador" });
  }
});

// editar jogador
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome } = req.body;
        const jogador = await prisma.jogador.update({
            where: { id },
            data: {
                nome,
            }
        });
        res.json(jogador);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar jogador" });
    }
});

// excluir jogador
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        
        await prisma.presenca.deleteMany({
            where: { jogadorId: id },
        });
        await prisma.jogador.delete({
            where: { id },
        });
        res.json({ message: "Jogador excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir jogador" });
    }   
});

export default router;