import { getRachoes } from "../../services/rachaServices";
import { useEffect, useState } from "react";
import type { Racha } from "../../types/Racha"; //sempre que for importar tipos, tem que usar o "type"
import styles from "./inicio.module.css";
import Rachas from "../tela racha/Rachas";

export default function Inicio() {
    const [rachas, setRachas] = useState<Racha[]>([]);
    const [loading, setLoading] = useState(true);
    const [rachaSelecionadoId, setRachaSelecionadoId] = useState<number | null>(null);
    const saldototal = rachas.reduce((total, racha) => total + (racha.valorPorJogador * 10 - racha.valorTotal), 0);

    useEffect(() => {
        async function carregarRachoes() {
            try {
                const dados = await getRachoes();
                setRachas(dados);
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
      <Rachas rachaId={rachaSelecionadoId} />
    </div>
   <div className={styles.saldoWrapper}>
  <span className={styles.saldoTotal}>
    Saldo Total: R$ {saldototal}
  </span>
</div>

  </div>
</div>
    );
}