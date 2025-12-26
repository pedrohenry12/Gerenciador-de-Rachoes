import { useEffect, useState } from "react";
import { getJogadores } from "../../services/jogadoresServices";
import JogadoresList from "./ListaJogadores";
import CadastroJogador from "./Cadastrojogador";
import styles from "./jogadoresGeral.module.css";

interface Jogador {
  id: number;
  nome: string;
}

export default function JogadoresPage() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  async function carregarJogadores() {
    const data = await getJogadores();
    setJogadores(data);
  }

  useEffect(() => {
  async function carregar() {
    const data = await getJogadores();
    setJogadores(data);
  }

  carregar();
}, []);


  return (
    <div className={styles.container}>
      <JogadoresList jogadores={jogadores} />
      <CadastroJogador onCreated={carregarJogadores} />
    </div>
  );
}
