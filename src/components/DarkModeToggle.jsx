import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function DarkModeToggle() {
  const { t } = useTranslation();
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

  const buttonLabel = hovered
    ? darkMode
      ? t('theme.switchToLight')
      : t('theme.switchToDark')
    : darkMode
      ? `🌙 ${t('theme.darkMode')}`
      : `☀️ ${t('theme.lightMode')}`;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setDarkMode(!darkMode)}
      className={clsx(
        'w-44 px-3 py-2',
        'inline-flex items-center justify-center',
        'whitespace-nowrap overflow-hidden text-ellipsis',
        'text-black dark:text-white',
        'rounded cursor-pointer',
        'hover:bg-gray-300 dark:hover:bg-gray-700',
        'transition-colors duration-150',
        'text-sm font-medium'
      )}
      aria-label={t('theme.toggleAria')}
      title={buttonLabel}
    >
      {buttonLabel}
    </button>
  );
}