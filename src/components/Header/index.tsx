import Link from 'next/link';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <img
          src="/logo.png"
          alt="Logo"
        />
      </Link>
    </header>
  );
}
