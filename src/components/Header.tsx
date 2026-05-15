import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>todos</h1>
      <p className={styles.subtitle}>Stay organised, get things done.</p>
    </div>
  );
}
