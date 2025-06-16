// components/Footer.jsx
import Link from 'next/link';
import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        © 2025 Kasymaly Eshimbekov. Все права защищены.{' '}
        <Link href="/privacy" className={styles.link}>
          Политика конфиденциальности
        </Link>
      </div>
    </footer>
  );
}
