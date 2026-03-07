import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';
import AuthModal from './authModal';
import { getAllResumes } from '../utils/resumeStorage';

export default function Header() {
  const { t } = useTranslation();
  const [createNotice, setCreateNotice] = useState('');
  const [showCreateNotice, setShowCreateNotice] = useState(false);
  const hideNoticeTimerRef = useRef(null);

  const navLinkClassName = ({ isActive }) =>
    clsx(
      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
        : 'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800'
    );

  useEffect(() => {
    return () => {
      if (hideNoticeTimerRef.current) {
        window.clearTimeout(hideNoticeTimerRef.current);
      }
    };
  }, []);

  const getCreateNavigation = () => {
    const lastResume = getAllResumes()[0];
    if (lastResume?.id) {
      const title = lastResume.title?.trim() || t('home.untitled');
      return {
        to: `/create?id=${encodeURIComponent(lastResume.id)}`,
        message: `Editing "${title}"`,
      };
    }

    return {
      to: '/create',
      message: 'Starting a new CV',
    };
  };

  const createNavigation = getCreateNavigation();

  const showCreatePopup = () => {
    setCreateNotice(createNavigation.message);
    setShowCreateNotice(true);

    if (hideNoticeTimerRef.current) {
      window.clearTimeout(hideNoticeTimerRef.current);
    }

    hideNoticeTimerRef.current = window.setTimeout(() => {
      setShowCreateNotice(false);
    }, 1300);
  };

  return (
    <header className={clsx(
      'flex items-center',
      'relative',
      'bg-slate-100 dark:bg-slate-900',
      'border-b border-slate-200 dark:border-slate-700',
      'py-4 px-6'
    )}>
      {/* Logo Section */}
      <div className="w-1/5 flex">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt={t('header.logoAlt')}
            className="h-12 ml-10"
          />
        </Link>
      </div>

      {/* Center navigation */}
      <nav className="w-3/5 flex items-center justify-center gap-2" aria-label="Main">
        <NavLink to="/" end className={navLinkClassName}>
          {t('homeMenu.resumes')}
        </NavLink>
        <NavLink to={createNavigation.to} className={navLinkClassName} onClick={showCreatePopup}>
          {t('create.title')}
        </NavLink>
        <NavLink to="/settings" className={navLinkClassName}>
          {t('homeMenu.settings')}
        </NavLink>
      </nav>

      {showCreateNotice ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 bottom-20 z-50 -translate-x-1/2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 shadow-xl"
        >
          {createNotice}
        </div>
      ) : null}

      {/* Right - Auth Button */}
      <div className="w-1/5 flex justify-end pr-4">
        <div className={clsx(
          'hover:bg-slate-200 dark:hover:bg-slate-800',
          'text-center w-20 rounded p-1',
          'transition-colors'
        )}>
          <AuthModal />
        </div>
      </div>
    </header>
  );
}