import { Link } from "react-router-dom"
import styles from "./NotFound.module.css"

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>Oops! A rota que você tentou acessar não existe.</p>
      <Link to="/" className={styles.homeLink}>Voltar para a página inicial.</Link>
    </div>
  )
}

export default NotFound
