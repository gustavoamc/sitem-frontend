import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className={styles.navbar}>
        <div className={styles.left}>
            <p className={styles.logo}>Sitem</p>
            {isAuthenticated && 
            <>
            <Link to="/dashboard" className={styles.link}>Dashboard</Link>
            </>
            }
        </div>
        <div className={styles.right}>
            {isAuthenticated ? (
            <Link to="/profile" className={styles.link}>Perfil</Link>
            ) : (
            <Link to="/login" className={styles.link}>Entrar</Link>
            )}
        </div>
        </nav>
    );
}