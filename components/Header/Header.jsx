'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from '@/styles/Header.module.scss';

const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export default function Header() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('ru');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTheme(savedTheme);

    const savedLang = localStorage.getItem('lang') || 'ru';
    setLanguage(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const NavLink = ({ href, children }) => (
    <Link href={href} className={styles.navLink} onClick={() => setMenuOpen(false)}>
      {children}
    </Link>
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            Kasymaly <span>Eshimbekov</span>
          </Link>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.show : ''}`}>
          <NavLink href="/">Главная</NavLink>
          <NavLink href="/about">О школе</NavLink>
          <NavLink href="/teachers">Учителя</NavLink>
          <NavLink href="/news">Новости</NavLink>
          <NavLink href="/contact">Контакты</NavLink>

          {/* Контролы внутри меню — показываем только на мобильных */}
          <div className={styles.mobileControls}>
            <select
              value={language}
              onChange={handleLanguageChange}
              className={styles.languageSelect}
              aria-label="Выбор языка"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>

            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Переключить тему"
              type="button"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </nav>

        {/* Контролы вне меню — показываем только на десктопах */}
        <div className={styles.controls}>
          <select
            value={language}
            onChange={handleLanguageChange}
            className={styles.languageSelect}
            aria-label="Выбор языка"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Переключить тему"
            type="button"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={styles.burger}
          aria-label="Меню"
          type="button"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
