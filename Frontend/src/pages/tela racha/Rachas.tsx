import { getRachaById } from "../../services/rachaServices";
import { useEffect, useState } from "react";
import type { Racha } from "../../types/Racha";
import styles from "./rachas.module.css";
import PresencaModal from "../tela inicial/PresencaModal";


type RachasProps = {
    rachaId: number | null;
    onClose: () => void;
};


export default function Rachas({ rachaId, onClose }: RachasProps) {
  const [racha, setRacha] = useState<Racha | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saldoRacha = racha ? racha.valorPorJogador * 10 - racha.valorTotal : 0;
  const [modalOpen, setModalOpen] = useState(false);


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
  // apenas fecha o modal de racha
  // quem controla isso é o componente pai
};


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

      <button className={styles.presenca} onClick={() => setModalOpen(true)}>
        Lista de presença
      </button>
      {modalOpen && (
        <PresencaModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  </div>
);

}
