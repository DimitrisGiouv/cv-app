import { Link } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../assets/logo.png';
import AuthModal from './authModal';
import { DarkModeToggle } from './DarkModeToggle';

export default function Header() {
  return (
    <header className={clsx(
      'flex items-center',
      'bg-gray-200 dark:bg-gray-800',
      'py-4 px-6'
    )}>
      {/* Logo Section */}
      <div className="w-1/5 flex">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="CV Builder Logo"
            className="h-12 ml-10"
          />
        </Link>
      </div>

      {/* Center - Dark Mode Toggle */}
      <div className="w-3/5 text-center">
        <DarkModeToggle />
      </div>

      {/* Right - Auth Button */}
      <div className="w-1/5 flex justify-end pr-4">
        <div className={clsx(
          'hover:bg-gray-300 dark:hover:bg-gray-700',
          'text-center w-20 rounded p-1',
          'transition-colors'
        )}>
          <AuthModal />
        </div>
      </div>
    </header>
  );
}