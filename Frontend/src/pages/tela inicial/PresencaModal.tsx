import { getJogadores } from "../../services/jogadoresServices";
import { useEffect, useState } from "react";
import type { Jogador } from "../../types/Jogadores";
import styles from "./PresencaModal.module.css";

type Props = {
  onClose: () => void;
};

export default function PresencaModal({ onClose }: Props) {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);

  useEffect(() => {
    async function carregarJogadores() {
      const data = await getJogadores();
      setJogadores(data);
    }
    carregarJogadores();
  }, []);

  function toggleJogador(id: number) {
    setSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((j) => j !== id)
        : [...prev, id]
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>JOGADORES</h2>

          {/* AQUI fecha */}
          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </header>

        <div className={styles.lista}>
          {jogadores.map((jogador) => (
            <label key={jogador.id} className={styles.item}>
              <span>{jogador.nome}</span>

              <input
                type="checkbox"
                checked={selecionados.includes(jogador.id)}
                onChange={() => toggleJogador(jogador.id)}
              />

              <span className={styles.checkboxCustom} />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

