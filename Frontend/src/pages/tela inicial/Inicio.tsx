import { getRachoes } from "../../services/rachaServices";
import { getPresencasByRacha } from "../../services/presencasServices";
import { useEffect, useState } from "react";
import type { Racha } from "../../types/Racha";
import type { Presencas } from "../../types/Presencas";
import styles from "./inicio.module.css";
import Rachas from "../tela racha/Rachas";

export default function Inicio() {
  const [rachas, setRachas] = useState<Racha[]>([]);
  const [loading, setLoading] = useState(true);
  const [rachaSelecionadoId, setRachaSelecionadoId] = useState<number | null>(null);
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    async function carregarRachoes() {
      try {
        const dados = await getRachoes();
        setRachas(dados);

        // ✅ Calcula o saldo total somando os saldos de cada racha
        let totalGeral = 0;

        for (const racha of dados) {
          const presencas: Presencas[] = await getPresencasByRacha(racha.id);

          // Calcula quanto foi arrecadado neste racha
          const arrecadado = presencas.reduce((acc, p) => {
            if (p.tipoPagamento === "PIX" || p.tipoPagamento === "DINHEIRO") {
              return acc + p.valorPago;
            }
            return acc;
          }, 0);

          // Soma o saldo deste racha ao total
          totalGeral += (arrecadado - racha.valorTotal);
        }

        setSaldoTotal(totalGeral);

      } catch (error) {
        console.error("Erro ao carregar rachões:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarRachoes();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Rachas</h2>

        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            {rachas.map((racha) => (
              <li key={racha.id} className={styles.card} onClick={() => setRachaSelecionadoId(racha.id)}>
                <span className={styles.cardText}>
                  RACHA {racha.data}
                </span>
              </li>
            ))}
          </ul>
          <Rachas
            rachaId={rachaSelecionadoId}
            onClose={() => setRachaSelecionadoId(null)}
          />
        </div>

        <div className={styles.saldoWrapper}>
          <span className={styles.saldoTotal}>
            Saldo Total: R$ {saldoTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}