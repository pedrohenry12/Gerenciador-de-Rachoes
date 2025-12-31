import { useEffect, useState } from "react";
import type { Racha } from "../../types/Racha";
import type { Jogador } from "../../types/Jogadores";
import { getRachaById } from "../../services/rachaServices";
import { getJogadores } from "../../services/jogadoresServices";
import styles from "./rachas.module.css";

type RachasProps = {
  rachaId: number | null;
  onClose: () => void;
};

export default function Rachas({ rachaId, onClose }: RachasProps) {
  const [racha, setRacha] = useState<Racha | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [presencaAberta, setPresencaAberta] = useState(false);

  const saldoRacha = racha
    ? racha.valorPorJogador * 10 - racha.valorTotal
    : 0;

  // carrega racha
  useEffect(() => {
  if (rachaId === null) return;

  const id = rachaId; // agora é number garantido

  async function carregarRacha() {
    try {
      setLoading(true);
      const dados = await getRachaById(id);
      setRacha(dados);
    } catch {
      setError("Erro ao carregar racha");
    } finally {
      setLoading(false);
    }
  }

  carregarRacha();
}, [rachaId]);


  // carrega jogadores
  useEffect(() => {
    async function carregarJogadores() {
      const dados = await getJogadores();
      setJogadores(dados);
    }
    carregarJogadores();
  }, []);

  function toggleJogador(id: number) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  }

  if (!rachaId) return null;
  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!racha) return null;

  return (
    <>
      {/* MODAL PRINCIPAL DO RACHA */}
      <div className={styles.overlayRacha}>
        <div className={styles.modalRacha}>
          <button className={styles.close} onClick={onClose}>✕</button>

          <h2 className={styles.title}>RACHA DO DIA {racha.data}</h2>

          <ul className={styles.info}>
            <li><strong>LOCAL:</strong> {racha.local}</li>
            <li><strong>PREÇO:</strong> R$ {racha.valorPorJogador}</li>
            <li><strong>ARRECADADO:</strong> R$ {racha.valorTotal}</li>
            <li><strong>SALDO:</strong> R$ {saldoRacha}</li>
          </ul>

          <button
            className={styles.presenca}
            onClick={() => setPresencaAberta(true)}
          >
            Lista de presença
          </button>
        </div>
      </div>

      {/* MODAL DE PRESENÇA */}
      {presencaAberta && (
        <div className={styles.overlayPresenca}>
          <div className={styles.modalPresenca}>
            <header className={styles.header}>
              <h2>JOGADORES</h2>
              <button
                className={styles.closePresenca}
                onClick={() => setPresencaAberta(false)}
              >
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
      )}
    </>
  );
}
