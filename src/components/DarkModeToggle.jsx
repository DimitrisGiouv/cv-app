import { useEffect, useState } from 'react';
import clsx from 'clsx';

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : true;
  });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setDarkMode(!darkMode)}
      className={clsx(
        'w-32 p-2',
        'text-black dark:text-white',
        'rounded cursor-pointer',
        'hover:bg-gray-300 dark:hover:bg-gray-700',
        'transition-colors duration-150',
        'text-sm font-medium'
      )}
      aria-label="Toggle dark mode"
    >
      {hovered
        ? darkMode
          ? 'Switch to Light'
          : 'Switch to Dark'
        : darkMode
          ? '🌙 Dark Mode'
          : '☀️ Light Mode'}
    </button>
  );
}