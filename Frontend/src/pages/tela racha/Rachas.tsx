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


  return (
    <div className={styles.card}>
      <h2>Racha - {racha.data}</h2>

      <ul>
        <li>Local: {racha.local}</li>
        <li>Preço: R$ {racha.precoTotal}</li>
        <li>Valor por jogador: R$ {racha.valorPorJogador}</li>
      </ul>

      <button>Lista de presença</button>
    </div>
  );
}
