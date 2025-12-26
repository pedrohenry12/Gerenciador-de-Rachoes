import { useState } from "react";
import styles from "./cadaastrojogador.module.css";
import { createJogador } from "../../services/jogadoresServices";

interface Props {
  onCreated: () => void;
}

export default function CadastroJogador({ onCreated }: Props) {
  const [nome, setNome] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createJogador({ nome });
    setNome("");
    onCreated();
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Cadastrar Jogador</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="NOME..."
          />

          <button className={styles.button} type="submit">
            SALVAR
          </button>
        </form>
      </div>
    </div>
  );
}
