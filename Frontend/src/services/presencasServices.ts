// src/services/presencasServices.ts
import type { Presencas } from "../types/Presencas";

export async function getPresencasByRacha(rachaId: number): Promise<Presencas[]> {
  const res = await fetch(
    `https://gerenciador-de-rachoes.onrender.com/presencas/racha/${rachaId}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar presenças");
  }

  return res.json();
}
