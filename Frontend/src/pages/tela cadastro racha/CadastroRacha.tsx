import { useState } from "react";
import styles from "./cadastroRacha.module.css";
import { createRacha } from "../../services/rachaServices";


export default function CadastroRacha() {

    const [local, setLocal] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [precoTotal, setPrecoTotal] = useState(0);
    const [valorPorJogador, setValorPorJogador] = useState(0);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        // Lógica para salvar o racha

        await createRacha({
            data,
            local,
            hora,
            valorTotal: precoTotal,
            valorPorJogador: valorPorJogador,
        });
        
        alert("Racha cadastrado com sucesso!");
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>CADASTRO DE RACHA</h1>

            <div className={styles.card}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <h3>local</h3>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Local..."
                            value={local}
                            onChange={e => setLocal(e.target.value)} />
                    </div>


                    <div>
                        <h2>data</h2>
                        <input
                            className={styles.input}
                            type="date"
                            placeholder="Data..."
                            value={data}
                            onChange={e => setData(e.target.value)} />
                    </div>


                        <div>
                            <h2>horário</h2>
                            <input
                            className={styles.input}
                            type="time"
                            placeholder="horario..."
                            value={hora}
                            onChange={e => setHora(e.target.value)} />
                        </div>


                    <div>
                        <h2>valor total</h2>
                        <input
                            className={styles.input}
                            type="number"
                            placeholder="Preço..."
                            value={precoTotal}
                            onChange={e => setPrecoTotal(Number(e.target.value))} />
                    </div>


                    <div>
                        <h2>valor por jogador</h2>
                        <input
                            className={styles.input}
                            type="number"
                            placeholder="Valor p/jogador..."
                            value={valorPorJogador}
                            onChange={e => setValorPorJogador(Number(e.target.value))} />
                    </div>


                    <button className={styles.button} type="submit">
                        SALVAR
                    </button>
                </form>
            </div>
        </div>
    );

}