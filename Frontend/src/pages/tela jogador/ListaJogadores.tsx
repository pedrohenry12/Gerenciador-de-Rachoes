import styles from "./listaJogadores.module.css";
import { deleteJogador } from "../../services/jogadoresServices";

interface Jogador {
    id: number;
    nome: string;
}

interface Props {
    jogadores: Jogador[];
    onDelete: (id: number) => void;
}
   


export default function ListaJogadores({ jogadores, onDelete }: Props) {

    async function handleDelete(id: number) {
        console.log("ID enviado para delete:", id, typeof id);

        await deleteJogador(id);
        onDelete(id);
    }
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Jogadores</h2>

      <ul className={styles.list}>
        {jogadores.map((jogador) => (
          <li key={jogador.id} className={styles.item}>
            {jogador.nome}
            <button onClick={() => handleDelete(jogador.id)}>excluir</button>
            <button>editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}