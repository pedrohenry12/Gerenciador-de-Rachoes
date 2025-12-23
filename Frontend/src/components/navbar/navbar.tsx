import { Link } from "react-router-dom";
// import styles from "./navbar.module.css";
import logo from "../logo/logo.png";

export default function Navbar() {
    return (
        <nav>
            <Link to="/"><img src={logo} alt="" /></Link>
            <Link to="/gerenciamentojogadores">Jogadores</Link>
            <Link to= "/cadastrorachas">Cadastro de rachas</Link>
        </nav>
     )
    };   
