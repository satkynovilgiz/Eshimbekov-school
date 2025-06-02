import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/Header.module.scss';

export default function Header() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Kasymaly <span>Eshimbekov</span></Link>
        </div>

        <nav>
          <Link href="/">Главная</Link>
          <Link href="/about">О школе</Link>
          <Link href="/teachers">Учителя</Link>
          <Link href="/news">Новости</Link>
          <Link href="/contact">Контакты</Link>
        </nav>

        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
        </button>
      </div>
    </header>
  );
}
