import { useEffect, useState } from "react";
import type { Racha } from "../../types/Racha";
import type { Jogador } from "../../types/Jogadores";
import type { Presencas } from "../../types/Presencas";
import { getRachaById } from "../../services/rachaServices";
import { getJogadores } from "../../services/jogadoresServices";
import { getPresencasByRacha } from "../../services/presencasServices";
import { api } from "../../services/api";
import styles from "./rachas.module.css";

type RachasProps = {
  rachaId: number | null;
  onClose: () => void;
};

type TipoPagamento = "PIX" | "DINHEIRO" | null;

export default function Rachas({ rachaId, onClose }: RachasProps) {
  const [racha, setRacha] = useState<Racha | null>(null);
  const [loading, setLoading] = useState(false);

  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [presencas, setPresencas] = useState<Presencas[]>([]);
  const [pagamentos, setPagamentos] = useState<Record<number, TipoPagamento>>({});
  const [goleiros, setGoleiros] = useState<Record<number, boolean>>({});

  // 🔥 modais SEPARADOS
  const [modalPresencaAberto, setModalPresencaAberto] = useState(false);
  const [modalPagamentosAberto, setModalPagamentosAberto] = useState(false);

  /* ======================
     RESETAR ESTADOS QUANDO TROCAR DE RACHA
  ====================== */
  useEffect(() => {
    // Limpar todos os estados quando trocar de racha
    setSelecionados([]);
    setPresencas([]);
    setPagamentos({});
    setGoleiros({});
    setModalPresencaAberto(false);
    setModalPagamentosAberto(false);
  }, [rachaId]);

  /* ======================
     CÁLCULOS
  ====================== */
  const totalPago = presencas.reduce((acc, p) => {
    if (p.pagou || p.isGoleiro) return acc + p.valorPago;
    return acc;
  }, 0);

  const saldoRacha = racha ? totalPago - racha.valorTotal : 0;

  /* ======================
     CARREGAR RACHA
  ====================== */
  useEffect(() => {
    if (!rachaId) return;

    async function carregarRacha() {
      try {
        setLoading(true);
        const dados = await getRachaById(rachaId as number);
        setRacha(dados);
      } catch {
        alert("Erro ao carregar racha");
      } finally {
        setLoading(false);
      }
    }

    carregarRacha();
  }, [rachaId]);

  /* ======================
     CARREGAR JOGADORES
  ====================== */
  useEffect(() => {
    async function carregarJogadores() {
      const dados = await getJogadores();
      setJogadores(dados);
    }
    carregarJogadores();
  }, []);

  /* ======================
     CARREGAR PRESENÇAS
  ====================== */
  useEffect(() => {
    if (!rachaId) return;

    async function carregarPresencas() {
      try {
        const dados = await getPresencasByRacha(rachaId as number);
        
        console.log(`📊 Presenças do racha ${rachaId}:`, dados);

        // Normalizar os dados - se existe presença no banco, presenca = true
        const presencasNormalizadas = dados.map(p => ({
          ...p,
          presenca: p.presenca ?? true // Se não tiver o campo, assume true
        }));

        setPresencas(presencasNormalizadas);
        
        if (dados.length > 0) {
          // Todos os jogadores que têm registro são considerados presentes
          const jogadoresPresentes = dados.map(p => p.jogadorId);
          setSelecionados(jogadoresPresentes);

          const mapaPagamentos: Record<number, TipoPagamento> = {};
          const mapaGoleiros: Record<number, boolean> = {};

          dados.forEach(p => {
            mapaPagamentos[p.jogadorId] = p.tipoPagamento as TipoPagamento;
            mapaGoleiros[p.jogadorId] = p.isGoleiro;
          });

          setPagamentos(mapaPagamentos);
          setGoleiros(mapaGoleiros);
          
          console.log(`✅ Presenças carregadas para racha ${rachaId}:`, {
            total: dados.length,
            jogadores: jogadoresPresentes
          });
        }
      } catch (error) {
        console.error('Erro ao carregar presenças:', error);
      }
    }

    carregarPresencas();
  }, [rachaId]);

  /* ======================
     FUNÇÕES
  ====================== */
  function atualizarPresenca(jogadorId: number, campo: Partial<Presencas>) {
    setPresencas(prev => {
      const existe = prev.find(p => p.jogadorId === jogadorId);

      if (existe) {
        return prev.map(p =>
          p.jogadorId === jogadorId
            ? { ...p, ...campo, presenca: campo.presenca ?? p.presenca }
            : p
        );
      }

      return [
        ...prev,
        {
          jogadorId,
          presenca: campo.presenca ?? true,
          pagou: false,
          tipoPagamento: null,
          valorPago: 0,
          isGoleiro: false,
          ...campo
        }
      ];
    });
  }

  function toggleJogador(id: number) {
    const ativo = selecionados.includes(id);

    setSelecionados(prev =>
      ativo ? prev.filter(j => j !== id) : [...prev, id]
    );

    atualizarPresenca(id, { presenca: !ativo });
  }

  function selecionarPagamento(jogadorId: number, tipo: TipoPagamento) {
    setPagamentos(prev => ({ ...prev, [jogadorId]: tipo }));
    const valor = tipo && racha ? racha.valorPorJogador : 0;

    atualizarPresenca(jogadorId, {
      tipoPagamento: tipo,
      pagou: !!tipo,
      valorPago: valor
    });
  }

  function toggleGoleiro(jogadorId: number) {
    setGoleiros(prev => {
      const novo = !prev[jogadorId];

      if (novo) {
        setPagamentos(p => ({ ...p, [jogadorId]: null }));
      }

      atualizarPresenca(jogadorId, {
        isGoleiro: novo,
        pagou: novo,
        valorPago: 0
      });

      return { ...prev, [jogadorId]: novo };
    });
  }

  async function salvarPresencas() {
    if (!racha) return;

    await Promise.all(
      presencas.map(p =>
        api.post("/presencas", {
          rachaId: racha.id,
          jogadorId: p.jogadorId,
          presenca: p.presenca,
          pagou: p.pagou || p.isGoleiro,
          tipoPagamento: p.isGoleiro ? "GOLEIRO" : p.tipoPagamento,
          valorPago: p.isGoleiro ? 0 : p.valorPago,
          isGoleiro: p.isGoleiro
        })
      )
    );

    alert("Presenças salvas!");
    setModalPagamentosAberto(false);
  }

  if (!rachaId || loading || !racha) return null;

  /* ======================
     RENDER
  ====================== */
  return (
    <>
      {/* MODAL RACHA */}
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
            onClick={() => {
              // Se já tem jogadores selecionados (dados do backend), vai direto pro modal de pagamentos
              if (selecionados.length > 0) {
                console.log('✅ Tem presenças cadastradas, abrindo modal de pagamentos');
                setModalPagamentosAberto(true);
              } else {
                console.log('➕ Não tem presenças, abrindo modal de seleção');
                setModalPresencaAberto(true);
              }
            }}
          >
            Lista de presença
          </button>
        </div>
      </div>

      {/* MODAL SELEÇÃO DE JOGADORES */}
      {modalPresencaAberto && (
        <div className={styles.overlayPresenca}>
          <div className={styles.modalPresenca}>
            <button 
              className={styles.close} 
              onClick={() => setModalPresencaAberto(false)}
            >
              ✕
            </button>

            <h2>JOGADORES</h2>

            {jogadores.map(j => (
              <label key={j.id} className={styles.item}>
                <input
                  type="checkbox"
                  checked={selecionados.includes(j.id)}
                  onChange={() => toggleJogador(j.id)}
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    cursor: 'pointer',
                    accentColor: '#4a69bd'
                  }}
                />
                <span>{j.nome}</span>
              </label>
            ))}

            <button
              className={styles.salvar}
              onClick={() => {
                setModalPresencaAberto(false);
                setModalPagamentosAberto(true);
              }}
            >
              CONTINUAR
            </button>
          </div>
        </div>
      )}

      {/* MODAL PAGAMENTOS */}
      {modalPagamentosAberto && (
        <div className={styles.overlayPresenca}>
          <div className={styles.jogadoresPresentes}>
            <button 
              className={styles.close} 
              onClick={() => setModalPagamentosAberto(false)}
            >
              ✕
            </button>

            <h2>Pagamentos</h2>

            {selecionados.map(id => {
              const jogador = jogadores.find(j => j.id === id);

              return (
                <div key={id} className={styles.linhaJogador}>
                  <span className={styles.nomeJogador}>
                    {jogador?.nome}
                  </span>

                  {/* GOLEIRO */}
                  <label className={styles.opcao}>
                    <input
                      type="checkbox"
                      checked={!!goleiros[id]}
                      onChange={() => toggleGoleiro(id)}
                      style={{ 
                        width: '18px', 
                        height: '18px', 
                        cursor: 'pointer',
                        accentColor: '#4a69bd'
                      }}
                    />
                    <span>Goleiro</span>
                  </label>

                  {/* PIX */}
                  <label className={styles.opcao}>
                    <input
                      type="checkbox"
                      checked={pagamentos[id] === "PIX"}
                      onChange={() => selecionarPagamento(id, "PIX")}
                      disabled={goleiros[id]}
                      style={{ 
                        width: '18px', 
                        height: '18px', 
                        cursor: goleiros[id] ? 'not-allowed' : 'pointer',
                        accentColor: '#4a69bd',
                        opacity: goleiros[id] ? 0.5 : 1
                      }}
                    />
                    <span>PIX</span>
                  </label>

                  {/* DINHEIRO */}
                  <label className={styles.opcao}>
                    <input
                      type="checkbox"
                      checked={pagamentos[id] === "DINHEIRO"}
                      onChange={() => selecionarPagamento(id, "DINHEIRO")}
                      disabled={goleiros[id]}
                      style={{ 
                        width: '18px', 
                        height: '18px', 
                        cursor: goleiros[id] ? 'not-allowed' : 'pointer',
                        accentColor: '#4a69bd',
                        opacity: goleiros[id] ? 0.5 : 1
                      }}
                    />
                    <span>Dinheiro</span>
                  </label>
                </div>
              );
            })}

            <button
              className={styles.salvar}
              onClick={salvarPresencas}
            >
              SALVAR
            </button>
          </div>
        </div>
      )}
    </>
  );
}