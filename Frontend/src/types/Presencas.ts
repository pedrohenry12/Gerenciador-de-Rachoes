export type Presencas = {
  id?: number;
  jogadorId: number;
  rachaId?: number;
  pagou: boolean;
  presenca: boolean;
  tipoPagamento: "PIX" | "DINHEIRO" | "NAOPAGOU" | null;
  valorPago: number;
  isGoleiro: boolean;
};



