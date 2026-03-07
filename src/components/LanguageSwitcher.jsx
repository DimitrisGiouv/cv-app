import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('app_language', lng);
  };

  return (
    <div className="flex items-center gap-1" aria-label={t('lang.switch')}>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={clsx(
          'px-2 py-1 rounded text-xs font-semibold transition-colors',
          i18n.language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600'
        )}
      >
        {t('lang.en')}
      </button>
      <button
        type="button"
        onClick={() => setLanguage('el')}
        className={clsx(
          'px-2 py-1 rounded text-xs font-semibold transition-colors',
          i18n.language === 'el'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600'
        )}
      >
        {t('lang.el')}
      </button>
    </div>
  );
}
