import { useEffect, useState } from 'react';
import { api } from './services/api';

type Jogador = {
  id: number;
  nome: string;
};

function App() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  useEffect(() => {
    api.get('/jogadores')
      .then(response => setJogadores(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Jogadores</h1>

      <ul>
        {jogadores.map(jogador => (
          <li key={jogador.id}>{jogador.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

