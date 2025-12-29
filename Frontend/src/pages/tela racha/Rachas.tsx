import { getRachaById } from "../../services/rachaServices";
import { useEffect, useState } from "react";
import type { Racha } from "../../types/Racha";
import styles from "./rachas.module.css";

type RachasProps = {
    rachaId: number | null;
};

export default function Rachas({ rachaId }: RachasProps) {
  const [racha, setRacha] = useState<Racha | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saldoRacha = racha ? racha.valorPorJogador * 10 - racha.valorTotal : 0;


  useEffect(() => {
    if (!rachaId) {
      setRacha(null);
      return;
    }

    async function carregarRacha(id: number) {
      try {
        setLoading(true);
        setError(null);

        const dados = await getRachaById(id);
        setRacha(dados);
      } catch {
        setError("Erro ao carregar racha");
      } finally {
        setLoading(false);
      }
    }

    carregarRacha(rachaId);
    
  }, [rachaId]);
  if (!rachaId) return null;
  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!racha) return null;

  const closeModal = () => {
    setRacha(null);
  }


 return (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <button className={styles.close} onClick={closeModal}>✕</button>

      <h2 className={styles.title}>
        RACHA DO DIA {racha.data}
      </h2>

      <ul className={styles.info}>
        <li><strong>LOCAL:</strong> {racha.local}</li>
        <li><strong>PREÇO:</strong> R$ {racha.valorPorJogador}</li>
        <li><strong>VALOR ARRECADADO:</strong> R$ {racha.valorTotal}</li>
        <li><strong>SALDO:</strong> R$ {saldoRacha}</li>
      </ul>

      <h3 className={styles.subtitle}>JOGADORES PRESENTES</h3>

      <button className={styles.presenca}>
        Lista de presença
      </button>
    </div>
  </div>
);

}
