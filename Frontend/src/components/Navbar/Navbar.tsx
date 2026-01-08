import { Link } from "react-router-dom"
import styles from "./navbar.module.css"
import logo from "../logo/logo.png"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Rachas" />
      </Link>

      <div className={styles.links}>
        <Link
          to="/gerenciamentojogadores"
          className={styles.link}
        >
          Jogadores
        </Link>

        <Link
          to="/cadastrorachas"
          className={styles.link}
        >
          Cadastro de rachas
        </Link>
      </div>
    </nav>
  )
}