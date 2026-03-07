import React from "react";
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="app-footer border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 text-center py-4">
      <p className="text-sm text-slate-700 dark:text-slate-300">© {new Date().getFullYear()} {t('footer.rights')}</p>
    </footer>
  );
}

export default Footer;