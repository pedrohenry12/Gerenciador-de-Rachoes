import ListaJogadores from "./ListaJogadores";
import CadastroJogador from "./Cadastrojogador";

export default function JogadoresGeral() {
    return (
        <div>
            <h1>Gestão de Jogadores</h1>
            <ListaJogadores />
            <CadastroJogador />
        </div>
    );  
}