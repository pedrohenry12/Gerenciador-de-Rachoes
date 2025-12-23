import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Inicio from '../pages/tela inicial/Inicio';
import Jogadores from '../pages/tela jogador/JogadoresGeral';
import CadastroRacha from '../pages/tela cadastro racha/CadastroRacha';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Inicio />} />
                <Route path="/gerenciamentojogadores" element={<Jogadores />} />
                <Route path="/cadastrorachas" element={<CadastroRacha />} />
            </Route>
        </Routes>
    );
}