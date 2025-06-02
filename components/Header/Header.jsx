'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.scss';

const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' }
];

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTheme(savedTheme);

    const savedLang = localStorage.getItem('lang') || 'ru';
    setLanguage(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem('lang', lang);
    // Добавь тут свою i18n логику
  };

  // Функция для рендера ссылки с защитой от "хард навигации"
  const NavLink = ({ href, children }) => {
    const handleClick = (e) => {
      if (router.asPath === href) {
        e.preventDefault();
      }
    };

    return (
      <Link href={href} legacyBehavior>
        <a onClick={handleClick} className={styles.navLink}>
          {children}
        </a>
      </Link>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" legacyBehavior>
            <a>Kasymaly <span>Eshimbekov</span></a>
          </Link>
        </div>

        <nav>
          <NavLink href="/">Главная</NavLink>
          <NavLink href="/about">О школе</NavLink>
          <NavLink href="/teachers">Учителя</NavLink>
          <NavLink href="/news">Новости</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
        </nav>

        <select
          value={language}
          onChange={handleLanguageChange}
          // style={{border:"none"}}
          className={styles.languageSelect}
          aria-label="Выбор языка"
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>

        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
