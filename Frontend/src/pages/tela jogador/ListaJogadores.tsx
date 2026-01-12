import styles from "./listajogadores.module.css";
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

    function editarnaodisponivel() {
        alert("Funcionalidade de edição disponivel em breve.");
    }
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Jogadores</h2>

      <ul className={styles.list}>
        {jogadores.map((jogador) => (
          <li key={jogador.id} className={styles.item}>
  <span className={styles.name}>{jogador.nome}</span>

  <div className={styles.actions}>
    <button
      className={styles.iconButton}
      onClick={() => handleDelete(jogador.id)}
    >
      <img
        src="https://img.icons8.com/?size=100&id=1941&format=png&color=000000"
        alt="Excluir"
        className={styles.icon}
      />
    </button>

    <button className={styles.iconButton}>
      <img
        src="https://img.icons8.com/?size=100&id=85934&format=png&color=000000"
        alt="Editar"
        className={styles.icon}
        onClick={editarnaodisponivel}
      />
    </button>
  </div>
</li>
        ))}
      </ul>
    </div>
  );
}