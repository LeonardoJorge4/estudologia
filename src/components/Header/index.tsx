import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <img
        src="/logo.png"
        alt="Logo"
      />
    </header>
  );
}
