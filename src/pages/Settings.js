import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { ResumesButton } from "../components/HomeMenu";
import { SettingsButton } from "../components/HomeMenu";
import { DarkModeToggle } from "../components/DarkModeToggle";
import LanguageSwitcher from "../components/LanguageSwitcher";

const CREATE_SECTION_NAV_VISIBILITY_KEY = 'show_create_section_nav';

function Settings() {
  const { t } = useTranslation();
  const [showCreateSectionNav, setShowCreateSectionNav] = useState(() => {
    if (typeof window === 'undefined') return true;
    const value = window.localStorage.getItem(CREATE_SECTION_NAV_VISIBILITY_KEY);
    return value === null ? true : value === 'true';
  });

  useEffect(() => {
    window.localStorage.setItem(CREATE_SECTION_NAV_VISIBILITY_KEY, String(showCreateSectionNav));
    window.dispatchEvent(new Event('create-section-nav-visibility-changed'));
  }, [showCreateSectionNav]);

  return (
    <div className="flex w-full h-full min-h-0 overflow-hidden">
      <div className="w-1/5 h-full min-h-0 bg-gray-200 dark:bg-gray-800 p-6 overflow-y-auto border-r border-gray-300 dark:border-gray-700">
        <div className="w-full h-max mb-4">
          <ResumesButton />
        </div>
        <div className="w-full h-min">
          <SettingsButton />
        </div>
      </div>
      <div className="flex-1 min-w-0 h-full min-h-0 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('settings.title')}</h2>
        <div className="grid gap-4 max-w-xl">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-gray-700 dark:text-gray-200">
            <h3 className="text-sm font-semibold mb-3">{t('lang.switch')}</h3>
            <LanguageSwitcher />
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-gray-700 dark:text-gray-200">
            <h3 className="text-sm font-semibold mb-3">{t('theme.toggleAria')}</h3>
            <DarkModeToggle />
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-gray-700 dark:text-gray-200">
            <h3 className="text-sm font-semibold mb-3">CreateCV Section Hooks</h3>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showCreateSectionNav}
                onChange={(event) => setShowCreateSectionNav(event.target.checked)}
                className="h-4 w-4"
              />
              Show quick navigation hooks (Skills, Education, etc.) in CreateCV
            </label>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-gray-700 dark:text-gray-200">
            {t('settings.description')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;