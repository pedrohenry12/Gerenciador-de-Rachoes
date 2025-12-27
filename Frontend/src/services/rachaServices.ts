import { api }  from "./api"
import type { Racha } from "../types/Racha";

//listar
export const getRachoes = async (): Promise<Racha[]> => {
  const response = await api.get<Racha[]>("/rachas");
  return response.data;
}

//criar
export async function createRacha(data: {
  data: string;
  local?: string;
  valorTotal: number;
  valorPorJogador: number;
}) {
  return api.post("/rachas", data);
}


//deletar
export const deleteRacha = async (id: number): Promise<void> => {
  await api.delete(`/rachoes/${id}`);
}   

//atualizar
export const updateRacha = async (id: number, racha: Omit<Racha, "id">): Promise<Racha> => {
  const response = await api.put<Racha>(`/rachoes/${id}`, racha);
  return response.data;
}   