import { useEffect, useState } from "react";
import type { Racha } from "../../types/Racha";
import type { Jogador } from "../../types/Jogadores";
import { getRachaById } from "../../services/rachaServices";
import { getJogadores } from "../../services/jogadoresServices";
import styles from "./rachas.module.css";
import type { Presencas } from "../../types/Presencas";

type RachasProps = {
  rachaId: number | null;
  onClose: () => void;
};

type TipoPagamento = "PIX" | "DINHEIRO" | null;

export default function Rachas({ rachaId, onClose }: RachasProps) {
  const [racha, setRacha] = useState<Racha | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [presencaAberta, setPresencaAberta] = useState(false);
  const [jogadoresPresentes, setJogadoresPresentes] = useState(false);
  const [presencas, setPresencas] = useState<Presencas[]>([]);
  const [pagamentos, setPagamentos] = useState<Record<number, TipoPagamento>>({});
  const [goleiros, setGoleiros] = useState<Record<number, boolean>>({});

  const totalPago = presencas.reduce((acc, p) => {
    if (p.pagou || p.isGoleiro) return acc + p.valorPago;
    return acc;
  }, 0);

  const saldoRacha = racha ? totalPago - racha.valorTotal : 0;

  // Carrega racha
  useEffect(() => {
    if (rachaId === null) return;

    async function carregarRacha() {
      try {
        setLoading(true);
        const dados = await getRachaById(rachaId!); // garante que não é null
        setRacha(dados);
      } catch {
        setError("Erro ao carregar racha");
      } finally {
        setLoading(false);
      }
    }

    carregarRacha();
  }, [rachaId]);

  // Carrega jogadores
  useEffect(() => {
    async function carregarJogadores() {
      const dados = await getJogadores();
      setJogadores(dados);
    }
    carregarJogadores();
  }, []);

  // Cria ou atualiza presença
  function atualizarPresenca(jogadorId: number, campo: Partial<Presencas>) {
  setPresencas(prev => {
    const existe = prev.find(p => p.jogadorId === jogadorId);
    if (existe) {
      // garante que presenca nunca seja undefined
      return prev.map(p => ({
        ...p,
        ...(p.jogadorId === jogadorId ? { ...campo, presenca: campo.presenca ?? p.presenca } : {})
      }));
    } else {
      return [
        ...prev,
        {
          jogadorId,
          pagou: false,
          presenca: campo.presenca ?? true, // sempre boolean
          tipoPagamento: null,
          valorPago: 0,
          isGoleiro: false,
          ...campo
        }
      ];
    }
  });
}


  function toggleJogador(id: number) {
    const isSelecionado = selecionados.includes(id);
    setSelecionados(prev =>
      isSelecionado ? prev.filter(j => j !== id) : [...prev, id]
    );
    atualizarPresenca(id, { presenca: !isSelecionado });
  }

  function selecionarPagamento(jogadorId: number, tipo: TipoPagamento) {
  setPagamentos(prev => ({ ...prev, [jogadorId]: tipo }));

  // Atualiza a presença e valorPago
  const valor = tipo && racha ? racha.valorPorJogador : 0;
  atualizarPresenca(jogadorId, { tipoPagamento: tipo, pagou: !!tipo, valorPago: valor });
}


  function toggleGoleiro(jogadorId: number) {
    setGoleiros(prev => {
      const novoValor = !prev[jogadorId];
      if (novoValor) setPagamentos(p => ({ ...p, [jogadorId]: null }));
      atualizarPresenca(jogadorId, { isGoleiro: novoValor, pagou: novoValor ? true : presencas.find(p => p.jogadorId === jogadorId)?.pagou ?? false });
      return { ...prev, [jogadorId]: novoValor };
    });
  }

  async function salvarPresencas() {
    if (!racha) return;

    try {
      await Promise.all(
        presencas.map(p =>
          fetch("http://localhost:3000/presencas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              rachaId: racha.id,
              jogadorId: p.jogadorId,
              pagou: p.pagou || p.isGoleiro,
              tipoPagamento: p.isGoleiro ? "GOLEIRO" : p.tipoPagamento,
              valorPago: p.isGoleiro ? 0 : p.valorPago,
              isGoleiro: p.isGoleiro
            })
          })
        )
      );
      alert("Presenças salvas com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar presenças.");
    }
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
            <li><strong>PREÇO:</strong> R$ {racha.valorTotal}</li>
            <li><strong>ARRECADADO:</strong> R$ {totalPago}</li>
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
              <button className={styles.closePresenca} onClick={() => setPresencaAberta(false)}>✕</button>
            </header>

            <div className={styles.lista}>
              {jogadores.map(jogador => (
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
              <button className={styles.salvar} onClick={() => setJogadoresPresentes(true)}>SALVAR</button>
            </div>

            {jogadoresPresentes && (
              <div className={styles.jogadoresPresentes}>
                <div>
                  <button className={styles.closePresenca} onClick={() => setJogadoresPresentes(false)}>✕</button>
                  <h2 style={{ textAlign: "center", marginBottom: 16 }}>Jogadores Presentes / Pagamentos</h2>

                  {selecionados.map(id => {
                    const jogador = jogadores.find(j => j.id === id);
                    return (
                      <div key={id} className={styles.linhaJogador}>
                        <span className={styles.nomeJogador}>{jogador ? jogador.nome : "Jogador não encontrado"}</span>

                        <label className={styles.opcao}>
                          <input
                            type="checkbox"
                            checked={!!goleiros[id]}
                            onChange={() => toggleGoleiro(id)}
                          />
                          Goleiro
                        </label>

                        <label className={styles.opcao}>
                          <input
                            type="checkbox"
                            checked={pagamentos[id] === "PIX"}
                            onChange={() => selecionarPagamento(id, "PIX")}
                            disabled={goleiros[id]}
                          />
                          PIX
                        </label>

                        <label className={styles.opcao}>
                          <input
                            type="checkbox"
                            checked={pagamentos[id] === "DINHEIRO"}
                            onChange={() => selecionarPagamento(id, "DINHEIRO")}
                            disabled={goleiros[id]}
                          />
                          DINHEIRO
                        </label>
                      </div>
                    );
                  })}

                  <button className={styles.salvar} onClick={salvarPresencas}>SALVAR</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
