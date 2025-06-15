import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <p>Carregando...</p>
    </div>
  );
}
