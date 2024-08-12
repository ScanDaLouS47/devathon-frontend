import React, { useEffect, useState } from 'react';
import styles from './themeSwitcher.module.scss';
import ThemeLight from '../icons/ThemeLight';
import ThemeDark from '../icons/ThemeDark';

export const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const newTheme = theme === 'system' ? (prefersColorScheme ? 'dark' : 'light') : theme;
    document.body.setAttribute('data-theme', newTheme);
    setCurrentTheme(newTheme)
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    savedTheme ? setTheme(savedTheme) : setTheme('system');
  }, []);

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={`${styles.themeSwitcher__btn} ${currentTheme === 'light' ? styles.themeSwitcher__btn__isActive : ''}`}
        onClick={() => setTheme('light')}
      >
        <ThemeLight className={styles.themeSwitcher__btn__icon} />
      </button>
      <button
        className={`${styles.themeSwitcher__btn} ${currentTheme === 'dark' ? styles.themeSwitcher__btn__isActive : ''}`}
        onClick={() => setTheme('dark')}
      >
        <ThemeDark className={styles.themeSwitcher__btn__icon} />
      </button>
    </div>
  );
};
