import React, { useState, useEffect } from 'react';
import "./ThemeSwitcher.css"
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(document.body.getAttribute('data-theme'));

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button  className="theme-switcher" onClick={toggleTheme}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeSwitcher;
