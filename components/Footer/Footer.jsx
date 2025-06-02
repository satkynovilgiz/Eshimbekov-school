import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        © 2025 Kasymaly Eshimbekov. Все права защищены.{' '}
        <a href="/privacy">Политика конфиденциальности</a>
      </div>
    </footer>
  );
}
