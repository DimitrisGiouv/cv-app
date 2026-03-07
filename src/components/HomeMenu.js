import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const menuButtonBase =
    "grid p-2 text-black dark:text-white rounded cursor-pointer transition-colors duration-100 hover:bg-gray-300 dark:hover:bg-gray-700";

export function ResumesButton() {
    const { t } = useTranslation();
    const location = useLocation();
    const isActive = location.pathname === "/";

    return (
        <Link
            to="/"
            className={`${menuButtonBase} ${isActive ? "bg-gray-300 dark:bg-gray-700" : ""}`}
        >
            {t('homeMenu.resumes')}
        </Link>
    );
}

export function SettingsButton() {
    const { t } = useTranslation();
    const location = useLocation();
    const isActive = location.pathname === "/settings";

    return (
        <Link
            to="/settings"
            className={`${menuButtonBase} ${isActive ? "bg-gray-300 dark:bg-gray-700" : ""}`}
        >
            {t('homeMenu.settings')}
        </Link>
    );
}