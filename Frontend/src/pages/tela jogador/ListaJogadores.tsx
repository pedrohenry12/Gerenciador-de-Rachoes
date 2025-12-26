import styles from "./listaJogadores.module.css";

interface Jogador {
    id: number;
    nome: string;
}

interface Props {
    jogadores: Jogador[];
}


export default function ListaJogadores({ jogadores }: Props) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Jogadores</h2>

      <ul className={styles.list}>
        {jogadores.map((jogador) => (
          <li key={jogador.id} className={styles.item}>
            {jogador.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}