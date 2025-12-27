import { getRachoes } from "../../services/rachaServices";
import { useEffect, useState } from "react";
import type { Racha } from "../../types/Racha"; //sempre que for importar tipos, tem que usar o "type"

export default function Inicio() {
    const [rachas, setRachas] = useState<Racha[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarRachoes() {
            try {
                const dados = await getRachoes();
                setRachas(dados);
            } catch (error) {
                console.error("Erro ao carregar rachões:", error);
            } finally {
                setLoading(false);
            }
        }
        carregarRachoes();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <div>
                <h2>Rachas</h2>
                <ul>
                    {rachas.map((racha) => (
                        <li key={racha.id}>
                           {racha.local} - {racha.data}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}