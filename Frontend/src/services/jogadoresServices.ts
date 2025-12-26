import { api } from "./api"
import type { Jogador } from "../types/Jogadores";

//listar
export const getJogadores = async (): Promise<Jogador[]> => {
  const response = await api.get<Jogador[]>("/jogadores");
  return response.data;
}

//criar
export async function createJogador(data: {
  nome: string;
}) {
  return api.post("/jogadores", data);
}

//deletar
export const deleteJogador = async (id: number): Promise<void> => {
  await api.delete(`/jogadores/${id}`);
}

//atualizar
export const updateJogador = async (id: number, jogador: Omit<Jogador, "id">): Promise<Jogador> => {
  const response = await api.put<Jogador>(`/jogadores/${id}`, jogador);
  return response.data;
}