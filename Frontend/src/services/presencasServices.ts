// src/services/presencasServices.ts
import type { Presencas } from "../types/Presencas";

export async function getPresencasByRacha(rachaId: number): Promise<Presencas[]> {
  const res = await fetch(
    `http://localhost:3000/presencas/racha/${rachaId}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar presenças");
  }

  return res.json();
}
