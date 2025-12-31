export type Presencas = {
  jogadorId: number;
  pagou: boolean;
  presenca: boolean;
  tipoPagamento: "PIX" | "DINHEIRO" | null;
  valorPago: number;
  isGoleiro: boolean;
};



